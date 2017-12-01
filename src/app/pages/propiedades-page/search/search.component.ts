import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import * as _ from 'lodash';
import { Propiedad } from '../../../data/propiedad';
import { PropiedadService } from '../../../data/propiedad.service';
import { FilterService } from '../../../data/filter.service';
import { Observable } from 'rxjs/Observable';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  @Output() propiedadesFiltered = new EventEmitter();
  activeTab: any[] = [true, false, false];
  propiedades: any[];
  location: string[] = [];
  type: string[] = [];
  rooms: number[] = [];
  parkings: number[] = [];
  baths: number[] = [];
  areaMin: number = 0;
  areaMax: number = 100;
  priceMin: number = 0;
  priceMax: number = 100;

  selected = {
    status: 'todo',
    location: [],
    type: [],
    rooms: [],
    parkings: [],
    baths: [],
    area: null,
    areaMin: null,
    areaMax: null,
    currency: null,
    priceMin: null,
    priceMax: null,
  };

  /// Active filter rules
  filters = {}

  constructor(private propiedadService: PropiedadService, private filterService: FilterService, private route: ActivatedRoute, private router: Router) {
    this.propiedadService.getPropiedadesList().valueChanges().subscribe(result => {
      this.propiedades = result;
      filterService.getSelected().subscribe(result => {
        this.selected = result;
        this.isActive(result.status);
      });
      filterService.getFilters().subscribe(result => {
        this.filters = result;
      });
      this.getFilterValues();
      this.applyFilters();
    });

  }

  ngOnInit() {
  }

  applyFilters() {

    var filteredPropiedades = _.filter(this.propiedades, _.conforms(this.filters));
    this.propiedadesFiltered.emit(filteredPropiedades);

  }

  isActive(status) {
    if (status == "todo")
      this.activeTab = [true, false, false];
    else if (status == "arriendo")
      this.activeTab = [false, true, false];
    else if (status == "venta")
      this.activeTab = [false, false, true];
  };

  refresh() {
    if (this.route.snapshot.url[0].path != '/propiedades') {
      this.filterService.setSelected(this.selected);
      this.filterService.setFilters(this.filters);
      this.router.navigateByUrl('/propiedades');
    } else {
      this.applyFilters();
    }
  }

  cleanFilters() {
    this.filterService.resetFilters();
    this.filterService.getSelected().subscribe(result => {
      this.selected = result;
      this.isActive(result.status);
    });
    this.filterService.getFilters().subscribe(result => {
      this.filters = result;
    });
    
    this.applyFilters();
  }

  filterContains(property: string, rule: any[]) {
    this.filters[property] = val => {
      if (rule.length > 0)
        return rule.includes(val)
      else
        return true
    }
  }

  filterBetween(property: string, min: any, max: any, unit: any) {
    this.filters[property] = val => (val.value >= min && val.value <= max && val.unit == unit)
  }

  filterExact(property: string, rule: any) {
    this.filters[property] = val => {
      if (this.selected.status != "todo")
        return val == rule
      else
        return true
    }
  }

  getFilterValues() {
    if (this.propiedades != null) {
      this.location = _.orderBy(_.map(_.uniqBy(_.filter(this.propiedades, function (item) {
        return _.has(item, 'location') && item.location != null
      }), 'location'), function (item) {
        return item.location
      }));
      this.type = _.orderBy(_.map(_.uniqBy(_.filter(this.propiedades, function (item) {
        return _.has(item, 'type') && item.type != null
      }), 'type'), function (item) {
        return item.type
      }));
      this.rooms = _.orderBy(_.map(_.uniqBy(_.filter(this.propiedades, function (item) {
        return _.has(item, 'rooms') && item.rooms != null
      }), 'rooms'), function (item) {
        return item.rooms
      }));
      this.parkings = _.orderBy(_.map(_.uniqBy(_.filter(this.propiedades, function (item) {
        return _.has(item, 'parkings') && item.parkings != null
      }), 'parkings'), function (item) {
        return item.parkings
      }));
      this.baths = _.orderBy(_.map(_.uniqBy(_.filter(this.propiedades, function (item) {
        return _.has(item, 'baths') && item.baths != null
      }), 'baths'), function (item) {
        return item.baths
      }));

      var areas = _.map(_.uniqBy(_.filter(this.propiedades, function (item) {
        return _.has(item, 'area') && item.area != null
      }), 'area'), function (item) {
        return item.area.value
      });
      this.selected.areaMin = this.areaMin = _.min(areas);
      this.selected.areaMax = this.areaMax = _.max(areas);

      var prices = _.map(_.uniqBy(_.filter(this.propiedades, function (item) {
        return _.has(item, 'price') && item.price.value != null
      }), 'price'), function (item) {
        return item.price.value
      });
      this.selected.priceMin = this.priceMin = _.min(prices);
      this.selected.priceMax = this.priceMax = _.max(prices);

    }
  }

  onUpdateStatus(status: string) {
    this.selected.status = status;
    this.filterExact("status", status);
    this.isActive(status);
  }
  onUpdateLocation(e) {
    this.filterContains("location", this.selected.location);
  }
  onUpdateType(e) {
    this.filterContains("type", this.selected.type);
  }
  onUpdateRooms(e) {
    this.filterContains("rooms", this.selected.rooms);
  }
  onUpdateParkings(e) {
    this.filterContains("parkings", this.selected.parkings);
  }
  onUpdateBaths(e) {
    this.filterContains("baths", this.selected.baths);
  }
  onUpdateArea(data) {
    this.selected.areaMin = data.from;
    this.selected.areaMax = data.to;
    this.filterBetween("area", this.selected.areaMin, this.selected.areaMax, this.selected.area);
  }
  onUpdatePrice(data) {
    this.selected.priceMin = data.from;
    this.selected.priceMax = data.to;
    this.filterBetween("price", this.selected.priceMin, this.selected.priceMax, this.selected.currency);
  }
}

import { Component, OnInit } from '@angular/core';
import { Propiedad } from '../../data/propiedad';
import { PropiedadService } from '../../data/propiedad.service';
import { Observable } from 'rxjs/Observable';
import * as _ from 'lodash';
import { FilterService } from '../../data/filter.service';

@Component({
  selector: 'app-inicio-page',
  templateUrl: './inicio-page.component.html',
  styleUrls: ['./inicio-page.component.css']
})
export class InicioPageComponent implements OnInit {
  propiedades: any[];
  filteredPropiedades: Propiedad[] = [];
  
  constructor(private propiedadService: PropiedadService, private filterService: FilterService) {
    this.propiedadService.getPropiedadesList().valueChanges().subscribe(result => {
      this.propiedades = _.orderBy(result.slice(0, 4), 'date', 'desc');
    });

  }

  ngOnInit(): void {
    this.filterService.resetFilters();
  }

  handlePropiedadesFiltered(filteredPropiedades) {
    this.filteredPropiedades = filteredPropiedades;
  }
}

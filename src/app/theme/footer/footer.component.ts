import { Component, OnInit } from '@angular/core';
import { PropiedadService } from '../../data/propiedad.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  propiedades: any[];
  image: string;

  constructor(private propiedadService: PropiedadService) {
    this.propiedadService.getPropiedadesList().valueChanges().subscribe(result => {
      this.propiedades = _.orderBy(result.slice(0, 4), 'date', 'desc');
    });

  }

  ngOnInit() {

  }

  loadImage(propiedad) {
    if (propiedad.images)
      return propiedad.images[0].url;
    else
      return "../../../assets/img/default.png";
  }

  getDate(timestamp) {
    if (timestamp != null) {
      return new Date(timestamp);
    } else {
      return null;
    }
  }

}

import { Component, OnInit } from '@angular/core';

import { Propiedad } from '../../data/propiedad';

@Component({
  selector: 'app-propiedades-page',
  templateUrl: './propiedades-page.component.html',
  styleUrls: ['./propiedades-page.component.css']
})
export class PropiedadesPageComponent implements OnInit {

  filteredPropiedades: Propiedad[] = [];
  propiedadesPage: Propiedad[];
  selectedPage: number = 1;
  maxSize: number = 5;
  pageSize: number = 5;

  constructor() { 
  }

  ngOnInit(): void {  
  }

  pageChange(selectedPage): void {
    this.propiedadesPage = this.filteredPropiedades.slice((this.selectedPage - 1) * this.pageSize, this.selectedPage * this.pageSize);
  }

  handlePropiedadesFiltered(filteredPropiedades) {
    this.filteredPropiedades = filteredPropiedades;
    this.propiedadesPage = this.filteredPropiedades.slice((this.selectedPage - 1) * this.pageSize, this.selectedPage * this.pageSize);
  }
}
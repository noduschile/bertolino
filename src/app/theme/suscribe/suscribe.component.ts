import { Component, OnInit } from '@angular/core';
import { Correo } from '../../data/correo';
import { CorreoService } from '../../data/correo.service';

@Component({
  selector: 'app-suscribe',
  templateUrl: './suscribe.component.html',
  styleUrls: ['./suscribe.component.css']
})
export class SuscribeComponent implements OnInit {
  show = false;
  correo: Correo = new Correo;
  pageDimmed = false;
  clickable = true;


  constructor(private correoService: CorreoService) {

  }

  openDimmer() {
    this.pageDimmed = true;
  }

  setCorreo(correo) {
  const fecha = new Date();
  this.correo.date = fecha.getTime();
      this.correoService.createCorreo(correo).then(_ => this.closeModal()).then(_ => this.openDimmer());
  }

  ngOnInit() {
  }

  closeModal() {
    this.show = false;
  }




}

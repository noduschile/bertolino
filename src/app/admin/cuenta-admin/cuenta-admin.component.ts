import { Component, OnInit } from '@angular/core';
import { Correo } from '../../data/correo';
import { CorreoService } from '../../data/correo.service';
import { Observable } from 'rxjs/Observable';


@Component({
  selector: 'app-cuenta-admin',
  templateUrl: './cuenta-admin.component.html',
  styleUrls: ['./cuenta-admin.component.css']
})
export class CuentaAdminComponent implements OnInit {
  correo: Correo = new Correo;
  correos: Observable<Correo[]>;
  correosPage: Correo[];
  selectedPage = 1;
  maxSize = 5;
  pageSize = 10;


  constructor(private correoService: CorreoService) {
    this.correos = this.correoService.getCorreosList().snapshotChanges().map(changes => {
      return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
    });
    this.correos.subscribe(result => {
      this.correosPage = result.slice((this.selectedPage - 1) * this.pageSize, this.selectedPage * this.pageSize);
    }
    );
  }

  ngOnInit() {
  }

  pageChange(selectedPage): void {
    this.correos.subscribe(result => {
      this.correosPage = result.slice((this.selectedPage - 1) * this.pageSize, this.selectedPage * this.pageSize);
    });
  }

  deleteCorreo(correo) {
    this.correoService.deleteCorreo(correo.key).then(_ => console.log('Correo eliminado'));
  }
  
  getDate(timestamp) {
    if (timestamp != null) {
      return new Date(timestamp);
    } else {
      return null;
    }
  }
}
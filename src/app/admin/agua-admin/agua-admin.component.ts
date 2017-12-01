import { Component, OnInit } from '@angular/core';
import { Agua } from '../../data/agua';
import { AguaService } from '../../data/agua.service';
import { Observable } from 'rxjs/Observable';
import { FirebaseApp } from 'angularfire2';
import 'firebase/storage';

import { snapshotChanges } from 'angularfire2/database';


@Component({
  selector: 'app-agua-admin',
  templateUrl: './agua-admin.component.html',
  styleUrls: ['./agua-admin.component.css']
})
export class AguaAdminComponent implements OnInit {
  collapse = true;
  dimmer = false;
  activeLoader: boolean = false;
  agua: Agua = new Agua;
  aguas: Observable<Agua[]>;
  aguasPage: Agua[];
  selectedPage = 1;
  maxSize = 5;
  pageSize = 10;
  private firebasestorage: any;
  key: string;
  fecha;


  constructor(private aguaService: AguaService, fbApp: FirebaseApp) {
    this.aguas = this.aguaService.getAguasList().snapshotChanges().map(changes => {
      return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
    });
    this.aguas.subscribe(result => {
      this.aguasPage = result.slice((this.selectedPage - 1) * this.pageSize, this.selectedPage * this.pageSize)
    }
    );
    this.firebasestorage = fbApp.storage();
  }

  ngOnInit() {
  }

  pageChange(selectedPage): void {
    this.aguas.subscribe(result => this.aguasPage = result.slice((this.selectedPage - 1) * this.pageSize, this.selectedPage * this.pageSize));
  }

  openCollapse(agua) {
    this.collapse = false;
    this.agua = agua;
    this.key = agua.key;
  }

  closeCollapse() {
    this.collapse = true;
    this.agua = new Agua;
  }

  openDimmer() {
    this.dimmer = true;
  }

  deleteAgua(agua) {
    let key = agua.key;
    let count = 0;
    this.aguaService.deleteAgua(key).then(_ => {
      this.closeCollapse();
    });
  }

  dataUpload(agua) {
    this.activeLoader = true;
    const fecha = new Date();
    this.agua.date = fecha.getTime();
    if (agua.key) {
      this.aguaService.setAgua(agua.key, agua).then(_ => {
        this.openDimmer();
        this.activeLoader = false;
      });
    } else {
      this.aguaService.createAgua(agua).then(_ => {
        this.openDimmer();
        this.activeLoader = false;
      });
    }
  }

  getDate(timestamp) {
    if (timestamp != null) {
      return new Date(timestamp);
    } else {
      return null;
    }
  }
}

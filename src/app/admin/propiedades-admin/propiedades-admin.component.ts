import { Component, OnInit } from '@angular/core';
import { Propiedad } from '../../data/propiedad';
import { PropiedadService } from '../../data/propiedad.service';
import { Observable } from 'rxjs/Observable';
import { FirebaseApp } from 'angularfire2';
import 'firebase/storage';

import { FileHolder } from 'angular2-image-upload';
import { snapshotChanges } from 'angularfire2/database';


@Component({
  selector: 'app-propiedades-admin',
  templateUrl: './propiedades-admin.component.html',
  styleUrls: ['./propiedades-admin.component.css']
})
export class PropiedadesAdminComponent implements OnInit {
  collapse = true;
  dimmer = false;
  activeLoader: boolean = false;
  propiedad: Propiedad = new Propiedad;
  propiedades: Observable<Propiedad[]>;
  propiedadesPage: Propiedad[];
  selectedPage = 1;
  maxSize = 5;
  pageSize = 10;
  private firebasestorage: any;
  files: FileHolder[] = [];
  loaded = true;
  key: string;
  urls: string[] = [];
  typeOptions: any[];
  statusOptions: any[];


  constructor(private propiedadService: PropiedadService, fbApp: FirebaseApp) {
    this.propiedades = this.propiedadService.getPropiedadesList().snapshotChanges().map(changes => {
      return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
    });
    this.propiedades.subscribe(result => {
      this.propiedadesPage = result.slice((this.selectedPage - 1) * this.pageSize, this.selectedPage * this.pageSize)
    }
    );
    this.firebasestorage = fbApp.storage();
  }

  ngOnInit() {
    this.typeOptions = [
      "Casa",
      "Terreno",
      "Local Comercial",
      "Oficina",
      "Bodega",
      "Departamento",
      "Parcela de agrado",
      "Parcela agrícola",
      "Fundo"
    ];
    this.statusOptions = [
      "Arriendo",
      "Venta"
    ];
  }

  pageChange(selectedPage): void {
    this.propiedades.subscribe(result => this.propiedadesPage = result.slice((this.selectedPage - 1) * this.pageSize, this.selectedPage * this.pageSize));
  }

  openCollapse(propiedad) {
    this.collapse = false;
    this.propiedad = propiedad;
    if (this.propiedad.images)
      this.urls = this.propiedad.images.map(function (x) {
        return x.url;
      })
    this.key = propiedad.key;
  }

  closeCollapse() {
    this.collapse = true;
    this.propiedad = new Propiedad;
    this.files = [];
  }

  openDimmer() {
    this.dimmer = true;
  }

  setPropiedad(propiedad) {
    const fecha = new Date();
    this.propiedad.date = fecha.getTime();
    this.propiedadService.setPropiedad(this.key, propiedad).then(_ => {
      this.openDimmer();
      this.activeLoader = false;
    });
  }

  deletePropiedad(propiedad) {
    let images = propiedad.images;
    let key = propiedad.key;
    let count = 0;
    this.propiedadService.deletePropiedad(key).then(_ => {
      images.forEach(element => {
        count++;
        this.firebasestorage.ref('propiedades/' + key + "/" + element.name).delete();
      });
    });
    this.closeCollapse();
  }

  dataUpload() {
    this.activeLoader = true;
    if (!this.key)
      this.key = this.propiedadService.createNewPropiedad().key;

    if (!this.propiedad.images)
      this.propiedad.images = [];

    let count1 = 0;
    let length = this.propiedad.images.length;
    let sources = this.files.map(function (x) {
      return x.src;
    });
    let indexToRemove = [];
    var loop = function (_) {
      count1++;
      if (!sources.includes(_.propiedad.images[count1 - 1].url)) {
        _.firebasestorage.ref('propiedades/' + _.key + "/" + _.propiedad.images[count1 - 1].name).delete().then(snapshot => {
          indexToRemove.push(count1 - 1);
          if (count1 < length)
            loop(_);
          else {
            indexToRemove.reverse().forEach(element => {
              _.propiedad.images.splice(element, 1);
            })
            _.imagesUpload();
          }
        });
      }
      else if (count1 < length)
        loop(_);
      else {
        indexToRemove.reverse().forEach(element => {
          _.propiedad.images.splice(element, 1);
        })
        _.imagesUpload();
      }
    };
    if (this.loaded && this.propiedad.images.length !== 0) {
      loop(this);
    }
    else
      this.imagesUpload();
  }

  imagesUpload() {
    if (!this.propiedad.images)
      this.propiedad.images = [];
    let newFiles = this.files.filter(function (x) {
      return x.file.type != "";
    })
    if (this.loaded && newFiles.length !== 0) {
      let count2: number;
      if (this.propiedad.images.length > 0)
        count2 = parseInt(this.propiedad.images[this.propiedad.images.length - 1].name);
      else
        count2 = 0;
      newFiles.forEach(element => {
        count2++;
        this.firebasestorage.ref('propiedades/' + this.key + "/" + count2).put(element.file).then(
          snapshot => {
            this.propiedad.images.push({ name: snapshot.metadata.name, url: snapshot.downloadURL });
            console.log(this.propiedad.images);
          }).then(_ => {
            if (this.propiedad.images.length === this.files.length) {
              this.propiedadService.deletePropiedad(this.key + "/images").then(_ => {
                this.setPropiedad(this.propiedad);
              })
            }
          }
          );
      });
    } else {
      this.propiedadService.deletePropiedad(this.key + "/images").then(_ => {
        this.setPropiedad(this.propiedad);
      })
    }
  }

  onUploadStateChanged(e) {
    this.loaded = e;
  }

  getDate(timestamp) {
    if (timestamp != null) {
      return new Date(timestamp);
    } else {
      return null;
    }
  }
}

import { Component, OnInit } from '@angular/core';
import { Minera } from '../../data/minera';
import { MineraService } from '../../data/minera.service';
import { Observable } from 'rxjs/Observable';
import { FirebaseApp } from 'angularfire2';
import 'firebase/storage';

import { FileHolder } from 'angular2-image-upload';
import { snapshotChanges } from 'angularfire2/database';


@Component({
  selector: 'app-minera-admin',
  templateUrl: './minera-admin.component.html',
  styleUrls: ['./minera-admin.component.css']
})
export class MineraAdminComponent implements OnInit {
  collapse = true;
  dimmer = false;
  activeLoader: boolean = false;
  minera: Minera = new Minera;
  mineras: Observable<Minera[]>;
  minerasPage: Minera[];
  selectedPage = 1;
  maxSize = 5;
  pageSize = 10;
  private firebasestorage: any;
  files: FileHolder[] = [];
  loaded = true;
  key: string;
  urls: string[] = [];
  fecha;


  constructor(private mineraService: MineraService, fbApp: FirebaseApp) {
    this.mineras = this.mineraService.getMinerasList().snapshotChanges().map(changes => {
      return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
    });
    this.mineras.subscribe(result => {
      this.minerasPage = result.slice((this.selectedPage - 1) * this.pageSize, this.selectedPage * this.pageSize)
    }
    );
    this.firebasestorage = fbApp.storage();
  }

  ngOnInit() {
  }

  pageChange(selectedPage): void {
    this.mineras.subscribe(result => this.minerasPage = result.slice((this.selectedPage - 1) * this.pageSize, this.selectedPage * this.pageSize));
  }

  openCollapse(minera) {
    this.collapse = false;
    this.minera = minera;

    this.fecha = minera.date ? this.getDate(minera.date) : new Date();

    if (this.minera.images)
      this.urls = this.minera.images.map(function (x) {
        return x.url;
      })
    this.key = minera.key;
  }

  closeCollapse() {
    this.collapse = true;
    this.minera = new Minera;
    this.files = [];
  }

  openDimmer() {
    this.dimmer = true;
  }

  setMinera(minera) {
    this.minera.date = this.fecha.getTime();
    this.mineraService.setMinera(this.key, minera).then(_ => {
      this.openDimmer();
      this.activeLoader = false;
    });
  }

  deleteMinera(minera) {
    let images = minera.images;
    let key = minera.key;
    let count = 0;
    this.mineraService.deleteMinera(key).then(_ => {
      images.forEach(element => {
        count++;
        this.firebasestorage.ref('mineras/' + key + "/" + element.name).delete();
      });
    });
    this.closeCollapse();
  }

  dataUpload() {
    this.activeLoader = true;
    if (!this.key)
      this.key = this.mineraService.createNewMinera().key;

    if (!this.minera.images)
      this.minera.images = [];

    let count1 = 0;
    let length = this.minera.images.length;
    let sources = this.files.map(function (x) {
      return x.src;
    });
    let indexToRemove = [];
    var loop = function (_) {
      count1++;
      if (!sources.includes(_.minera.images[count1 - 1].url)) {
        _.firebasestorage.ref('mineras/' + _.key + "/" + _.minera.images[count1 - 1].name).delete().then(snapshot => {
          indexToRemove.push(count1 - 1);
          if (count1 < length)
            loop(_);
          else {
            indexToRemove.reverse().forEach(element => {
              _.minera.images.splice(element, 1);
            })
            _.imagesUpload();
          }
        });
      }
      else if (count1 < length)
        loop(_);
      else {
        indexToRemove.reverse().forEach(element => {
          _.minera.images.splice(element, 1);
        })
        _.imagesUpload();
      }
    };
    if (this.loaded && this.minera.images.length !== 0) {
      loop(this);
    }
    else
      this.imagesUpload();
  }

  imagesUpload() {
    if (!this.minera.images)
      this.minera.images = [];
    let newFiles = this.files.filter(function (x) {
      return x.file.type != "";
    })
    if (this.loaded && newFiles.length !== 0) {
      let count2: number;
      if (this.minera.images.length > 0)
        count2 = parseInt(this.minera.images[this.minera.images.length - 1].name);
      else
        count2 = 0;
      newFiles.forEach(element => {
        count2++;
        this.firebasestorage.ref('mineras/' + this.key + "/" + count2).put(element.file).then(
          snapshot => {
            this.minera.images.push({ name: snapshot.metadata.name, url: snapshot.downloadURL });
            console.log(this.minera.images);
          }).then(_ => {
            if (this.minera.images.length === this.files.length) {
              this.mineraService.deleteMinera(this.key + "/images").then(_ => {
                this.setMinera(this.minera);
              })
            }
          }
          );
      });
    } else {
      this.mineraService.deleteMinera(this.key + "/images").then(_ => {
        this.setMinera(this.minera);
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

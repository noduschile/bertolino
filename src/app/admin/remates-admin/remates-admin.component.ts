import { Component, OnInit } from '@angular/core';
import { Remate } from '../../data/remate';
import { RemateService } from '../../data/remate.service';
import { Observable } from 'rxjs/Observable';
import { FirebaseApp } from 'angularfire2';
import 'firebase/storage';

import { FileHolder } from 'angular2-image-upload';
import { snapshotChanges } from 'angularfire2/database';


@Component({
  selector: 'app-remates-admin',
  templateUrl: './remates-admin.component.html',
  styleUrls: ['./remates-admin.component.css']
})
export class RematesAdminComponent implements OnInit {
  collapse = true;
  dimmer = false;
  activeLoader: boolean = false;
  remate: Remate = new Remate;
  remates: Observable<Remate[]>;
  rematesPage: Remate[];
  selectedPage = 1;
  maxSize = 5;
  pageSize = 10;
  private firebasestorage: any;
  files: FileHolder[] = [];
  loaded = true;
  key: string;
  urls: string[] = [];
  fecha;


  constructor(private remateService: RemateService, fbApp: FirebaseApp) {
    this.remates = this.remateService.getRematesList().snapshotChanges().map(changes => {
      return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
    });
    this.remates.subscribe(result => {
      this.rematesPage = result.slice((this.selectedPage - 1) * this.pageSize, this.selectedPage * this.pageSize)
    }
    );
    this.firebasestorage = fbApp.storage();
  }

  ngOnInit() {
  }

  pageChange(selectedPage): void {
    this.remates.subscribe(result => this.rematesPage = result.slice((this.selectedPage - 1) * this.pageSize, this.selectedPage * this.pageSize));
  }

  openCollapse(remate) {
    this.collapse = false;
    this.remate = remate;

    this.fecha = remate.date ? this.getDate(remate.date) : new Date();

    if (this.remate.images)
      this.urls = this.remate.images.map(function (x) {
        return x.url;
      })
    this.key = remate.key;
  }

  closeCollapse() {
    this.collapse = true;
    this.remate = new Remate;
    this.files = [];
  }

  openDimmer() {
    this.dimmer = true;
  }

  setRemate(remate) {
    this.remate.date = this.fecha.getTime();
    this.remateService.setRemate(this.key, remate).then(_ => {
      this.openDimmer();
      this.activeLoader = false;
    });
  }

  deleteRemate(remate) {
    let images = remate.images;
    let key = remate.key;
    let count = 0;
    this.remateService.deleteRemate(key).then(_ => {
      images.forEach(element => {
        count++;
        this.firebasestorage.ref('remates/' + key + "/" + element.name).delete();
      });
    });
    this.closeCollapse();
  }

  dataUpload() {
    this.activeLoader = true;
    if (!this.key)
      this.key = this.remateService.createNewRemate().key;

    if (!this.remate.images)
      this.remate.images = [];

    let count1 = 0;
    let length = this.remate.images.length;
    let sources = this.files.map(function (x) {
      return x.src;
    });
    let indexToRemove = [];
    var loop = function (_) {
      count1++;
      if (!sources.includes(_.remate.images[count1 - 1].url)) {
        _.firebasestorage.ref('remates/' + _.key + "/" + _.remate.images[count1 - 1].name).delete().then(snapshot => {
          indexToRemove.push(count1 - 1);
          if (count1 < length)
            loop(_);
          else {
            indexToRemove.reverse().forEach(element => {
              _.remate.images.splice(element, 1);
            })
            _.imagesUpload();
          }
        });
      }
      else if (count1 < length)
        loop(_);
      else {
        indexToRemove.reverse().forEach(element => {
          _.remate.images.splice(element, 1);
        })
        _.imagesUpload();
      }
    };
    if (this.loaded && this.remate.images.length !== 0) {
      loop(this);
    }
    else
      this.imagesUpload();
  }

  imagesUpload() {
    if (!this.remate.images)
      this.remate.images = [];
    let newFiles = this.files.filter(function (x) {
      return x.file.type != "";
    })
    if (this.loaded && newFiles.length !== 0) {
      let count2: number;
      if (this.remate.images.length > 0)
        count2 = parseInt(this.remate.images[this.remate.images.length - 1].name);
      else
        count2 = 0;
      newFiles.forEach(element => {
        count2++;
        this.firebasestorage.ref('remates/' + this.key + "/" + count2).put(element.file).then(
          snapshot => {
            this.remate.images.push({ name: snapshot.metadata.name, url: snapshot.downloadURL });
            console.log(this.remate.images);
          }).then(_ => {
            if (this.remate.images.length === this.files.length) {
              this.remateService.deleteRemate(this.key + "/images").then(_ => {
                this.setRemate(this.remate);
              })
            }
          }
          );
      });
    } else {
      this.remateService.deleteRemate(this.key + "/images").then(_ => {
        this.setRemate(this.remate);
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

import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from 'angularfire2/database';
import { Remate } from './remate';

@Injectable()
export class RemateService {

  private basePath = 'remates';
  items: AngularFireList<any[]> = null; //  list of objects
  item: AngularFireObject<Remate> = null; //   single object
  constructor(private db: AngularFireDatabase) { }

  getRematesList(): AngularFireList<any[]> {
    this.items = this.db.list(this.basePath);
    return this.items;
  }

  createRemate(remate: Remate) {
    const itemsRef = this.db.list('remates');
    return itemsRef.push(remate);
  }

  createNewRemate() {
    let remate = new Remate;
    const itemsRef = this.db.list('remates');
    return itemsRef.push(remate);
  }

  setRemate(key:string, remate: Remate) {
    const itemsRef = this.db.list('remates');
    return itemsRef.set(key, remate);
  }

  updateRemate(key: string, newRemate: Remate) {
    const itemsRef = this.db.list('remates');
    return itemsRef.update(key, newRemate);
  }
  deleteRemate(key) {
    const itemsRef = this.db.list('remates');
    return itemsRef.remove(key); 
  }


}

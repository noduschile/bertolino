import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from 'angularfire2/database';
import { Propiedad } from './propiedad';

@Injectable()
export class PropiedadService {

  private basePath = 'propiedades';
  items: AngularFireList<any[]> = null; //  list of objects
  item: AngularFireObject<Propiedad> = null; //   single object
  constructor(private db: AngularFireDatabase) { }

  getPropiedadesList(): AngularFireList<any[]> {
    this.items = this.db.list(this.basePath);
    return this.items;
  }

  createPropiedad(propiedad: Propiedad) {
    const itemsRef = this.db.list('propiedades');
    return itemsRef.push(propiedad);
  }

  createNewPropiedad() {
    let propiedad = new Propiedad;
    const itemsRef = this.db.list('propiedades');
    return itemsRef.push(propiedad);
  }

  setPropiedad(key: string, propiedad: Propiedad) {
    const itemsRef = this.db.list('propiedades');
    return itemsRef.update(key, propiedad);

  }

  updatePropiedad(key: string, newPropiedad: Propiedad) {
    const itemsRef = this.db.list('propiedades');
    return itemsRef.update(key, newPropiedad);
  }
  deletePropiedad(key) {
    const itemsRef = this.db.list('propiedades');
    return itemsRef.remove(key);
  }


}
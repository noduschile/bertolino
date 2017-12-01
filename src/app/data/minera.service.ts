import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from 'angularfire2/database';
import { Minera } from './minera';

@Injectable()
export class MineraService {

    private basePath = 'mineras';
    items: AngularFireList<any[]> = null; //  list of objects
    item: AngularFireObject<Minera> = null; //   single object
    constructor(private db: AngularFireDatabase) { }

    getMinerasList(): AngularFireList<any[]> {
        this.items = this.db.list(this.basePath);
        return this.items;
    }

    createMinera(minera: Minera) {
        const itemsRef = this.db.list('mineras');
        return itemsRef.push(minera);
    }

    createNewMinera() {
        let minera = new Minera;
        const itemsRef = this.db.list('minera');
        return itemsRef.push(minera);
      }

    setMinera(key: string, minera: Minera) {
        const itemsRef = this.db.list('mineras');
        return itemsRef.set(key, minera);
    }

    updateMinera(key: string, newMinera: Minera) {
        const itemsRef = this.db.list('mineras');
        return itemsRef.update(key, newMinera);
    }
    deleteMinera(key) {
        const itemsRef = this.db.list('mineras');
        return itemsRef.remove(key);
    }
}
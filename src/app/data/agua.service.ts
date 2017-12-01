import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from 'angularfire2/database';
import { Agua } from './agua';

@Injectable()
export class AguaService {

    private basePath = 'aguas';
    items: AngularFireList<any[]> = null; //  list of objects
    item: AngularFireObject<Agua> = null; //   single object
    constructor(private db: AngularFireDatabase) { }

    getAguasList(): AngularFireList<any[]> {
        this.items = this.db.list(this.basePath);
        return this.items;
    }

    createAgua(agua: Agua) {
        const itemsRef = this.db.list('aguas');
        return itemsRef.push(agua);
    }

    setAgua(key: string, agua: Agua) {
        const itemsRef = this.db.list('aguas');
        return itemsRef.set(key, agua);
    }

    updateAgua(key: string, newAgua: Agua) {
        const itemsRef = this.db.list('aguas');
        return itemsRef.update(key, newAgua);
    }
    deleteAgua(key) {
        const itemsRef = this.db.list('aguas');
        return itemsRef.remove(key);
    }
}
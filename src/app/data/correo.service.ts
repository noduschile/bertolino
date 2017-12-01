import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from 'angularfire2/database';
import { Correo } from './correo';

@Injectable()
export class CorreoService {

    private basePath = 'correos';
    items: AngularFireList<any[]> = null; //  list of objects
    item: AngularFireObject<Correo> = null; //   single object
    constructor(private db: AngularFireDatabase) { }

    getCorreosList(): AngularFireList<any[]> {
        this.items = this.db.list(this.basePath);
        return this.items;
    }

    createCorreo(correo: Correo) {
        const itemsRef = this.db.list('correos');
        return itemsRef.push(correo);
    }

    setCorreo(key: string, correo: Correo) {
        const itemsRef = this.db.list('correos');
        return itemsRef.set(key, correo);
    }

    updateCorreo(key: string, newCorreo: Correo) {
        const itemsRef = this.db.list('correos');
        return itemsRef.update(key, newCorreo);
    }
    deleteCorreo(key) {
        const itemsRef = this.db.list('correos');
        return itemsRef.remove(key);
    }
}
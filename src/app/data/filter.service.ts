import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from 'angularfire2/database';
import { Remate } from './remate';
import { Observable } from 'rxjs/Rx';
import { of } from 'rxjs/observable/of';

@Injectable()
export class FilterService {

    selected = {
        status: "todo",
        location: [],
        type: [],
        rooms: [],
        parkings: [],
        baths: [],
        area: null,
        areaMin: null,
        areaMax: null,
        currency: null,
        priceMin: null,
        priceMax: null,
    };

    /// Active filter rules
    filters = {}

    constructor() { }

    getSelected(): Observable<any> {
        return of(this.selected);
    }
    getFilters():Observable<any> {
        return of(this.filters)
    }
    setSelected(selected) {
        this.selected = selected
    }
    setFilters(filters) {
        this.filters = filters
    }
    resetFilters(){
        this.selected = {
            status: "todo",
            location: [],
            type: [],
            rooms: [],
            parkings: [],
            baths: [],
            area: null,
            areaMin: null,
            areaMax: null,
            currency: null,
            priceMin: null,
            priceMax: null,
        };  
        this.filters = {};
    }


}
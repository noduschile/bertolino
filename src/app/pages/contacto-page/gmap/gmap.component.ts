import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-gmap',
  templateUrl: './gmap.component.html',
  styleUrls: ['./gmap.component.css']
})
export class GmapComponent implements OnInit {

  constructor() { }
  lat = -29.904138;
  lng = -71.252343;
  zoom: number = 15;
  ngOnInit() {
  }

}

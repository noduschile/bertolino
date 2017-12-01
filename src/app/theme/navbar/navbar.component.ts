import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  host: { '(window:scroll)': 'updateHeader($event)' }

})
export class NavbarComponent {
  collapse = true;
  isScrolled = false;
  currPos = 0;
  startPos = 0;
  changePos = 80;

  constructor() { }

  updateHeader(evt) {
    this.currPos = (window.pageYOffset || evt.target.scrollTop) - (evt.target.clientTop || 0);
    if (this.currPos >= this.changePos) {
      this.isScrolled = true;
    } else {
      this.isScrolled = false;
    }
  }



}

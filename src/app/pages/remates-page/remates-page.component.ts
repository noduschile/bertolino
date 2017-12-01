import { Component, OnInit } from '@angular/core';

import { Remate } from '../../data/remate';
import { RemateService } from '../../data/remate.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-remates-page',
  templateUrl: './remates-page.component.html',
  styleUrls: ['./remates-page.component.css']
})
export class RematesPageComponent implements OnInit {
  remates: Observable<Remate[]>;
  rematesPage: Remate[];
  selectedPage = 1;
  maxSize = 5;
  pageSize = 6;
  constructor(private remateService: RemateService) { 
    this.remates = this.remateService.getRematesList().valueChanges();
    this.remates.subscribe(result => this.rematesPage = result.slice((this.selectedPage - 1) * this.pageSize, this.selectedPage * this.pageSize));
  }

  ngOnInit(): void {
    
  }
  pageChange(selectedPage): void {
    this.remates.subscribe(result => this.rematesPage = result.slice((this.selectedPage - 1) * this.pageSize, this.selectedPage * this.pageSize));
  }
  prueba(){
    console.log(this.rematesPage);
  }
}

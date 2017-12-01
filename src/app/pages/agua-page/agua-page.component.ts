import { Component, OnInit } from '@angular/core';


import { Agua } from '../../data/agua';
import { AguaService } from '../../data/agua.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-agua-page',
  templateUrl: './agua-page.component.html',
  styleUrls: ['./agua-page.component.css']
})
export class AguaPageComponent implements OnInit {
  aguas: Observable<Agua[]>;
  aguasPage: Agua[];
  selectedPage = 1;
  maxSize = 5;
  pageSize = 6;
  constructor(private aguaService: AguaService) { 
    this.aguas = this.aguaService.getAguasList().valueChanges();
    this.aguas.subscribe(result => this.aguasPage = result.slice((this.selectedPage - 1) * this.pageSize, this.selectedPage * this.pageSize));
  }

  ngOnInit(): void {
  }
  pageChange(selectedPage): void {
    this.aguas.subscribe(result => this.aguasPage = result.slice((this.selectedPage - 1) * this.pageSize, this.selectedPage * this.pageSize));
  }
}


import { Component, OnInit } from '@angular/core';

import { Minera } from '../../data/minera';
import { MineraService } from '../../data/minera.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-minera-page',
  templateUrl: './minera-page.component.html',
  styleUrls: ['./minera-page.component.css']
})
export class MineraPageComponent implements OnInit {
  mineras: Observable<Minera[]>;
  minerasPage: Minera[];
  selectedPage = 1;
  maxSize = 5;
  pageSize = 6;
  constructor(private mineraService: MineraService) { 
    this.mineras = this.mineraService.getMinerasList().valueChanges();
    this.mineras.subscribe(result => this.minerasPage = result.slice((this.selectedPage - 1) * this.pageSize, this.selectedPage * this.pageSize));
  }

  ngOnInit(): void {
  }
  pageChange(selectedPage): void {
    this.mineras.subscribe(result => this.minerasPage = result.slice((this.selectedPage - 1) * this.pageSize, this.selectedPage * this.pageSize));
  }
}

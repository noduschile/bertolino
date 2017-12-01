import { Component, OnInit, Input } from '@angular/core';
import { Agua } from '../../../data/agua';

@Component({
  selector: 'app-agua-card',
  templateUrl: './agua-card.component.html',
  styleUrls: ['./agua-card.component.css']
})
export class AguaCardComponent implements OnInit {
  @Input() agua: Agua;
  show = false;

  constructor() { }

  ngOnInit() {
  }

}

import { Component, OnInit, Input } from '@angular/core';
import { Minera } from '../../../data/minera';
import { SwiperComponent, SwiperDirective, SwiperConfigInterface } from 'ngx-swiper-wrapper';

@Component({
  selector: 'app-minera-card',
  templateUrl: './minera-card.component.html',
  styleUrls: ['./minera-card.component.css']
})
export class MineraCardComponent implements OnInit {
  @Input() minera: Minera;
  image: string;
  config: SwiperConfigInterface = {
    direction: 'horizontal',
    slidesPerView: 1,
    scrollbar: false,
    nextButton: '.swiper-button-next',
    prevButton: '.swiper-button-prev',
    pagination: '.swiper-pagination',
    paginationClickable: false,
  };
  show = false;

  constructor() { }

  ngOnInit() {
    if (this.minera.images)
      this.image = this.minera.images[0].url;
    else
      this.image = "../../../assets/img/default.png";

  }

}

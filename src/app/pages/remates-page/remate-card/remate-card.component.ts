import { Component, OnInit, Input } from '@angular/core';
import { Remate } from '../../../data/remate';
import { SwiperComponent, SwiperDirective, SwiperConfigInterface } from 'ngx-swiper-wrapper';

@Component({
  selector: 'app-remate-card',
  templateUrl: './remate-card.component.html',
  styleUrls: ['./remate-card.component.css']
})
export class RemateCardComponent implements OnInit {
  @Input() remate: Remate;
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
    if (this.remate.images)
      this.image = this.remate.images[0].url;
    else
      this.image = "../../../assets/img/default.png";
  }

  getDate(timestamp) {
    if (timestamp != null) {
      return new Date(timestamp);
    } else {
      return null;
    }
  }

}

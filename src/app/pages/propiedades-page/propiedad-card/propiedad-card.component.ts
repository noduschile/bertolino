import { Component, OnInit, Input } from '@angular/core';
import { Propiedad } from '../../../data/propiedad';
import { SwiperComponent, SwiperDirective, SwiperConfigInterface } from 'ngx-swiper-wrapper';

@Component({
  selector: 'app-propiedad-card',
  templateUrl: './propiedad-card.component.html',
  styleUrls: ['./propiedad-card.component.css']
})
export class PropiedadCardComponent implements OnInit {

  @Input() propiedad: Propiedad;
  collapse: boolean;
  image: string;
  bottonText: string;
  index;
  config: SwiperConfigInterface = {
    direction: 'horizontal',
    slidesPerView: 1,
    scrollbar: false,
    nextButton: '.swiper-button-next',
    prevButton: '.swiper-button-prev',
    pagination: '.swiper-pagination',
    paginationClickable: false,
  };

  constructor() { }

  ngOnInit() {
    this.collapse = true;
    this.bottonText = 'Ver más';
    if (this.propiedad.images)
      this.image = this.propiedad.images[0].url;
    else
      this.image = "../../../assets/img/default.png";
  }
  toCollapse(): void {
    this.collapse = !this.collapse;
    if (this.collapse) {
      this.bottonText = 'Ver más';
    } else {
      this.bottonText = 'Ocultar';
    }
  }
}

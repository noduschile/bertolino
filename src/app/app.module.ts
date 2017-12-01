import { BrowserModule,  } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DatePipe, CommonModule, LocationStrategy, HashLocationStrategy } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {SuiModule} from 'ng2-semantic-ui';
import { L_SEMANTIC_UI_MODULE } from 'angular2-semantic-ui';
import { ImageUploadModule } from 'angular2-image-upload';
import { IonRangeSliderModule } from 'ng2-ion-range-slider';

import { environment } from '../environments/environment';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';

import { AppRoutingModule } from './routing/routing.module';
import { PropiedadService } from './data/propiedad.service';
import { RemateService } from './data/remate.service';
import { AguaService } from './data/agua.service';
import { CorreoService } from './data/correo.service';
import { MineraService } from './data/minera.service';
import { FilterService } from './data/filter.service';


import { AppComponent } from './app.component';
import { FooterComponent } from './theme/footer/footer.component';
import { HeaderComponent } from './theme/header/header.component';
import { AgentePageComponent } from './pages/agente-page/agente-page.component';
import { AguaPageComponent } from './pages/agua-page/agua-page.component';
import { ContactoPageComponent } from './pages/contacto-page/contacto-page.component';
import { MineraPageComponent } from './pages/minera-page/minera-page.component';
import { GmapComponent } from './pages/contacto-page/gmap/gmap.component';
import { PropiedadesPageComponent } from './pages/propiedades-page/propiedades-page.component';
import { NavbarComponent } from './theme/navbar/navbar.component';
import { AgmCoreModule } from '@agm/core';
import { RematesPageComponent } from './pages/remates-page/remates-page.component';
import { PropiedadCardComponent } from './pages/propiedades-page/propiedad-card/propiedad-card.component';
import { SuscribeComponent } from './theme/suscribe/suscribe.component';
import { SearchComponent } from './pages/propiedades-page/search/search.component';
import { SwiperModule, SWIPER_CONFIG, SwiperConfigInterface } from 'ngx-swiper-wrapper';
import { PagesComponent } from './pages/pages.component';
import { AdminComponent } from './admin/admin.component';
import { LoginComponent } from './admin/login/login.component';


import { SidebarComponent } from './admin/sidebar/sidebar.component';
import { RematesAdminComponent } from './admin/remates-admin/remates-admin.component';
import { PropiedadesAdminComponent } from './admin/propiedades-admin/propiedades-admin.component';
import { MineraAdminComponent } from './admin/minera-admin/minera-admin.component';
import { AguaAdminComponent } from './admin/agua-admin/agua-admin.component';
import { CuentaAdminComponent } from './admin/cuenta-admin/cuenta-admin.component';
import { RemateCardComponent } from './pages/remates-page/remate-card/remate-card.component';
import { AguaCardComponent } from './pages/agua-page/agua-card/agua-card.component';
import { MineraCardComponent } from './pages/minera-page/minera-card/minera-card.component';
import { InicioPageComponent } from './pages/inicio-page/inicio-page.component';

const DEFAULT_SWIPER_CONFIG: SwiperConfigInterface = {
  direction: 'horizontal',
  slidesPerView: 'auto',
  nextButton: true,
  prevButton: true
};

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
    AgentePageComponent,
    AguaPageComponent,
    ContactoPageComponent,
    MineraPageComponent,
    GmapComponent,
    PropiedadesPageComponent,
    NavbarComponent,
    RematesPageComponent,
    PropiedadCardComponent,
    SuscribeComponent,
    SearchComponent,
    PagesComponent,
    AdminComponent,
    LoginComponent,
    SidebarComponent,
    RematesAdminComponent,
    PropiedadesAdminComponent,
    MineraAdminComponent,
    AguaAdminComponent,
    CuentaAdminComponent,
    RemateCardComponent,
    AguaCardComponent,
    MineraCardComponent,
    InicioPageComponent,
    ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    SuiModule,
    L_SEMANTIC_UI_MODULE,
    AppRoutingModule,
    IonRangeSliderModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDJ8ul2ZCm4nvUK-9vhK5hT1oLmKMDWTm8'
    }),
    SwiperModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    ImageUploadModule.forRoot()
  ],
  providers: [
    PropiedadService,
    RemateService,
    AguaService,
    CorreoService,
    MineraService,
    FilterService,
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    {
      provide: SWIPER_CONFIG,
      useValue: DEFAULT_SWIPER_CONFIG
    },
    AngularFireDatabase
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

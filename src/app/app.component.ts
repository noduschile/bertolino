import { Component } from '@angular/core';

import {SuiLocalizationService} from 'ng2-semantic-ui';
import es from 'ng2-semantic-ui/locales/es';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  constructor(public localizationService: SuiLocalizationService) {
    // Load the Spanish translations into the Localization Service.
    localizationService.load('es', es);
    // Set the current language to Spanish.
    localizationService.setLanguage('es');
}
}

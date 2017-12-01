import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PagesComponent } from '../pages/pages.component';
import { InicioPageComponent } from '../pages/inicio-page/inicio-page.component';
import { AgentePageComponent } from '../pages/agente-page/agente-page.component';
import { PropiedadesPageComponent } from '../pages/propiedades-page/propiedades-page.component';
import { RematesPageComponent } from '../pages/remates-page/remates-page.component';
import { AguaPageComponent } from '../pages/agua-page/agua-page.component';
import { MineraPageComponent } from '../pages/minera-page/minera-page.component';
import { ContactoPageComponent } from '../pages/contacto-page/contacto-page.component';

import { AdminComponent } from '../admin/admin.component';
import { RematesAdminComponent } from '../admin/remates-admin/remates-admin.component';
import { PropiedadesAdminComponent } from '../admin/propiedades-admin/propiedades-admin.component';
import { MineraAdminComponent } from '../admin/minera-admin/minera-admin.component';
import { AguaAdminComponent } from '../admin/agua-admin/agua-admin.component';
import { CuentaAdminComponent } from '../admin/cuenta-admin/cuenta-admin.component';



const routes: Routes = [
  {
    path: '', component: PagesComponent, children: [
      { path: '', redirectTo: '/inicio', pathMatch: 'full'},
      { path: 'inicio', component: InicioPageComponent },
      { path: 'agente', component: AgentePageComponent },
      { path: 'propiedades', component: PropiedadesPageComponent },
      { path: 'remates', component: RematesPageComponent },
      { path: 'agua', component: AguaPageComponent },
      { path: 'minera', component: MineraPageComponent },
      { path: 'contacto', component: ContactoPageComponent }
    ]
  },
  {
    path: 'admin', component: AdminComponent, children: [
      { path: '', redirectTo: 'propiedades', pathMatch: 'full'},
      { path: 'propiedades',  component: PropiedadesAdminComponent},
      { path: 'remates',  component: RematesAdminComponent},
      { path: 'agua',  component: AguaAdminComponent},
      { path: 'minera',  component: MineraAdminComponent},
      { path: 'cuenta',  component: CuentaAdminComponent},
    ]
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

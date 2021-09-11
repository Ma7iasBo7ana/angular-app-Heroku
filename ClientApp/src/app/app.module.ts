import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { CounterComponent } from './counter/counter.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';
import { PaquetesComponent } from './paquetes/paquetes.component';
import { CamionesComponent } from './camiones/camiones.component';
import { CamionerosComponent } from './camioneros/camioneros.component';
import { PaquetesFormComponent } from './paquetes/paquetes-form/paquetes-form.component';
import { CamionerosFormComponent } from './camioneros/camioneros-form/camioneros-form.component';
import { CamionesFormComponent } from './camiones/camiones-form/camiones-form.component';
import { LoginComponent } from './login/login.component';
import {GuardpaginaService} from './servicios/guardpagina.service';
import {InterceptorService} from './servicios/interceptor.service';


@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    CounterComponent,
    FetchDataComponent,
    PaquetesComponent,
    CamionesComponent,
    CamionerosComponent,
    PaquetesFormComponent,
    CamionerosFormComponent,
    CamionesFormComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'counter', component: CounterComponent, canActivate:[GuardpaginaService] },
      { path: 'fetch-data', component: FetchDataComponent },
      { path: 'paquetes', component: PaquetesComponent, canActivate:[GuardpaginaService]  },
      { path: 'camiones', component: CamionesComponent },
      { path: 'camioneros', component: CamionerosComponent },
      { path: 'paquetes-crear', component: PaquetesFormComponent },
      { path: 'paquetes-editar/:id', component: PaquetesFormComponent },
      { path: 'camioneros-crear', component: CamionerosFormComponent, canActivate:[GuardpaginaService] },
      { path: 'camioneros-editar/:id', component: CamionerosFormComponent, canActivate:[GuardpaginaService] },
      { path: 'camiones-editar/:id', component: CamionesFormComponent },
      { path: 'camiones-crear', component: CamionesFormComponent },
      { path: 'login', component: LoginComponent }
    ])
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass:InterceptorService,multi:true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import './vendor';
import { Prueb0AsociadosSharedModule } from 'app/shared/shared.module';
import { Prueb0AsociadosCoreModule } from 'app/core/core.module';
import { Prueb0AsociadosAppRoutingModule } from './app-routing.module';
import { Prueb0AsociadosHomeModule } from './home/home.module';
import { Prueb0AsociadosEntityModule } from './entities/entity.module';
// jhipster-needle-angular-add-module-import JHipster will add new module here
import { MainComponent } from './layouts/main/main.component';
import { NavbarComponent } from './layouts/navbar/navbar.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { PageRibbonComponent } from './layouts/profiles/page-ribbon.component';
import { ActiveMenuDirective } from './layouts/navbar/active-menu.directive';
import { ErrorComponent } from './layouts/error/error.component';

@NgModule({
  imports: [
    BrowserModule,
    Prueb0AsociadosSharedModule,
    Prueb0AsociadosCoreModule,
    Prueb0AsociadosHomeModule,
    // jhipster-needle-angular-add-module JHipster will add new module here
    Prueb0AsociadosEntityModule,
    Prueb0AsociadosAppRoutingModule,
  ],
  declarations: [MainComponent, NavbarComponent, ErrorComponent, PageRibbonComponent, ActiveMenuDirective, FooterComponent],
  bootstrap: [MainComponent],
})
export class Prueb0AsociadosAppModule {}

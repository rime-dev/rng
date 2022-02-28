import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {MatChipsModule} from '@angular/material/chips';
import {HomeRoutingModule} from './home-routing.module';
import {HomeComponent} from './home.component';
import {MatListModule} from '@angular/material/list';
import {MatTooltipModule} from '@angular/material/tooltip';
import {ProjectTypeModule} from '../../../../pipes/project-type/project-type.module';
import {ActiveProjectsComponent} from './components/active-projects/active-projects.component';
import {OtherProjectsComponent} from './components/other-projects/other-projects.component';
import {TranslocoLocaleModule} from '@ngneat/transloco-locale';
import {TranslocoModule} from '@ngneat/transloco';
import {InfoProjectsComponent} from './components/info-projects/info-projects.component';
import {EarningsChartModule} from '../../../../components/earnings-chart/earnings-chart.module';

@NgModule({
  declarations: [
    HomeComponent,
    ActiveProjectsComponent,
    OtherProjectsComponent,
    InfoProjectsComponent,
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatChipsModule,
    MatListModule,
    MatTooltipModule,
    ProjectTypeModule,
    TranslocoLocaleModule,
    TranslocoModule,
    EarningsChartModule,
  ],
})
export class HomeModule {}

import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatChipsModule} from '@angular/material/chips';
import {MatIconModule} from '@angular/material/icon';
import {MatTabsModule} from '@angular/material/tabs';
import {MatTooltipModule} from '@angular/material/tooltip';
import {TranslocoModule} from '@ngneat/transloco';
import {MapModule} from 'apps/demos/services-app/src/app/components/map/map.module';
import {ProjectTypeModule} from 'apps/demos/services-app/src/app/pipes/project-type/project-type.module';
import {ProjectCardComponent} from './components/project-card/project-card.component';
import {ProjectListRoutingModule} from './project-list-routing.module';
import {ProjectListComponent} from './project-list.component';

@NgModule({
  declarations: [ProjectListComponent, ProjectCardComponent],
  imports: [
    CommonModule,
    ProjectListRoutingModule,
    MatButtonModule,
    MatCardModule,
    MatChipsModule,
    MatIconModule,
    MatTabsModule,
    MatTooltipModule,
    ProjectTypeModule,
    TranslocoModule,
    MapModule,
  ],
})
export class ProjectListModule {}

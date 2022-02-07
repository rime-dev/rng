import {Component} from '@angular/core';
import {DataFilter, DataService} from '@rng/data-access/base';
import {EntityState} from '@rng/data-access/base/models/base.model';
import {Project} from 'apps/demos/services-app/src/app/models/project.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';

@Component({
  selector: 'rng-info-projects',
  templateUrl: './info-projects.component.html',
  styleUrls: ['./info-projects.component.scss'],
})
export class InfoProjectsComponent {
  @DataFilter({fieldPath: 'state', opStr: '==', value: 'finished'})
  public finishedProjects$: Observable<EntityState<Project>[]>;

  public finishedProjectsInThisMonth$: Observable<EntityState<Project>[]>;
  public typeOfFinishedProjects: string[] = [];

  constructor(private dataService: DataService) {
    this.finishedProjects$ = this.dataService.select('Project').entities$;
    this.finishedProjectsInThisMonth$ = this.finishedProjects$.pipe(
      tap({
        next: (projects) => this.loadTypesOfFinishedProjects(projects),
      }),
      map((documents: EntityState<Project>[]) =>
        documents ? this.filterFinishedProjectsInThisMonth(documents) : []
      )
    );
  }

  private loadTypesOfFinishedProjects(projects: EntityState<Project>[]) {
    this.typeOfFinishedProjects.push(...projects.map((project) => project.data.type));
    this.typeOfFinishedProjects = [...new Set(this.typeOfFinishedProjects)];
  }

  private filterFinishedProjectsInThisMonth(documents: EntityState<Project>[]) {
    const thisMonth = this.calculateThisMonth();
    const filteredDocuments = documents.filter(
      (project: EntityState<Project>) => project.data.endingDate.slice(0, 7) === thisMonth
    );
    return filteredDocuments;
  }
  private calculateThisMonth(): string {
    const year = new Date().getFullYear();
    const month0 = new Date().getMonth() + 1;
    const month = month0 < 10 ? '0' + month0 : month0;
    return `${year}-${month}`;
  }
}

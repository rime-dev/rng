import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DashboardComponent} from './dashboard.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
      },
      {
        path: 'home',
        loadChildren: () => import('./pages/home/home.module').then((m) => m.HomeModule),
      },
      {
        path: 'projects',
        loadChildren: () =>
          import('./pages/projects/projects.module').then((m) => m.ProjectsModule),
      },

      {
        path: 'invoices',
        loadChildren: () =>
          import('./pages/invoices/invoices.module').then((m) => m.InvoicesModule),
      },
      {
        path: 'management',
        loadChildren: () =>
          import('./pages/management/management.module').then((m) => m.ManagementModule),
      },
      // {
      //   path: 'reports',
      //   loadChildren: () => import('./pages/reports/reports.module').then((m) => m.ReportsModule),
      // },

      {path: '**', redirectTo: 'home'},
    ],
  },
  {path: '**', redirectTo: 'dashboard'},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}

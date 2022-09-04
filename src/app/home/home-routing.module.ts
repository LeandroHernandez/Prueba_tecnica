import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoutesApp } from '../shared/constants';
import { HomeComponent } from './home.component';

const routes: Routes = [
  {
    path: RoutesApp.home,
    children: [
      {
        path: RoutesApp.root,
        component: HomeComponent,
      },
    ],
  },
  { path: RoutesApp.root, redirectTo: RoutesApp.home, pathMatch: 'full' },
  { path: '**', redirectTo: RoutesApp.home, pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}

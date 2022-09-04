import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/guards/auth.guard';
import { RoutesApp } from './shared/constants';

const routes: Routes = [
  {
    path: RoutesApp.auth,
    loadChildren: () => import('./auth').then((m) => m.AuthModule),
  },
  {
    canActivate: [AuthGuard],
    canLoad: [AuthGuard],
    path: RoutesApp.home,
    loadChildren: () => import('./home').then((m) => m.HomeModule),
  },
  {
    canActivate: [AuthGuard],
    canLoad: [AuthGuard],
    path: RoutesApp.profile,
    loadChildren: () => import('./profile').then((m) => m.ProfileModule),
  },
  // {
  //   canActivate: [AuthGuard],
  //   path: RoutesApp.companies,
  //   loadChildren: () => import('./company').then((m) => m.CompanyModule),
  // },
  { path: '**', redirectTo: RoutesApp.home, pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

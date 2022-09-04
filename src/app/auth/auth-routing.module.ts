import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoutesApp } from '../shared/constants';
import { AuthComponent } from './auth.component';

const routes: Routes = [
  {
    path: RoutesApp.sigIn,
    loadChildren: () =>
      import('./components/sign-in').then((m) => m.SignInModule),
  },
  {
    path: RoutesApp.register,
    loadChildren: () =>
      import('./components/sign-up').then((m) => m.SignUpModule),
  },
  // {
  //   canActivate: [AuthGuard],
  //   path: RoutesApp.companies,
  //   loadChildren: () => import('./company').then((m) => m.CompanyModule),
  // },
  { path: '**', redirectTo: RoutesApp.sigIn, pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { RoutesApp } from 'src/app/shared/constants';
import { SignInComponent } from './sign-in.component';
import { ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [{ path: RoutesApp.root, component: SignInComponent }];

@NgModule({
  declarations: [],
  imports: [CommonModule, ReactiveFormsModule, RouterModule.forChild(routes)],
})
export class SignInModule {}

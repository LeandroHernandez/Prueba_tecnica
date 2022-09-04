import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile.component';
import { RouterModule, Routes } from '@angular/router';
import { RoutesApp } from '../shared/constants';
import { ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [{ path: RoutesApp.root, component: ProfileComponent }];

@NgModule({
  declarations: [ProfileComponent],
  imports: [CommonModule, ReactiveFormsModule, RouterModule.forChild(routes)],
})
export class ProfileModule {}

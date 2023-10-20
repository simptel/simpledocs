import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GetStartedComponent } from './get-started/get-started.component';

const routes: Routes = [
  {
    path: 'getting-started',
    component: GetStartedComponent
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'getting-started',
  },
  {
    path: '**',
    redirectTo: 'getting-started',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

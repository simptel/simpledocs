import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageComponent } from './page/page.component';

const routes: Routes = [
  {
    path: 'getting-started',
    component: PageComponent
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
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }

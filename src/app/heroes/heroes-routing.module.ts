import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeroesFormViewComponent } from './views/heroes-form-view/heroes-form-view.component';
import { HeroesListViewComponent } from './views/heroes-list-view/heroes-list-view.component';

const routes: Routes = [
  {
    path: '',
    component: HeroesListViewComponent,
  },
  {
    path: 'new',
    component: HeroesFormViewComponent,
  },
  {
    path: ':id',
    component: HeroesFormViewComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HeroesRoutingModule { }

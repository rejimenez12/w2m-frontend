import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HeroesRoutingModule } from './heroes-routing.module';
import { SharedModule } from '../shared/shared.module';
import { HeroesListViewComponent } from './views/heroes-list-view/heroes-list-view.component';
import { HeroesFormViewComponent } from './views/heroes-form-view/heroes-form-view.component';
import { HeroesGridComponent } from './components/heroes-grid/heroes-grid.component';
import { HeroesFormComponent } from './components/heroes-form/heroes-form.component';
import { HeroesFilterComponent } from './components/heroes-filter/heroes-filter.component';


@NgModule({
  declarations: [
    HeroesListViewComponent,
    HeroesFormViewComponent,
    HeroesGridComponent,
    HeroesFormComponent,
    HeroesFilterComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    HeroesRoutingModule
  ]
})
export class HeroesModule { }

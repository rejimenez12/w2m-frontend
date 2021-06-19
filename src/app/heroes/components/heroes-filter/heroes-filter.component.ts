import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-heroes-filter',
  templateUrl: './heroes-filter.component.html',
  styleUrls: ['./heroes-filter.component.scss']
})
export class HeroesFilterComponent {

  @Output()
  public applyFilter: EventEmitter<string>;
  public heroFilterControl: FormControl;

  constructor() { 
    this.heroFilterControl = new FormControl(null);
    this.applyFilter = new EventEmitter();
  }

  public submitFilter(): void {
    this.applyFilter.emit(this.heroFilterControl.value);
  }

}

import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-heroes-filter',
  templateUrl: './heroes-filter.component.html',
  styleUrls: ['./heroes-filter.component.scss']
})
export class HeroesFilterComponent implements OnInit {

  public heroFilterControl: FormControl;

  constructor() { 
    this.heroFilterControl = new FormControl(null);
  }

  ngOnInit(): void {
  }

  public searchHeroes(): void {
  }

}

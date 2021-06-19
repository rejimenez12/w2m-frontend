import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeroesListViewComponent } from './heroes-list-view.component';

describe('HeroesListViewComponent', () => {
  let component: HeroesListViewComponent;
  let fixture: ComponentFixture<HeroesListViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeroesListViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeroesListViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

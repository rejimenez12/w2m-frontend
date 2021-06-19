import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeroesFormViewComponent } from './heroes-form-view.component';

describe('HeroesFormViewComponent', () => {
  let component: HeroesFormViewComponent;
  let fixture: ComponentFixture<HeroesFormViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeroesFormViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeroesFormViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

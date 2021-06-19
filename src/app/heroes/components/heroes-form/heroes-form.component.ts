import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { IHero } from '../../models/hero.model';

@Component({
  selector: 'app-heroes-form',
  templateUrl: './heroes-form.component.html',
  styleUrls: ['./heroes-form.component.scss']
})
export class HeroesFormComponent implements OnInit {

  @Input()
  public heroForm: FormGroup;
  @Input()
  public heroId$: BehaviorSubject<number>;
  @Output()
  public submitEmitter: EventEmitter<number>;
  private heroId: number;

  constructor(private router: Router) { 
    this.submitEmitter = new EventEmitter();
    this.heroId = null;
  }

  ngOnInit(): void {
  }

  public buttonDescription(heroId: number): string {
    this.heroId = heroId;
    return heroId ? 'Editar' : 'Crear';
  }

  public submitForm(): void {
    (this.heroId) ? this.submitEmitter.emit(null) : this.submitEmitter.emit(this.heroId);;
  }
  
  public cancel(): void {
    this.heroForm.patchValue(null);
    this.router.navigate(['/heroes']);

  }

}

import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { ErrorMessages } from '../../validations/error-messages';

@Component({
  selector: 'app-heroes-form',
  templateUrl: './heroes-form.component.html',
  styleUrls: ['./heroes-form.component.scss']
})
export class HeroesFormComponent {

  private heroId: number;
  @Input()
  public heroForm: FormGroup;
  @Input()
  public heroId$: BehaviorSubject<number>;
  @Input()
  public errorMessages: ErrorMessages;
  @Output()
  public submitEmitter: EventEmitter<number>;

  constructor(private router: Router) { 
    this.submitEmitter = new EventEmitter();
    this.heroId = null;
  }

  public buttonDescription(heroId: number): string {
    this.heroId = heroId;
    return heroId ? 'Editar' : 'Crear';
  }

  public submitForm(): void {
    (this.heroId) ? this.submitEmitter.emit(this.heroId) : this.submitEmitter.emit(null);;
  }
  
  public cancel(): void {
    this.heroForm.patchValue(null);
    this.router.navigate(['/heroes']);
  }

}

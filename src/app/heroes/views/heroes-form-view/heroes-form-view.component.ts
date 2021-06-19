import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { IHero } from '../../models/hero.model';
import { HeroesService } from '../../services/heroes.service';
import { ErrorMessages } from '../../validations/error-messages';
import { HeroesValidation } from '../../validations/heroes-validations';

@Component({
  selector: 'app-heroes-form-view',
  templateUrl: './heroes-form-view.component.html',
  styleUrls: ['./heroes-form-view.component.scss']
})
export class HeroesFormViewComponent implements OnInit {

  public heroForm: FormGroup;
  public heroesValidation: HeroesValidation;
  public heroId$: BehaviorSubject<number>;
  public errorMessages: ErrorMessages;

  constructor(private fb: FormBuilder,
              private route: ActivatedRoute,
              private heroesService: HeroesService,
              private router: Router) {
    this.heroId$ = new BehaviorSubject<number>(null);
    this.heroesValidation = new HeroesValidation(this.fb);
  }

  public ngOnInit(): void {
    this.heroForm = this.heroesValidation.toFormGroup();
    this.errorMessages = new ErrorMessages(this.heroForm);
    this.getHeroId();
  }

  private getHeroId(): void {
    this.route.params.subscribe((params: Params) => {
      if (params.id) {
        this.heroesService.getHero(params.id).subscribe((hero: IHero) => {
          this.heroForm.patchValue(hero);
          this.heroId$.next(params.id);
        });
      }
    });
  }

  public submit(heroId: number): void {
    if (heroId) {
      const updateHero = {
        ... this.heroForm.value,
        id: heroId,
      } as IHero; 
      this.heroesService.editHero(updateHero).subscribe((hero: IHero) => {
        this.router.navigate(['/heroes']);
      });
    } else {
      this.heroesService.createHero({...this.heroForm.value} as IHero).subscribe((hero: IHero) => {
        this.router.navigate(['/heroes']);
      });
    }
    
  }

}

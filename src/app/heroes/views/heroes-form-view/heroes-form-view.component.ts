import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { BehaviorSubject, of, Subject } from 'rxjs';
import { mergeMap, takeUntil } from 'rxjs/operators';
import { IHero } from '../../models/hero.model';
import { HeroesService } from '../../services/heroes.service';
import { ErrorMessages } from '../../validations/error-messages';
import { HeroesValidation } from '../../validations/heroes-validations';

@Component({
  selector: 'app-heroes-form-view',
  templateUrl: './heroes-form-view.component.html',
  styleUrls: ['./heroes-form-view.component.scss']
})
export class HeroesFormViewComponent implements OnInit, OnDestroy {
  private unsubscribe: Subject<void>;
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
    this.unsubscribe = new Subject();
  }

  public ngOnInit(): void {
    this.heroForm = this.heroesValidation.toFormGroup();
    this.errorMessages = new ErrorMessages(this.heroForm);
    this.getHeroId();
  }

  private create(): void {
    this.heroesService.createHero({...this.heroForm.value} as IHero).subscribe((hero: IHero) => {
      if (hero) {
        this.router.navigate(['/heroes']);
      }
    });
  }

  private update(heroId: number): void {
    const updateHero = {
      ... this.heroForm.value,
      id: heroId,
    } as IHero;

    this.heroesService.editHero(updateHero).subscribe((hero: IHero) => {
      if (hero) {
        this.router.navigate(['/heroes']);
      }
    });
  }

  private getHeroId(): void {
    this.route.params.pipe(
      takeUntil(this.unsubscribe),
      mergeMap((params: Params) => {
        if (params.id) {
          this.heroId$.next(params.id);
          return this.heroesService.getHero(params.id)
        }
        return of();
      })).subscribe((hero: IHero) => {
        this.heroForm.patchValue(hero);
      });
  }

  public submit(heroId: number): void {
    if (heroId) {
      this.update(heroId);
    } else {
      this.create();
    }
  }

  public ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}

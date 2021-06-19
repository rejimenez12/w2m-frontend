import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { IHero } from '../../models/hero.model';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-heroes-form-view',
  templateUrl: './heroes-form-view.component.html',
  styleUrls: ['./heroes-form-view.component.scss']
})
export class HeroesFormViewComponent implements OnInit {

  public heroForm: FormGroup;
  public heroId$: BehaviorSubject<number>;

  constructor(private fb: FormBuilder,
              private route: ActivatedRoute,
              private heroesService: HeroesService,
              private router: Router) {
    this.heroId$ = new BehaviorSubject<number>(null);
  }

  ngOnInit(): void {
    this.heroForm = this.validationForm;
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

  private get validationForm(): FormGroup {
    return this.fb.group({
      name: [null],
      lastname: [null],
      email: [null],
      bio: [null], 
      image: ['assets/img/user-profile.png'],
      appearance: [null],
      business: [null],
    });
  }

  public submit(heroId: number): void {
    console.log(heroId);
    if (heroId) {
      this.heroesService.editHero({...this.heroForm.value} as IHero).subscribe((hero: IHero) => {
        console.log(hero);
        this.router.navigate(['/heroes']);
      });
    } else {
      this.heroesService.createHero({...this.heroForm.value} as IHero).subscribe((hero: IHero) => {
        console.log(hero);
        this.router.navigate(['/heroes']);
      });
    }
    
  }

}

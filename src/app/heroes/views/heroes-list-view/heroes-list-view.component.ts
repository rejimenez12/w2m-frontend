import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { HeroesModalComponent } from '../../components/heroes-modal/heroes-modal.component';
import { IHero } from '../../models/hero.model';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-heroes-list-view',
  templateUrl: './heroes-list-view.component.html',
  styleUrls: ['./heroes-list-view.component.scss']
})
export class HeroesListViewComponent implements OnInit {

  private unsubscribe: Subject<void>;
  public displayedColumns: string[];
  public dataSource: MatTableDataSource<IHero>;
  public loadingHeroes$: Subject<void>;

  constructor(private heroesService: HeroesService,
              private router: Router,
              private dialog: MatDialog) {
    this.unsubscribe = new Subject();
    this.displayedColumns = ['id', 'image', 'name', 'email', 'business', 'appearance', 'bio', 'buttons'];
    this.dataSource = new MatTableDataSource(null);
    this.dataSource.paginator = null;
    this.loadingHeroes$ = new Subject();
  }

  public ngOnInit(): void {
    this.getHeroes();
  }

  private getHeroes(): void {
    this.heroesService.getHeroes()
      .pipe(takeUntil(this.unsubscribe))
      .subscribe((heroes: IHero[]) => {
        this.dataSource.data = heroes;
        this.loadingHeroes$.next(); 
      });
  }

  public addHero(): void {
    this.router.navigate(['heroes/new']);
  }

  public applyFilter(filterValue: string): void {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  public deleteHero(heroId: number): void {
    const dialogRef = this.dialog.open(HeroesModalComponent);

    dialogRef.componentInstance.onSaveEvent.subscribe(() => {
      this.heroesService.deleteHero(heroId).subscribe((hero: IHero) => {
        this.router.navigate(['heroes']);
      });
    });
  }

  public ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

}

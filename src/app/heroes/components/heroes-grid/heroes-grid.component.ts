import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { IHero } from '../../models/hero.model';

@Component({
  selector: 'app-heroes-grid',
  templateUrl: './heroes-grid.component.html',
  styleUrls: ['./heroes-grid.component.scss']
})
export class HeroesGridComponent implements OnInit, OnDestroy {
  private unsubscribe: Subject<void>;
  @Input()
  public dataSource: MatTableDataSource<IHero>;
  @Input()
  public displayedColumns: string[];
  @Input()
  public loadingHeroes$: Subject<void>;
  @ViewChild(MatPaginator) 
  public paginator: MatPaginator;
  @Output()
  public deleteEmitter: EventEmitter<number>;

  constructor(private router: Router) {
    this.unsubscribe = new Subject();
    this.deleteEmitter = new EventEmitter<number>();
  }

  public ngOnInit(): void {
    this.loadingHeroes();
  }

  private loadingHeroes(): void {
    this.loadingHeroes$.pipe(takeUntil(this.unsubscribe)).subscribe(() => {
      this.dataSource.paginator = this.paginator;
    });
  }

  public editHero(idHero: number): void {
    this.router.navigate([ `heroes/${idHero}`]);
  }

  public deleteHero(idHero: number): void {
    this.deleteEmitter.emit(idHero);
  }

  public ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

}

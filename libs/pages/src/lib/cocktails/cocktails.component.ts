import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import {
  Alphabeth,
  CocktailApiService,
  Drink,
} from '@ngx-cocktail-view-animations/cocktail-api';
import {
  CleanUrlPipe,
  LetDirective,
} from '@ngx-cocktail-view-animations/shared/utils';
import {
  TransitionNameDirective,
  RepeatedTransitionContainerDirective,
} from '@ngx-cocktail-view-animations2/shared/transition';
import {
  BehaviorSubject,
  Observable,
  catchError,
  of,
  skip,
  startWith,
  switchMap,
} from 'rxjs';

@Component({
  selector: 'ngx-cocktail-view-animations-cocktails',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    CleanUrlPipe,
    TransitionNameDirective,
    RepeatedTransitionContainerDirective,
    LetDirective,
  ],
  templateUrl: './cocktails.component.html',
  styleUrls: ['./cocktails.component.scss'],
})
export default class CocktailsComponent {
  readonly initiallyActivatedRoute = inject(ActivatedRoute).snapshot;
  readonly cocktailApiService = inject(CocktailApiService);

  readonly alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('') as Alphabeth[];
  readonly letter$ = new BehaviorSubject<Alphabeth>(
    this.initiallyActivatedRoute.queryParams['letter'] || 'A'
  );

  readonly items$: Observable<Drink[]> = this.letter$.pipe(
    skip(1), // skip the initial one
    switchMap((letter) =>
      this.cocktailApiService.listCocktailsByFirstLetter(letter).pipe(
        catchError(() => {
          // TODO: add feedback logic
          return of([]);
        })
      )
    ),
    startWith(this.initiallyActivatedRoute.data['items'])
  );

  chooseLetter(letter: Alphabeth) {
    this.letter$.next(letter);
  }
}

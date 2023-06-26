import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CocktailApiService } from '@ngx-cocktail-view-animations/cocktail-api';
import { CleanUrlPipe } from '@ngx-cocktail-view-animations/shared/utils';
import {
  RepeatedTransitionContainerDirective,
  TransitionNameDirective,
} from '@ngx-cocktail-view-animations2/shared/transition';

@Component({
  selector: 'ngx-cocktail-view-animations-home',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    CleanUrlPipe,
    TransitionNameDirective,
    RepeatedTransitionContainerDirective,
  ],
  templateUrl: './home.component.html',
  styles: [],
})
export default class HomeComponent {
  private readonly resolveData = inject(ActivatedRoute).snapshot.data;
  readonly randomCocktails = [
    this.resolveData['cocktail1'],
    this.resolveData['cocktail2'],
    this.resolveData['cocktail3'],
    this.resolveData['cocktail4'],
  ];
}

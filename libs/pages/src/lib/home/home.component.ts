import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CocktailApiService } from '@ngx-cocktail-view-animations/cocktail-api';
import { CleanUrlPipe } from '@ngx-cocktail-view-animations/shared/utils';
import { TransitionNameDirective } from '@ngx-cocktail-view-animations2/shared/transition';

@Component({
  selector: 'ngx-cocktail-view-animations-home',
  standalone: true,
  imports: [CommonModule, RouterLink, CleanUrlPipe, TransitionNameDirective],
  templateUrl: './home.component.html',
  styles: [],
})
export default class HomeComponent {
  private readonly cocktailApiService = inject(CocktailApiService);
  readonly randomCocktail$ = this.cocktailApiService.getRandomCocktail();
}

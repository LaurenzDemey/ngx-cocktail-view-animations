import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Drink } from '@ngx-cocktail-view-animations/cocktail-api';
import { ActivatedRoute } from '@angular/router';
import {
  CleanUrlPipe,
  LetDirective,
} from '@ngx-cocktail-view-animations/shared/utils';
import { TransitionNameDirective } from '@ngx-cocktail-view-animations2/shared/transition';

@Component({
  selector: 'ngx-cocktail-view-animations-cocktails-detail',
  standalone: true,
  imports: [CommonModule, CleanUrlPipe, TransitionNameDirective, LetDirective],
  templateUrl: './cocktails-detail.component.html',
  styles: [],
})
export default class CocktailsDetailComponent {
  readonly detail: Drink = inject(ActivatedRoute).snapshot.data['detail'];
}

import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CocktailsResponse } from './dto/cocktails-response.dto';
import { CocktailsFilteredListResponse } from './dto/cocktails-filtered-list-response.dto';
import { IngredientsResponse } from './dto/ingredients-response.dto';

type Alphabeth =
  | 'a'
  | 'b'
  | 'c'
  | 'd'
  | 'e'
  | 'f'
  | 'g'
  | 'h'
  | 'i'
  | 'j'
  | 'k'
  | 'l'
  | 'm'
  | 'n'
  | 'o'
  | 'p'
  | 'q'
  | 'r'
  | 's'
  | 't'
  | 'u'
  | 'v'
  | 'w'
  | 'x'
  | 'y'
  | 'z';

@Injectable({ providedIn: 'root' })
export class CocktailApiService {
  private readonly httpClient = inject(HttpClient);

  // TODO: use the license + make configurable
  private readonly baseUrl = 'www.thecocktaildb.com/api/json/v1/1/';

  // Cocktails
  searchCocktailsByName(name: string) {
    return this.httpClient.get<CocktailsResponse>(
      `${this.baseUrl}search.php?s=${name}`
    );
  }

  listCocktailsByFirstLetter(firstLetter: Alphabeth) {
    return this.httpClient.get<CocktailsResponse>(
      `${this.baseUrl}search.php?f=${firstLetter}`
    );
  }

  getCocktailDetail(id: number) {
    return this.httpClient.get<CocktailsResponse>(
      `${this.baseUrl}lookup.php?i=${id}`
    );
  }

  getRandomCocktail() {
    return this.httpClient.get<CocktailsResponse>(`${this.baseUrl}random.php`);
  }

  getCocktailsByIngredient(ingredientName: string) {
    return this.httpClient.get<CocktailsFilteredListResponse>(
      `${this.baseUrl}filter.php?i=${ingredientName}`
    );
  }

  getCocktailsByAlcohol(
    alcoholOrNot: 'Alcoholic' | 'Non_Alcoholic' | 'Optional_alcohol'
  ) {
    return this.httpClient.get<CocktailsFilteredListResponse>(
      `${this.baseUrl}filter.php?a=${alcoholOrNot}`
    );
  }

  getCocktailsByCategory(category: string) {
    return this.httpClient.get<CocktailsFilteredListResponse>(
      `${this.baseUrl}filter.php?c=${category}`
    );
  }
  getCocktailsByGlass(glass: string) {
    return this.httpClient.get<CocktailsFilteredListResponse>(
      `${this.baseUrl}filter.php?g=${glass}`
    );
  }

  // Ingredients
  listAllIngredients() {
    return this.httpClient.get<CocktailsResponse>(
      `${this.baseUrl}list.php?i=list`
    );
  }

  searchIngredientByName(name: string) {
    return this.httpClient.get<IngredientsResponse>(
      `${this.baseUrl}search.php?i=${name}`
    );
  }

  getIngredientDetail(id: number) {
    return this.httpClient.get<IngredientsResponse>(
      `${this.baseUrl}lookup.php?iid=${id}`
    );
  }
}

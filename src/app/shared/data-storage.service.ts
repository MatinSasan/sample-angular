import { AuthService } from './../auth/auth.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { RecipeService } from '../recipes/recipe.service';
import { databaseURL } from 'src/environments/keys';
import { Recipe } from '../recipes/recipe.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {
  constructor(
    private httpClient: HttpClient,
    private recipeService: RecipeService,
    private authService: AuthService
  ) {}

  storeRecipes() {
    return this.httpClient.put(
      `${databaseURL}/recipes.json`,
      this.recipeService.getRecipes(),
      { observe: 'body' }
    );
  }

  getRecipes() {
    this.httpClient
      .get<Recipe[]>(`${databaseURL}/recipes.json`, {
        observe: 'body',
        responseType: 'json'
      })
      .pipe(
        map(recipes => {
          for (const recipe of recipes) {
            if (!recipe.ingredients) {
              recipe.ingredients = [];
            }
          }
          return recipes;
        })
      )
      .subscribe((recipes: Recipe[]) => {
        this.recipeService.setRecipes(recipes);
      });
  }
}

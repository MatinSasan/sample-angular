import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { RecipeService } from '../recipes/recipe.service';
import { databaseURL } from 'src/environments/keys';
import { Recipe } from '../recipes/recipe.model';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {
  constructor(private http: Http, private recipeService: RecipeService) {}

  storeRecipes() {
    const headers = new Headers({ 'Access-Control-Allow-Origin': '*' });

    return this.http.put(
      `${databaseURL}/recipes.json`,
      this.recipeService.getRecipes(),
      { headers }
    );
  }

  getRecipes() {
    this.http.get(`${databaseURL}/recipes.json`).subscribe((res: Response) => {
      const recipes: Recipe[] = res.json();
      this.recipeService.setRecipes(recipes);
    });
  }
}

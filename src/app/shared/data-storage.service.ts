import { AuthService } from './../auth/auth.service';
import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { RecipeService } from '../recipes/recipe.service';
import { databaseURL } from 'src/environments/keys';
import { Recipe } from '../recipes/recipe.model';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {
  constructor(
    private http: Http,
    private recipeService: RecipeService,
    private authService: AuthService
  ) {}

  storeRecipes() {
    const headers = new Headers({ 'Access-Control-Allow-Origin': '*' });
    const token = this.authService.getIdToken();

    return this.http.put(
      `${databaseURL}/recipes.json?auth=${token}`,
      this.recipeService.getRecipes(),
      { headers }
    );
  }

  getRecipes() {
    const token = this.authService.getIdToken();

    this.http
      .get(`${databaseURL}/recipes.json?auth=${token}`)
      .subscribe((res: Response) => {
        const recipes: Recipe[] = res.json();
        this.recipeService.setRecipes(recipes);
      });
  }
}

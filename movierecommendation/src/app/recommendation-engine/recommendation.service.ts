import { Injectable } from '@angular/core';
import { UserPreferences } from './user-preferences.model';


@Injectable({
  providedIn: 'root', 
})
export class RecommendationService {
  private userPreferences: UserPreferences | null = null;

  private movies = [
    { title: 'Million Dollar Baby', genre: 'Drama', director: 'Clint Eastwood' },
    { title: 'Gran Torino', genre: 'Drama', director: 'Clint Eastwood' },
    { title: 'The Dark Knight', genre: 'Action', director: 'Christopher Nolan' },
    { title: "She's gotta have it", genre: 'Comedy', director: 'Spike Lee' },
    { title: 'Inception', genre: 'Action', director: 'Christopher Nolan' },
    { title: 'Pulp Fiction', genre: 'Drama', director: 'Quentin Tarantino' },
    { title: 'Kill Bill', genre: 'Action', director: 'Quentin Tarantino' },
    { title: 'Lady Bird', genre: 'Drama', director: 'Greta Gerwig' },
    { title: 'Little Women', genre: 'Drama', director: 'Greta Gerwig' },
    { title: 'The Irishman', genre: 'Drama', director: 'Martin Scorsese' }
  ];

  saveUserPreferences(preferences: UserPreferences) {
    this.userPreferences = preferences;
  }

  getRecommendations(preferences: UserPreferences) {
    return this.movies.filter(movie => 
      movie.genre === preferences.genre || movie.director === preferences.director
    );
  }

  updateUserPreferences(preferences: UserPreferences) {
    this.userPreferences = preferences;
  }

  deleteUserPreferences() {
    this.userPreferences = null;
  }
}

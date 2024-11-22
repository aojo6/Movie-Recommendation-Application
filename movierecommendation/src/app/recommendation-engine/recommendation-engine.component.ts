import { Component } from '@angular/core';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RecommendationService } from './recommendation.service';


@Component({
  selector: 'app-recommendation-engine',
  standalone: true,
  imports: [
    FormsModule, 
    HttpClientModule, 
    CommonModule,
    MatMenuModule,
    MatButtonModule,
    RouterModule],
    templateUrl: './recommendation-engine.component.html',
    styleUrls: ['./recommendation-engine.component.css']
})

export class RecommendationEngineComponent {
  genres = ['Action', 'Drama', 'Comedy', 'Horror', 'Sports Drama'];
  directors = ['Clint Eastwood', 'Christopher Nolan', 'Martin Scorsese', 'Quentin Tarantino', 'Spike Lee', 'Greta Gerwig']; 
  recommendations: any[] = [];
  userPreferences = { genre: '', director: '' };
  notificationMessage: string = ''; 

  constructor(private recommendationService: RecommendationService) {} 

  onSubmit() {
    this.recommendationService.saveUserPreferences(this.userPreferences);
    this.recommendations = this.recommendationService.getRecommendations(this.userPreferences);
  }

  savePreferences(): void {
    this.recommendationService.saveUserPreferences(this.userPreferences);
    this.recommendations = this.recommendationService.getRecommendations(this.userPreferences);
    this.notificationMessage = 'Preferences saved'; // Set notification message
  }

  updatePreferences(): void {
    this.recommendationService.updateUserPreferences(this.userPreferences);
    this.notificationMessage = 'Preferences updated'; 
  }

  getRecommendations(): void {
    this.recommendations = this.recommendationService.getRecommendations(this.userPreferences);
  }

  deletePreferences(): void {
    this.recommendationService.deleteUserPreferences();
    this.userPreferences = { genre: '', director: '' }; 
    this.recommendations = []; 
    this.notificationMessage = 'Preferences deleted'; 
  }
}
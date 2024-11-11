import { Component } from '@angular/core';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-recommendation-engine',
  standalone: true,
  imports: [
    FormsModule, 
    HttpClientModule, 
    CommonModule,
    MatMenuModule,
    MatButtonModule,
    RouterModule 
  ],
  templateUrl: './recommendation-engine.component.html',
  styleUrl: './recommendation-engine.component.css'
})
export class RecommendationEngineComponent {

}

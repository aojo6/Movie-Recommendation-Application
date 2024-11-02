// src/app/trailer/trailer.component.ts
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MovierecService } from '../movierec.service';

@Component({
  selector: 'app-trailer',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './trailer.component.html',
  styleUrls: ['./trailer.component.css']
})
export class TrailerComponent {
  trailers: any[] = [];
  movieId = ''; // stores movie id
  newTrailerLink = ''; 
  trailerExists = false;

  constructor(private movierecService: MovierecService) {}

  // Search for YouTube trailers
  searchTrailers(query: string): void {
    this.movierecService.searchTrailers(query).subscribe((response) => {
      this.trailers = response.items; 
      console.log(this.trailers);
    });
  }

  // Adds a new trailer link
  addTrailer(): void {
    this.movierecService.addTrailerLink(this.movieId, this.newTrailerLink).subscribe(() => {
      alert('Trailer link added successfully');
      this.trailerExists = true;
      this.clearFields();
      this.refreshTrailers();
    });
  }

  // Update an existing trailer link
  updateTrailer(): void {
    this.movierecService.updateTrailerLink(this.movieId, this.newTrailerLink).subscribe(() => {
      alert('Trailer link updated successfully');
      this.clearFields();
      this.refreshTrailers();
    });
  }

  // Delete a trailer link
  deleteTrailer(): void {
    this.movierecService.deleteTrailerLink(this.movieId).subscribe(() => {
      alert('Trailer link deleted');
      this.trailerExists = false;
      this.clearFields();
      this.refreshTrailers();
    });
  }

  // Optionally refresh the list of trailers after an operation
  refreshTrailers(): void {
    this.movierecService.getTrailers().subscribe((trailers) => {
      this.trailers = trailers;
    });
  }

  // Clear the form fields after an operation
  clearFields(): void {
    this.movieId = '';
    this.newTrailerLink = '';
  }
}

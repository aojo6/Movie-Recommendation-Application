import { Component, OnInit } from '@angular/core';
import { TrailerService } from './trailer.service';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-trailer',
  standalone: true,
  imports: [
    FormsModule,
    HttpClientModule,
    CommonModule,
    MatMenuModule,
    MatButtonModule,
    RouterModule,
    
  ],
  providers: [TrailerService],
  templateUrl: './trailer.component.html',
  styleUrls: ['./trailer.component.css']
})
export class TrailerComponent implements OnInit {
  trailers: any[] = [];  // YouTube search results
  savedTrailers: any[] = [];  // Saved trailers from backend
  trailerExists = false; // To track if trailers exist
  editingTrailer: any = null; // Variable to store the trailer being edited

  constructor(private trailerService: TrailerService) {}
  ngOnInit(): void { // Use ngOnInit for initializing
    this.loadSavedTrailers();
  }

  // Search for YouTube trailers
  searchTrailers(query: string): void {
    if (!query.trim()) {
      this.trailers = []; // Clear trailers if query is empty
      this.trailerExists = false; // No trailers available
      return;
    }
  
    // Call to YouTube API
    this.trailerService.searchTrailers(query).subscribe(
      (response) => {
        // Update trailers array and trailerExists flag
        this.trailers = response.items || []; // Ensure it defaults to an empty array if no items found
        this.trailerExists = this.trailers.length > 0; // Set trailerExists based on the length of the trailers array
      },
      (error) => {
        console.error('Error fetching trailers:', error);
        this.trailers = []; // Clear trailers in case of error
        this.trailerExists = false; // No trailers available if there's an error
      }
    );
  }

  // Add trailer link to backend and update saved trailers
  addTrailer(trailer: any): void {
    const trailerData = {
      movie_Name: trailer.snippet.title,
      genres: 'Unknown',
      Year: 'Unknown',
      author: trailer.snippet.channelTitle,
      Ratings: 'N/A',
      trailerLink: `https://www.youtube.com/watch?v=${trailer.id.videoId}`,
    };

    this.trailerService.addTrailerLink(trailerData).subscribe(() => {
      alert('Trailer link added successfully');
      this.loadSavedTrailers();
    });
  }

  // Load saved trailers from backend
  loadSavedTrailers(): void {
    this.trailerService.getTrailers().subscribe((trailers) => {
      this.savedTrailers = trailers;
      //console.log("Updated saved trailers from backend:", this.savedTrailers);
    });
  }

  // Edit a saved trailer
  editTrailer(trailer: any): void {
    this.editingTrailer = { ...trailer };
  }

saveTrailer(trailer: any): void {
  const updatedTrailerData = {
    movie_Name: trailer.movie_Name,
    genres: trailer.genres,
    Year: trailer.Year,
    author: trailer.author,
    Ratings: trailer.Ratings,
    trailerLink: trailer.trailerLink,
  };

  this.trailerService.updateTrailerLink(trailer._id, updatedTrailerData).subscribe(() => {
    console.log('Trailer updated successfully'); // Logs update
    this.loadSavedTrailers(); // Refresh saved trailers
    this.editingTrailer = null;
  });
}


  cancelEdit(): void {
    this.editingTrailer = null;
  }

  deleteTrailer(trailerId: string): void {
    this.trailerService.deleteTrailerLink(trailerId).subscribe(() => {
      alert('Trailer deleted successfully');
      this.loadSavedTrailers();
    });
  }
}

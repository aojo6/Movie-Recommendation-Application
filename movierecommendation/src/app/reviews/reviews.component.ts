import { Component } from '@angular/core';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormGroup } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { Validators } from '@angular/forms';
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-reviews',
  standalone: true,
  imports: [
    FormsModule, 
    HttpClientModule, 
    ReactiveFormsModule,
    CommonModule,
    MatMenuModule,
    MatButtonModule,
    RouterModule 
  ],
  templateUrl: './reviews.component.html',
  styleUrl: './reviews.component.css'
})

export class ReviewsComponent implements OnInit{
  formName = 'Ratings and Reviews';
  projectForm!: FormGroup;
  ReviewsList: any[] = [];

  constructor(private formBuilder: FormBuilder) {
  }

ngOnInit(): void {
this.projectForm = this.formBuilder.group({
  username: ['', Validators.required],
  movie: ['', Validators.required],
  rating: ['', Validators.required],
  review: ['', Validators.required],
  });
  
}
 
onSubmit(){
  if (this.projectForm.valid){
  console.warn("Form Submitted: ", this.projectForm.value);
  const ReviewEntry= {...this.projectForm.value };
  this.ReviewsList.push(ReviewEntry);
  this.projectForm.reset({
    username: '',
    movie: '',
    rating: null,
    review: ''
  });
  alert('Review Added Successfully!');
}
  else { alert('Review Not Added. Please Try Again.');
  }
}

retrieveEntry(){
  const username = this.projectForm.get('username')?.value;
  const movie = this.projectForm.get('movie')?.value;

  const ReviewExists = this.ReviewsList.find(review => review.username === 
    username && review.movie === movie);

  if (ReviewExists) {
  this.projectForm.patchValue({
    username: ReviewExists.username,
    movie: ReviewExists.movie,
    rating: ReviewExists.rating,
    review: ReviewExists.review
  });
  }

  else {
    alert('No Review Found.');
  }
};

updateEntry() {
  const username = this.projectForm.get('username')?.value;
  const movie = this.projectForm.get ('movie')?.value;
  const ReviewExists = this.ReviewsList.find(review => review.username === 
    username && review.movie === movie);
    
  if (ReviewExists){
    ReviewExists.rating = this.projectForm.get('rating')?.value;
    ReviewExists.review = this.projectForm.get('review')?.value;
    alert("Update Successful!")
    this.projectForm.reset({
      username: '',
      movie: '',
      rating: null,
      review: ''
    });
  }
}


deleteEntry(){
  const username = this.projectForm.get('username')?.value;
  const movie = this.projectForm.get('movie')?.value;

  const index = this.ReviewsList.findIndex(review => review.username ===
    username && review.movie === movie);

  if (index !== -1) {
    this.ReviewsList.splice(index, 1);
    this.projectForm.reset({
      username: '',
      movie: '',
      rating: null,
      review: ''
      });
    alert("Review Entry Deleted!")
    }
}

resetEntry(){
  this.projectForm.reset({
    username: '',
    movie: '',
    rating: null,
    review: ''
  });
}
}

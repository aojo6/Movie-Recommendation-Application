import { Component, OnInit } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { StudentService } from '../student.service';
import { Router } from '@angular/router';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-student-form',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule
  ],
  templateUrl: './moviedb.component.html',
  styleUrls: ['./moviedb.component.css']
})
export class StudentFormComponent implements OnInit {
  public mode = 'Add'; // Default mode
  private id: any; // Student ID
  private student: any;

  // Form group initialization
  studentForm = new FormGroup({
    movie_Name: new FormControl(''),
    genres: new FormControl(''),
    Year: new FormControl(''),
    author: new FormControl(''),
    Ratings: new FormControl('')
  });

  // Initialize the call using StudentService 
  constructor(private _myService: StudentService, private router: Router, public route: ActivatedRoute) {}

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('_id')) {
        this.mode = 'Edit'; // Request had a parameter _id
        this.id = paramMap.get('_id');

        // Request student info based on the ID
        this._myService.getStudent(this.id).subscribe({
          next: (data => {
            this.student = data;
            // Populate form fields
            this.studentForm.patchValue({
              movie_Name: this.student.movie_Name,
              genres: this.student.genres,
              Year: this.student.Year,
              author: this.student.author,
              Ratings: this.student.Ratings
            });
          }),
          error: (err => console.error(err)),
          complete: (() => console.log('Finished loading'))
        });
      } else {
        this.mode = 'Add';
        this.id = null;
      }
    });
  }

  onSubmit() {
    let movie_Name = this.studentForm.get('movie_Name')?.value ?? "";
    let genres = this.studentForm.get('genres')?.value ?? "";
    let Year = this.studentForm.get('Year')?.value ?? "";
    let author = this.studentForm.get('author')?.value ?? "";
    let Ratings = this.studentForm.get('Ratings')?.value ?? "";
    console.log("You submitted: " + movie_Name + " " + genres + " " + Year + " " + author + " " + Ratings);

    if (this.mode === 'Add') {
      this._myService.addStudents(movie_Name, genres, Year, author, Ratings);
    } else if (this.mode === 'Edit') {
      this._myService.updateStudent(this.id, movie_Name, genres, Year, author, Ratings);
    }

    this.router.navigate(['/recommendation-engine']); // Navigate after submission
  }
}

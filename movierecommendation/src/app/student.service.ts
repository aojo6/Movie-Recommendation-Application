import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'  // Makes this service available application-wide
})
export class StudentService {

  constructor(private http: HttpClient) {}

  // Methods remain the same
  getStudents() {
    return this.http.get('http://localhost:8000/students');
  }

  addStudents(movie_Name: string, genres: string, Year: string, author: string, Ratings: string) {
    this.http.post('http://localhost:8000/students', { movie_Name, genres, Year, author, Ratings })
      .subscribe((responseData) => {
        console.log(responseData);
      }); 
    location.reload();
  }

  deleteStudent(studentId: string) {
    this.http.delete("http://localhost:8000/students/" + studentId)
      .subscribe(() => {
        console.log('Deleted: ' + studentId);
      });
    location.reload();
  }

  updateStudent(studentId: string, movie_Name: string, genres: string, Year: string, author: string, Ratings: string) {
    this.http.put("http://localhost:8000/students/" + studentId, { movie_Name, genres, Year, author, Ratings })
      .subscribe(() => {
        console.log('Updated: ' + studentId);
      });
  }

  getStudent(studentId: string) {
    return this.http.get('http://localhost:8000/students/' + studentId);
  }
}

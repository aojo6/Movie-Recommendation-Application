import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { TrailerComponent } from './trailer/trailer.component';
import { ReviewsComponent } from './reviews/reviews.component';
import { RecommendationEngineComponent } from './recommendation-engine/recommendation-engine.component';
import { provideHttpClient } from '@angular/common/http';
import { StudentFormComponent } from './student-form/student-form.component';
import { ListStudentsComponent } from './list-students/list-students.component';


export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'trailer', component: TrailerComponent },
  { path: 'reviews', component: ReviewsComponent },
  { path: 'recommendation', component: RecommendationEngineComponent },
  { path: 'student-form', component: StudentFormComponent },
  { path: 'list-students', component: ListStudentsComponent},
  
  { path: '**', redirectTo: '' },
];

export const APP_PROVIDERS = [
  provideHttpClient()
];


















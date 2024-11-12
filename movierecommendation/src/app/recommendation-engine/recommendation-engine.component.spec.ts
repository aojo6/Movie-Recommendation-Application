import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieRecommendationEngineComponent } from './recommendation-engine.component';

describe('MovieRecommendationEngineComponent', () => {
  let component: MovieRecommendationEngineComponent;
  let fixture: ComponentFixture<MovieRecommendationEngineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MovieRecommendationEngineComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MovieRecommendationEngineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

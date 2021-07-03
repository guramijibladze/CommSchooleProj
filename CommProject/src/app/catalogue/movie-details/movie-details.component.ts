import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { delay, finalize, switchMap, tap } from 'rxjs/operators';
import { MovieBody, MovieResult } from '../catalogue.model';
import { FireApiService, MovieApiService } from '../services';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss']
})
export class MovieDetailsComponent implements OnInit {
  storeData$: Observable<MovieBody>;
  movieData$: Observable<MovieResult>;

  constructor(
    private activatedRoute: ActivatedRoute,
    private fireApiService: FireApiService,
    private movieApiService: MovieApiService,
    private router: Router
  ) { }

  private initMovieDetails() {
    // TODO: fix loading
    const id = this.activatedRoute.snapshot.params['id'];
    this.storeData$ = this.fireApiService
      .getMovie(id)
      .pipe(
        tap(
          (movie) =>
            (this.movieData$ = this.movieApiService.getMovieByImdbId(
              movie.imdbId
            ))
        )
      );
  }

  ngOnInit() {
    this.initMovieDetails();
  }
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { Observable, from } from 'rxjs';
import { tap, finalize } from 'rxjs/operators';
import { LoadingService } from 'src/app/services/loading.service';
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
  faArrowLeft = faArrowLeft;

  constructor(
    private activatedRoute: ActivatedRoute,
    private fireApiService: FireApiService,
    private movieApiService: MovieApiService,
    private router: Router,
    private loadingService: LoadingService
  ) { }

  private initMovieDetails() {
    // TODO: fix loading
    const id = this.activatedRoute.snapshot.params['id'];
    this.loadingService.start()
    this.storeData$ = this.fireApiService
      .getMovie(id)
      .pipe(
        tap(
          (movie) =>
            (this.movieData$ = this.movieApiService.getMovieByImdbId(
              movie.imdbId)
              .pipe(finalize(() => this.loadingService.stop())))
        )
      );
  }

  goBack(){
    this.router.navigate(['catalogue']);
  }

  ngOnInit() {
    this.initMovieDetails();
  }

}

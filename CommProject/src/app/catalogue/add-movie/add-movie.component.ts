import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore'
import {
  catchError,
  finalize,
  map,
  switchMap,
  takeUntil
} from 'rxjs/operators';
import { forkJoin, Observable, of, Subject, from } from 'rxjs';
import { LoadingService } from 'src/app/services/loading.service';
import { StorageService } from 'src/app/services/storage.service';
import { Movie, 
  RATINGS, 
  Status, 
  WhenToWatchSelect, 
  WHEN_TO_WATCH,  
  Country, 
  MovieResult,  
  // MovieBody, 
  MovieBody} 
  from '../catalogue.model';
import { MovieApiService } from '../services/movie-api.service';
import { AuthService } from 'src/app/services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';
import { FireApiService } from '../services';


@Component({
  selector: 'app-add-movie',
  templateUrl: './add-movie.component.html',
  styleUrls: ['./add-movie.component.scss']
})
export class AddMovieComponent implements OnInit {
  private unsubscribe$ = new Subject();

  searchKey:string;
  hasError:boolean;

  lastThreeSearches: string[] = [];

  form: FormGroup;
  status = Status;
  submitted = false;

  get canWatchLater(): boolean {
    return !!this.form.get('whenToWatch');
  }

  get whenToWatch(): WhenToWatchSelect[] {
    return WHEN_TO_WATCH;
  }

  get ratings(): number[]{
    return RATINGS;
  }

  private _selectedMovie: Movie;

  get selectedMovie(): Movie {
    return this._selectedMovie;
  }


  constructor(
    private movieApiService: MovieApiService,
    private loadingServce: LoadingService,
    private storage: StorageService,
    private fb: FormBuilder,
    private fireApiService: FireApiService,
    private auth: AuthService,
    private toastr: ToastrService,
    private translateService: TranslateService
  ) { }

  getCountryFlag(code: string): string {
    return `https://www.countryflags.io/${code}/shiny/64.png`;
  }

  getCountryPopulation(country: Country): string {
    return `Popultion of ${country.code}: ${country.population}`;
  }

  private addToLastSearches(name:string){
    if(this.lastThreeSearches.length < 3){
      this.lastThreeSearches = [name, ...this.lastThreeSearches];
      return
    }

    this.lastThreeSearches = [name, ...this.lastThreeSearches.slice(0, 2)];
    this.storage.set('lastThreeSearches', this.lastThreeSearches);
  }

  private getCountryWithPopulation(code: string): Observable<Country> {
    return this.movieApiService.getCountry(code).pipe(
      map((c) => {
        const country = c[0];

        return {
          code: country.alpha2Code,
          population: country.population,
        };
      }),
      catchError(() => {
        return of(null);
      })
    );
  }

  private mapMovie(movie: MovieResult, countries: Country[]): Movie {
    return {
      actors: movie.Actors,
      countries,
      director: movie.Director,
      genre: movie.Genre.split(', '),
      imdbId: movie.imdbID,
      plot: movie.Plot,
      poster: movie.Poster,
      title: movie.Title,
      year: movie.Year,
    };
  }

  fetchMovie(name: string) {
    this.loadingServce.start();
    this.movieApiService
      .getMovieByName(name)
      .pipe(finalize(() => {
        this.loadingServce.stop(), 
        this.searchKey = ''
        }), 
        switchMap((movie) => {
          const countries = movie.Country.split(', ');
          return forkJoin(
            countries.map((code) => this.getCountryWithPopulation(code))
          ).pipe(
            map<Country[], Movie>((countries) => this.mapMovie(movie, countries))
          )
        }))
      .subscribe((result) => (this._selectedMovie = result));
  }


  search(key: string) {
    if (!key) {
      this.hasError = true;
      return;
    }

    this.hasError = false;

    this.addToLastSearches(key);
    this.fetchMovie(key);
  }

  private restoreState() {
    const lastThreeSearches = this.storage.get<string[]>('lastThreeSearches');
    if (lastThreeSearches?.length > 0) {
      this.lastThreeSearches = lastThreeSearches;
    }
  }

  private createForm(){
    this.form = this.fb.group({
      review: ['', [Validators.required, Validators.minLength(10)]],
      rating: 1,
      status: Status.Watched,
    });
  }

  submit(){
    this.submitted = true;

    if(this.form.invalid){
      return
    }

    const value = this.form.value;

    const body: MovieBody = {
      imdbId: this._selectedMovie.imdbId,
      uid: this.auth.userId,
      rating: value.rating,
      review: value.review,
      status: value.status,
      whenToWatch: value.whenToWatch || '',
    };
   
    this.loadingServce.start();
    this.fireApiService
      .addMovie(body)
      .pipe(finalize(() => this.loadingServce.stop()))
      .subscribe(() => this.reset())
  }

  // არესეტებს გვერდს ინფოს შენახვის დროს, ცარიელი გვერდები რომ იყოს
  // და ვალიდაციამაც სწორად იმუშაოს
  private reset(){
    this._selectedMovie = null;
    
    this.form.reset();
    this.form.updateValueAndValidity();

    this.submitted = false;

    this.translateService
    .get('catalogue.MOVIE_HAS_BEEN_ADDED')
    .subscribe((value) => this.toastr.success(value))
  }

  private addControlsByStatus(status: Status) {
    switch (status) {
      case Status.WatchLater:
        this.form.addControl(
          'whenToWatch',
          new FormControl(null, Validators.required)
        );
        break;
      case Status.Watched:
        this.form.removeControl('whenToWatch');
        break;
    }
  }

  ngOnInit(): void {
    this.restoreState()
    this.createForm()

    this.form
    .get('status')
    .valueChanges.pipe(takeUntil(this.unsubscribe$))
    .subscribe((status) => this.addControlsByStatus(status));
  }

}

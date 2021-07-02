import { Injectable, InjectionToken, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CountryResult, MovieResult } from '../catalogue.model';

export const MOVIE_BASE_URL = new InjectionToken<string>('movie api token');

@Injectable()
export class MovieApiService {
    constructor(
        @Inject(MOVIE_BASE_URL) private baseUrl: string,
        private http: HttpClient
      ) {}
    
      // TODO: make this Observable typed
      getMovieByName(name: string): Observable<MovieResult> {
        return this.http.get<MovieResult>(`${this.baseUrl}&t=${name}`);
      }

      getMovieByImdbId(imdbId: string): Observable<MovieResult> {
        return this.http.get<MovieResult>(`${this.baseUrl}&i=${imdbId}`);
      }

      getCountry(code: string): Observable<CountryResult> {
        return this.http.get<CountryResult>(
          `https://restcountries.eu/rest/v2/name/${code}?fullText=true`
        );
      }
}
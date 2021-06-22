import { Injectable, InjectionToken, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export const MOVIE_BASE_URL = new InjectionToken<string>('movie api token');

@Injectable()
export class MovieApiService {
    constructor(
        @Inject(MOVIE_BASE_URL) private baseUrl: string,
        private http: HttpClient
      ) {}
    
      // TODO: make this Observable typed
      getMovieByName(name: string): Observable<any> {
        return this.http.get(`${this.baseUrl}&t=${name}`);
      }
}
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CatalogueComponent } from './catalogue.component';
import { CatalogueRoutingModule } from './catalogue-routing.module';
import { AddMovieComponent } from './add-movie/add-movie.component'
import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { MovieApiService, MOVIE_BASE_URL } from './services/movie-api.service';
import { environment } from 'src/environments/environment';


@NgModule({
  declarations: [
    CatalogueComponent,
    AddMovieComponent
  ],
  imports: [
    CommonModule,
    CatalogueRoutingModule,
    SharedModule,
    FormsModule
  ],
  providers: [
    MovieApiService,
    {
      provide: MOVIE_BASE_URL,
      useValue: environment.movieApiBase,
    },]
})
export class CatalogueModule { }

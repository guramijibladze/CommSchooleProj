import { Component, Input, OnInit } from '@angular/core';
import { MovieBody, MovieListItem } from '../../catalogue.model';
import { MovieApiService } from '../../services';

@Component({
  selector: 'app-movie-list-item',
  templateUrl: './movie-list-item.component.html',
  styleUrls: ['./movie-list-item.component.scss']
})
export class MovieListItemComponent implements OnInit {
  @Input() item: MovieListItem;

  constructor() { }

  ngOnInit(): void {
   
  }

}

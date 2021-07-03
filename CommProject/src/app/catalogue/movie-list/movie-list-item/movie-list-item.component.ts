import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MovieBody, MovieListItem } from '../../catalogue.model';
// import { MovieApiService } from '../../services';

@Component({
  selector: 'app-movie-list-item',
  templateUrl: './movie-list-item.component.html',
  styleUrls: ['./movie-list-item.component.scss']
})
export class MovieListItemComponent implements OnInit {
  @Input() item: MovieListItem;

  constructor(
    private router: Router
  ) { }

  goToDetails(){
    this.router.navigate([`catalogue/${this.item.data.id}`]);
  }

  ngOnInit(): void {
   
  }

}

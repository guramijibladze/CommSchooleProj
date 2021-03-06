import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MovieListItem } from '../../catalogue.model';
import { FireApiService } from '../../services';

@Component({
  selector: 'app-movie-list-item',
  templateUrl: './movie-list-item.component.html',
  styleUrls: ['./movie-list-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MovieListItemComponent implements OnInit {
  @Input() item: MovieListItem;
  
  constructor(
    private router: Router,
    private fireApiService: FireApiService,
  ) { }

  goToDetails(){
    this.router.navigate([`catalogue/${this.item.data.id}`]);
  }

  ngOnInit(): void {
   
  }

}

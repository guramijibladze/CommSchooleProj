import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { finalize } from 'rxjs/operators';
import { LoadingService } from 'src/app/services/loading.service';
import { StorageService } from 'src/app/services/storage.service';
import { Status } from '../catalogue.model';
import { MovieApiService } from '../services/movie-api.service';


@Component({
  selector: 'app-add-movie',
  templateUrl: './add-movie.component.html',
  styleUrls: ['./add-movie.component.scss']
})
export class AddMovieComponent implements OnInit {
  searchKey:string;
  hasError:boolean;

  lastThreeSearches: string[] = [];

  form: FormGroup;
  status = Status;
  ratings = [1,2,3,4,5];
  submitted = false;

  constructor(
    private movieApiService: MovieApiService,
    private loadingServce: LoadingService,
    private storage: StorageService,
    private fb: FormBuilder
  ) { }

  private addToLastSearches(name:string){
    if(this.lastThreeSearches.length < 3){
      this.lastThreeSearches = [name, ...this.lastThreeSearches];
      return
    }

    this.lastThreeSearches = [name, ...this.lastThreeSearches.slice(0, 2)];
    this.storage.set('lastThreeSearches', this.lastThreeSearches);
  }

  fetchMovie(name: string) {
    this.loadingServce.start();
    this.movieApiService
      .getMovieByName(name)
      .pipe(finalize(() => (this.loadingServce.stop(), (this.searchKey = ''))))
      .subscribe((x) => console.log(x));
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
  }

  ngOnInit(): void {
    this.restoreState()
    this.createForm()
  }

}

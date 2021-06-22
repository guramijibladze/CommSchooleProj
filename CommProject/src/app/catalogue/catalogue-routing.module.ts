import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddMovieComponent } from './add-movie/add-movie.component';
import { CatalogueComponent } from './catalogue.component';


const routes: Routes = [
    {
      path: '',
      component: CatalogueComponent
    },
    {
      path: 'add',
      component: AddMovieComponent
    }
  ]
  
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CatalogueRoutingModule { }

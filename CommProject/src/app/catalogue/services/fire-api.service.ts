import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { from, Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { MovieBody, Movie } from '../catalogue.model';


@Injectable()
export class FireApiService {
    constructor(
        private store:AngularFirestore,
        private auth: AuthService
        ) {}
    
    addMovie( body: MovieBody ){
        return from(this.store.collection('catalogue').add(body))
    }
    
    // მოაქ იუზერის დამატებული ინფორმაცია
    getMovies(): Observable<MovieBody[]>{
        return this.store
        .collection<MovieBody>('catalogue', (ref) => ref.where('uid', '==', this.auth.userId))
        .valueChanges()
    }
}
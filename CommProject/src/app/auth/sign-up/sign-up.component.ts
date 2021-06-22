import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { LoadingService } from 'src/app/services/loading.service';
import { from } from 'rxjs';
import { finalize } from 'rxjs/operators';

export interface SignUpForm{
  email: string;
  password: string;
}

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  constructor(
      private auth: AuthService, 
      private router: Router,
      private loadingService: LoadingService
    ) {}

  ngOnInit(): void {
  }

  signUp({email, password}:SignUpForm){
    // console.log(password)
    if(!email || !password){
      return
    }

    this.loadingService.start();
    from(this.auth.signUp({ email, password }))
      .pipe(finalize(() => this.loadingService.stop()))
      .subscribe(() => this.router.navigate(['catalogue']));
  }

}

/* ============================================
 ; Title:  signin.component.ts
 ; Author: Professor Krasso
 ; Modified by: Jeff Lintel
 ; Date:   24 September 2020
 ; Description: signin component
 ===========================================*/


import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { config } from 'process';


@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  form: FormGroup;
  error: string;

  //add additional snackbar for employee ids that fail validation
  constructor(private router: Router, private cookieService: CookieService, private fb: FormBuilder, private http: HttpClient, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      empId: [null, Validators.compose([Validators.required, Validators.pattern('^[0-9]*$')])]
    })
  }

  login() {
    const empId = this.form.controls['empId'].value;
    this.http.get('/api/employees/' + empId).subscribe(res => {
      if(res) {
        this.cookieService.set('session_user', empId, 1); //set employee id to the cookie, session_user name
        this.router.navigate(['/']);
      } else {
        //this.error = 'The employee Id you entered is invalid. Please try again.'
        /*let config = new MatSnackBarConfig();
        config.verticalPosition = 'bottom';
        config.horizontalPosition = 'center';
        config.duration = 3000;
        config.addExtraClass = ['signin-error'];*/
        this.snackBar.open(`${empId} is an invalid employee Id. Please try again`, 'Uh-oh!', {
          duration: 300000, //deliberately long for screenshot purposes
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
          panelClass: 'signin-error'
        })
      }
    })
  }

  showInvalidEmpIdSnackbar() {
    this.snackBar.open(`Invalid employee Id. Please try again`, 'Uh-oh!', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom'
    })
  }

}

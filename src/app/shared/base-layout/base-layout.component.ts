/* ============================================
 ; Title:  base-layout.component.ts
 ; Author: Professor Krasso
 ; Modified by: Jeff Lintel
 ; Date:   24 September 2020
 ; Description: base layout component
 ===========================================*/


import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router'

@Component({
  selector: 'app-base-layout',
  templateUrl: './base-layout.component.html',
  styleUrls: ['./base-layout.component.css']
})
export class BaseLayoutComponent implements OnInit {

  year: number = Date.now();

  constructor(private cookieService: CookieService, private router: Router) { }

  ngOnInit(): void {
  }

  signOut() {
    this.cookieService.deleteAll();
    this.router.navigate(['/session/signin']);
  }

}

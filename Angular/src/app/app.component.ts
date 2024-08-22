import { Component } from '@angular/core';
import { CompanyDetailsComponent } from './company-details-component/company-details.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import {  RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone:true,
  imports:[RouterOutlet, MatToolbarModule, CompanyDetailsComponent],
  styles: [
    `
      main {
        display: flex;
        justify-content: center;
        padding: 2rem 4rem;
      }
    `,
  ],
  template: `
    <mat-toolbar>
      <span>Employees Management System</span>
    </mat-toolbar>
    <main>
      <router-outlet></router-outlet>
    </main>
  `,
})
export class AppComponent {
  title = 'client';
}

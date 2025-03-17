import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterModule, RouterOutlet } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { HomeComponent } from '../components/home/home.component';
import { LoginComponent } from '../components/user/login/login.component';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet,RouterModule,RouterLink,RouterLinkActive,RouterModule,MatToolbarModule,MatButtonModule,HomeComponent,LoginComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'CoursesProject';
}

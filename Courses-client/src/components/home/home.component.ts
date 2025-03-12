import { Component } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {MatToolbarModule} from '@angular/material/toolbar'
import { RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { User } from '../../models/user.model';
import { Observable } from 'rxjs';
import { Course } from '../../models/course.model';
import { CourseService } from '../../services/course.service';
import { Router } from 'express';
import { UserService } from '../../services/user.service';
@Component({
  selector: 'app-home',
  imports: [MatIconModule,RouterModule,RouterOutlet],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  currentCourses$: Observable<Course[]>
  avatarLetter = ''
  currentUser!:User
  constructor(private coursesServise: CourseService, private router: Router, userService: UserService) {
    this.currentCourses$ = this.coursesServise.currentCourses$;
    this.avatarLetter = userService.currentUser.name[0];
    this.currentUser=userService.currentUser
  }

}

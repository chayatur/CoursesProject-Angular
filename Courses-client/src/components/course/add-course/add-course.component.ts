import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CourseService } from '../../../services/course.service';
import { Course } from '../../../models/course.model';
import { Router } from '@angular/router'
import { RouterLink, RouterLinkActive, RouterModule, RouterOutlet } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { CourseDirective } from '../../../directive/course.directive';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-courses',
  imports: [RouterOutlet,MatCardModule, MatButtonModule,RouterLinkActive, RouterLink,CourseDirective,MatButtonModule, MatIconModule],
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.css'
})
export class CoursesComponent implements OnInit{
  addCourseForm!: FormGroup;

  constructor(public courseService: CourseService, private fb: FormBuilder, private router: Router) {}

  ngOnInit(): void {
    this.addCourseForm = this.fb.group({
      courseGroup: this.fb.group({
        title: ['', Validators.required],
        description: ['', Validators.required],
      }),
    });
  }

  onSubmit() {
    
    if (this.addCourseForm.valid) {
      const course: Course = this.addCourseForm.value.courseGroup;
      const {title, description}=course
    this.courseService.addCourse(title, description).subscribe({
    next: (response) => {
      console.log(response.message);
      this.router.navigate(['/home']);

    },
    error: (err) => {
      console.error('Error adding course', err);
    }
  });

    }
  }
  
}

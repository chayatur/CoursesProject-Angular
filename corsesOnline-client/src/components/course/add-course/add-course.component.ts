import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CourseService } from '../../../services/course.service';
import { Course } from '../../../models/course.model';
import { Router } from '@angular/router'
import { RouterLink, RouterLinkActive, RouterModule, RouterOutlet } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatError, MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { CourseDirective } from '../../../directive/course.directive';

@Component({
  selector: 'app-add-course',
  standalone:true,
  imports: [RouterOutlet,MatError,MatLabel,MatFormFieldModule,FormsModule,ReactiveFormsModule,MatCardModule, MatButtonModule,RouterLinkActive, RouterLink,CourseDirective,MatButtonModule, MatIconModule],
  templateUrl: './add-course.component.html',
  styleUrl: './add-course.component.css'
})
export class AddCourseComponent implements OnInit{
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

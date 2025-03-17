import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Course } from '../../models/Cours';
import { CoursesService } from '../../services/courses.service';
import { Router } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatError, MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-adit-course',
  standalone: true,
  imports: [MatDialogModule,
    ReactiveFormsModule,MatFormFieldModule,MatDialogModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,MatError
    ],
  templateUrl: './adit-course.component.html',
  styleUrl: './adit-course.component.css'
})
export class AditCourseComponent{
  editCourseForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<AditCourseComponent>,
    private coursesService: CoursesService,
    @Inject(MAT_DIALOG_DATA) public data: { course: Course } // מקבל את הקורס שנבחר לעדכון
  ) {
    
    this.editCourseForm = this.fb.group({
      title: [this.data.course.title, Validators.required],
      description: [this.data.course.description, Validators.required],
    });
  }

  onNoClick(): void {
    this.dialogRef.close(); // סוגר את המודל
  }

  onSubmit(): void {
    console.log(this.editCourseForm.value);
    console.log("id:"+this.data.course.id);
    
    if (this.editCourseForm.valid) {
      const updatedCourse = {
        title: this.editCourseForm.value.title,
        description: this.editCourseForm.value.description,
        teacherId:this.data.course.teacherId
      };
      this.coursesService.updateCourse(this.data.course.id, updatedCourse).subscribe({
        next: (response) => {
          console.log('Course updated successfully:', response);
          this.dialogRef.close(true);
        },
        error: (err) => {
          console.error('Error updating course:', err);
          alert('Failed to update course');
        }
      });
    }
  }
}

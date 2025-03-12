import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { CourseService } from '../../../services/course.service';
import { Course } from '../../../models/course.model';
import { MatError, MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-edit-course',
  imports: [MatDialogModule,
    ReactiveFormsModule,MatFormFieldModule,MatDialogModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,MatError],
  templateUrl: './edit-course.component.html',
  styleUrl: './edit-course.component.css'
})
export class EditCourseComponent {
  editCourseForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<EditCourseComponent>,
    private coursesService: CourseService,
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
        next: (response:any) => {
          console.log('Course updated successfully:', response);
          this.dialogRef.close(true);
        },
        error: (err:any) => {
          console.error('Error updating course:', err);
          alert('Failed to update course');
        }
      });
    }
  }
}



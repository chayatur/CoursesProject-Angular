import { Component, Inject } from '@angular/core';
import { Lesson } from '../../../models/lesson.model';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { LessonService } from '../../../services/lesson.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { MatFormField, MatFormFieldModule, MatLabel } from '@angular/material/form-field';

@Component({
  selector: 'app-edit-lesson',
  imports: [MatLabel,MatFormFieldModule,FormsModule,ReactiveFormsModule],
  templateUrl: './edit-lesson.component.html',
  styleUrl: './edit-lesson.component.css'
})
export class EditLessonComponent {

  editLessonForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<EditLessonComponent>,
    private lessonService: LessonService,
    @Inject(MAT_DIALOG_DATA) public data: { lesson: Lesson } // מקבל את השיעור שנבחר לעדכון
  ) {
    this.editLessonForm = this.fb.group({
      title: [this.data.lesson.title, Validators.required],
      content: [this.data.lesson.content, Validators.required],
    });
  }

  onNoClick(): void {
    this.dialogRef.close(); // סוגר את המודל
  }

  onSubmit(): void {
    if (this.editLessonForm.valid) {
      const updatedLesson: Lesson = {
        id: this.data.lesson.id,
        title: this.editLessonForm.value.title,
        content: this.editLessonForm.value.content,
        courseId: this.data.lesson.courseId
      };
      this.lessonService.updateLesson(this.data.lesson.id, updatedLesson).subscribe({
        next: (response: any) => {
          console.log('Lesson updated successfully:', response);
          this.dialogRef.close(true);
        },
        error: (err: any) => {
          console.error('Error updating lesson:', err);
          alert('Failed to update lesson');
        }
      });
    }
  }
}
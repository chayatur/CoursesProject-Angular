import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Lesson } from '../../../models/lesson.model';
import { LessonService } from '../../../services/lesson.service';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button'; // עבור כפתורים
import { MatFormFieldModule } from '@angular/material/form-field'; // עבור שדות טופס
import { MatSelectModule } from '@angular/material/select'; // עבור בחירות
import { MatInputModule } from '@angular/material/input'; // עבור שדות קלט
import { MatStepperModule } from '@angular/material/stepper';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-lesson-details',
  standalone: true,
  imports: [MatIconModule,MatCardModule,MatButtonModule,MatFormFieldModule,MatSelectModule,
    MatInputModule,MatStepperModule,FormsModule
  ],
  templateUrl: './lesson-details.component.html',
  styleUrl: './lesson-details.component.css'
})
export class LessonDetailsComponent {
  @Input() lesson:Lesson | undefined;

  @Output() childSaveLesson:EventEmitter<any> = new EventEmitter<any>();
  constructor(private lessonService: LessonService){}
  saveCourse(){
      this.childSaveLesson.emit(this.lesson);
  }

  cancel(){
    this.childSaveLesson.emit(null);
  }
}

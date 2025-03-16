import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LessonService } from '../../services/lesson.service';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { Lesson } from '../../models/lesson.model';
import { IconPipe } from '../../pipe/icon.pipe';
import { LessonDetailsComponent } from './lessons-details/lessons-details.component';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-lessons',
  imports: [MatListModule, MatIconModule, MatButtonModule, MatDialogModule, MatInputModule, MatFormFieldModule, MatCardModule, MatGridListModule, LessonDetailsComponent, IconPipe],
  templateUrl: './lessons.component.html',
  styleUrl: './lessons.component.css' 
})
export class LessonsComponent implements OnInit {
  courseId: number | undefined;
  lessonToChange: Lesson | undefined;
  addFlag = false;
  editFlag = false;
  lessons: Lesson[] = []; 
  constructor(private activatedRoute: ActivatedRoute, private lessonService: LessonService, private userService: UserService) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      this.courseId = params.get('id') ? Number(params.get('id')) : 0;
      this.lessonService.getLessons(this.courseId).subscribe(data => {
        this.lessons = data; // שימור נתוני השיעורים
      });
    });
  }

  addLesson(les: Lesson) {
    if (les != null) {
      this.lessonService.addLesson(les).subscribe(() => {
        this.lessonService.getLessons(this.courseId!).subscribe(data => {
          this.lessons = data; // עדכון השיעורים לאחר הוספה
        });
      });
    }
    this.addFlag = false;
  }

  updateLesson(les: Lesson) {
    if (les != null) {
      this.lessonService.updateLesson(les.id, les).subscribe(() => {
        this.lessonService.getLessons(this.courseId!).subscribe(data => {
          this.lessons = data; // עדכון השיעורים לאחר עדכון
        });
      });
    }
    this.editFlag = false;
  }

  deleteLesson(id: number) {
    this.lessonService.deleteLesson(this.courseId!, id).subscribe(() => {
      this.lessonService.getLessons(this.courseId!).subscribe(data => {
        this.lessons = data; // עדכון השיעורים לאחר מחיקה
      });
    });
  }

  add() {
    this.addFlag = true;
    this.lessonToChange = { id: 0, title: '', content: '', courseId: this.courseId! }; // יצירת שיעור חדש
  }

  edit(les: Lesson) {
    this.editFlag = true;
    this.lessonToChange = les;
  }
}

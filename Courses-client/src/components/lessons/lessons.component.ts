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
import { Observable } from 'rxjs';
import { User, Role } from '../../models/user.model'; // ודא שהנתיב נכון
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-lessons',
  standalone: true,
  imports: [MatListModule, MatIconModule, MatButtonModule, MatDialogModule, MatInputModule, MatFormFieldModule, MatCardModule, CommonModule, MatGridListModule, LessonDetailsComponent, IconPipe],
  templateUrl: './lessons.component.html',
  styleUrls: ['./lessons.component.css']
})
export class LessonsComponent implements OnInit {
  courseId: number | undefined;
  lessonToChange: Lesson | undefined;
  addFlag = false;
  editFlag = false;
  lessons: Lesson[] = []; 
  user$!: Observable<User>;
  user!: User; // הוספת המשתנה user
  Role = Role; // הוסף שורה זו

  constructor(private activatedRoute: ActivatedRoute, private lessonService: LessonService, private userService: UserService) { }

  ngOnInit(): void {
    this.user$ = this.userService.currentUserObservable;
    this.user$.subscribe(user => {
      this.user = user; // קבלת הערכים מה-Observable
    });
    
    this.activatedRoute.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.courseId = Number(id);
        this.loadLessons(); 
      } else {
        console.error('Course ID is missing or invalid.');
      }
    });
  }

  loadLessons(): void {
    if (this.courseId !== undefined) {
      this.lessonService.getLessons(this.courseId).subscribe(data => {
        this.lessons = data; 
      });
    }
  }

  addLesson(les: Lesson): void {
    if (les !== null && les !== undefined) { // השתמש ב-!== כדי לבדוק גם על undefined
        this.lessonService.addLesson(les).subscribe(() => {
            this.loadLessons(); 
        });
    }
    this.addFlag = false;
}
 
  updateLesson(les: Lesson): void {
    if (les != null) {
      this.lessonService.updateLesson(les.id, les).subscribe(() => {
        this.loadLessons();
      });
    }
    this.editFlag = false;
  }

  deleteLesson(id: number): void {
    if (this.courseId !== undefined) {
      this.lessonService.deleteLesson(this.courseId, id).subscribe(() => {
        this.loadLessons(); 
      });
    } else {
      console.error('Course ID is undefined, cannot delete lesson.'); 
    }
  }

  add(): void {
    this.addFlag = true;
    if (this.courseId !== undefined) {
      this.lessonToChange = { id: 0, title: '', content: '', courseId: this.courseId }; 
    }
  }

  edit(les: Lesson): void {
    this.editFlag = true;
    this.lessonToChange = les;
  }
}

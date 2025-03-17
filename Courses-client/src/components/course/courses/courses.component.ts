import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CourseService } from '../../../services/course.service';
import { LessonService } from '../../../services/lesson.service';
import { Lesson } from '../../../models/lesson.model';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';  // ✅ מספיק כדי להשתמש ב-[routerLink]
import { BehaviorSubject } from 'rxjs';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { EditLessonComponent } from '../../lessons/edit-lesson/edit-lesson.component';
import { Course } from '../../../models/course.model';

@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, RouterModule,MatIconModule], // ✅ RouterModule מכסה את כל הדיירקטיבות של נתיבים
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.css'
})
export class CoursesComponent implements OnInit {
    courseId: string = '';
    course!: Course;
    lessons: Lesson[] = [];  
    role: string = sessionStorage.getItem('role') || '';
  
    constructor(
      private dialog: MatDialog,
      private activatedRoute: ActivatedRoute,
      private coursesService: CourseService,
      private lessonService: LessonService
    ) {}
  
    ngOnInit(): void {
      this.activatedRoute.paramMap.subscribe(params => {
        this.courseId = params.get('id') || '';       
        if (this.courseId) {
          this.getCourseDetails(); 
          this.getLessons();
        }
      });
    }
  
    getLessons(): void {
      console.log("this.courseId:", this.courseId);
      this.lessonService.getLessons(Number(this.courseId)); // המרת ה-ID למספר
      this.lessonService.lessons.subscribe(data => {
        this.lessons = data; // שמירה על השיעורים שהתקבלו
      });
    }
  
    getCourseDetails(): void {
      this.coursesService.getCourseById(this.courseId).subscribe({
        next: (data) => {
          this.course = data;
          console.log(this.course);
        },
        error: (error) => {
          console.error('Error fetching course:', error);
        }
      });
    }
  
    deleteLesson(id: number): void {
      this.lessonService.deleteLesson(Number(this.courseId), id).subscribe(
        (response) => {
          console.log('Lesson deleted successfully:', response);
          this.lessons = this.lessons.filter(l => l.id !== id); // הסרת השיעור מהמערך
        },
        (error) => {
          console.error('Error deleting lesson:', error);
        }
      );
    }
  
    editLesson(lesson: Lesson): void {
      const dialogRef = this.dialog.open(EditLessonComponent, {
        data: { lesson },
      });
  
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          console.log('Lesson was updated successfully!');
          this.getLessons(); // רענון השיעורים לאחר עדכון
        }
      });
    }
  }
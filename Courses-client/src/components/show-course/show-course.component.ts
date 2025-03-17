import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CoursesService } from '../../services/courses.service';
import { Course } from '../../models/Cours';  
import { LessonsService } from '../../services/lessons.service';
import { lesson } from '../../models/lessons';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';  // ✅ מספיק כדי להשתמש ב-[routerLink]
import { BehaviorSubject } from 'rxjs';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { AditLessonComponent } from '../adit-lesson/adit-lesson.component';

@Component({
  selector: 'app-show-course',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, RouterModule,MatIconModule], // ✅ RouterModule מכסה את כל הדיירקטיבות של נתיבים
  templateUrl: './show-course.component.html',
  styleUrl: './show-course.component.css'
})
export class ShowCourseComponent implements OnInit {
  courseId: string = '';
  course!: Course;
  lessons: lesson[] = [];  
  role:string= sessionStorage.getItem('role')||''

  constructor(
     private dialog: MatDialog,
    private activatedRoute: ActivatedRoute,
    private coursesService: CoursesService,
    private lessonService: LessonsService
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
    this.lessonService.getLessonsByCourseId(this.courseId).subscribe({
      next: (data) => {
        console.log("Data from server:", data); // הוסף את זה
        this.lessons = data;
      },
      error: (error) => {
        console.error('Error fetching courses:', error);
        
      }
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

  deleteLesson(id:number){
      this.lessonService.deleteLesson(id,this.courseId).subscribe(
        (response) => {
          console.log('Course deleted successfully:', response);
          this.lessons = this.lessons.filter(l => l.id !== id);
  
        },
        (error) => {
          console.error('Error deleting course:', error);
        }
      );
    }
  
  editLesson(lesson:lesson){
    const dialogRef = this.dialog.open(AditLessonComponent, {
      data: { lesson}, // שולחים את הקורס למודל
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Course was updated successfully!');
        this.getLessons(); // רענון קורסים
      }
    });
  }
}
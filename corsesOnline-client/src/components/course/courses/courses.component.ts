import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CourseService } from '../../../services/course.service';
import { Course } from '../../../models/course.model';
import { LessonService } from '../../../services/lesson.service';
import { Lesson } from '../../../models/lesson.model';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';  
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { EditLessonComponent } from '../../lessons/edit-lesson/edit-lesson.component';

@Component({
    selector: 'app-courses',
    imports: [MatCardModule, MatButtonModule, RouterModule, MatIconModule],
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
    const courseIdNumber = Number(this.courseId); 
    this.lessonService.getLessons(courseIdNumber).subscribe({
      next: (data: Lesson[]) => {
        console.log("Data from server:", data);
        this.lessons = data;
      },
      error: (error: any) => {
        console.error('Error fetching lessons:', error);
      }
    });
  }

  getCourseDetails(): void {
    this.coursesService.getCourseById(this.courseId).subscribe({
      next: (data: Course) => {
        this.course = data;
        console.log(this.course);
        this.lessons = this.course.lessons || []; 
      },
      error: (error: any) => {
        console.error('Error fetching course:', error);
      }
    });
  }

  deleteLesson(id: number) {
    this.lessonService.deleteLesson(Number(this.courseId), id).subscribe(
      (response: any) => {
        console.log('Lesson deleted successfully:', response);
        this.lessons = this.lessons.filter(l => l.id !== id);
      },
      (error: any) => {
        console.error('Error deleting lesson:', error);
      }
    );
  }
  
  editLesson(lesson: Lesson) {
    const dialogRef = this.dialog.open(EditLessonComponent, {
      data: { lesson },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Lesson was updated successfully!');
        this.getLessons(); }
    });
  }
}

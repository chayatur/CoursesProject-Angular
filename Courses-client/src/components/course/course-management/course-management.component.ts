import { Component, OnInit } from '@angular/core';
import { CourseService } from '../../../services/course.service';
import { Course } from '../../../models/course.model';
import { MatDialog } from '@angular/material/dialog';
import { EditCourseComponent } from '../edit-course/edit-course.component';
import { EnrollService } from '../../../services/enroll.service'; 
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { CourseDirective } from '../../../directive/course.directive';
import { MatIconModule } from '@angular/material/icon';
@Component({
  selector: 'app-course-management',
  imports: [RouterOutlet,MatCardModule, MatButtonModule,RouterLinkActive, RouterLink,CourseDirective,MatButtonModule, MatIconModule],
  templateUrl: './course-management.component.html',
  styleUrl: './course-management.component.css'
})
export class CourseManagementComponent implements OnInit {
  role!: string;
  courses: Course[] = [];
  studentCourse: Course[] = [];

  constructor(
    private dialog: MatDialog,
    private courseService: CourseService,
    private enrollService: EnrollService
  ) {}

  ngOnInit(): void {
    this.role = sessionStorage.getItem('role') || '';
    this.courseService.getCourses().subscribe({
      next: (data:any) => {
        this.courses = data;
        console.log(this.courses);
      },
      error: (error: any) => {
        console.error('Error fetching courses:', error);
      }
    });
    this.loadCoursesByStudent();
  }

  deleteCourse(id: string) {
    this.courseService.deleteCourse(id).subscribe(
      (response: any) => {
        console.log('Course deleted successfully:', response);
        this.courses = this.courses.filter(course => course.id !== Number(id));
      },
      (error: any) => {
        console.error('Error deleting course:', error);
      }
    );
  }

  editCourse(course: Course): void {
    const dialogRef = this.dialog.open(EditCourseComponent, {
      data: { course },
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        console.log('Course was updated successfully!');
        this.getCourses();
      }
    });
  }

  getCourses(): void {
    this.courseService.getCourses().subscribe((data: Course[]) => {
      this.courses = data;
    });
  }

  loadCoursesByStudent(): void {
    const studentId = sessionStorage.getItem('userId');
    if (studentId) {
      this.enrollService.getCourseByStudent(Number(studentId));
      this.enrollService.coursesToStudent.subscribe((courses: Course[]) => {
        this.studentCourse = courses;
      });
    }
  }
}

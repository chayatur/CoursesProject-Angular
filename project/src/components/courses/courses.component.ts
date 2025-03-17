import { Component, OnInit } from '@angular/core';
import { CoursesService } from '../../services/courses.service';
import { Course } from '../../models/Cours';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { DCourseDirective } from '../../directives/d-course.directive';
import { MatIconModule } from '@angular/material/icon';
import { UserService } from '../../services/user.service';
import { MatDialog } from '@angular/material/dialog';
import { AditCourseComponent } from '../adit-course/adit-course.component';
@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [RouterOutlet,MatCardModule, MatButtonModule,RouterLinkActive, RouterLink,DCourseDirective,MatButtonModule, MatIconModule],
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.css'
})
export class CoursesComponent implements OnInit{
  role!:string
constructor(    private dialog: MatDialog,
  private courseService:CoursesService,private userService:UserService){
}

courses:Course[]=[]
studentCourse:Course[]=[]
ngOnInit(): void {
 this.role= sessionStorage.getItem('role')||''
  this.courseService.getCourses().subscribe({
    next: (data) =>
    {
      this.courses = data;
      console.log(this.courses); 
    },
    error: (error:any) => {
      console.error('Error fetching courses:', error);
    }
  })
  this.loadCoursesByStudent()
  console.log('this.studentCourse',this.studentCourse);
}
deleteCourse(id:string){
    this.courseService.deleteCourse(id).subscribe(
      (response:any) => {
        console.log('Course deleted successfully:', response);
        this.courses = this.courses.filter(course => course.id !== id);

      },
      (error:any) => {
        console.error('Error deleting course:', error);
      }
    );
  }


  editCourse(course: Course): void {
    const dialogRef = this.dialog.open(AditCourseComponent, {
      data: { course }, // שולחים את הקורס למודל
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        console.log('Course was updated successfully!');
        this.getCourses(); // רענון קורסים
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
      this.courseService.getStudentCourses(studentId).subscribe({
        next: (data: Course[]) => {
          this.studentCourse = data;
        },
        error: (error: any) => {
          console.error('Error fetching student courses:', error);
        }
      });
    }
  }
  isEnoled(courseId: string): boolean {
    return this.studentCourse.some(course => course.id === courseId);
  }
  
  enroll(courseId: string) 
  {
    const userId = sessionStorage.getItem('userId');
    if (!userId) 
    {
      console.error('User not logged in.');
      return;
    }
  console.log(userId,'userId');
  console.log(courseId,'courseId');
    this.courseService.enrollStudent(courseId,userId).subscribe({
      next: () => {
        console.log('Student enrolled successfully');
        this.loadCoursesByStudent(); // רענון רשימת הקורסים של הסטודנט
      },
      error: (error: any) => {
      console.error('Error enrolling in course:', error);
      }
    });
  }
  
  unenroll(courseId: string) {
    const userId = sessionStorage.getItem('userId');
    if (!userId) {
      console.error('User not logged in.');
      return;
    }
  
    this.courseService.unenrollStudent(courseId, userId).subscribe({
      next: () => {
        console.log('Student unenrolled successfully');
        this.loadCoursesByStudent(); // רענון רשימת הקורסים של הסטודנט

      },
      error: (error: any) => {
        console.error('Error unenrolling from course:', error);
      }
    });
  }
  
}



import { Component, OnInit } from '@angular/core';
import { CourseService } from 'src/services/course.service'; // שירות לקורסים
import { MatSnackBar } from '@angular/material/snack-bar';
import { title } from 'process';
import { Course } from 'src/models/course.model';
import { url } from 'inspector';
import { HttpClient } from '@angular/common/http';
import { UserService } from 'src/services/user.service';

@Component({
    selector: 'app-courses',
    standalone: true,
    imports: [],
    templateUrl: './courses.component.html',
    styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {
    courses: any[] = [];
    router: any;

    constructor(private courseService: CourseService, private snackBar: MatSnackBar) { }

    ngOnInit(): void {
        this.loadCourses();
    }

    loadCourses() {
        this.courseService.getCourses().subscribe(
            data => {
                this.courses = data;
            },
            error => {
                console.error('Error loading courses', error);
                this.showErrorMessage('שגיאה בטעינת הקורסים.');
            }
        );
    }
    addCourse(course:Course){
this.courseService.addCourse(course)
    }
    joinCourse(courseId: number) {
        this.courseService.joinCourse(courseId).subscribe({
            next: () => {
                this.showSuccessMessage('הצטרפת לקורס בהצלחה!');
            },
            error: () => {
                this.showErrorMessage('משתמש לא קיים או שגיאה בהצטרפות לקורס.');
            }
        });
    }
    editCourse(course: Course, teacerId: number) {
        this.router.navigate[./edit-course];
        this.courseService.updateCourse(teacerId, course);
    }
    deleteCourse(id: number) {
        this.courseService.deleteCourse(id)
    }
    private showSuccessMessage(message: string) {
        this.snackBar.open(message, 'סגור', {
            duration: 3000,
            verticalPosition: 'top',
            horizontalPosition: 'center',
        });
    }

    private showErrorMessage(message: string) {
        this.snackBar.open(message, 'סגור', {
            duration: 3000,
            verticalPosition: 'top',
            horizontalPosition: 'center',
        });
    }
}





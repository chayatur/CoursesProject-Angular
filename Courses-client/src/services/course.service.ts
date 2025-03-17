import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { env } from './environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Course } from '../models/course.model';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  private apiUrl = 'http://localhost:3000/api/courses';
  private currentCoursesSubject = new BehaviorSubject<Course[]>([]);
  public currentCourses$ = this.currentCoursesSubject.asObservable();

  constructor(private http: HttpClient) {}
  
  getCourses(): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${sessionStorage.getItem('token')}`, // הוספת טוקן אם נדרש
    });
    return this.http.get<any>(env, { headers });
  }

  addCourse(title: string, description: string): Observable<any> 
  {
    const userId = sessionStorage.getItem('userId');
    const teacherId: number = userId ? +userId : 0; 
    console.log(teacherId);
    const body = { title, description,teacherId };

    return this.http.post<any>(env, body,);
  }
  getCourseById(id: string): Observable<Course> {

    return this.http.get<Course>(`${env}/${id}`);
  }
  getCoursesForUser(userId: number): Observable<any> {
    return this.http.get<any[]>(`${this.apiUrl}/student/${userId}`).pipe(
     tap(res => {
       console.log(res);
       this.currentCoursesSubject.next(res);
     })
   );
 }
 
 // פונקציה לעדכון קורס לפי ID
 updateCourse(id: any, updates: any): Observable<any> {

  return this.http.put(`${env}/${id}`, updates)
}

// פונקציה למחיקת קורס לפי ID
deleteCourse(id: string): Observable<any> {

  return this.http.delete(`${env}/${id}`);
}

  // הוספת סטודנט לקורס
  enrollStudent(courseId: string, userId: string): Observable<any> {

   return this.http.post(`${env}/${courseId}/enroll`,{userId});
  }


  // הסרת סטודנט מקורס
  unenrollStudent(courseId: string, userId: string): Observable<any> {

    return this.http.delete(`${env}/${courseId}/unenroll`,{
      body: { userId }});
  }

  // שליפת כל הקורסים של סטודנט מסוים
  getStudentCourses(studentId: string):Observable<any>{
    return this.http.get<any>(`${env}/student/${studentId}`);
  }
}



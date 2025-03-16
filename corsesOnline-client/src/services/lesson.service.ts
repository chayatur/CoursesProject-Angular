import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Observable, tap, throwError } from 'rxjs';
import { Lesson } from '../models/lesson.model';

@Injectable({
  providedIn: 'root'
})
export class LessonService {
  private baseUrl = 'http://localhost:3000/api/courses/';
  public lessons: BehaviorSubject<Lesson[]> = new BehaviorSubject<Lesson[]>([]);

  constructor(private http: HttpClient) { }

  getLessons(cId: number): Observable<Lesson[]> {
    return this.http.get<Lesson[]>(`${this.baseUrl}${cId}/lessons`).pipe(
      tap(data => this.lessons.next(data)),
      catchError(err => {
        console.error('Error fetching lessons:', err);
        return throwError(err);
      })
    );
  }
  
  addLesson(les: Lesson): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}${les.courseId}/lessons`, les).pipe(
      tap(() => this.getLessons(les.courseId)),
      catchError(err => {
        console.error('Error adding lesson:', err);
        return throwError(err);
      })
    );
  }

  updateLesson(id: number, les: Lesson): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}${les.courseId}/lessons/${id}`, les).pipe(
      tap(() => this.getLessons(les.courseId)),
      catchError(err => {
        console.error('Error updating lesson:', err);
        return throwError(err);
      })
    );
  }

  deleteLesson(cId: number, id: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}${cId}/lessons/${id}`).pipe(
      tap(() => this.getLessons(cId)),
      catchError(err => {
        console.error('Error deleting lesson:', err);
        return throwError(err);
      })
    );
  }
}

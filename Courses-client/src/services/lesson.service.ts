import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Observable, tap, throwError } from 'rxjs';
import { Lesson } from '../models/lesson.model';
@Injectable({
  providedIn: 'root'
})
export class LessonService {

    constructor(private http: HttpClient) { }

    private baseUrl = 'http://localhost:3000/api/courses/';
    public lessons: BehaviorSubject<Lesson[]> = new BehaviorSubject<Lesson[]>([]);
  
    getLessons(cId: Number): void {
      this.http.get<Lesson[]>(this.baseUrl + cId + "/lessons").subscribe(data =>
        this.lessons.next(data),
        error => alert("failed")
      );
    }
  
    addLesson(les: Lesson): Observable<any> {
      return this.http.post<any>(this.baseUrl + les.courseId + "/lessons", les).pipe(
        tap(() => this.getLessons(les.courseId)),
        catchError(err => {
          console.error('Error adding lesson:', err);
          return throwError(err);
        })
      );
    }
  
    updateLesson(id: Number, les: Lesson): Observable<any> {
      return this.http.put<any>(this.baseUrl + les.courseId + "/lessons/" + id, les).pipe(
        tap(() => this.getLessons(les.courseId)),
        catchError(err => {
          console.error('Error updating lesson:', err);
          return throwError(err);
        })
      );
    }
  
    deleteLesson(cId: Number, id: Number): Observable<any> {
      return this.http.delete<any>(this.baseUrl + cId + "/lessons/" + id).pipe(
        tap(() => this.getLessons(cId)),
        catchError(err => {
          console.error('Error deleting lesson:', err);
          return throwError(err);
        })
      );
    }
  }
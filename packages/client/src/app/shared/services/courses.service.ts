import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { serverUrl } from '../constants/index';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {
  constructor(private http: HttpClient) {}

  create(course): Observable<any> {
    return this.http.post<any>(`${serverUrl}/course`, course);
  }

  fetch(userCourses = false): Observable<any> {
    return this.http.get<any>(`${serverUrl}/course?usersCourses=${userCourses}`);
  }

  getSingleCourse(id): Observable<any> {
    return this.http.get(`${serverUrl}/course/${id}`);
  }
}

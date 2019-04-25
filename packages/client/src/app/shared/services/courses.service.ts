import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Course } from '../interfaces';
import { environment } from '../../../environments/environment';

const { baseUrl } = environment;

@Injectable({
  providedIn: 'root'
})
export class CoursesService {
  constructor(private http: HttpClient) {}

  create(course): Observable<any> {
    return this.http.post<any>(`${baseUrl}/course`, course);
  }

  fetch(offset = 0): Observable<any> {
    return this.http.get<any>(`${baseUrl}/course?offset=${offset}`);
  }

  getSingleCourse(id): Observable<any> {
    return this.http.get(`${baseUrl}/course/${id}`);
  }

  update(course: Course): Observable<Course> {
    return  this.http.put<Course>(`${baseUrl}/course/${course._id}`, course);
  }
}

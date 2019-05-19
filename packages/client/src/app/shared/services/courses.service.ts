import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Course, Courses } from '../../common-shared/interfaces';
import { environment } from '../../../environments/environment';

const { baseUrl } = environment;

@Injectable({
  providedIn: 'root'
})
export class CoursesService {
  constructor(private http: HttpClient) {}

  create(course): Observable<any> {
    return this.http.post<Course>(`${baseUrl}/course`, course);
  }

  fetch(offset = 0): Observable<Courses> {
    return this.http.get<Courses>(`${baseUrl}/course?offset=${offset}`);
  }

  getSingleCourse(id): Observable<Course> {
    return this.http.get<Course>(`${baseUrl}/course/${id}`);
  }

  update(course: Course): Observable<Course> {
    return  this.http.put<Course>(`${baseUrl}/course/${course._id}`, course);
  }

  getUserCourses(offset = 0): Observable<Courses> {
    return this.http.get<Courses>(`${baseUrl}/course/all/user?offset=${offset}`);
  }
}

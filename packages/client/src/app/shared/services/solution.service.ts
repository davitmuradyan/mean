import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Solutions } from '../../common-shared/interfaces';

const { baseUrl } = environment;

@Injectable({
  providedIn: 'root'
})
export class SolutionService {
  constructor(private http: HttpClient) {}

  create(solution): Observable<any> {
    return this.http.post<any>(`${baseUrl}/solution`, solution);
  }

  fetch(offset = 0): Observable<any> {
    return this.http.get<any>(`${baseUrl}/solution?offset=${offset}`);
  }

  getUserSolutions(offset = 0): Observable<Solutions> {
    return this.http.get<Solutions>(`${baseUrl}/solution/user?offset=${offset}`);
  }

  getSingleSolution(id): Observable<any> {
    return this.http.get(`${baseUrl}/solution/${id}`);
  }

  update(solution): Observable<any> {
    return this.http.put(`${baseUrl}/solution/${solution._id}`, solution);
  }

  getSolutionsByCourse(courseId: string): Observable<Solutions> {
    return this.http.get<Solutions>(`${baseUrl}/solution/course/${courseId}`);
  }

  getReviewSolutions(): Observable<Solutions> {
    return this.http.get<Solutions>(`${baseUrl}/solution/all/review`);
  }
}

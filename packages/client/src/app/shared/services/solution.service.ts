import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

const { baseUrl } = environment;

@Injectable({
  providedIn: 'root'
})
export class SolutionService {
  constructor(private http: HttpClient) {}

  create(solution): Observable<any> {
    return this.http.post<any>(`${baseUrl}/solution`, solution);
  }

  fetch(): Observable<any> {
    return this.http.get<any>(`${baseUrl}/solution`);
  }

  getSingleSolution(id): Observable<any> {
    return this.http.get(`${baseUrl}/solution/${id}`);
  }

  update(solution): Observable<any> {
    return this.http.put(`${baseUrl}/solution/${solution._id}`, solution);
  }
}

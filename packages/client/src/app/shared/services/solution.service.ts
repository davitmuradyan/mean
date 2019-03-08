import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { serverUrl } from '../constants/index';

@Injectable({
  providedIn: 'root'
})
export class SolutionService {
  constructor(private http: HttpClient) {}

  create(solution): Observable<any> {
    return this.http.post<any>(`${serverUrl}/solution`, solution);
  }

  fetch(): Observable<any> {
    return this.http.get<any>(`${serverUrl}/solution`);
  }

  getSingleSolution(id): Observable<any> {
    return this.http.get(`${serverUrl}/solution/${id}`);
  }
}

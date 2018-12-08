import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../interfaces';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) {}

  register(user: User): Observable<User> {
    return this.http.post<User>('http://localhost:3000/register', user);
  }

  login(user: User): Observable<any> {
    return this.http.post<any>('http://localhost:3000/login', user);
  }

  verifyEmail(authToken: String): Observable<any> {
    return this.http.put<any>(`http://localhost:3000/verify-email/${authToken}`, {authToken: null, verified: true});
  }

  checkUserEmail(email: String): Observable<any> {
    return this.http.post<any>('http://localhost:3000/checkemail', {email});
  }

  checkUsername(username: String): Observable<any> {
    return this.http.post<any>('http://localhost:3000/checkusername', {username});
  }

  // uploadImage(image: File) {
  //   const fd = new FormData();
  //   fd.append('image', image, image.name)
  //   return this.http.post('http://localhost:3000/upload', fd);
  // }

  storeToken(user: string): void {
    localStorage.setItem('user', JSON.stringify(user));
  }

  getToken() {
    if (localStorage.getItem('user')) {
      const { accessToken } = JSON.parse(localStorage.getItem('user'));
      return accessToken;
    }
    return null;
  }

  getUser() {
    return JSON.parse(localStorage.getItem('user'));
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  logout(): void {
    localStorage.clear();
  }
}

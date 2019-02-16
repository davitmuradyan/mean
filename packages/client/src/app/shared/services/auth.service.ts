import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../interfaces';
import { Observable } from 'rxjs';
import { serverUrl } from '../constants';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) {}

  register(user: User): Observable<User> {
    return this.http.post<User>(`${serverUrl}/register`, user);
  }

  login(user: User): Observable<any> {
    return this.http.post<any>(`${serverUrl}/login`, user);
  }

  verifyEmail(authToken: String): Observable<any> {
    return this.http.put<any>(`${serverUrl}/verify-email/${authToken}`, {authToken: null, verified: true});
  }

  checkUserEmail(email: String): Observable<any> {
    return this.http.post<any>(`${serverUrl}/checkemail`, {email});
  }

  checkUsername(username: String): Observable<any> {
    return this.http.post<any>(`${serverUrl}/checkusername`, {username});
  }

  editProfile(user, image?: File) {
    const fd = new FormData();
    if (image) {
      fd.append('image', image, image.name);
    }
    fd.append('firstname', user.firstname);
    fd.append('lastname', user.lastname);
    fd.append('username', user.username);
    return this.http.put(`${serverUrl}/edit-profile`, fd);
  }

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

  updateLocalStorage(user) {
    const loggedInUser = this.getUser();
    loggedInUser.imgSrc = user.imgSrc;
    loggedInUser.firstname = user.firstname;
    loggedInUser.lastname = user.lastname;
    loggedInUser.username = user.username;
    this.storeToken(loggedInUser);
  }

  logout(): void {
    localStorage.clear();
  }
}

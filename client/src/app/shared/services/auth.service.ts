import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { User } from '../interfaces'
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    constructor(private http: HttpClient) {}

    register(user: User): Observable<User> {
        console.log(user)
        return this.http.post<User>('http://localhost:3000/register', user)
    }

    login(user: User): Observable<any> {
        return this.http.post<any>('http://localhost:3000/login', user)
    }

    verifyEmail(authToken: String) {
        return this.http.put(`http://localhost:3000/verify-email/${authToken}`, {authToken: null, verified: true})
    }

    storeToken(user: string) {
        localStorage.setItem('user', user)
    }

    getToken() {
        return JSON.parse(localStorage.getItem('user'))
    }

    getUser() {
        return JSON.parse(localStorage.getItem('user'))
    }

    isAuthenticated() {
        if(this.getToken()) {
            return true
        }
        return false
    }

    logout() {
        localStorage.clear()
    }
}
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable, isDevMode } from '@angular/core';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class UserBackendService {
  constructor(private http: HttpClient) { }

  public userLogin(user: User): Observable<{ token: string }> {
    return this.http.post<{ token: string }>((isDevMode() ? 'http://localhost:3333' : "https://calendarapp-production-6494.up.railway.app") + '/api/user/login/', user)
  }

  public userAuth(token: string): Observable<User | any> {
    return this.http.get<User | any>((isDevMode() ? 'http://localhost:3333' : "https://calendarapp-production-6494.up.railway.app") + '/api/user/auth/' + token)
  }

  public userRegister(user: User): Observable<User> {
    return this.http.post<User>((isDevMode() ? 'http://localhost:3333' : "https://calendarapp-production-6494.up.railway.app") + '/api/user/register/', user)
  }
}

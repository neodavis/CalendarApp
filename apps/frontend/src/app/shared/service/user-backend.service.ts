import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, isDevMode } from '@angular/core';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class UserBackendService {
  constructor(private http: HttpClient) { }

  public path: string = isDevMode() ? 'http://localhost:3333' : "https://calendarapp-production-6494.up.railway.app";


  public userLogin(username: string, password: string): Observable<{ token: string; }> {
    return this.http.post<{ token: string; }>(this.path + '/api/user/login/', {
      username, password
    });
  }

  public userRegister(username: string, password: string): Observable<User> {
    return this.http.post<User>(this.path + '/api/user/register/', {
      username, password
    });
  }
}

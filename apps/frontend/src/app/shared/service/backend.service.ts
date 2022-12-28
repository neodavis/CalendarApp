import { DeleteResult } from 'typeorm';
import { Absence } from '../interfaces/absence';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable, isDevMode } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BackendService {
  constructor(private http: HttpClient) { }

  public getAbsences(): Observable<Absence[]> {
    return this.http.get<Absence[]>((isDevMode() ? 'http://localhost:3333' : "https://calendarapp-production-6494.up.railway.app") + '/api')
  }
  
  public deleteAbsence(id: number): Observable<DeleteResult> {
    return this.http.delete<DeleteResult>((isDevMode() ? 'http://localhost:3333' : "https://calendarapp-production-6494.up.railway.app") + '/api/delete/' + id)
  }

  public createAbsence(absence: Absence): Observable<Absence | null> {
    return this.http.post<Absence | null>((isDevMode() ? 'http://localhost:3333' : "https://calendarapp-production-6494.up.railway.app") + '/api/create', absence)
  }
  
  public editAbsence(absence: Absence): Observable<Absence | null> {
    return this.http.patch<Absence | null>((isDevMode() ? 'http://localhost:3333' : "https://calendarapp-production-6494.up.railway.app") + '/api/edit', absence)
  }
}

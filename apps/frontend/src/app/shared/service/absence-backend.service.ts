import { DeleteResult } from 'typeorm';
import { Absence } from '../interfaces/absence';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable, isDevMode } from '@angular/core';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class AbsenceBackendService {
  constructor(private http: HttpClient) { }

  public getAbsences(user_id: number): Observable<Absence[]> {
    return this.http.get<Absence[]>((isDevMode() ? 'http://localhost:3333' : "https://calendarapp-production-6494.up.railway.app") + '/api/absences/get/' + user_id)
  }
  
  public deleteAbsence(id: number): Observable<DeleteResult> {
    return this.http.delete<DeleteResult>((isDevMode() ? 'http://localhost:3333' : "https://calendarapp-production-6494.up.railway.app") + '/api/absence/delete/' + id)
  }

  public createAbsence(absence: Absence): Observable<Absence | null> {
    return this.http.post<Absence | null>((isDevMode() ? 'http://localhost:3333' : "https://calendarapp-production-6494.up.railway.app") + '/api/absence/create/', absence)
  }
  
  public editAbsence(absence: Absence): Observable<Absence | null> {
    return this.http.patch<Absence | null>((isDevMode() ? 'http://localhost:3333' : "https://calendarapp-production-6494.up.railway.app") + '/api/absence/edit/', absence)
  }

  }

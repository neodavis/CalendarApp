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

  public getAbsences(token: string): Observable<Absence[]> {
    return this.http.get<Absence[]>((isDevMode() ? 'http://localhost:3333' : "https://calendarapp-production-6494.up.railway.app") + '/api/absences/get/' + token)
  }
  
  public deleteAbsence(id: number, token: string): Observable<DeleteResult> {
    return this.http.delete<DeleteResult>((isDevMode() ? 'http://localhost:3333' : "https://calendarapp-production-6494.up.railway.app") + '/api/absence/delete/' + id + '/' + token)
  }

  public createAbsence(absence: Absence, token: string): Observable<Absence | null> {
    return this.http.post<Absence | null>((isDevMode() ? 'http://localhost:3333' : "https://calendarapp-production-6494.up.railway.app") + '/api/absence/create/' + token, absence)
  }
  
  public editAbsence(absence: Absence, token: string): Observable<Absence | null> {
    return this.http.patch<Absence | null>((isDevMode() ? 'http://localhost:3333' : "https://calendarapp-production-6494.up.railway.app") + '/api/absence/edit/' + token, absence)
  }

  }

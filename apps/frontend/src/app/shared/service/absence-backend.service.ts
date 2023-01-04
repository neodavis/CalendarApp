import { DeleteResult } from 'typeorm';
import { Absence } from '../interfaces/absence';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable, isDevMode } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AbsenceBackendService {
  constructor(private http: HttpClient) { }

  public path: string = isDevMode() ? 'http://localhost:3333' : "https://calendarapp-production-6494.up.railway.app";

  public getAbsences(): Observable<Absence[]> {
    return this.http.get<Absence[]>(this.path + '/api/absence/get/');
  }

  public deleteAbsence(id: number): Observable<DeleteResult> {
    return this.http.delete<DeleteResult>(this.path + '/api/absence/delete/' + id);
  }

  public createAbsence(absence: Absence): Observable<Absence | null> {
    return this.http.post<Absence | null>(this.path + '/api/absence/create/', {
      absence
    });
  }

  public editAbsence(absence: Absence): Observable<Absence | null> {
    return this.http.patch<Absence | null>(this.path + '/api/absence/edit/', {
      absence
    });
  }
}

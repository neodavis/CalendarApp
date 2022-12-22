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
    return this.http.get<Absence[]>((isDevMode() ? 'http://localhost:3333' : window.location.origin) + '/api')
  }
  
  public deleteAbsence(id: number): Observable<DeleteResult> {
    return this.http.delete<DeleteResult>((isDevMode() ? 'http://localhost:3333' : window.location.origin) + '/api/delete/' + id)
  }

  public createAbsence(absence: Absence): Observable<Absence | null> {
    return this.http.post<Absence | null>((isDevMode() ? 'http://localhost:3333' : window.location.origin) + '/api/create', absence)
  }
  
  public editAbsence(absence: Absence): Observable<Absence | null> {
    return this.http.patch<Absence | null>((isDevMode() ? 'http://localhost:3333' : window.location.origin) + '/api/edit', absence)
  }
}

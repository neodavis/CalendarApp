import { Absence } from '../interfaces/absence';
import { delay, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  constructor(private http: HttpClient) { }

  getAbsences(): Observable<Absence[]> {
    return this.http.get<Absence[]>('http://localhost:3333/api').pipe(delay(300))
  }
  
  deleteAbsence(id: number): Observable<Absence[]> {
    return this.http.post<Absence[]>('http://localhost:3333/api/delete', {id: id}).pipe(delay(300))
  }

  createAbsence(absence: Absence): Observable<Absence[]> {
    return this.http.post<Absence[]>('http://localhost:3333/api/create', {absence: absence}).pipe(delay(300))
  }
  
  editAbsence(absence: Absence): Observable<Absence[]> {
    return this.http.post<Absence[]>('http://localhost:3333/api/edit', {absence: absence}).pipe(delay(300))
  }
}

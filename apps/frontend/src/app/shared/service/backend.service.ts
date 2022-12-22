import { Absence } from '../interfaces/absence';
import { delay, Observable } from 'rxjs';
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
  
  public deleteAbsence(id: number): Observable<boolean> {
    return this.http.delete<boolean>((isDevMode() ? 'http://localhost:3333' : window.location.origin) + '/api/delete/' + id)
  }

  public createAbsence(absence: Absence): Observable<Absence> {
    return this.http.post<Absence>((isDevMode() ? 'http://localhost:3333' : window.location.origin) + '/api/create', {absence: absence})
  }
  
  public editAbsence(absence: Absence): Observable<Absence> {
    return this.http.patch<Absence>((isDevMode() ? 'http://localhost:3333' : window.location.origin) + '/api/edit', {absence: absence})
  }
}

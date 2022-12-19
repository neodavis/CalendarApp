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
    return this.http.get<Absence[]>('http://localhost:3333/api').pipe(delay(1000))
  }
}

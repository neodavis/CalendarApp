import { AppState } from './shared/interfaces/app-state';
import { Observable } from 'rxjs';
import { tokenSelector } from './shared/store/users/selectors';
import { Component } from '@angular/core';
import { Store } from '@ngrx/store';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  private token$: Observable<string | null>

  constructor(private store: Store<AppState>) {
    this.token$ = this.store.select(tokenSelector)
  }

  public ngOnInit(): void {
    this.token$.subscribe((token: string | null) => {
      if (token) { localStorage.setItem('token', String(token)) }
    })
  }
}

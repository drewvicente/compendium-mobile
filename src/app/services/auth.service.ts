import { Injectable, computed, signal } from '@angular/core';

export interface StudentUser {
  id: number;
  lrn: string;
  firstName: string;
  lastName: string;
  program: string;
  yearLevel: string;
}

// Demo-only credentials — this app has no backend. In the real system
// this is the LRN + password checked against the students table.
const DEMO_LRN = '100000000001';
const DEMO_PASSWORD = 'student123';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly _user = signal<StudentUser | null>(null);
  private readonly _lastError = signal<string | null>(null);

  readonly user = this._user.asReadonly();
  readonly lastError = this._lastError.asReadonly();
  readonly isAuthenticated = computed(() => this._user() !== null);
  readonly demoCredentials = { lrn: DEMO_LRN, password: DEMO_PASSWORD };

  login(lrn: string, password: string): boolean {
    const trimmedLrn = lrn.trim();

    if (!trimmedLrn || !password) {
      this._lastError.set('Please fill in all fields.');
      return false;
    }

    if (trimmedLrn === DEMO_LRN && password === DEMO_PASSWORD) {
      this._user.set({
        id: 1,
        lrn: DEMO_LRN,
        firstName: 'Pedro',
        lastName: 'Ramos',
        program: 'BS Information Technology',
        yearLevel: '4th Year',
      });
      this._lastError.set(null);
      return true;
    }

    this._lastError.set('Invalid LRN or password.');
    return false;
  }

  logout(): void {
    this._user.set(null);
  }
}

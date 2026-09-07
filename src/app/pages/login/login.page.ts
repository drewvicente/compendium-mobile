import { Component, signal, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import {
  IonContent,
  IonIcon,
  IonInput,
  IonButton,
  IonSpinner,
} from '@ionic/angular';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, IonContent, IonIcon, IonInput, IonButton, IonSpinner],
  templateUrl: './login.page.html',
  styleUrl: './login.page.scss',
})
export class LoginPage {
  private auth = inject(AuthService);
  private router = inject(Router);

  lrn = signal('');
  password = signal('');
  error = signal<string | null>(null);
  loading = signal(false);

  readonly demo = this.auth.demoCredentials;

  fillDemoCredentials(): void {
    this.lrn.set(this.demo.lrn);
    this.password.set(this.demo.password);
    this.error.set(null);
  }

  submit(): void {
    this.error.set(null);
    this.loading.set(true);

    // Simulated network delay so the loading state is visible in the demo
    setTimeout(() => {
      const ok = this.auth.login(this.lrn(), this.password());
      this.loading.set(false);
      if (ok) {
        this.router.navigateByUrl('/app/manuscripts');
      } else {
        this.error.set(this.auth.lastError());
      }
    }, 450);
  }
}

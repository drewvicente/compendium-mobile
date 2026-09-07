import { Component, Input, OnInit, inject } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonBackButton,
  IonContent,
  IonButton,
  IonIcon,
  ToastController,
} from '@ionic/angular';
import { ManuscriptService } from '../../services/manuscript.service';
import { Manuscript } from '../../models/manuscript.model';
import { StatusChipComponent } from '../../components/status-chip/status-chip.component';

@Component({
  selector: 'app-manuscript-detail',
  standalone: true,
  imports: [
    DatePipe,
    RouterLink,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonButtons,
    IonBackButton,
    IonContent,
    IonButton,
    IonIcon,
    StatusChipComponent,
  ],
  templateUrl: './manuscript-detail.page.html',
  styleUrl: './manuscript-detail.page.scss',
})
export class ManuscriptDetailPage implements OnInit {
  // Bound automatically from the /app/manuscripts/:id route param
  // (see provideRouter(routes, withComponentInputBinding()) in app.config.ts).
  @Input() id!: string;

  private manuscripts = inject(ManuscriptService);
  private toastCtrl = inject(ToastController);
  private router = inject(Router);

  manuscript?: Manuscript;

  ngOnInit(): void {
    this.manuscript = this.manuscripts.getById(Number(this.id));
  }

  async resubmit(): Promise<void> {
    if (!this.manuscript) return;
    this.manuscripts.resubmit(this.manuscript.id);

    const toast = await this.toastCtrl.create({
      message: 'Marked as revised and resubmitted for review.',
      duration: 2000,
      position: 'top',
      color: 'success',
    });
    await toast.present();
    this.router.navigateByUrl('/app/manuscripts');
  }
}

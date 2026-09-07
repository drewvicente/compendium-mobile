import { Component, computed, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonButton,
  IonContent,
  IonSegment,
  IonSegmentButton,
  IonLabel,
  IonIcon,
} from '@ionic/angular';
import { AuthService } from '../../services/auth.service';
import { ManuscriptService } from '../../services/manuscript.service';
import { ManuscriptCardComponent } from '../../components/manuscript-card/manuscript-card.component';

type FilterKey = 'all' | 'pending' | 'revision' | 'published';

@Component({
  selector: 'app-manuscripts',
  standalone: true,
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonButtons,
    IonButton,
    IonContent,
    IonSegment,
    IonSegmentButton,
    IonLabel,
    IonIcon,
    ManuscriptCardComponent,
  ],
  templateUrl: './manuscripts.page.html',
  styleUrl: './manuscripts.page.scss',
})
export class ManuscriptsPage {
  private manuscripts = inject(ManuscriptService);
  private auth = inject(AuthService);
  private router = inject(Router);

  readonly user = this.auth.user;
  filter = signal<FilterKey>('all');

  readonly filtered = computed(() => {
    const list = this.manuscripts.sortedManuscripts();
    switch (this.filter()) {
      case 'pending':
        return list.filter((m) => m.status === 'submitted' || m.status === 'approved_faculty');
      case 'revision':
        return list.filter(
          (m) => m.status === 'revision_required' || m.status === 'revision_edited',
        );
      case 'published':
        return list.filter((m) => m.status === 'published');
      default:
        return list;
    }
  });

  onFilterChange(event: CustomEvent): void {
    this.filter.set(event.detail.value as FilterKey);
  }

  logout(): void {
    this.auth.logout();
    this.router.navigateByUrl('/login');
  }
}

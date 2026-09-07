import { Component, Input } from '@angular/core';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { IonIcon } from '@ionic/angular';
import { Manuscript, STATUS_ICON } from '../../models/manuscript.model';
import { StatusChipComponent } from '../status-chip/status-chip.component';

/**
 * Reusable manuscript summary card.
 * Used inside the @for loop on the Manuscripts list page. Each card is
 * itself a routerLink — tapping it navigates to /app/manuscripts/:id
 * without any click handler wired up by the parent page.
 */
@Component({
  selector: 'app-manuscript-card',
  standalone: true,
  imports: [DatePipe, RouterLink, IonIcon, StatusChipComponent],
  templateUrl: './manuscript-card.component.html',
  styleUrl: './manuscript-card.component.scss',
})
export class ManuscriptCardComponent {
  @Input({ required: true }) manuscript!: Manuscript;

  readonly statusIcon = STATUS_ICON;
}

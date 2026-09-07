import { Component, Input } from '@angular/core';
import { IonIcon } from '@ionic/angular';
import { ManuscriptStatus, STATUS_ICON, STATUS_LABEL } from '../../models/manuscript.model';

/**
 * Reusable status chip.
 * Give it a manuscript status and it renders the right icon, label and
 * color everywhere it's used — the manuscript card, the detail page, or
 * anywhere else a status needs to show up.
 */
@Component({
  selector: 'app-status-chip',
  standalone: true,
  imports: [IonIcon],
  template: `
    <span class="status-chip" [class]="'status-' + status" [class.lg]="large">
      @if (large) {
        <ion-icon [name]="icon"></ion-icon>
      }
      {{ label }}
    </span>
  `,
  styles: [
    `
      :host {
        display: inline-flex;
      }
      .lg {
        font-size: 12.5px;
        padding: 7px 14px;
      }
    `,
  ],
})
export class StatusChipComponent {
  @Input({ required: true }) status!: ManuscriptStatus;
  /** Larger variant with icon, used on the detail page header. */
  @Input() large = false;

  get label(): string {
    return STATUS_LABEL[this.status];
  }

  get icon(): string {
    return STATUS_ICON[this.status];
  }
}

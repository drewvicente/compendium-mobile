import { addIcons } from 'ionicons';
import {
  schoolOutline,
  personOutline,
  lockClosedOutline,
  arrowForwardOutline,
  arrowBackOutline,
  informationCircleOutline,
  logOutOutline,
  documentsOutline,
  documentTextOutline,
  ribbonOutline,
  timeOutline,
  alertCircleOutline,
  checkmarkCircleOutline,
  closeCircleOutline,
  syncOutline,
  chevronForwardOutline,
} from 'ionicons/icons';

/** Registers every icon used anywhere in the app, once, at bootstrap. */
export function registerAppIcons(): void {
  addIcons({
    schoolOutline,
    personOutline,
    lockClosedOutline,
    arrowForwardOutline,
    arrowBackOutline,
    informationCircleOutline,
    logOutOutline,
    documentsOutline,
    documentTextOutline,
    ribbonOutline,
    timeOutline,
    alertCircleOutline,
    checkmarkCircleOutline,
    closeCircleOutline,
    syncOutline,
    chevronForwardOutline,
  });
}

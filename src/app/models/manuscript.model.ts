export type ManuscriptStatus =
  | 'submitted'
  | 'approved_faculty'
  | 'published'
  | 'revision_required'
  | 'revision_edited'
  | 'denied';

export interface Manuscript {
  id: number;
  title: string;
  author: string;
  abstract: string;
  keywords: string;
  fileName: string;
  status: ManuscriptStatus;
  submittedAt: string; // ISO date string
  facultyRemarks?: string;
  headRemarks?: string;
  denyReason?: string;
  revisionReason?: string;
}

export const STATUS_LABEL: Record<ManuscriptStatus, string> = {
  submitted: 'Pending Review',
  approved_faculty: 'Faculty Approved',
  published: 'Published',
  revision_required: 'Needs Revision',
  revision_edited: 'Revision Submitted',
  denied: 'Denied',
};

export const STATUS_ICON: Record<ManuscriptStatus, string> = {
  submitted: 'time-outline',
  approved_faculty: 'checkmark-circle-outline',
  published: 'ribbon-outline',
  revision_required: 'alert-circle-outline',
  revision_edited: 'sync-outline',
  denied: 'close-circle-outline',
};

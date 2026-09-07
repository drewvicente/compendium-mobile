import { Injectable, computed, signal } from '@angular/core';
import { Manuscript } from '../models/manuscript.model';

const SEED: Manuscript[] = [
  {
    id: 1,
    title: 'Optimizing Small-Scale Solar Microgrids for Rural Electrification',
    author: 'Pedro Ramos',
    abstract:
      'This research presents a techno-economic model for optimizing solar microgrid sizing in off-grid rural communities, balancing installation cost against reliability targets.',
    keywords: 'renewable energy, microgrid, rural electrification',
    fileName: 'solar-microgrids-ramos.pdf',
    status: 'published',
    submittedAt: '2026-06-02T14:10:00',
    facultyRemarks: 'Excellent technical rigor.',
    headRemarks: 'Approved for publication — strong contribution to the field.',
  },
  {
    id: 2,
    title: 'Machine Learning Approaches to Crop Yield Prediction in Central Luzon',
    author: 'Pedro Ramos',
    abstract:
      'This study explores the application of machine learning models to predict crop yields using historical weather and soil data from Central Luzon farms.',
    keywords: 'machine learning, agriculture, crop yield',
    fileName: 'crop-yield-ml-ramos.pdf',
    status: 'submitted',
    submittedAt: '2026-08-18T09:40:00',
  },
  {
    id: 3,
    title: 'Blockchain-Based Land Title Verification: A Feasibility Study',
    author: 'Pedro Ramos',
    abstract:
      'This paper examines the technical and regulatory feasibility of using blockchain ledgers to verify land title authenticity in the Philippines.',
    keywords: 'blockchain, land titling, feasibility study',
    fileName: 'blockchain-land-titles-ramos.pdf',
    status: 'revision_required',
    submittedAt: '2026-07-20T13:15:00',
    revisionReason:
      'Scope overlaps significantly with an existing published thesis. Please narrow the angle and clarify your original contribution before resubmitting.',
  },
  {
    id: 4,
    title: 'A Low-Cost IoT Water Quality Monitoring System for Rural Wells',
    author: 'Pedro Ramos',
    abstract:
      'This paper details the design and field-testing of a low-cost IoT sensor array for continuous monitoring of pH, turbidity, and TDS in rural community wells.',
    keywords: 'IoT, water quality, environmental monitoring',
    fileName: 'iot-water-quality-ramos.pdf',
    status: 'approved_faculty',
    submittedAt: '2026-08-05T11:00:00',
    facultyRemarks: 'Well-structured methodology. Forwarded to the research head for final review.',
  },
];

@Injectable({ providedIn: 'root' })
export class ManuscriptService {
  private readonly _manuscripts = signal<Manuscript[]>(SEED);
  private nextId = SEED.length + 1;

  readonly manuscripts = this._manuscripts.asReadonly();

  getById(id: number): Manuscript | undefined {
    return this._manuscripts().find((m) => m.id === id);
  }

  readonly sortedManuscripts = computed(() =>
    [...this._manuscripts()].sort(
      (a, b) => new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime(),
    ),
  );

  readonly stats = computed(() => {
    const list = this._manuscripts();
    return {
      total: list.length,
      published: list.filter((m) => m.status === 'published').length,
      pending: list.filter((m) => m.status === 'submitted' || m.status === 'approved_faculty')
        .length,
      needsRevision: list.filter(
        (m) => m.status === 'revision_required' || m.status === 'revision_edited',
      ).length,
    };
  });

  submit(entry: {
    title: string;
    author: string;
    abstract: string;
    keywords: string;
    fileName: string;
  }): void {
    const manuscript: Manuscript = {
      id: this.nextId++,
      title: entry.title,
      author: entry.author,
      abstract: entry.abstract,
      keywords: entry.keywords,
      fileName: entry.fileName,
      status: 'submitted',
      submittedAt: new Date().toISOString(),
    };
    this._manuscripts.update((list) => [manuscript, ...list]);
  }

  resubmit(id: number): void {
    this._manuscripts.update((list) =>
      list.map((m) =>
        m.id === id
          ? { ...m, status: 'revision_edited' as const, submittedAt: new Date().toISOString() }
          : m,
      ),
    );
  }
}

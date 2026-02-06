
export interface Component {
  id: string;
  name: string;
  type: string;
  value: string;
  package: string;
  position: { x: number; y: number; z: number };
  rotation: number;
  net?: string;
}

export interface ChangeCard {
  id: string;
  intent: string;
  description: string;
  affectedItems: string[];
  status: 'applied' | 'error' | 'pending';
  timestamp: Date;
}

export type FidelityMode = 'Concept' | 'Draft' | 'Production';
export type ViewMode = 'Layout' | 'Schematic' | '3D';

export interface AppState {
  components: Component[];
  history: ChangeCard[];
  fidelity: FidelityMode;
  view: ViewMode;
  selectedId: string | null;
}

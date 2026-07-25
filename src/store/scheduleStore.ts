import { create } from 'zustand';
import { ScheduleEntry, Professional } from '@/types/Schedule';

interface ScheduleState {
  entries: ScheduleEntry[];
  selectedProfessional: string | null;
  setEntries: (entries: ScheduleEntry[]) => void;
  setSelectedProfessional: (name: string | null) => void;
  getProfessionalSchedule: (name: string) => ScheduleEntry[];
  highlightProfessional: (name: string) => void;
}

export const useScheduleStore = create<ScheduleState>((set, get) => ({
  entries: [],
  selectedProfessional: null,
  setEntries: (entries) => set({ entries }),
  setSelectedProfessional: (name) => set({ selectedProfessional: name }),
  getProfessionalSchedule: (name: string) => {
    const entries = get().entries;
    return entries.filter((entry) =>
      entry.professionals.some((prof) => prof.name === name)
    );
  },
  highlightProfessional: (name: string) => {
    set({
      entries: get().entries.map((entry) => ({
        ...entry,
        professionals: entry.professionals.map((prof) => ({
          ...prof,
          highlighted: prof.name === name,
        })),
      })),
    });
  },
}));

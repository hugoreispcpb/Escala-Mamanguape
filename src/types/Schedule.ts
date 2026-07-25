export interface Professional {
  id: string;
  name: string;
  highlighted?: boolean;
}

export interface ScheduleEntry {
  id: string;
  day: number;
  dayName: string;
  date: Date;
  shiftTime: string;
  professionals: Professional[];
}

export interface MonthSchedule {
  month: number;
  year: number;
  entries: ScheduleEntry[];
}

export type ViewMode = 'calendar' | 'list' | 'table';

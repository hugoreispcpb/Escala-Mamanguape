import { ScheduleEntry } from '@/types/Schedule';

interface DayCardProps {
  day: number;
  entry?: ScheduleEntry;
  highlighted?: string;
  opacity?: number;
}

export default function DayCard({ day, entry, highlighted, opacity = 1 }: DayCardProps) {
  if (!entry) {
    return (
      <div className="border-2 border-gray-300 rounded-lg p-3 min-h-[200px] bg-gray-50"></div>
    );
  }

  return (
    <div 
      className="border-2 border-gray-300 rounded-lg p-3 min-h-[200px] bg-white hover:shadow-md transition overflow-hidden"
      style={{ opacity }}
    >
      {/* Dia */}
      <div className="font-bold text-lg mb-2">DIA {day}</div>

      {/* Horário */}
      <div className="text-xs text-gray-600 mb-2 font-semibold">
        {entry.shiftTime}
      </div>

      {/* Profissionais */}
      <div className="space-y-1">
        {entry.professionals.map((prof, idx) => {
          const isHighlighted = highlighted && prof.name.toLowerCase().includes(highlighted.toLowerCase());
          return (
            <div
              key={idx}
              className={`text-xs p-1.5 rounded truncate ${
                prof.highlighted || isHighlighted
                  ? 'bg-yellow-300 font-bold text-gray-800'
                  : 'bg-gray-100 text-gray-700'
              }`}
              title={prof.name}
            >
              {prof.name}
            </div>
          );
        })}
      </div>
    </div>
  );
}

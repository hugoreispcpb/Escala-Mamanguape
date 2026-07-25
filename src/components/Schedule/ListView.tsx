import { ScheduleEntry } from '@/types/Schedule';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface ListViewProps {
  entries: ScheduleEntry[];
  onRequestShift?: (entry: ScheduleEntry) => void;
}

export default function ListView({ entries, onRequestShift }: ListViewProps) {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <table className="w-full">
        <thead>
          <tr className="bg-gray-800 text-white">
            <th className="px-6 py-3 text-left">Data</th>
            <th className="px-6 py-3 text-left">Horário</th>
            <th className="px-6 py-3 text-left">Profissionais</th>
            {onRequestShift && <th className="px-6 py-3 text-left">Ações</th>}
          </tr>
        </thead>
        <tbody>
          {entries.map((entry, idx) => (
            <tr
              key={entry.id}
              className={`border-t ${
                idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'
              } hover:bg-blue-50 transition`}
            >
              <td className="px-6 py-3">
                <div className="font-semibold">
                  {format(entry.date, 'dd/MM/yyyy', { locale: ptBR })}
                </div>
                <div className="text-sm text-gray-600">{entry.dayName}</div>
              </td>
              <td className="px-6 py-3 text-sm">{entry.shiftTime}</td>
              <td className="px-6 py-3">
                <div className="flex flex-wrap gap-2">
                  {entry.professionals.map((prof) => (
                    <span
                      key={prof.id}
                      className={`px-3 py-1 rounded-full text-sm ${
                        prof.highlighted
                          ? 'bg-yellow-300 font-bold text-gray-800'
                          : 'bg-gray-200 text-gray-700'
                      }`}
                    >
                      {prof.name}
                    </span>
                  ))}
                </div>
              </td>
              {onRequestShift && (
                <td className="px-6 py-3">
                  <button
                    onClick={() => onRequestShift(entry)}
                    className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition"
                  >
                    Solicitar
                  </button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

import { useState } from 'react';
import { ChevronLeft, ChevronRight, Download, List, LayoutGrid } from 'lucide-react';
import { format, getDaysInMonth, getDay } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import DayCard from './DayCard';
import ListView from './ListView';
import FilterBar from './FilterBar';
import { useScheduleStore } from '@/store/scheduleStore';
import { mockScheduleData } from '@/data/mockSchedule';

type ViewMode = 'calendar' | 'list';

export default function ScheduleCalendar() {
  const [currentMonth, setCurrentMonth] = useState(new Date(2026, 6, 1));
  const [viewMode, setViewMode] = useState<ViewMode>('calendar');
  const [searchTerm, setSearchTerm] = useState('');
  const { entries, setEntries } = useScheduleStore();

  // Initialize with mock data
  if (entries.length === 0) {
    setEntries(mockScheduleData);
  }

  const handlePrevMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1)
    );
  };

  const handleNextMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1)
    );
  };

  const daysInMonth = getDaysInMonth(currentMonth);
  const firstDayOfMonth = getDay(new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1));

  const monthEntries = entries.filter(
    (entry) =>
      entry.date.getMonth() === currentMonth.getMonth() &&
      entry.date.getFullYear() === currentMonth.getFullYear()
  );

  const filteredEntries = monthEntries.filter((entry) =>
    entry.professionals.some((prof) =>
      prof.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const handleDownloadPDF = () => {
    // PDF download functionality will be added
    console.log('Downloading PDF...');
  };

  return (
    <div className="w-full space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={handlePrevMonth}
            className="p-2 hover:bg-gray-100 rounded-lg transition"
          >
            <ChevronLeft size={24} />
          </button>
          <h2 className="text-3xl font-bold text-center flex-1">
            Escala de Plantão - {format(currentMonth, 'MMMM yyyy', { locale: ptBR })}
          </h2>
          <button
            onClick={handleNextMonth}
            className="p-2 hover:bg-gray-100 rounded-lg transition"
          >
            <ChevronRight size={24} />
          </button>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div className="flex gap-2">
            <button
              onClick={() => setViewMode('calendar')}
              className={`p-2 rounded-lg transition ${
                viewMode === 'calendar'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 hover:bg-gray-200'
              }`}
              title="Visualização de Calendário"
            >
              <LayoutGrid size={20} />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-lg transition ${
                viewMode === 'list'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 hover:bg-gray-200'
              }`}
              title="Visualização em Lista"
            >
              <List size={20} />
            </button>
          </div>
          <button
            onClick={handleDownloadPDF}
            className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
          >
            <Download size={20} />
            Download PDF
          </button>
        </div>
      </div>

      {/* Filter */}
      <FilterBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      {/* Content */}
      {viewMode === 'calendar' ? (
        <div className="bg-white rounded-lg shadow-lg p-6">
          {/* Days of week */}
          <div className="grid grid-cols-7 gap-2 mb-4">
            {['DOM', 'SEG', 'TER', 'QUA', 'QUI', 'SEX', 'SÁB'].map((day) => (
              <div
                key={day}
                className="text-center font-bold bg-gray-800 text-white p-3 rounded-lg"
              >
                {day}
              </div>
            ))}
          </div>

          {/* Empty cells and days */}
          <div className="grid grid-cols-7 gap-2 auto-rows-max">
            {/* Empty cells for days before month starts */}
            {Array.from({ length: firstDayOfMonth }).map((_, i) => (
              <div key={`empty-${i}`} className="min-h-[200px]"></div>
            ))}

            {/* Days */}
            {Array.from({ length: daysInMonth }).map((_, i) => {
              const day = i + 1;
              const entry = monthEntries.find((e) => e.day === day);
              return (
                <DayCard
                  key={day}
                  day={day}
                  entry={entry}
                  highlighted={searchTerm}
                />
              );
            })}
          </div>
        </div>
      ) : (
        <ListView entries={filteredEntries} />
      )}
    </div>
  );
}

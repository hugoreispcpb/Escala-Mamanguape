import { useState } from 'react';
import { ChevronLeft, ChevronRight, Download, List, LayoutGrid, FileText } from 'lucide-react';
import { format, getDaysInMonth, getDay } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import DayCard from './DayCard';
import ListView from './ListView';
import FilterBar from './FilterBar';
import ScheduleStats from './ScheduleStats';
import ProfessionalFilter from './ProfessionalFilter';
import NotificationCenter from './NotificationCenter';
import ShiftRequest from './ShiftRequest';
import { exportScheduleToPDF, exportScheduleToCSV } from './PDFExport';
import { useScheduleStore } from '@/store/scheduleStore';
import { mockScheduleData } from '@/data/mockSchedule';
import { ScheduleEntry } from '@/types/Schedule';

type ViewMode = 'calendar' | 'list';

export default function ScheduleCalendar() {
  const [currentMonth, setCurrentMonth] = useState(new Date(2026, 6, 1));
  const [viewMode, setViewMode] = useState<ViewMode>('calendar');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProfessional, setSelectedProfessional] = useState<string | null>(null);
  const [shiftRequestOpen, setShiftRequestOpen] = useState(false);
  const [selectedShift, setSelectedShift] = useState<ScheduleEntry | undefined>();
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

  let filteredEntries = monthEntries;

  // Apply search filter
  if (searchTerm) {
    filteredEntries = filteredEntries.filter((entry) =>
      entry.professionals.some((prof) =>
        prof.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }

  // Apply professional filter
  if (selectedProfessional) {
    filteredEntries = filteredEntries.filter((entry) =>
      entry.professionals.some((prof) => prof.name === selectedProfessional)
    );
  }

  const handleDownloadPDF = () => {
    exportScheduleToPDF(filteredEntries, currentMonth);
  };

  const handleDownloadCSV = () => {
    exportScheduleToCSV(filteredEntries);
  };

  const handleShiftRequest = (entry: ScheduleEntry) => {
    setSelectedShift(entry);
    setShiftRequestOpen(true);
  };

  const allProfessionals = Array.from(
    new Set(entries.flatMap((e) => e.professionals.map((p) => p.name)))
  );

  return (
    <div className="w-full space-y-6">
      {/* Top Bar with Notifications */}
      <div className="bg-white rounded-lg shadow-lg p-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Escala Mamanguape</h1>
        <div className="flex items-center gap-4">
          <NotificationCenter />
        </div>
      </div>

      {/* Statistics */}
      <ScheduleStats entries={filteredEntries} selectedProfessional={selectedProfessional} />

      {/* Professional Filter */}
      <ProfessionalFilter onProfessionalSelect={setSelectedProfessional} />

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
          <div className="flex gap-2">
            <button
              onClick={handleDownloadPDF}
              className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition text-sm font-medium"
              title="Download em PDF"
            >
              <Download size={18} />
              PDF
            </button>
            <button
              onClick={handleDownloadCSV}
              className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition text-sm font-medium"
              title="Download em CSV"
            >
              <FileText size={18} />
              CSV
            </button>
          </div>
        </div>
      </div>

      {/* Filter */}
      <FilterBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      {/* Content */}
      {viewMode === 'calendar' ? (
        <div className="bg-white rounded-lg shadow-lg p-6" id="schedule-to-print">
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
              const isFiltered = filteredEntries.some((e) => e.day === day);
              return (
                <div
                  key={day}
                  onClick={() => {
                    if (entry && isFiltered) {
                      handleShiftRequest(entry);
                    }
                  }}
                  className={isFiltered && entry ? 'cursor-pointer' : ''}
                >
                  <DayCard
                    day={day}
                    entry={entry}
                    highlighted={searchTerm}
                    opacity={!isFiltered && filteredEntries.length > 0 ? 0.3 : 1}
                  />
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <ListView entries={filteredEntries} onRequestShift={handleShiftRequest} />
      )}

      {/* Shift Request Modal */}
      <ShiftRequest
        isOpen={shiftRequestOpen}
        onClose={() => setShiftRequestOpen(false)}
        selectedShift={selectedShift}
        professionals={allProfessionals}
      />
    </div>
  );
}

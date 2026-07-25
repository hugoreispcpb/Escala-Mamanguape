import { useEffect, useState } from 'react';
import { useScheduleStore } from '@/store/scheduleStore';

interface ProfessionalFilterProps {
  onProfessionalSelect: (name: string | null) => void;
}

export default function ProfessionalFilter({ onProfessionalSelect }: ProfessionalFilterProps) {
  const { entries } = useScheduleStore();
  const [professionals, setProfessionals] = useState<string[]>([]);
  const [selectedProfessional, setSelectedProfessional] = useState<string | null>(null);

  useEffect(() => {
    // Extract unique professionals from entries
    const uniqueProfessionals = Array.from(
      new Set(entries.flatMap((entry) => entry.professionals.map((prof) => prof.name)))
    ).sort();
    setProfessionals(uniqueProfessionals);
  }, [entries]);

  const handleSelect = (name: string | null) => {
    setSelectedProfessional(name);
    onProfessionalSelect(name);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-4">
      <h3 className="font-bold mb-4 text-lg">Meu Plantão</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
        {professionals.map((prof) => (
          <button
            key={prof}
            onClick={() => handleSelect(selectedProfessional === prof ? null : prof)}
            className={`px-4 py-2 rounded-lg font-medium transition text-sm ${
              selectedProfessional === prof
                ? 'bg-yellow-400 text-gray-800 ring-2 ring-yellow-600'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {prof}
          </button>
        ))}
      </div>
      {selectedProfessional && (
        <button
          onClick={() => handleSelect(null)}
          className="mt-4 w-full px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition font-medium"
        >
          Limpar Seleção
        </button>
      )}
    </div>
  );
}

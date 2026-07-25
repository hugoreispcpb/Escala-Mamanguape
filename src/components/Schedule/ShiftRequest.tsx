import { useState } from 'react';
import { X } from 'lucide-react';
import { ScheduleEntry } from '@/types/Schedule';

interface ShiftRequestProps {
  isOpen: boolean;
  onClose: () => void;
  selectedShift?: ScheduleEntry;
  professionals: string[];
}

export default function ShiftRequest({
  isOpen,
  onClose,
  selectedShift,
  professionals,
}: ShiftRequestProps) {
  const [requestTo, setRequestTo] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen || !selectedShift) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Here you would typically send the request to a backend
    console.log({
      from: 'Current User',
      to: requestTo,
      shift: selectedShift,
      message,
      date: new Date(),
    });

    setSubmitted(true);
    setTimeout(() => {
      setRequestTo('');
      setMessage('');
      setSubmitted(false);
      onClose();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-2xl max-w-md w-full mx-4">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold">Solicitar Permuta de Turno</h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded transition"
          >
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {submitted ? (
            <div className="text-center py-8">
              <div className="text-4xl mb-3">✅</div>
              <p className="text-green-600 font-bold text-lg">Solicitação enviada!</p>
              <p className="text-gray-600 text-sm mt-2">
                {requestTo} receberá sua solicitação em breve.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Shift Info */}
              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600">Plantão selecionado:</p>
                <p className="font-bold text-lg">
                  {selectedShift.dayName} - {selectedShift.shiftTime}
                </p>
              </div>

              {/* Request To */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Solicitar para:
                </label>
                <select
                  value={requestTo}
                  onChange={(e) => setRequestTo(e.target.value)}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Selecione um profissional</option>
                  {professionals.map((prof) => (
                    <option key={prof} value={prof}>
                      {prof}
                    </option>
                  ))}
                </select>
              </div>

              {/* Message */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Mensagem (opcional):
                </label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Digite sua mensagem..."
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                />
              </div>

              {/* Buttons */}
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition font-medium"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={!requestTo}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition font-medium"
                >
                  Enviar Solicitação
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

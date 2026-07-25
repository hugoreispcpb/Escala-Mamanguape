import { useLocation } from 'wouter';
import { Calendar } from 'lucide-react';

export default function Home() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600">
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center text-white">
          <Calendar size={64} className="mx-auto mb-6" />
          <h1 className="text-5xl font-bold mb-4">Escala Mamanguape</h1>
          <p className="text-xl mb-8 opacity-90">Sistema moderno de visualização de plantões</p>
          <button
            onClick={() => setLocation('/escala')}
            className="px-8 py-3 bg-white text-blue-600 font-bold rounded-lg hover:bg-gray-100 transition"
          >
            Acessar Escala
          </button>
        </div>
      </div>
    </div>
  );
}

import { useEffect, useState } from 'react';
import { Bell, X } from 'lucide-react';

export interface Notification {
  id: string;
  type: 'info' | 'success' | 'warning' | 'error';
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
}

export default function NotificationCenter() {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      type: 'info',
      title: 'Próximo Plantão',
      message: 'Você tem plantão em 3 dias',
      timestamp: new Date(),
      read: false,
    },
  ]);
  const [isOpen, setIsOpen] = useState(false);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const handleMarkAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const handleClearAll = () => {
    setNotifications([]);
    setIsOpen(false);
  };

  const handleRemove = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const getNotificationColor = (type: string) => {
    switch (type) {
      case 'success':
        return 'bg-green-50 border-green-200';
      case 'error':
        return 'bg-red-50 border-red-200';
      case 'warning':
        return 'bg-yellow-50 border-yellow-200';
      default:
        return 'bg-blue-50 border-blue-200';
    }
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'success':
        return '✅';
      case 'error':
        return '❌';
      case 'warning':
        return '⚠️';
      default:
        return 'ℹ️';
    }
  };

  return (
    <div className="relative">
      {/* Bell Icon */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 hover:bg-gray-100 rounded-lg transition"
      >
        <Bell size={24} />
        {unreadCount > 0 && (
          <span className="absolute top-0 right-0 bg-red-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
            {unreadCount}
          </span>
        )}
      </button>

      {/* Notification Panel */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-96 bg-white rounded-lg shadow-2xl z-50 max-h-96 overflow-y-auto">
          {/* Header */}
          <div className="p-4 border-b border-gray-200 flex items-center justify-between sticky top-0 bg-white">
            <h3 className="font-bold text-lg">Notificações</h3>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 hover:bg-gray-100 rounded transition"
            >
              <X size={20} />
            </button>
          </div>

          {/* Notifications List */}
          {notifications.length > 0 ? (
            <div className="divide-y divide-gray-200">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-4 ${getNotificationColor(
                    notification.type
                  )} border-l-4 hover:shadow-md transition cursor-pointer`}
                  onClick={() => handleMarkAsRead(notification.id)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex gap-3 flex-1">
                      <span className="text-xl mt-1">
                        {getNotificationIcon(notification.type)}
                      </span>
                      <div className="flex-1">
                        <p className="font-bold text-sm">{notification.title}</p>
                        <p className="text-sm text-gray-600 mt-1">
                          {notification.message}
                        </p>
                        <p className="text-xs text-gray-500 mt-2">
                          {notification.timestamp.toLocaleTimeString('pt-BR')}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={(e) => {\n                        e.stopPropagation();\n                        handleRemove(notification.id);\n                      }}\n                      className="ml-2 p-1 hover:bg-gray-200 rounded transition"\n                    >\n                      <X size={16} />\n                    </button>\n                  </div>\n                </div>\n              ))}\n            </div>\n          ) : (\n            <div className="p-8 text-center text-gray-500">\n              <p>Nenhuma notificação</p>\n            </div>\n          )}\n\n          {/* Footer */}\n          {notifications.length > 0 && (\n            <div className="p-4 border-t border-gray-200 bg-gray-50 sticky bottom-0\">\n              <button\n                onClick={handleClearAll}\n                className=\"w-full text-center text-sm text-blue-600 hover:text-blue-700 font-medium transition\"\n              >\n                Limpar todas\n              </button>\n            </div>\n          )}\n        </div>\n      )}\n    </div>\n  );\n}\n
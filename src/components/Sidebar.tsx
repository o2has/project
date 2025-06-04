import React from 'react';
import { CoinsIcon, PackageIcon, TrophyIcon, HelpCircleIcon } from 'lucide-react';

interface SidebarProps {
  activePage: string;
  setActivePage: (page: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activePage, setActivePage }) => {
  const navItems = [
    { id: 'coinflip', label: 'Coinflip', icon: <CoinsIcon size={20} /> },
    { id: 'inventory', label: 'Inventory', icon: <PackageIcon size={20} /> },
    { id: 'leaderboard', label: 'Leaderboard', icon: <TrophyIcon size={20} /> },
    { id: 'faq', label: 'FAQ', icon: <HelpCircleIcon size={20} /> },
  ];

  return (
    <aside className="w-64 bg-gray-800 border-r border-gray-700 h-full">
      <div className="p-6">
        <h1 className="text-xl font-bold tracking-wider text-indigo-400">COINFLIP</h1>
      </div>
      <nav className="mt-6">
        <ul>
          {navItems.map((item) => (
            <li key={item.id} className="px-2">
              <button
                onClick={() => setActivePage(item.id)}
                className={`flex items-center w-full px-4 py-3 rounded-lg transition-colors duration-200 ${
                  activePage === item.id
                    ? 'bg-indigo-600 text-white'
                    : 'text-gray-300 hover:bg-gray-700'
                }`}
              >
                <span className="mr-3">{item.icon}</span>
                <span>{item.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>
      <div className="absolute bottom-0 w-64 p-6">
        <div className="flex items-center p-3 bg-gray-700 rounded-lg">
          <div className="w-10 h-10 rounded-full bg-indigo-500 flex items-center justify-center">
            <span className="font-bold">JP</span>
          </div>
          <div className="ml-3">
            <p className="text-sm font-medium">Player</p>
            <p className="text-xs text-gray-400">1000 coins</p>
          </div>
        </div>
      </div>
    </aside>
  );
};
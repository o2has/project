import React, { useState } from 'react';
import { CoinsIcon, UserIcon } from 'lucide-react';
import { CreateMatchModal } from '../components/CreateMatchModal';

interface Match {
  id: number;
  creator: string;
  side: 'heads' | 'tails';
  items: Array<{
    id: number;
    name: string;
    value: number;
    rarity: string;
  }>;
  totalValue: number;
  createdAt: string;
}

export const CoinflipPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'all' | 'my'>('all');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [matches, setMatches] = useState<Match[]>([
    {
      id: 1,
      creator: 'CoinMaster',
      side: 'heads',
      items: [
        { id: 1, name: 'Golden Coin', value: 100, rarity: 'rare' },
        { id: 2, name: 'Lucky Charm', value: 50, rarity: 'uncommon' }
      ],
      totalValue: 150,
      createdAt: '2 min ago'
    },
    {
      id: 2,
      creator: 'FlipKing',
      side: 'tails',
      items: [
        { id: 3, name: 'Mystery Box', value: 200, rarity: 'epic' }
      ],
      totalValue: 200,
      createdAt: '5 min ago'
    }
  ]);

  const availableItems = [
    {
      id: 1,
      name: 'Golden Coin',
      value: 100,
      rarity: 'rare',
      image: 'https://images.pexels.com/photos/106152/euro-coins-currency-money-106152.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    },
    {
      id: 2,
      name: 'Mystery Box',
      value: 200,
      rarity: 'epic',
      image: 'https://images.pexels.com/photos/821718/pexels-photo-821718.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    },
    {
      id: 3,
      name: 'Lucky Charm',
      value: 50,
      rarity: 'uncommon',
      image: 'https://images.pexels.com/photos/4588036/pexels-photo-4588036.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    }
  ];

  const handleCreateMatch = (side: 'heads' | 'tails', selectedItemIds: number[]) => {
    const selectedItems = availableItems
      .filter(item => selectedItemIds.includes(item.id))
      .map(({ image, ...item }) => item);

    const totalValue = selectedItems.reduce((sum, item) => sum + item.value, 0);

    const newMatch: Match = {
      id: matches.length + 1,
      creator: 'Player',
      side,
      items: selectedItems,
      totalValue,
      createdAt: 'Just now'
    };

    setMatches([newMatch, ...matches]);
  };

  const displayedMatches = activeTab === 'my' 
    ? matches.filter(match => match.creator === 'Player')
    : matches;

  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div className="flex space-x-4">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-6 py-3 rounded-lg font-medium transition-colors ${
              activeTab === 'all'
                ? 'bg-indigo-600 text-white'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            All Matches
          </button>
          <button
            onClick={() => setActiveTab('my')}
            className={`px-6 py-3 rounded-lg font-medium transition-colors ${
              activeTab === 'my'
                ? 'bg-indigo-600 text-white'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            My Matches
          </button>
        </div>
        <button 
          onClick={() => setIsCreateModalOpen(true)}
          className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors"
        >
          Create Match
        </button>
      </div>

      <div className="grid gap-6">
        {displayedMatches.map(match => (
          <div key={match.id} className="bg-gray-800 rounded-lg p-6">
            <div className="flex justify-between items-start mb-6">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center mr-3">
                  <UserIcon size={20} className="text-gray-400" />
                </div>
                <div>
                  <h3 className="font-medium">{match.creator}</h3>
                  <p className="text-sm text-gray-400">{match.createdAt}</p>
                </div>
              </div>
              <div className="flex items-center">
                <div className={`px-4 py-2 rounded-lg mr-4 ${
                  match.side === 'heads' ? 'bg-yellow-900/20 text-yellow-400' : 'bg-gray-900/40 text-gray-300'
                }`}>
                  {match.side.charAt(0).toUpperCase() + match.side.slice(1)}
                </div>
                <div className="flex items-center bg-gray-700 px-4 py-2 rounded-lg">
                  <CoinsIcon size={16} className="text-yellow-400 mr-2" />
                  <span>{match.totalValue}</span>
                </div>
              </div>
            </div>

            <div className="border-t border-gray-700 pt-4">
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 mb-4">
                {match.items.map(item => (
                  <div key={item.id} className="bg-gray-700 rounded-lg p-3">
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-sm font-medium">{item.name}</span>
                      <span className={`text-xs px-2 py-1 rounded ${
                        item.rarity === 'rare' ? 'bg-blue-900/30 text-blue-400' :
                        item.rarity === 'epic' ? 'bg-purple-900/30 text-purple-400' :
                        'bg-green-900/30 text-green-400'
                      }`}>
                        {item.rarity}
                      </span>
                    </div>
                    <div className="flex items-center text-yellow-400">
                      <CoinsIcon size={14} className="mr-1" />
                      <span className="text-sm">{item.value}</span>
                    </div>
                  </div>
                ))}
              </div>
              <button className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium transition-colors">
                Join Match
              </button>
            </div>
          </div>
        ))}
      </div>

      <CreateMatchModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onCreateMatch={handleCreateMatch}
        availableItems={availableItems}
      />
    </div>
  );
};
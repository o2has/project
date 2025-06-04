import React, { useState } from 'react';
import { Layout } from './components/Layout';
import { CoinflipPage } from './pages/CoinflipPage';
import { InventoryPage } from './pages/InventoryPage';
import { LeaderboardPage } from './pages/LeaderboardPage';
import { FaqPage } from './pages/FaqPage';

function App() {
  const [activePage, setActivePage] = useState('coinflip');

  return (
    <Layout activePage={activePage} setActivePage={setActivePage}>
      {activePage === 'coinflip' && <CoinflipPage />}
      {activePage === 'inventory' && <InventoryPage />}
      {activePage === 'leaderboard' && <LeaderboardPage />}
      {activePage === 'faq' && <FaqPage />}
    </Layout>
  );
}

export default App;
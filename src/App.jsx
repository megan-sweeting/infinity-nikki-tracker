import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import Papa from 'papaparse';

const InfinityNikkiTracker = () => {
  const [activeTab, setActiveTab] = useState('mira');
  const [miraLevels, setMiraLevels] = useState([]);
  const [checkedItems, setCheckedItems] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSheetData = async () => {
      try {
        setLoading(true);
        const response = await window.fs.readFile('monthly_profits.csv', { encoding: 'utf8' });
        
        Papa.parse(response, {
          header: true,
          dynamicTyping: true,
          skipEmptyLines: true,
          complete: (results) => {
            const formattedData = results.data.map((row, index) => ({
              id: index + 1,
              level: row['Mira Level'],
              title: row['Title'] || "-",
              rewards: {
                "Resonite Crystal": row['Resonite Crystal'] || "-",
                "Diamond": row['Diamond'] || "-",
                "Energy Crystal": row['Energy Crystal'] || "-",
                "Shiny Bubbles": row['Shiny Bubbles'] || "-",
                "Thread of Purity": row['Thread of Purity'] || "-",
                "Bling": row['Bling'] || "-",
                "Crafting Material": row['Crafting Material'] || "-",
                "Eureka": row['Eureka'] || "-"
              }
            }));
            setMiraLevels(formattedData);
            setLoading(false);
          },
          error: (error) => {
            console.error('Error parsing CSV:', error);
            setError('Error parsing sheet data');
            setLoading(false);
          }
        });
      } catch (error) {
        console.error('Error reading file:', error);
        setError('Error loading sheet data');
        setLoading(false);
      }
    };

    fetchSheetData();
    // Refresh data every 5 minutes
    const interval = setInterval(fetchSheetData, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  const tabs = [
    { id: 'mira', name: 'Mira Level Rewards' },
    { id: 'stylist', name: "Stylist's Guild Gift" },
    { id: 'compendium', name: 'Compendium Rewards' },
    { id: 'rank', name: 'Stylist Rank' },
    { id: 'advanced', name: 'Advanced Courses' },
    { id: 'main', name: 'Main Quests' },
    { id: 'world', name: 'World Quests' }
  ];

  // Function to format special values
  const formatValue = (value) => {
    if (typeof value === 'number') {
      return value.toLocaleString();
    }
    return value;
  };

  // Function to render reward with emoji
  const renderReward = (name, value) => {
    if (value === "-" || value === null || value === undefined) return null;
    
    const getEmoji = (name) => {
      switch (name) {
        case "Resonite Crystal": return "🔮";
        case "Diamond": return "💎";
        case "Energy Crystal": return "⚡";
        case "Shiny Bubbles": return "✨";
        case "Thread of Purity": return "🧵";
        case "Bling": return "⭐";
        case "Crafting Material": return "🛠️";
        case "Eureka": return "💡";
        default: return "";
      }
    };

    return (
      <div key={name} className="flex items-center space-x-2">
        <span>{getEmoji(name)}</span>
        <span>{name}:</span>
        <span className="font-medium">{formatValue(value)}</span>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-gray-500">Loading data...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-red-500">{error}</div>
      </div>
    );
  }

  return (
    <div className="p-4 min-h-screen bg-gray-50">
      {/* Tabs */}
      <div className="mb-4 border-b border-gray-200">
        <div className="flex space-x-2 overflow-x-auto">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 text-sm font-medium rounded-t-lg transition-colors duration-200 ${
                activeTab === tab.id
                  ? 'bg-white border border-b-0 border-gray-200 text-purple-600'
                  : 'text-gray-500 hover:text-purple-600'
              }`}
            >
              {tab.name}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <Card className="w-full max-w-4xl mx-auto">
        <CardContent className="p-6">
          {activeTab === 'mira' && (
            <div className="space-y-6">
              {miraLevels.map((level) => (
                <div
                  key={level.id}
                  className={`p-4 rounded-lg ${
                    checkedItems[level.id] ? 'bg-purple-50' : 'bg-white'
                  } border border-gray-100 hover:border-purple-200 transition-colors duration-200`}
                >
                  {/* Level Header */}
                  <div className="flex items-center space-x-3 mb-3">
                    <Checkbox
                      checked={checkedItems[level.id]}
                      onCheckedChange={(checked) => {
                        setCheckedItems(prev => ({...prev, [level.id]: checked}));
                      }}
                      className="border-purple-400"
                    />
                    <div>
                      <div className="font-medium">{level.level}</div>
                      {level.title !== "-" && (
                        <div className="text-sm text-purple-600">{level.title}</div>
                      )}
                    </div>
                  </div>

                  {/* Rewards Grid */}
                  <div className="ml-8 grid grid-cols-2 gap-x-6 gap-y-2 text-sm">
                    {Object.entries(level.rewards).map(([name, value]) => 
                      renderReward(name, value)
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab !== 'mira' && (
            <div className="text-center text-gray-500 py-8">
              Select Mira Level Rewards tab to view data
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default InfinityNikkiTracker;

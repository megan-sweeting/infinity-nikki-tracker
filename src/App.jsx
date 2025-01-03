import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from './components/ui/card';
import { Checkbox } from './components/ui/checkbox';

const App = () => {
  // Sample data based on your spreadsheet
  const levels = [
    { id: 1, level: "Mira Level 1", title: "-", crystals: "-", diamonds: "-", energy: "-", required: 20, completed: true },
    { id: 2, level: "Mira Level 2", title: "-", crystals: "-", diamonds: "-", energy: 1, required: 20, completed: true },
    { id: 3, level: "Mira Level 3", title: "-", crystals: "-", diamonds: "-", energy: "-", required: 20, completed: true },
    { id: 4, level: "Mira Level 4", title: "-", crystals: "-", diamonds: "-", energy: "-", required: 20, completed: true },
    { id: 5, level: "Mira Level 5", title: "-", crystals: "-", diamonds: 30, energy: "-", required: 40, completed: true },
    { id: 6, level: "Mira Level 6", title: "-", crystals: "-", diamonds: "-", energy: "-", required: 20, completed: true },
    { id: 7, level: "Mira Level 7", title: "-", crystals: 1, diamonds: "-", energy: "-", required: 20, completed: true },
    { id: 8, level: "Mira Level 8", title: "-", crystals: "-", diamonds: "-", energy: 1, required: 20, completed: true },
    { id: 9, level: "Mira Level 9", title: "-", crystals: "-", diamonds: "-", energy: "-", required: 20, completed: true },
    { id: 10, level: "Mira Level 10", title: "Dreaming Traveler", crystals: "-", diamonds: 30, energy: "-", required: 40, completed: true }
  ];

  const [checkedItems, setCheckedItems] = useState(
    levels.reduce((acc, level) => ({ ...acc, [level.id]: level.completed }), {})
  );

  const totalLevels = levels.length;
  const completedLevels = Object.values(checkedItems).filter(Boolean).length;
  const progressPercentage = (completedLevels / totalLevels) * 100;

  return (
    <div className="p-4 min-h-screen bg-gray-50">
      <Card className="w-full max-w-3xl mx-auto">
        <CardHeader className="bg-purple-100 rounded-t-lg">
          <CardTitle className="text-2xl text-center text-purple-800">Infinity Nikki Level Tracker</CardTitle>
          <div className="w-full bg-purple-200 h-2 rounded-full mt-4">
            <div 
              className="bg-purple-600 h-2 rounded-full transition-all duration-500"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
          <div className="text-center text-sm text-purple-700 mt-2">
            {completedLevels} of {totalLevels} levels completed ({progressPercentage.toFixed(1)}%)
          </div>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="space-y-4">
            {levels.map((level) => (
              <div key={level.id} 
                className={`flex items-center justify-between p-4 rounded-lg ${
                  checkedItems[level.id] ? 'bg-purple-50' : 'bg-white'
                } border border-purple-100 hover:border-purple-300 transition-colors duration-200`}
              >
                <div className="flex items-center space-x-4">
                  <Checkbox
                    checked={checkedItems[level.id]}
                    onCheckedChange={(checked) => {
                      setCheckedItems(prev => ({...prev, [level.id]: checked}));
                    }}
                    className="border-purple-400"
                  />
                  <div>
                    <h3 className="font-medium">{level.level}</h3>
                    {level.title !== "-" && (
                      <p className="text-sm text-purple-600">{level.title}</p>
                    )}
                  </div>
                </div>
                <div className="flex items-center space-x-6 text-sm">
                  {level.diamonds !== "-" && (
                    <span className="text-blue-600">💎 {level.diamonds}</span>
                  )}
                  {level.crystals !== "-" && (
                    <span className="text-purple-600">🔮 {level.crystals}</span>
                  )}
                  {level.energy !== "-" && (
                    <span className="text-green-600">⚡ {level.energy}</span>
                  )}
                  <span className="text-gray-600 ml-4">Required: {level.required}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default App;

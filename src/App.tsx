import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend, BarChart, Bar, XAxis, YAxis } from 'recharts';
import { TrendingUp, DollarSign, Pen as Yen, Coins, Plus, Trash2, PieChart as PieChartIcon } from 'lucide-react';

interface Holding {
  id: string;
  name: string;
  amount: number;
}

interface PortfolioData {
  japanStocks: Holding[];
  usStocks: Holding[];
  investmentTrusts: Holding[];
  cashJpy: number;
  cashUsd: number;
  gold: number;
}

const ASSET_CATEGORIES = [
  { key: 'japanStocks', name: '日本株', color: '#FF6B6B', icon: <Yen className="w-4 h-4" />, hasHoldings: true },
  { key: 'usStocks', name: '米国株', color: '#4ECDC4', icon: <DollarSign className="w-4 h-4" />, hasHoldings: true },
  { key: 'investmentTrusts', name: '投資信託', color: '#45B7D1', icon: <TrendingUp className="w-4 h-4" />, hasHoldings: true },
  { key: 'cashJpy', name: '現金（円）', color: '#96CEB4', icon: <Yen className="w-4 h-4" />, hasHoldings: false },
  { key: 'cashUsd', name: '現金（ドル）', color: '#FFEAA7', icon: <DollarSign className="w-4 h-4" />, hasHoldings: false },
  { key: 'gold', name: 'ゴールド', color: '#DDA0DD', icon: <Coins className="w-4 h-4" />, hasHoldings: false },
];

function App() {
  const [portfolioData, setPortfolioData] = useState<PortfolioData>({
    japanStocks: [],
    usStocks: [],
    investmentTrusts: [],
    cashJpy: 0,
    cashUsd: 0,
    gold: 0,
  });

  // Load data from localStorage on component mount
  useEffect(() => {
    const savedData = localStorage.getItem('portfolioData');
    if (savedData) {
      try {
        setPortfolioData(JSON.parse(savedData));
      } catch (error) {
        console.error('Error loading saved data:', error);
      }
    }
  }, []);

  // Save data to localStorage whenever portfolioData changes
  useEffect(() => {
    localStorage.setItem('portfolioData', JSON.stringify(portfolioData));
  }, [portfolioData]);

  const generateId = () => Math.random().toString(36).substr(2, 9);

  const addHolding = (category: keyof PortfolioData) => {
    if (category === 'cashJpy' || category === 'cashUsd' || category === 'gold') return;
    
    setPortfolioData(prev => ({
      ...prev,
      [category]: [
        ...(prev[category] as Holding[]),
        { id: generateId(), name: '', amount: 0 }
      ]
    }));
  };

  const removeHolding = (category: keyof PortfolioData, id: string) => {
    if (category === 'cashJpy' || category === 'cashUsd' || category === 'gold') return;
    
    setPortfolioData(prev => ({
      ...prev,
      [category]: (prev[category] as Holding[]).filter(holding => holding.id !== id)
    }));
  };

  const updateHolding = (category: keyof PortfolioData, id: string, field: 'name' | 'amount', value: string | number) => {
    if (category === 'cashJpy' || category === 'cashUsd' || category === 'gold') return;
    
    setPortfolioData(prev => ({
      ...prev,
      [category]: (prev[category] as Holding[]).map(holding =>
        holding.id === id ? { ...holding, [field]: value } : holding
      )
    }));
  };

  const updateSimpleValue = (key: 'cashJpy' | 'cashUsd' | 'gold', value: number) => {
    setPortfolioData(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const getCategoryTotal = (category: keyof PortfolioData) => {
    if (category === 'cashJpy' || category === 'cashUsd' || category === 'gold') {
      return portfolioData[category] as number;
    }
    return (portfolioData[category] as Holding[]).reduce((sum, holding) => sum + (holding.amount || 0), 0);
  };

  const totalValue = ASSET_CATEGORIES.reduce((sum, category) => sum + getCategoryTotal(category.key as keyof PortfolioData), 0);

  const chartData = ASSET_CATEGORIES.map(category => ({
    name: category.name,
    value: getCategoryTotal(category.key as keyof PortfolioData),
    color: category.color,
    icon: category.icon,
  })).filter(item => item.value > 0);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('ja-JP', {
      style: 'currency',
      currency: 'JPY',
      minimumFractionDigits: 0,
    }).format(value);
  };

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0];
      const percentage = totalValue > 0 ? (data.value / totalValue * 100).toFixed(1) : '0';
      return (
        <div className="bg-white p-3 rounded-lg shadow-lg border">
          <p className="font-medium">{data.name}</p>
          <p className="text-blue-600">{formatCurrency(data.value)}</p>
          <p className="text-gray-600">{percentage}%</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2 flex items-center justify-center gap-3">
            <PieChartIcon className="w-10 h-10 text-blue-600" />
            ポートフォリオダッシュボード
          </h1>
          <p className="text-gray-600">投資資産の詳細管理・可視化システム</p>
          <div className="mt-4 text-3xl font-bold text-blue-600">
            総資産: {formatCurrency(totalValue)}
          </div>
        </div>

        <div className="grid xl:grid-cols-3 gap-8">
          {/* Input Section */}
          <div className="xl:col-span-2 space-y-6">
            {ASSET_CATEGORIES.map(category => (
              <div key={category.key} className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold text-gray-800 flex items-center gap-3">
                    <div 
                      className="w-4 h-4 rounded-full"
                      style={{ backgroundColor: category.color }}
                    />
                    {category.icon}
                    {category.name}
                    <span className="text-sm font-normal text-gray-500">
                      ({formatCurrency(getCategoryTotal(category.key as keyof PortfolioData))})
                    </span>
                  </h3>
                  {category.hasHoldings && (
                    <button
                      onClick={() => addHolding(category.key as keyof PortfolioData)}
                      className="flex items-center gap-2 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                      追加
                    </button>
                  )}
                </div>

                {category.hasHoldings ? (
                  <div className="space-y-3">
                    {(portfolioData[category.key as keyof PortfolioData] as Holding[]).map((holding, index) => (
                      <div key={holding.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                        <div className="flex-1">
                          <input
                            type="text"
                            value={holding.name}
                            onChange={(e) => updateHolding(category.key as keyof PortfolioData, holding.id, 'name', e.target.value)}
                            placeholder="銘柄名"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        </div>
                        <div className="flex-1">
                          <input
                            type="number"
                            value={holding.amount || ''}
                            onChange={(e) => updateHolding(category.key as keyof PortfolioData, holding.id, 'amount', Number(e.target.value) || 0)}
                            placeholder="金額"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        </div>
                        <button
                          onClick={() => removeHolding(category.key as keyof PortfolioData, holding.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                    {(portfolioData[category.key as keyof PortfolioData] as Holding[]).length === 0 && (
                      <p className="text-gray-500 text-center py-4">銘柄を追加してください</p>
                    )}
                  </div>
                ) : (
                  <div className="flex items-center gap-4">
                    <input
                      type="number"
                      value={portfolioData[category.key as keyof PortfolioData] as number || ''}
                      onChange={(e) => updateSimpleValue(category.key as 'cashJpy' | 'cashUsd' | 'gold', Number(e.target.value) || 0)}
                      placeholder="金額"
                      className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
                    />
                    <div className="min-w-[80px] text-right text-sm text-gray-600">
                      {totalValue > 0 ? ((getCategoryTotal(category.key as keyof PortfolioData) / totalValue) * 100).toFixed(1) : '0'}%
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Chart Section */}
          <div className="xl:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-6 sticky top-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-6">資産配分</h2>
              {totalValue > 0 ? (
                <div className="h-80 mb-6">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={chartData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={120}
                        paddingAngle={2}
                        dataKey="value"
                      >
                        {chartData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip content={<CustomTooltip />} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              ) : (
                <div className="h-80 flex items-center justify-center text-gray-500 mb-6">
                  <div className="text-center">
                    <PieChartIcon className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                    <p className="text-lg">資産データを入力してください</p>
                  </div>
                </div>
              )}

              {/* Quick Summary */}
              <div className="space-y-2">
                {ASSET_CATEGORIES.map(category => {
                  const value = getCategoryTotal(category.key as keyof PortfolioData);
                  const percentage = totalValue > 0 ? (value / totalValue) * 100 : 0;
                  
                  if (value === 0) return null;
                  
                  return (
                    <div key={category.key} className="flex items-center justify-between py-2 border-b border-gray-100">
                      <div className="flex items-center gap-2">
                        <div 
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: category.color }}
                        />
                        <span className="text-sm font-medium">{category.name}</span>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-semibold">{formatCurrency(value)}</div>
                        <div className="text-xs text-blue-600">{percentage.toFixed(1)}%</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Holdings Table */}
        {totalValue > 0 && (
          <div className="mt-8 bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">詳細保有資産</h2>
            <div className="space-y-6">
              {ASSET_CATEGORIES.map(category => {
                const categoryTotal = getCategoryTotal(category.key as keyof PortfolioData);
                if (categoryTotal === 0) return null;

                return (
                  <div key={category.key} className="border border-gray-200 rounded-lg overflow-hidden">
                    <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div 
                            className="w-4 h-4 rounded-full"
                            style={{ backgroundColor: category.color }}
                          />
                          {category.icon}
                          <span className="font-semibold text-gray-800">{category.name}</span>
                        </div>
                        <div className="text-right">
                          <div className="font-semibold">{formatCurrency(categoryTotal)}</div>
                          <div className="text-sm text-blue-600">
                            {((categoryTotal / totalValue) * 100).toFixed(1)}%
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {category.hasHoldings ? (
                      <div className="divide-y divide-gray-100">
                        {(portfolioData[category.key as keyof PortfolioData] as Holding[])
                          .filter(holding => holding.amount > 0)
                          .map(holding => (
                            <div key={holding.id} className="px-4 py-3 flex items-center justify-between hover:bg-gray-50">
                              <div className="font-medium text-gray-700">
                                {holding.name || '未設定'}
                              </div>
                              <div className="text-right">
                                <div className="font-semibold">{formatCurrency(holding.amount)}</div>
                                <div className="text-sm text-gray-500">
                                  {categoryTotal > 0 ? ((holding.amount / categoryTotal) * 100).toFixed(1) : '0'}% of {category.name}
                                </div>
                              </div>
                            </div>
                          ))}
                      </div>
                    ) : (
                      <div className="px-4 py-3">
                        <div className="flex justify-between items-center">
                          <span className="text-gray-700">{category.name}</span>
                          <span className="font-semibold">{formatCurrency(categoryTotal)}</span>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Bell, Menu, X, User, DollarSign, ArrowUp, ArrowDown, Moon, Sun, Award, Zap, Activity, TrendingUp, Clock, AlertCircle, Settings, ChevronRight, BarChart3, Wallet } from 'lucide-react';

// Mock data for our demo
const mockAssets = [
  { id: 1, symbol: 'AAPL', name: 'Apple Inc.', price: 178.42, change: 2.13, volume: '32.5M', marketCap: '2.83T' },
  { id: 2, symbol: 'MSFT', name: 'Microsoft Corp.', price: 412.88, change: -0.75, volume: '21.2M', marketCap: '3.07T' },
  { id: 3, symbol: 'GOOGL', name: 'Alphabet Inc.', price: 165.27, change: 1.48, volume: '15.7M', marketCap: '2.08T' },
  { id: 4, symbol: 'AMZN', name: 'Amazon.com Inc.', price: 178.92, change: 0.54, volume: '29.3M', marketCap: '1.86T' },
];

const mockSentiment = {
  current: 68, // 0-100 scale, <50 is bearish, >50 is bullish
  history: [42, 47, 51, 54, 62, 65, 68],
  sources: ['Social Media', 'News Analysis', 'Technical Indicators', 'Institutional Moves'],
  breakdown: { bullish: 68, neutral: 12, bearish: 20 }
};

const mockUser = {
  name: 'João Silva',
  avatar: '/api/placeholder/32/32',
  credits: 15,
  streak: 3,
  badges: ['Early Adopter', 'Bull Rider', 'Trend Spotter'],
  position: 7, // Leaderboard position
  captureHistory: [
    { date: '25/04', asset: 'AAPL', profit: '+2.3%' },
    { date: '26/04', asset: 'MSFT', profit: '+1.5%' },
    { date: '27/04', asset: 'GOOGL', profit: '+3.1%' },
  ]
};

// Mock leaderboard data
const mockLeaderboard = [
  { position: 1, name: 'Carlos M.', captures: 37, profit: '+21.4%' },
  { position: 2, name: 'Amanda L.', captures: 35, profit: '+19.7%' },
  { position: 3, name: 'Ricardo F.', captures: 32, profit: '+18.3%' },
  { position: 4, name: 'Patricia B.', captures: 30, profit: '+17.5%' },
  { position: 5, name: 'Fernando G.', captures: 28, profit: '+16.8%' },
  { position: 6, name: 'Mariana S.', captures: 26, profit: '+15.9%' },
  { position: 7, name: 'João Silva', captures: 24, profit: '+14.2%' },
  { position: 8, name: 'Lucas C.', captures: 22, profit: '+13.7%' },
  { position: 9, name: 'Juliana P.', captures: 20, profit: '+12.5%' },
  { position: 10, name: 'Bruno A.', captures: 18, profit: '+11.8%' },
];

// Main App Component
const MarketPulseApp = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const [selectedAsset, setSelectedAsset] = useState(mockAssets[0]);
  const [timeRemaining, setTimeRemaining] = useState(30); // Reduced for demo purposes
  const [pulseActive, setPulseActive] = useState(false);
  const [pulseCaptured, setPulseCaptured] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMsg, setNotificationMsg] = useState('');
  const [notificationType, setNotificationType] = useState('info');
  const [superPulse, setSuperPulse] = useState(false);
  const [pulseHistory, setPulseHistory] = useState([]);
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const [availableCredits, setAvailableCredits] = useState(mockUser.credits);
  
  // Refs
  const pulseButtonRef = useRef(null);
  
  // Toggle sidebar
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  
  // Toggle dark/light mode
  const toggleTheme = () => {
    setDarkMode(!darkMode);
    showToast('Theme changed', 'info');
  };
  
  // Toggle leaderboard
  const toggleLeaderboard = () => {
    setShowLeaderboard(!showLeaderboard);
  };
  
  // Show notification toast
  const showToast = (message, type = 'info') => {
    setNotificationMsg(message);
    setNotificationType(type);
    setShowNotification(true);
    
    // Auto-hide after 3 seconds
    setTimeout(() => {
      setShowNotification(false);
    }, 3000);
  };
  
  // Countdown timer effect with increased urgency
  useEffect(() => {
    // Flash the timer when we're getting close to a pulse
    if (timeRemaining <= 10 && timeRemaining > 0 && !pulseActive) {
      if (timeRemaining === 10) {
        showToast('Pulse approaching! Get ready!', 'warning');
      }
    }
    
    if (timeRemaining <= 0) {
      // Determine if this is a super pulse (20% chance)
      const isSuperPulse = Math.random() < 0.2;
      setSuperPulse(isSuperPulse);
      
      // Trigger pulse when timer hits 0
      setPulseActive(true);
      showToast(isSuperPulse ? 'SUPER PULSE ACTIVE! (3 credits)' : 'Pulse active! (1 credit)', 'success');
      
      // Reset timer with a random duration (shorter for demo)
      setTimeRemaining(Math.floor(Math.random() * (60 - 15 + 1)) + 15);
      return;
    }
    
    const timer = setTimeout(() => {
      setTimeRemaining(timeRemaining - 1);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [timeRemaining]);
  
  // Effect to handle pulse animation timing with focus effects
  useEffect(() => {
    if (pulseActive) {
      // Add focus to the capture button
      if (pulseButtonRef.current) {
        pulseButtonRef.current.focus();
      }
      
      // Pulse active for 15 seconds (shorter for demo)
      const pulseTimeout = setTimeout(() => {
        if (!pulseCaptured) {
          showToast('Pulse opportunity missed!', 'error');
        }
        
        setPulseActive(false);
        setPulseCaptured(false);
        setSuperPulse(false);
      }, 15000);
      
      return () => clearTimeout(pulseTimeout);
    }
  }, [pulseActive, pulseCaptured]);
  
  // Format timer as MM:SS with blinking effect when under 10 seconds
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };
  
  // Capture pulse event with improved feedback
  const capturePulse = () => {
    if (pulseActive && !pulseCaptured) {
      const creditCost = superPulse ? 3 : 1;
      
      // Check if user has enough credits
      if (availableCredits < creditCost) {
        showToast(`Not enough credits! You need ${creditCost} credits.`, 'error');
        return;
      }
      
      setPulseCaptured(true);
      setAvailableCredits(prev => prev - creditCost);
      
      // Add to pulse history
      const newCapture = {
        date: new Date().toLocaleDateString('pt-BR', {day: '2-digit', month: '2-digit'}),
        asset: selectedAsset.symbol,
        profit: `+${(Math.random() * 3 + 1).toFixed(1)}%`,
        superPulse
      };
      
      setPulseHistory(prev => [newCapture, ...prev]);
      
      // Show success notification
      showToast(superPulse 
        ? 'Super Pulse captured! Outstanding move! (3 credits used)' 
        : 'Pulse captured successfully! (1 credit used)', 'success');
    }
  };

  // Convert sentiment to color with enhanced gradients
  const getSentimentColor = (value) => {
    if (value < 30) return 'text-red-500';
    if (value < 45) return 'text-orange-500';
    if (value < 55) return 'text-yellow-500';
    if (value < 70) return 'text-green-400';
    return 'text-green-500';
  };
  
  // Buy credits
  const buyCredits = () => {
    setAvailableCredits(prev => prev + 10);
    showToast('10 credits purchased successfully!', 'success');
  };
  
  return (
    <div className={`flex h-screen w-full transition-colors duration-300 ${darkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-100 text-gray-900'}`}>
      {/* Toast Notification */}
      {showNotification && (
        <div className="fixed top-4 right-4 z-50 max-w-md transform transition-transform duration-300 ease-in-out translate-y-0">
          <div className={`px-4 py-3 rounded-lg shadow-lg flex items-center ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <div className="mr-3">
              {notificationType === 'success' ? (
                <Zap size={20} className="text-green-400" />
              ) : notificationType === 'warning' ? (
                <AlertCircle size={20} className="text-yellow-500" />
              ) : notificationType === 'error' ? (
                <X size={20} className="text-pink-500" />
              ) : (
                <Bell size={20} className="text-blue-400" />
              )}
            </div>
            <div>
              <p className="font-medium">{notificationMsg}</p>
            </div>
            <button 
              onClick={() => setShowNotification(false)}
              className="ml-4 text-gray-400 hover:text-gray-500"
            >
              <X size={16} />
            </button>
          </div>
        </div>
      )}

      {/* Leaderboard Modal */}
      {showLeaderboard && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className={`relative w-full max-w-2xl p-6 rounded-xl shadow-2xl ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <button 
              onClick={toggleLeaderboard}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-500"
            >
              <X size={20} />
            </button>
            <h2 className="text-2xl font-bold mb-6 text-center">Global Leaderboard</h2>
            <div className="overflow-hidden rounded-lg">
              <table className="w-full">
                <thead className={`${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>
                  <tr>
                    <th className="py-3 px-4 text-left">#</th>
                    <th className="py-3 px-4 text-left">Trader</th>
                    <th className="py-3 px-4 text-left">Captures</th>
                    <th className="py-3 px-4 text-left">Profit</th>
                  </tr>
                </thead>
                <tbody>
                  {mockLeaderboard.map((user) => (
                    <tr 
                      key={user.position}
                      className={`${user.name === mockUser.name 
                        ? darkMode ? 'bg-green-900 bg-opacity-20' : 'bg-green-100' 
                        : user.position % 2 === 0 
                          ? darkMode ? 'bg-gray-750' : 'bg-gray-50' 
                          : ''
                      } hover:bg-opacity-80`}
                    >
                      <td className="py-3 px-4">
                        {user.position <= 3 ? (
                          <div className={`w-6 h-6 rounded-full flex items-center justify-center text-white font-bold
                            ${user.position === 1 ? 'bg-yellow-500' : user.position === 2 ? 'bg-gray-400' : 'bg-amber-700'}`}>
                            {user.position}
                          </div>
                        ) : user.position}
                      </td>
                      <td className="py-3 px-4">
                        {user.name === mockUser.name ? (
                          <span className="font-bold">{user.name} (você)</span>
                        ) : user.name}
                      </td>
                      <td className="py-3 px-4">{user.captures}</td>
                      <td className={`py-3 px-4 ${user.profit.startsWith('+') ? 'text-green-400' : 'text-pink-500'}`}>
                        {user.profit}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-6 text-center text-gray-400 text-sm">
              Updated every hour. Next update in: 23:45
            </div>
          </div>
        </div>
      )}

      {/* Sidebar with enhanced visual elements */}
      <div 
        className={`fixed lg:relative z-30 h-full transition-all duration-300 ease-in-out transform ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        } ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg w-64`}
      >
        <div className="flex items-center justify-between h-16 px-6 border-b border-gray-700">
          <h1 className="text-2xl font-bold tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-green-400 animate-pulse">
            MARKET PULSE
          </h1>
          <button className="p-1 lg:hidden" onClick={toggleSidebar}>
            <X size={24} className="text-gray-400" />
          </button>
        </div>
        <nav className="flex flex-col p-4">
          <a href="#" className="flex items-center py-3 px-4 rounded-lg mb-2 hover:bg-opacity-10 hover:bg-white font-medium text-green-400 transition-colors duration-200">
            <Activity size={18} className="mr-3" />
            Dashboard
          </a>
          <a href="#" className="flex items-center py-3 px-4 rounded-lg mb-2 hover:bg-opacity-10 hover:bg-white font-medium text-gray-400 hover:text-green-400 transition-colors duration-200">
            <TrendingUp size={18} className="mr-3" />
            Fundamentals
          </a>
          <a href="#" className="flex items-center py-3 px-4 rounded-lg mb-2 hover:bg-opacity-10 hover:bg-white font-medium text-gray-400 hover:text-green-400 transition-colors duration-200">
            <Clock size={18} className="mr-3" />
            News
          </a>
          <a href="#" className="flex items-center py-3 px-4 rounded-lg mb-2 hover:bg-opacity-10 hover:bg-white font-medium text-gray-400 hover:text-green-400 transition-colors duration-200">
            <Wallet size={18} className="mr-3" />
            Credits
          </a>
          <a href="#" className="flex items-center py-3 px-4 rounded-lg mb-2 hover:bg-opacity-10 hover:bg-white font-medium text-gray-400 hover:text-green-400 transition-colors duration-200">
            <BarChart3 size={18} className="mr-3" />
            <span className="flex-1">Leaderboard</span>
            <ChevronRight size={16} onClick={toggleLeaderboard} className="cursor-pointer hover:text-pink-500" />
          </a>
          <a href="#" className="flex items-center py-3 px-4 rounded-lg hover:bg-opacity-10 hover:bg-white font-medium text-gray-400 hover:text-green-400 transition-colors duration-200">
            <Settings size={18} className="mr-3" />
            Settings
          </a>
        </nav>
        <div className="absolute bottom-8 w-full px-6 space-y-4">
          <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-200'} hover:shadow-md transition-shadow duration-300`}>
            <div className="text-sm font-medium mb-2">Your Streak</div>
            <div className="flex items-center">
              <div className="text-2xl font-bold text-pink-500 mr-2">{mockUser.streak}×</div>
              <div className="text-xs text-gray-400">days in a row</div>
            </div>
            <div className="mt-2 w-full h-1 bg-gray-600 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-pink-500 to-green-400"
                style={{ width: `${(mockUser.streak / 5) * 100}%` }}
              ></div>
            </div>
            <div className="mt-1 text-xs text-gray-400 text-right">
              {5 - mockUser.streak} more to next badge
            </div>
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header with enhanced user experience */}
        <header className={`h-16 flex items-center justify-between px-4 shadow-md z-20 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <div className="flex items-center">
            <button className="p-1 mr-4 lg:hidden" onClick={toggleSidebar}>
              <Menu size={24} className="text-gray-400 hover:text-green-400 transition-colors duration-200" />
            </button>
            <select 
              value={selectedAsset.symbol}
              onChange={(e) => {
                setSelectedAsset(mockAssets.find(asset => asset.symbol === e.target.value));
                showToast(`Switched to ${e.target.value}`, 'info');
              }}
              className={`px-3 py-1 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400 transition-all duration-200 ${darkMode ? 'bg-gray-700 text-white' : 'bg-gray-200 text-gray-800'}`}
            >
              {mockAssets.map((asset) => (
                <option key={asset.id} value={asset.symbol}>
                  {asset.symbol} - {asset.name}
                </option>
              ))}
            </select>
          </div>
          
          <div className="flex items-center space-x-4">
            <button 
              className={`px-4 py-1 rounded-md hover:opacity-80 font-medium flex items-center transition-colors duration-200 ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'}`}
              onClick={toggleTheme}
            >
              {darkMode ? <Sun size={16} className="mr-2 text-yellow-400" /> : <Moon size={16} className="mr-2 text-indigo-400" />}
              {darkMode ? 'Light' : 'Dark'}
            </button>
            <div className="flex items-center bg-opacity-20 bg-green-400 px-3 py-1 rounded-lg">
              <span className="text-green-400 font-bold mr-1">{availableCredits}</span>
              <span className="text-xs text-gray-400">credits</span>
            </div>
            <button 
              onClick={buyCredits}
              className="px-4 py-1 rounded-md bg-gradient-to-r from-pink-500 to-green-400 text-white font-medium hover:opacity-90 transition-all duration-200 transform hover:scale-105 shadow-md hover:shadow-lg"
            >
              Buy Credits
            </button>
            <div className="w-8 h-8 rounded-full bg-gray-400 flex items-center justify-center overflow-hidden hover:ring-2 hover:ring-pink-500 transition-all duration-200">
              <img src={mockUser.avatar} alt="User avatar" />
            </div>
          </div>
        </header>
        
        {/* Main content area with enhanced UI */}
        <main className="flex-1 overflow-y-auto p-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Timer Card with improved visuals */}
            <div className={`col-span-1 md:col-span-3 p-6 rounded-xl shadow-lg transition-all duration-300 transform ${pulseActive ? 'scale-102' : ''} ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold flex items-center">
                  <Activity size={20} className={`mr-2 ${pulseActive ? 'text-green-400' : 'text-pink-500'}`} />
                  Next Pulse Window
                </h2>
                <div className="flex items-center">
                  <Bell size={16} className="text-pink-500 mr-2" />
                  <span className="text-sm text-gray-400">Be ready to capture</span>
                </div>
              </div>
              <div className="flex flex-col items-center">
                <div className={`text-5xl font-bold mb-4 transition-all duration-300 
                  ${pulseActive 
                    ? superPulse 
                      ? 'animate-pulse text-pink-500 drop-shadow-lg' 
                      : 'animate-pulse text-green-400' 
                    : timeRemaining <= 10 
                      ? 'text-yellow-500 animate-pulse' 
                      : 'text-pink-500'}`}>
                  {pulseActive 
                    ? superPulse ? 'SUPER PULSE!' : 'ACTIVE NOW!' 
                    : formatTime(timeRemaining)}
                </div>
                <button 
                  ref={pulseButtonRef}
                  onClick={capturePulse}
                  disabled={!pulseActive || pulseCaptured}
                  className={`px-6 py-3 rounded-lg font-bold text-white transition-all duration-300 transform
                    ${pulseActive && !pulseCaptured 
                      ? superPulse
                        ? 'bg-pink-500 hover:bg-pink-600 scale-110 hover:scale-115 shadow-xl hover:shadow-2xl animate-pulse' 
                        : 'bg-green-400 hover:bg-green-500 scale-105 hover:scale-110 shadow-lg hover:shadow-xl animate-pulse' 
                      : pulseCaptured 
                        ? 'bg-gray-600 cursor-not-allowed' 
                        : 'bg-gray-600 cursor-not-allowed'}`}
                >
                  {pulseCaptured 
                    ? 'Captured!' 
                    : pulseActive 
                      ? superPulse 
                        ? 'Capture Super Pulse (3 Credits)' 
                        : 'Capture Now (1 Credit)' 
                      : `Wait for Pulse (${formatTime(timeRemaining)})`}
                </button>
              </div>
            </div>
            
            {/* Asset Cards with enhanced interactivity */}
            {mockAssets.map((asset) => (
              <div 
                key={asset.id}
                onClick={() => {
                  setSelectedAsset(asset);
                  showToast(`Selected ${asset.symbol}`, 'info');
                }}
                className={`p-4 rounded-xl shadow-lg cursor-pointer transition-all duration-300 
                  ${selectedAsset.id === asset.id ? 'ring-2 ring-pink-500 transform scale-105' : 'hover:scale-102'}
                  ${pulseActive && !pulseCaptured 
                    ? superPulse 
                      ? 'animate-pulse border border-pink-500' 
                      : 'animate-pulse border border-green-400' 
                    : ''}
                  ${darkMode ? 'bg-gray-800 hover:bg-gray-750' : 'bg-white hover:bg-gray-50'}`}
              >
                <div className="flex justify-between items-center">
                  <div>
                    <div className="text-lg font-bold flex items-center">
                      {asset.symbol}
                      {selectedAsset.id === asset.id && (
                        <span className="ml-2 text-xs px-2 py-0.5 rounded-full bg-pink-500 bg-opacity-20 text-pink-500">
                          selected
                        </span>
                      )}
                    </div>
                    <div className="text-sm text-gray-400">{asset.name}</div>
                  </div>
                  <div className={`text-xl font-bold ${asset.change >= 0 ? 'text-green-400' : 'text-pink-500'}`}>
                    ${asset.price.toFixed(2)}
                  </div>
                </div>
                <div className="mt-3 grid grid-cols-2 gap-2">
                  <div className="text-xs text-gray-400">
                    Volume: <span className="text-gray-300">{asset.volume}</span>
                  </div>
                  <div className="text-xs text-gray-400">
                    Market Cap: <span className="text-gray-300">{asset.marketCap}</span>
                  </div>
                </div>
                <div className="flex justify-between mt-4">
                  <div className={`flex items-center ${asset.change >= 0 ? 'text-green-400' : 'text-pink-500'}`}>
                    {asset.change >= 0 ? <ArrowUp size={16} /> : <ArrowDown size={16} />}
                    <span className="ml-1 font-medium">{Math.abs(asset.change).toFixed(2)}%</span>
                  </div>
                  <div className="text-xs text-gray-400">
                    24h change
                  </div>
                </div>
              </div>
            ))}
            
            {/* Sentiment Analysis with enhanced visuals */}
            <div className={`col-span-1 md:col-span-2 p-4 rounded-xl shadow-lg ${darkMode ? 'bg-gray-800 hover:bg-gray-750' : 'bg-white hover:bg-gray-50'} transition-all duration-300 hover:shadow-xl`}>
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <Activity size={18} className="mr-2 text-green-400" />
                Market Sentiment
              </h3>
              <div className="flex items-center mb-6">
                <div className="w-full h-5 bg-gray-700 rounded-full overflow-hidden shadow-inner">
                  <div 
                    className="h-full bg-gradient-to-r from-red-500 via-yellow-400 to-green-400 transition-all duration-1000 ease-in-out"
                    style={{ width: `${mockSentiment.current}%` }}
                  ></div>
                </div>
                <div className="ml-4 w-12 text-center font-bold text-lg">
                  <span className={`${getSentimentColor(mockSentiment.current)} transition-colors duration-500`}>
                    {mockSentiment.current}
                  </span>
                </div>
              </div>
              <div className="flex justify-between">
                <div className="text-pink-500 font-medium">Bearish</div>
                <div className="text-green-400 font-medium">Bullish</div>
              </div>
              
              {/* Sentiment breakdown pie chart visualization */}
              <div className="grid grid-cols-3 gap-4 mt-4 mb-6">
                <div className="text-center">
                  <div className="text-xs text-gray-400">Bullish</div>
                  <div className="text-lg font-bold text-green-400">{mockSentiment.breakdown.bullish}%</div>
                </div>
                <div className="text-center">
                  <div className="text-xs text-gray-400">Neutral</div>
                  <div className="text-lg font-bold text-yellow-500">{mockSentiment.breakdown.neutral}%</div>
                </div>
                <div className="text-center">
                  <div className="text-xs text-gray-400">Bearish</div>
                  <div className="text-lg font-bold text-pink-500">{mockSentiment.breakdown.bearish}%</div>
                </div>
              </div>
              
              <div className="flex flex-col mt-4">
                <div className="text-sm text-gray-400 mb-2 flex justify-between items-center">
                  <span>7-Day Trend</span>
                  <div className="text-xs text-gray-500">Source: {mockSentiment.sources[0]}</div>
                </div>
                <div className="h-24 flex items-end">
                  {mockSentiment.history.map((value, index) => (
                    <div 
                      key={index} 
                      className="flex-1 mx-1 group relative"
                    >
                      <div 
                        className={`w-full rounded-t transition-all duration-500 ${getSentimentColor(value)} hover:brightness-125`}
                        style={{ height: `${value}%` }}
                      ></div>
                      <div className="absolute bottom-full mb-1 left-1/2 transform -translate-x-1/2 bg-gray-700 px-1 py-0.5 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
                        Day {index+1}: {value}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Pulse History & Performance Panel */}
            <div className={`p-4 rounded-xl shadow-lg ${darkMode ? 'bg-gray-800 hover:bg-gray-750' : 'bg-white hover:bg-gray-50'} transition-all duration-300 hover:shadow-xl`}>
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <Award size={18} className="mr-2 text-pink-500" />
                Your Performance
              </h3>
              <div className="flex items-center justify-between mb-4">
                <div className="text-3xl font-bold text-pink-500">#{mockUser.position}</div>
                <div className="text-sm text-gray-400">Global Ranking</div>
              </div>
              
              {/* Recent Captures */}
              <div className="mb-4">
                <h4 className="text-sm font-medium text-gray-400 mb-2 flex justify-between">
                  <span>Recent Captures</span>
                  <button 
                    onClick={toggleLeaderboard}
                    className="text-xs text-green-400 hover:text-green-300 transition-colors duration-200 flex items-center"
                  >
                    View Leaderboard <ChevronRight size={12} className="ml-1" />
                  </button>
                </h4>
                <div className={`rounded-lg overflow-hidden ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>
                  {[...pulseHistory, ...mockUser.captureHistory].slice(0, 3).map((capture, index) => (
                    <div 
                      key={index} 
                      className={`flex justify-between items-center p-2 ${index !== 0 ? 'border-t border-gray-600' : ''} ${capture.superPulse ? 'bg-gradient-to-r from-pink-500 to-pink-500 bg-opacity-10' : ''}`}
                    >
                      <div className="flex items-center">
                        <div className={`w-2 h-2 rounded-full mr-2 ${capture.profit.startsWith('+') ? 'bg-green-400' : 'bg-pink-500'}`}></div>
                        <span className="text-sm">{capture.asset}</span>
                        {capture.superPulse && (
                          <span className="ml-2 px-1 py-0.5 text-xs bg-pink-500 text-white rounded-sm">
                            SUPER
                          </span>
                        )}
                      </div>
                      <div className="flex items-center">
                        <span className={`text-sm ${capture.profit.startsWith('+') ? 'text-green-400' : 'text-pink-500'}`}>
                          {capture.profit}
                        </span>
                        <span className="text-xs text-gray-400 ml-2">{capture.date}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Badges with improved visuals */}
              <div className="py-2 border-b border-gray-700">
                <h4 className="text-sm font-medium text-gray-400 mb-2">Your Badges</h4>
                <div className="flex flex-wrap gap-2">
                  {mockUser.badges.map((badge, index) => (
                    <div 
                      key={index} 
                      className="px-3 py-1 bg-gray-700 rounded-full text-xs font-medium flex items-center hover:bg-gray-600 transition-colors duration-200 cursor-help"
                      title={`Earned for: ${badge}`}
                    >
                      <Award size={12} className="text-green-400 mr-1" />
                      {badge}
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Weekly Streak with enhanced visuals */}
              <div className="mt-4">
                <h4 className="text-sm font-medium text-gray-400 mb-2">Weekly Streak</h4>
                <div className="flex justify-between">
                  {[1, 2, 3, 4, 5].map((day) => (
                    <div 
                      key={day}
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300
                        ${day <= mockUser.streak 
                          ? 'bg-gradient-to-r from-pink-500 to-green-400 text-white shadow-md' 
                          : darkMode ? 'bg-gray-700 text-gray-500' : 'bg-gray-200 text-gray-400'}`}
                    >
                      {day}
                    </div>
                  ))}
                </div>
                <div className="mt-2 text-xs text-center text-gray-400">
                  {mockUser.streak === 5 
                    ? 'Maximum streak achieved!' 
                    : `${5 - mockUser.streak} more days to maximum streak`}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default MarketPulseApp;
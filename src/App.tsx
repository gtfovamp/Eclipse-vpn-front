import React, { useState, useEffect } from 'react';
import { fetchVPNServers } from './api/vpnApi';
import { VPNServer, FilterState } from './types/vpn';
import Header from './components/Header/Header';
import ServerList from './components/ServerList/ServerList';
import Toast from './components/Toast/Toast';
import EmptyState from './components/EmptyState/EmptyState';
import { Shield, Github } from 'lucide-react';

function App() {
  const [servers, setServers] = useState<VPNServer[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [toast, setToast] = useState<{ visible: boolean; type: 'success' | 'error' | 'warning' | 'info'; message: string }>({
    visible: false,
    type: 'info',
    message: '',
  });

  // Filter state
  const [filterState, setFilterState] = useState<FilterState>({
    search: '',
    region: '',
    protocol: '',
    status: '',
  });

  const loadServers = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const data = await fetchVPNServers();
      setServers(data);
    } catch (err) {
      setError('Failed to fetch server data. Please try again later.');
      showToast('error', 'Failed to fetch servers. Check your connection.');
    } finally {
      setIsLoading(false);
    }
  };

  const showToast = (type: 'success' | 'error' | 'warning' | 'info', message: string) => {
    setToast({
      visible: true,
      type,
      message,
    });
  };

  useEffect(() => {
    loadServers();
    
    // Simulated toast message for demo purposes
    setTimeout(() => {
      showToast('info', 'Welcome to Eclipse VPN Premium');
    }, 1000);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white">
      <Header 
        filterState={filterState} 
        setFilterState={setFilterState}
        totalServers={servers.length}
      />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page title and description */}
        <div className="mb-8">
          <h1 className="text-3xl font-extralight mb-2">Global Server Network</h1>
          <p className="text-gray-400">
            Connect to any of our premium servers worldwide with industry-leading security protocols.
          </p>
        </div>
        
        {/* Server list */}
        <ServerList 
          servers={servers} 
          isLoading={isLoading} 
          error={error} 
          filters={filterState}
        />
        
        {/* Footer section */}
        <footer className="mt-16 border-t border-gray-800 pt-8 pb-12">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-4 md:mb-0">
              <Shield className="h-6 w-6 text-[#007AFF] mr-2" />
              <h2 className="text-xl font-extralight">
                Eclipse<span className="font-medium text-[#007AFF]">VPN</span>
              </h2>
            </div>
            
            <div className="flex space-x-8 text-sm text-gray-400">
              <a href="#" className="hover:text-[#007AFF] transition-colors duration-300">Privacy Policy</a>
              <a href="#" className="hover:text-[#007AFF] transition-colors duration-300">Terms of Service</a>
              <a href="#" className="hover:text-[#007AFF] transition-colors duration-300">Contact Support</a>
            </div>
            
            <div className="mt-4 md:mt-0 flex items-center">
              <a 
                href="https://github.com/eclipsevpn"
                className="text-gray-400 hover:text-white flex items-center transition-colors duration-300"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github className="h-5 w-5 mr-1" />
                <span className="text-sm">GitHub</span>
              </a>
            </div>
          </div>
          
          <div className="mt-8 text-center text-xs text-gray-600">
            © {new Date().getFullYear()} Eclipse VPN. All rights reserved.
          </div>
        </footer>
      </main>
      
      {/* Toast notifications */}
      <Toast
        type={toast.type}
        message={toast.message}
        visible={toast.visible}
        onClose={() => setToast({ ...toast, visible: false })}
      />
    </div>
  );
}

export default App;
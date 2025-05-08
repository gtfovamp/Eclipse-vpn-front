import React from 'react';
import { ShieldCheck } from 'lucide-react';
import Filters from '../Filters/Filters';
import { FilterState } from '../../types/vpn';

interface HeaderProps {
  filterState: FilterState;
  setFilterState: (filterState: FilterState) => void;
  totalServers: number;
}

const Header: React.FC<HeaderProps> = ({ filterState, setFilterState, totalServers }) => {
  return (
    <header className="sticky top-0 z-10 backdrop-blur-md bg-black/90 border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="flex items-center">
            <ShieldCheck className="h-8 w-8 text-[#007AFF] mr-2" />
            <h1 className="text-2xl font-extralight text-white tracking-tight">
              Eclipse<span className="font-medium text-[#007AFF]">VPN</span>
            </h1>
          </div>
          
          <div className="flex items-center space-x-3 text-sm text-gray-400">
            <span className="px-2 py-1 rounded-full bg-gray-800/70">
              {totalServers} Servers
            </span>
            <span className="px-2 py-1 rounded-full bg-gray-800/70">
              24/7 Support
            </span>
            <span className="hidden md:inline-flex px-2 py-1 rounded-full bg-[#007AFF]/20 text-[#007AFF]">
              Premium
            </span>
          </div>
        </div>
        
        <Filters filterState={filterState} setFilterState={setFilterState} />
      </div>
    </header>
  );
};

export default Header;
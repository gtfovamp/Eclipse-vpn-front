import React, { useCallback } from 'react';
import { Search, Globe, Shield, Activity } from 'lucide-react';
import { FilterState } from '../../types/vpn';

interface FiltersProps {
  filterState: FilterState;
  setFilterState: (state: FilterState) => void;
}

const Filters: React.FC<FiltersProps> = ({ filterState, setFilterState }) => {
  // Debounce search input
  const debounce = (func: Function, delay: number) => {
    let timeoutId: NodeJS.Timeout;
    return (...args: any[]) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func(...args), delay);
    };
  };

  const handleSearch = useCallback(
    debounce((value: string) => {
      setFilterState({ ...filterState, search: value });
    }, 300),
    [filterState, setFilterState]
  );

  const countries = [
    'All Countries',
    'United States',
    'United Kingdom',
    'Canada',
    'Germany',
    'France',
    'Netherlands',
    'Japan',
    'Singapore',
    'Australia',
    'Brazil',
    'India',
    'South Korea'
  ];

  const protocols = ['All Protocols', 'OpenVPN UDP', 'OpenVPN TCP'];
  const statuses = ['All Status', 'active', 'high-load', 'offline'];

  return (
    <div className="py-4 space-y-4">
      <div className="relative">
        <Search className="h-5 w-5 text-gray-500 absolute left-3 top-1/2 transform -translate-y-1/2" />
        <input
          type="text"
          placeholder="Search servers by location, country, or IP..."
          className="w-full pl-10 pr-4 py-2 bg-[#1A1A1A] border border-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#007AFF] text-white transition-all duration-300"
          onChange={(e) => handleSearch(e.target.value)}
        />
      </div>

      <div className="flex flex-wrap gap-3">
        <div className="relative flex items-center">
          <Globe className="h-4 w-4 text-gray-500 absolute left-3" />
          <select
            value={filterState.region}
            onChange={(e) => setFilterState({ ...filterState, region: e.target.value })}
            className="pl-9 pr-8 py-1 bg-[#1A1A1A] border border-gray-800 rounded-lg appearance-none focus:outline-none focus:ring-1 focus:ring-[#007AFF] text-gray-300 text-sm"
          >
            {countries.map((country) => (
              <option key={country} value={country === 'All Countries' ? '' : country}>
                {country}
              </option>
            ))}
          </select>
          <div className="absolute right-3 pointer-events-none">
            <svg className="h-4 w-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>

        <div className="relative flex items-center">
          <Shield className="h-4 w-4 text-gray-500 absolute left-3" />
          <select
            value={filterState.protocol}
            onChange={(e) => setFilterState({ ...filterState, protocol: e.target.value })}
            className="pl-9 pr-8 py-1 bg-[#1A1A1A] border border-gray-800 rounded-lg appearance-none focus:outline-none focus:ring-1 focus:ring-[#007AFF] text-gray-300 text-sm"
          >
            {protocols.map((protocol) => (
              <option key={protocol} value={protocol === 'All Protocols' ? '' : protocol}>
                {protocol}
              </option>
            ))}
          </select>
          <div className="absolute right-3 pointer-events-none">
            <svg className="h-4 w-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>

        <div className="relative flex items-center">
          <Activity className="h-4 w-4 text-gray-500 absolute left-3" />
          <select
            value={filterState.status}
            onChange={(e) => setFilterState({ ...filterState, status: e.target.value })}
            className="pl-9 pr-8 py-1 bg-[#1A1A1A] border border-gray-800 rounded-lg appearance-none focus:outline-none focus:ring-1 focus:ring-[#007AFF] text-gray-300 text-sm"
          >
            {statuses.map((status) => (
              <option key={status} value={status === 'All Status' ? '' : status}>
                {status}
              </option>
            ))}
          </select>
          <div className="absolute right-3 pointer-events-none">
            <svg className="h-4 w-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Filters;
import React from 'react';
import { VPNServer, FilterState } from '../../types/vpn';
import ServerCard from '../ServerCard/ServerCard';
import { Loader } from 'lucide-react';

interface ServerListProps {
  servers: VPNServer[];
  isLoading: boolean;
  error: string | null;
  filters: FilterState;
}

const ServerList: React.FC<ServerListProps> = ({ servers, isLoading, error, filters }) => {
  // Function to filter servers based on filter state
  const getFilteredServers = () => {
    return servers.filter((server) => {
      // Search filter - check host, IP, and country
      const searchMatch = !filters.search || 
        server.host.toLowerCase().includes(filters.search.toLowerCase()) ||
        server.ip.includes(filters.search) ||
        server.country.toLowerCase().includes(filters.search.toLowerCase());

      // Region filter - match country
      const regionMatch = !filters.region ||
        server.country.toLowerCase() === filters.region.toLowerCase();

      // Protocol filter
      const protocolMatch = !filters.protocol ||
        server.protocol.toLowerCase().includes(filters.protocol.toLowerCase());

      // Status filter - exact match with server status
      const statusMatch = !filters.status ||
        server.status === filters.status.toLowerCase();

      return searchMatch && regionMatch && protocolMatch && statusMatch;
    });
  };

  const filteredServers = getFilteredServers();

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px]">
        <Loader className="h-8 w-8 text-[#007AFF] animate-spin mb-4" />
        <p className="text-gray-400">Loading servers...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] text-center px-4">
        <div className="bg-red-500/10 p-4 rounded-lg mb-4">
          <span className="text-red-500 text-xl">🔴</span>
        </div>
        <h3 className="text-xl font-medium text-white mb-2">Connection Error</h3>
        <p className="text-gray-400 max-w-md">
          We couldn't connect to our server list. Please check your internet connection and try again.
        </p>
        <button className="mt-4 px-4 py-2 bg-[#1A1A1A] border border-gray-800 rounded-lg text-white hover:bg-gray-800 transition-all duration-300">
          Retry Connection
        </button>
      </div>
    );
  }

  if (filteredServers.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[300px] text-center px-4">
        <div className="bg-[#1A1A1A] p-4 rounded-full mb-4">
          <span className="text-2xl">🔍</span>
        </div>
        <h3 className="text-xl font-medium text-white mb-2">No Servers Found</h3>
        <p className="text-gray-400 max-w-md">
          No servers match your current filters. Try adjusting your search criteria.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredServers.map((server) => (
        <ServerCard key={server.id} server={server} />
      ))}
    </div>
  );
};

export default ServerList;
import React, { useState } from 'react';
import { Download, ArrowRight, Wifi } from 'lucide-react';
import { VPNServer } from '../../types/vpn';
import { getStatusEmoji, getProtocolIcon } from '../../api/vpnApi';

interface ServerCardProps {
  server: VPNServer;
}

const ServerCard: React.FC<ServerCardProps> = ({ server }) => {
  const [downloading, setDownloading] = useState<boolean>(false);

  const getStatusColor = (status: string): string => {
    switch (status) {
      case 'active':
        return 'text-green-500';
      case 'high-load':
        return 'text-yellow-500';
      case 'offline':
        return 'text-red-500';
      default:
        return 'text-gray-500';
    }
  };

  const getLoadColor = (sessions: number): string => {
    if (sessions < 50) return 'text-green-500';
    if (sessions < 85) return 'text-yellow-500';
    return 'text-red-500';
  };

  const handleDownloadConfig = () => {
    setDownloading(true);
    
    try {
      // Create blob from config
      const blob = new Blob([server.config], { type: 'text/plain' });
      const url = window.URL.createObjectURL(blob);
      
      // Create temporary link and trigger download
      const link = document.createElement('a');
      link.href = url;
      link.download = `eclipse-vpn-${server.host.toLowerCase().replace(/\s+/g, '-')}.ovpn`;
      document.body.appendChild(link);
      link.click();
      
      // Cleanup
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Failed to download config:', error);
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div className="group relative bg-[#1A1A1A]/80 backdrop-blur-lg rounded-xl overflow-hidden border border-gray-800/50 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:border-[#007AFF]/30 p-6">
      {/* Status indicator dot */}
      <div className={`absolute top-3 right-3 flex items-center ${getStatusColor(server.status)}`}>
        <span aria-label={`Server status: ${server.status}`} className="mr-1">
          {server.emoji}
        </span>
        <span className="text-xs opacity-60 capitalize">{server.status}</span>
      </div>

      {/* Server location */}
      <div className="flex items-center mb-4">
        <span className="text-2xl mr-2" aria-hidden="true">{server.flag}</span>
        <h3 className="text-lg font-medium text-white">{server.host}</h3>
      </div>
      
      {/* Server IP */}
      <div className="flex items-center gap-3 mb-3">
        <div className="bg-black/40 p-2 rounded-lg">
          <Wifi className="h-4 w-4 text-[#007AFF]" />
        </div>
        <div>
          <div className="text-sm text-gray-400">Server IP</div>
          <div className="text-white font-mono tracking-tight">{server.ip}</div>
        </div>
      </div>
      
      {/* Protocol */}
      <div className="mb-4 flex items-center">
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#007AFF]/10 text-[#007AFF]">
          <span className="mr-1" aria-hidden="true">{getProtocolIcon(server.protocol)}</span>
          {server.protocol}
        </span>
        
        <div className="ml-3 flex items-center">
          <div className={`text-sm ${getLoadColor(server.sessions)}`}>
            {server.sessions}% Load
          </div>
        </div>
      </div>
      
      {/* Ping indicator */}
      <div className="flex items-center mb-4">
        <span className="text-xs text-gray-400">Ping:</span>
        <span className="ml-1 text-xs font-medium text-white">{server.ping} ms</span>
        <div className="ml-2 flex h-1.5 w-16 overflow-hidden rounded-full bg-gray-700">
          <div 
            className={`flex h-full ${
              server.ping < 50 ? 'bg-green-500' : server.ping < 100 ? 'bg-yellow-500' : 'bg-red-500'
            }`}
            style={{ width: `${Math.min(100, (server.ping / 200) * 100)}%` }}
          />
        </div>
      </div>

      {/* Speed indicator */}
      <div className="flex items-center mb-5">
        <span className="text-xs text-gray-400">Speed:</span>
        <span className="ml-1 text-xs font-medium text-white">{server.speed} Mbps</span>
      </div>
      
      {/* Connect button */}
      <button
        onClick={handleDownloadConfig}
        disabled={downloading || server.status === 'offline'}
        className="w-full flex items-center justify-center text-sm px-4 py-2 rounded-lg bg-[#007AFF] hover:bg-[#0070E8] text-white font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#007AFF] focus:ring-offset-[#1A1A1A] disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {downloading ? (
          <>
            <Download className="h-4 w-4 mr-1.5 animate-bounce" />
            Downloading...
          </>
        ) : (
          <>
            <Download className="h-4 w-4 mr-1.5" />
            Download Config
          </>
        )}
      </button>
      
      {/* Connect button (appears on hover) */}
      <div className="absolute -bottom-12 group-hover:bottom-0 left-0 right-0 transition-all duration-300 ease-out bg-gradient-to-t from-black to-transparent p-3 flex justify-center">
        <button 
          className="flex items-center text-xs text-[#007AFF] hover:text-white"
          aria-label="Connect to server"
        >
          <span className="mr-1">Connect Now</span>
          <ArrowRight className="h-3 w-3" />
        </button>
      </div>
    </div>
  );
};

export default ServerCard;
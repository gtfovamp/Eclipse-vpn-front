import { VPNServer } from '../types/vpn';

const API_URL = 'https://eclipse-vpn-api.onrender.com/vpn-data/';

// Country flag emojis mapping
const countryFlags: { [key: string]: string } = {
  'United States': '🇺🇸',
  'United Kingdom': '🇬🇧',
  'Canada': '🇨🇦',
  'Germany': '🇩🇪',
  'France': '🇫🇷',
  'Netherlands': '🇳🇱',
  'Japan': '🇯🇵',
  'Singapore': '🇸🇬',
  'Australia': '🇦🇺',
  'Brazil': '🇧🇷',
  'India': '🇮🇳',
  'South Korea': '🇰🇷',
  // Add more countries as needed
};

// Get country flag emoji
export const getCountryFlag = (country: string): string => {
  return countryFlags[country] || '🌐';
};

interface ApiResponse {
  host: string;
  ip: string;
  score: number;
  ping: number;
  speed: number;
  country: string;
  sessions: number;
  uptime: number;
  total_users: number;
  total_traffic: number;
  config: string;
}

export const getServerStatus = (load: number): 'active' | 'high-load' | 'offline' => {
  if (load < 50) return 'active';
  if (load < 85) return 'high-load';
  return 'offline';
};

export const getStatusEmoji = (status: string): string => {
  switch (status) {
    case 'active':
      return '🟢';
    case 'high-load':
      return '🟡';
    case 'offline':
      return '🔴';
    default:
      return '⚪';
  }
};

export const getProtocolIcon = (protocol: string): string => {
  switch (protocol.toLowerCase()) {
    case 'wireguard':
      return '🛡️';
    case 'openvpn':
      return '🔒';
    default:
      return '🔐';
  }
};

export const fetchVPNServers = async (): Promise<VPNServer[]> => {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    
    const data: ApiResponse[] = await response.json();
    
    return data.map((server): VPNServer => ({
      id: server.ip,
      host: server.host,
      ip: server.ip,
      score: server.score,
      ping: server.ping,
      speed: server.speed,
      country: server.country,
      sessions: server.sessions,
      uptime: server.uptime,
      total_users: server.total_users,
      total_traffic: server.total_traffic,
      config: server.config,
      status: getServerStatus(server.sessions),
      flag: getCountryFlag(server.country),
      protocol: server.config.includes('udp') ? 'OpenVPN UDP' : 'OpenVPN TCP',
      emoji: getStatusEmoji(getServerStatus(server.sessions))
    }));
  } catch (error) {
    console.error('Failed to fetch VPN servers:', error);
    return [];
  }
};
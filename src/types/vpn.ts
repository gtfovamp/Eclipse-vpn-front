export interface VPNServer {
  id: string;
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
  status: 'active' | 'high-load' | 'offline';
  flag: string;
  protocol: string;
  emoji: string;
}

export interface FilterState {
  search: string;
  region: string;
  protocol: string;
  status: string;
}
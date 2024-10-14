export interface Device {
  id: string;
  deviceId: string;
  connectionStatus: boolean;
  deviceName: string;
  deviceType: string;
  ipAddress: string;
  password: string;
  serviceUsed: string[];
  status: boolean;
  username: string;
}

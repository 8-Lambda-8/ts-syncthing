export type configT = {
  host?: string;
  port?: number;
  apiKey: string;
};

export type requestOptionsT = {
  endpoint: string;
  post?: boolean;
  args?: { [key: string]: string };
  body?: string;
};

export type cbT<T> = (res: T, err?: Error) => void;
export type funOverT<T> = (() => Promise<T>) & ((callback: cbT<T>) => void);

export type connectionsT = {
  connections: {
    [id: string]: {
      address: string;
      at: string;
      clientVersion: string;
      connected: boolean;
      inBytesTotal: number;
      outBytesTotal: number;
      paused: boolean;
      startedAt: string;
      type: string;
    };
  };
  total: {
    at: string;
    inBytesTotal: number;
    outBytesTotal: number;
  };
};
export type debugT = {
  enabled: string[];
  facilities: { [key: string]: string };
};
export type discoveryT = { [key: string]: { adresses: string[] } };

type messageT = { when: string; message: string; level: number };
export type errorT = {
  errors: messageT[];
};
export type logT = {
  messages: messageT[];
};

export type pingT = { ping: "pong" };

export type statusT = {
  alloc: number;
  connectionServiceStatus: {
    [url: string]: {
      error: null;
      lanAddresses: string[];
      wanAddresses: string[];
    };
  };
  cpuPercent: number;
  discoveryEnabled: boolean;
  discoveryErrors: { [server: string]: string };
  discoveryStatus: { [connection: string]: { error: null | string } };
  discoveryMethods: number;
  goroutines: number;
  lastDialStatus: {
    [connection: string]: {
      when: string;
      error: string;
    };
  };
  myID: string;
  pathSeparator: string;
  startTime: string;
  sys: number;
  themes: string[];
  tilde: string;
  uptime: number;
};

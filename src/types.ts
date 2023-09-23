export type configT = {
  host?: string;
  path?: string;
  port?: number;
  apiKey: string;
  https?: boolean;
  timeout?: number;
};

export type requestOptionsT = {
  endpoint: string;
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
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

export type upgradeT = {
  latest: string;
  majorNewer: boolean;
  newer: boolean;
  running: string;
};

export type versionT = {
  arch: string;
  longVersion: string;
  os: string;
  version: string;
};

export type folderT = {
  id: string;
  label: string;
  filesystemType: string;
  path: string;
  type: string;
  devices: {
    deviceID: string;
    introducedBy: string;
    encryptionPassword: string;
  }[];
  rescanIntervalS: number;
  fsWatcherEnabled: boolean;
  fsWatcherDelayS: number;
  ignorePerms: boolean;
  autoNormalize: boolean;
  minDiskFree: { value: number; unit: string };
  versioning: {
    type: string;
    params: unknown; //fix this
    cleanupIntervalS: number;
    fsPath: string;
    fsType: string;
  };
  copiers: number;
  pullerMaxPendingKiB: number;
  hashers: number;
  order: number;
  ignoreDelete: boolean;
  scanProgressIntervalS: number;
  pullerPauseS: number;
  maxConflicts: number;
  disableSparseFiles: boolean;
  disableTempIndexes: boolean;
  paused: boolean;
  weakHashThresholdPct: number;
  markerName: string;
  copyOwnershipFromParent: boolean;
  modTimeWindowS: number;
  maxConcurrentWrites: number;
  disableFsync: boolean;
  blockPullOrder: string;
  copyRangeMethod: string;
  caseSensitiveFS: boolean;
  junctionsAsDirs: boolean;
};

export type deviceT = {
  deviceID: string;
  name: string;
  addresses: string[];
  compression: string;
  certName: string;
  introducer: boolean;
  skipIntroductionRemovals: boolean;
  introducedBy: string;
  paused: boolean;
  allowedNetworks: string[];
  autoAcceptFolders: boolean;
  maxSendKbps: number;
  maxRecvKbps: number;
  ignoredFolders: {
    time: string; //ISO Date string
    id: string;
    label: string;
  }[];
  maxRequestKiB: number;
  untrusted: boolean;
  remoteGUIPort: number;
};

export type getConfigT = {
  version: number;
  folders: folderT[];
  devices: deviceT[];
  gui: {
    enabled: boolean;
    address: string;
    unixSocketPermissions: string;
    user: string;
    password: string;
    authMode: string;
    useTLS: boolean;
    apiKey: string;
    insecureAdminAccess: boolean;
    theme: string;
    debugging: boolean;
    insecureSkipHostcheck: boolean;
    insecureAllowFrameLoading: boolean;
  };
  ldap: {
    address: string;
    bindDN: string;
    transport: string;
    insecureSkipVerify: boolean;
    searchBaseDN: string;
    searchFilter: string;
  };
  options: {
    listenAddresses: string[];
    globalAnnounceServers: string[];
    globalAnnounceEnabled: boolean;
    localAnnounceEnabled: boolean;
    localAnnouncePort: number;
    localAnnounceMCAddr: string;
    maxSendKbps: number;
    maxRecvKbps: number;
    reconnectionIntervalS: number;
    relaysEnabled: boolean;
    relayReconnectIntervalM: number;
    startBrowser: boolean;
    natEnabled: boolean;
    natLeaseMinutes: number;
    natRenewalMinutes: number;
    natTimeoutSeconds: number;
    urAccepted: number;
    urSeen: number;
    urUniqueId: string;
    urURL: string;
    urPostInsecurely: boolean;
    urInitialDelayS: number;
    restartOnWakeup: boolean;
    autoUpgradeIntervalH: number;
    upgradeToPreReleases: boolean;
    keepTemporariesH: number;
    cacheIgnoredFiles: boolean;
    progressUpdateIntervalS: number;
    limitBandwidthInLan: boolean;
    minHomeDiskFree: { value: number; unit: string };
    releasesURL: string;
    alwaysLocalNets: [];
    overwriteRemoteDeviceNamesOnConnect: boolean;
    tempIndexMinBlocks: number;
    unackedNotificationIDs: [];
    trafficClass: number;
    setLowPriority: boolean;
    maxFolderConcurrency: number;
    crURL: string;
    crashReportingEnabled: boolean;
    stunKeepaliveStartS: number;
    stunKeepaliveMinS: number;
    stunServers: string[];
    databaseTuning: string;
    maxConcurrentIncomingRequestKiB: number;
    announceLANAddresses: boolean;
    sendFullIndexOnUpgrade: boolean;
    featureFlags: [];
    connectionLimitEnough: 0;
    connectionLimitMax: 0;
    insecureAllowOldTLSVersions: boolean;
  };
  remoteIgnoredDevices: [];
};

export type pendingDevicesT = {
  [deviceId: string]: {
    time: string;
    name: string;
    aadress: string;
  };
};

export type pendingFoldersT = {
  [folderId: string]: {
    offeredBy: {
      [deviceId: string]: {
        time: string;
        label: string;
        receiveEncrypted: boolean;
        remoteEncrypted: boolean;
      };
    };
  };
};

export type completionT = {
  completion: number;
  globalBytes: number;
  needBytes: number;
  globalItems: number;
  needItems: number;
  needDeletes: number;
  remoteState: "valid" | "paused" | "notSharing" | "unknown";
  sequence: number;
};

export type deviceStatsT = {
  [id: string]: {
    lastSeen: string; //ISO Date string
    lastConnectionDurationS: number;
  };
};

export type folderStatsT = {
  [id: string]: {
    lastScan: string; //ISO Date string
    lastFile: {
      filename: string;
      at: string; //ISO Date string
    };
  };
};

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

export type getConfigT = {
  version: number;
  folders: {
    id: string;
    label: string;
    filesystemType: string;
    path: "/home/jakob/Dev";
    type: "sendonly";
    devices: string[];
    rescanIntervalS: number;
    fsWatcherEnabled: boolean;
    fsWatcherDelayS: number;
    ignorePerms: boolean;
    autoNormalize: boolean;
    minDiskFree: unknown; //fix this
    versioning: unknown; //fix this
    copiers: number;
    pullerMaxPendingKiB: number;
    hashers: number;
    order: "random" | string;
    ignoreDelete: boolean;
    scanProgressIntervalS: number;
    pullerPauseS: number;
    maxConflicts: number;
    disableSparseFiles: boolean;
    disableTempIndexes: boolean;
    paused: boolean;
    weakHashThresholdPct: number;
    markerName: ".stfolder" | string;
    copyOwnershipFromParent: boolean;
    modTimeWindowS: number;
    maxConcurrentWrites: number;
    disableFsync: boolean;
    blockPullOrder: string;
    copyRangeMethod: string;
    caseSensitiveFS: boolean;
    junctionsAsDirs: boolean;
  }[];
  devices: {
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
    ignoredFolders: string[];
    maxRequestKiB: number;
    untrusted: boolean;
    remoteGUIPort: number;
  }[];
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
    globalAnnounceEnabled: true;
    localAnnounceEnabled: true;
    localAnnouncePort: number;
    localAnnounceMCAddr: string;
    maxSendKbps: number;
    maxRecvKbps: number;
    reconnectionIntervalS: number;
    relaysEnabled: true;
    relayReconnectIntervalM: number;
    startBrowser: true;
    natEnabled: true;
    natLeaseMinutes: number;
    natRenewalMinutes: number;
    natTimeoutSeconds: number;
    urAccepted: number;
    urSeen: number;
    urUniqueId: string;
    urURL: string;
    urPostInsecurely: boolean;
    urInitialDelayS: number;
    restartOnWakeup: true;
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
    setLowPriority: true;
    maxFolderConcurrency: number;
    crURL: string;
    crashReportingEnabled: true;
    stunKeepaliveStartS: number;
    stunKeepaliveMinS: number;
    stunServers: string[];
    databaseTuning: string;
    maxConcurrentIncomingRequestKiB: number;
    announceLANAddresses: true;
    sendFullIndexOnUpgrade: boolean;
    featureFlags: [];
    connectionLimitEnough: 0;
    connectionLimitMax: 0;
    insecureAllowOldTLSVersions: boolean;
  };
  remoteIgnoredDevices: [];
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

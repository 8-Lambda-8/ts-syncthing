import * as http from "http";
import {
  configT,
  cbT,
  pingT,
  requestOptionsT,
  funOverT,
  connectionsT,
  debugT,
  discoveryT,
  errorT,
  logT,
  statusT,
  upgradeT,
  versionT,
  getConfigT,
  completionT,
  deviceStatsT,
  folderStatsT,
} from "./types";

export class syncthing {
  private _config: configT;

  public constructor(config: configT) {
    this._config = {
      host: config.host || "127.0.0.1",
      port: 8384,
      apiKey: undefined,
      ...config,
    };
  }

  private request<T>(options: requestOptionsT): Promise<T>;
  private request<T>(options: requestOptionsT, cb: cbT<T>): void;
  private request<T>(options: requestOptionsT, cb?: cbT<T>): void | Promise<T> {
    if (cb) {
      this.req(options, cb);
    } else {
      return new Promise((resolve, reject) => {
        this.req(options, (res: T, err: Error) => {
          resolve(res);
          reject(err);
        });
      });
    }
  }

  private req<T>(_options: requestOptionsT, cb: cbT<T>): void {
    const args = [];
    for (const arg in _options.args) {
      if (_options.args[arg].length > 0)
        args.push(`${encodeURI(arg)}=${encodeURI(_options.args[arg])}`);
    }
    const argsString = args.join("&");

    const options: http.RequestOptions = {
      hostname: this._config.host,
      port: this._config.port,
      path: `/rest/${_options.endpoint}?${argsString}`,
      method: _options.post ? "POST" : "GET",
    };
    options.headers = { "X-API-Key": this._config.apiKey };

    const req = http.request(options, (res) => {
      let data = "";
      res.on("data", (chunk) => {
        data += chunk;
      });

      res.on("end", () => {
        if (res.statusCode.toString()[0] == "2") {
          //OK
          const contentType = res.headers["content-type"];
          if (!contentType) return;
          if (contentType.includes("json"))
            try {
              cb(JSON.parse(data));
              return;
            } catch (error) {
              console.error(error);
            }
        } else {
          console.log(res.statusCode);
          console.log(res.statusMessage);
          cb(null, new Error(data));
        }
      });
      res.on("error", (err) => {
        cb(null, err);
      });
    });
    if (_options.body) req.write(_options.body);
    req.end();
  }

  /**
   * System Endpoints:
   *
   * */

  private system_browse = ((path: string, callback?: cbT<string[]>) =>
    this.request(
      { endpoint: "system/browse", args: { current: path } },
      callback,
    )) as ((path: string) => Promise<string[]>) &
    ((path: string, callback: cbT<string[]>) => void);

  private system_connections = ((callback?: cbT<connectionsT>) =>
    this.request(
      { endpoint: "system/connections" },
      callback,
    )) as funOverT<connectionsT>;

  private system_getDebug = ((callback?: cbT<debugT>) =>
    this.request({ endpoint: "system/debug" }, callback)) as funOverT<debugT>;

  private system_setDebug = ((
    enable: string[],
    disable: string[],
    callback?: cbT<string>,
  ) =>
    this.request(
      {
        args: { enable: enable.join(","), disable: disable.join(",") },
        endpoint: "system/debug",
        post: true,
      },
      callback,
    )) as ((enable: string[], disable: string[]) => Promise<string>) &
    ((enable: string[], disable: string[], callback: cbT<string>) => void);

  private system_getDiscovery = ((callback?: cbT<discoveryT>) =>
    this.request(
      { endpoint: "system/discovery" },
      callback,
    )) as funOverT<discoveryT>;

  private system_setDiscovery = ((
    device: string,
    addr: string,
    callback?: cbT<string>,
  ) =>
    this.request(
      {
        args: { device, addr },
        endpoint: "system/discovery",
        post: true,
      },
      callback,
    )) as ((device: string, addr: string) => Promise<string>) &
    ((device: string, addr: string, callback: cbT<string>) => void);

  private system_clearError = ((callback?: cbT<string>) =>
    this.request(
      {
        endpoint: "system/error/clear",
        post: true,
      },
      callback,
    )) as funOverT<string>;

  private system_getError = ((callback?: cbT<errorT>) =>
    this.request({ endpoint: "system/error" }, callback)) as funOverT<errorT>;

  private system_setError = ((message: string, callback?: cbT<string>) =>
    this.request(
      {
        endpoint: "system/error",
        post: true,
        body: message,
      },
      callback,
    )) as ((message: string) => Promise<string>) &
    ((message: string, callback: cbT<string>) => void);

  private system_log = ((since?: Date, callback?: cbT<logT>) =>
    this.request(
      {
        args: since ? { since: since.toISOString() } : {},
        endpoint: "system/log",
      },
      callback,
    )) as funOverT<logT>;

  private system_log_txt = ((since?: Date, callback?: cbT<string>) =>
    this.request(
      {
        args: since ? { since: since.toISOString() } : {},
        endpoint: "system/log.txt",
      },
      callback,
    )) as funOverT<string>;

  private system_pause = ((device?: string, callback?: cbT<string>) =>
    this.request(
      {
        args: device ? { device } : {},
        endpoint: "system/pause",
        post: true,
      },
      callback,
    )) as ((device: string) => Promise<string>) &
    ((device: string, callback: cbT<string>) => void);

  private system_ping = ((callback?: cbT<pingT>) =>
    this.request({ endpoint: "system/ping" }, callback)) as funOverT<pingT>;

  private system_reset = ((folder?: string, callback?: cbT<string>) =>
    this.request(
      {
        args: folder ? { folder } : {},
        endpoint: "system/reset",
        post: true,
      },
      callback,
    )) as ((folder: string) => Promise<string>) &
    ((folder: string, callback: cbT<string>) => void);

  private system_restart = ((callback?: cbT<string>) =>
    this.request(
      { endpoint: "system/restart", post: true },
      callback,
    )) as funOverT<string>;

  private system_resume = ((device?: string, callback?: cbT<string>) =>
    this.request(
      {
        args: device ? { device } : {},
        endpoint: "system/resume",
        post: true,
      },
      callback,
    )) as ((device: string) => Promise<string>) &
    ((device: string, callback: cbT<string>) => void);

  private system_shutdown = ((callback?: cbT<string>) =>
    this.request(
      { endpoint: "system/shutdown", post: true },
      callback,
    )) as funOverT<string>;

  private system_status = ((callback?: cbT<statusT>) =>
    this.request({ endpoint: "system/status" }, callback)) as funOverT<statusT>;

  private system_upgradeCheck = ((callback?: cbT<string>) =>
    this.request({ endpoint: "system/upgrade" }, callback)) as funOverT<string>;

  private system_upgradeDo = ((callback?: cbT<upgradeT>) =>
    this.request(
      { endpoint: "system/upgrade", post: true },
      callback,
    )) as funOverT<upgradeT>;

  private system_version = ((callback?: cbT<versionT>) =>
    this.request(
      { endpoint: "system/version" },
      callback,
    )) as funOverT<versionT>;

  /**
   * Config Endpoints:
   *
   * */

  private config_config = ((callback?: cbT<getConfigT>) =>
    this.request({ endpoint: "config" }, callback)) as funOverT<getConfigT>;

  /**
   * DB Endpoints:
   *
   * */

  private db_completion = ((
    of?: { device?: string; folder?: string },
    callback?: cbT<completionT>,
  ) =>
    this.request(
      {
        args: of,
        endpoint: "db/completion",
      },
      callback,
    )) as ((of?: {
    device?: string;
    folder?: string;
  }) => Promise<completionT>) &
    ((
      of: { device?: string; folder?: string },
      callback: cbT<completionT>,
    ) => void) &
    ((callback: cbT<completionT>) => void);

  /**
   * stats Endpoints:
   *
   * */

  private stats_device = ((callback?: cbT<deviceStatsT>) =>
    this.request(
      { endpoint: "stats/device" },
      callback,
    )) as funOverT<deviceStatsT>;

  private stats_folder = ((callback?: cbT<folderStatsT>) =>
    this.request(
      { endpoint: "stats/folder" },
      callback,
    )) as funOverT<folderStatsT>;

  /**
   * Noauth Endpoints:
   *
   * */

  private noauth_health = ((callback?: cbT<{ status: "OK" }>) =>
    this.request({ endpoint: "noauth/health" }, callback)) as funOverT<{
    status: "OK";
  }>;

  public system = {
    browse: this.system_browse,
    connections: this.system_connections,
    getDebug: this.system_getDebug,
    setDebug: this.system_setDebug,
    getDiscovery: this.system_getDiscovery,
    setDiscovery: this.system_setDiscovery,
    clearError: this.system_clearError,
    getError: this.system_getError,
    setError: this.system_setError,
    log: this.system_log,
    log_txt: this.system_log_txt,
    pause: this.system_pause,
    ping: this.system_ping,
    reset: this.system_reset,
    restart: this.system_restart,
    resume: this.system_resume,
    shutdown: this.system_shutdown,
    status: this.system_status,
    upgradeCheck: this.system_upgradeCheck,
    upgradeDo: this.system_upgradeDo,
    version: this.system_version,
  };
  public config = {
    getConfig: this.config_config,
    //restartRequired: this.config_restartRequired,
    //folders: this.config_folders,
    //devices: this.config_devices,
    //folder: this.config_folder,
    //device: this.config_device,
    //options: this.config_options,
    //ldap: this.config_ldap,
    //gui: this.config_gui,
  };
  public cluster = {
    //getPendingDevices: this.cluster_getPendingDevices,
    //deletePendingDevices: this.cluster_deletePendingDevices,
    //getPendingFolders: this.cluster_getPendingFolders,
    //deletePendingFolders: this.cluster_deletePendingFolders,
  };
  public folder = {
    //errors: this.folder_errors,
    //getVersions: this.folder_getVersions,
    //setVersions: this.folder_setVersions,
  };
  public db = {
    //browse: this.db_browse,
    completion: this.db_completion,
    //file: this.db_file,
    //getIgnores: this.db_getIgnores,
    //setIgnores: this.db_setIgnores,
    //localchanged: this.db_localchanged,
    //need: this.db_need,
    //override: this.db_override,
    //prio: this.db_prio,
    //remoteneed: this.db_remoteneed,
    //revert: this.db_revert,
    //scan: this.db_scan,
    //status: this.db_status,
  };
  public events = {
    //events: this.events_events,
    //disk: this.disk,
  };
  public stats = {
    device: this.stats_device,
    folder: this.stats_folder,
  };
  public svc = {
    //deviceId: this.svc_deviceId,
    //lang: this.svc_deviceId,
    //randomString: this.svc_randomString,
    //report: this.svc_report,
  };
  public debug = {
    //peerCompletion: this.debug_peerCompletion,
    //httpMetrics: this.debug_httpMetrics,
    //cpuprof: this.debug_cpuprof,
    //heapprof: this.debug_heapprof,
    //support: this.debug_support,
    //file: this.debug_file,
  };
  public noauth = {
    health: this.noauth_health,
  };
}

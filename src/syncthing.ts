import * as http from "http";
import { configT, cbT, pingT, restartT, requestOptionsT } from "./types";

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

  private req<T>(
    _options: {
      endpoint: string;
      post?: boolean;
      args?: { [key: string]: string };
    },
    cb: cbT<T>,
  ): void {
    const args = [];
    for (const arg in _options.args) {
      args.push(`${encodeURI(arg)}=${encodeURI(_options.args[arg])}`);
    }
    const argsString = args.join("&");
    console.log(argsString);

    const options: http.RequestOptions = {
      hostname: this._config.host,
      port: this._config.port,
      path: `/rest/${_options.endpoint}?${argsString}`,
      method: _options.post ? "POST" : "GET",
    };
    options.headers = { "X-API-Key": this._config.apiKey };

    http.get(options, (res) => {
      let data = "";
      res.on("data", (chunk) => {
        data += chunk;
      });

      res.on("end", () => {
        cb(JSON.parse(data));
      });
      res.on("error", (err) => {
        cb(null, err);
      });
    });
  }

  private system_ping(): Promise<pingT>;
  private system_ping(callback: cbT<pingT>): void;
  private system_ping(callback?: cbT<pingT>): Promise<pingT> | void {
    return this.request({ endpoint: "system/ping" }, callback);
  }

  private system_browse(path: string): Promise<string[]>;
  private system_browse(path: string, callback: cbT<string[]>): void;
  private system_browse(
    path: string,
    callback?: cbT<string[]>,
  ): Promise<string[]> | void {
    return this.request(
      { endpoint: "system/browse", args: { current: path } },
      callback,
    );
  }

  private system_restart(): Promise<restartT>;
  private system_restart(callback: cbT<restartT>): void;
  private system_restart(callback?: cbT<restartT>): Promise<restartT> | void {
    return this.request({ endpoint: "system/browse" }, callback);
  }

  public system = {
    browse: this.system_browse.bind(this),
    //connections:this.system_connections.bind(this),
    //getDebug:this.system_getDebug.bind(this),
    //setDebug:this.system_setDebug.bind(this),
    //getDiscovery:this.system_getDiscovery.bind(this),
    //setDiscovery:this.system_setDiscovery.bind(this),
    //clearError:this.system_clearError.bind(this),
    //getError:this.system_getError.bind(this),
    //setError:this.system_setError.bind(this),
    //log:this.system_log.bind(this),
    //log_txt:this.system_log_txt.bind(this),
    //paths:this.system_paths.bind(this),
    //pause:this.system_pause.bind(this),
    ping: this.system_ping.bind(this),
    //reset:this.system_reset.bind(this),
    restart: this.system_restart.bind(this),
    //resume:this.system_resume.bind(this),
    //shutdown:this.system_shutdown.bind(this),
    //status:this.system_status.bind(this),
    //upgradeCheck:this.system_upgradeCheck.bind(this),
    //upgradeDo:this.system_upgradeDo.bind(this),
    //version:this.system_version.bind(this),
  };
  public config = {
    //getConfig: this.config_config.bind(this),
    //restartRequired: this.config_restartRequired.bind(this),
    //folders: this.config_folders.bind(this),
    //devices: this.config_devices.bind(this),
    //folder: this.config_folder.bind(this),
    //device: this.config_device.bind(this),
    //options: this.config_options.bind(this),
    //ldap: this.config_ldap.bind(this),
    //gui: this.config_gui.bind(this),
  };
  public cluster = {
    //getPendingDevices: this.cluster_getPendingDevices.bind(this),
    //deletePendingDevices: this.cluster_deletePendingDevices.bind(this),
    //getPendingFolders: this.cluster_getPendingFolders.bind(this),
    //deletePendingFolders: this.cluster_deletePendingFolders.bind(this),
  }
}

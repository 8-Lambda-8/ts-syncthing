import * as http from "http";
import { cbT, pingT, restartT } from "./types";

export type config = {
  host?: string;
  port?: number;
  apiKey: string;
};

export class syncthing {
  private config: config;

  public constructor(config: config) {
    this.config = {
      host: config.host || "127.0.0.1",
      port: 8384,
      apiKey: undefined,
      ...config,
    };
  }

  private request<T>(options: {
    endpoint: string;
    post?: boolean;
    args?: { [key: string]: string };
  }): Promise<T>;
  private request<T>(
    options: {
      endpoint: string;
      post?: boolean;
      args?: { [key: string]: string };
    },
    cb: cbT<T>,
  ): void;
  private request<T>(
    options: {
      endpoint: string;
      post?: boolean;
      args?: { [key: string]: string };
    },
    cb?: cbT<T>,
  ): void | Promise<T> {
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
      hostname: this.config.host,
      port: this.config.port,
      path: `/rest/${_options.endpoint}?${argsString}`,
      method: _options.post ? "POST" : "GET",
    };
    options.headers = { "X-API-Key": this.config.apiKey };

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
  private system_browse(path: string, callback?: cbT<string[]>): Promise<string[]> | void {
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
    browse: this.system_browse,
    ping: this.system_ping,
    restart: this.system_restart,
  };
}

import * as http from "http";
import { pingT, restartT } from "./types";

export type config = {
  host?: string;
  port?: number;
  apiKey: string;
};

type cb = (res: unknown, err?: Error) => void;

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

  private request(options: {
    endpoint: string;
    post?: boolean;
    args?: { [key: string]: string };
  }): Promise<unknown>;
  private request(
    options: {
      endpoint: string;
      post?: boolean;
      args?: { [key: string]: string };
    },
    cb: cb,
  ): void;
  private request(
    options: {
      endpoint: string;
      post?: boolean;
      args?: { [key: string]: string };
    },
    cb?: cb,
  ): void | Promise<unknown> {
    if (cb) {
      this.req(options, cb);
    } else {
      return new Promise((resolve, reject) => {
        this.req(options, (res, err) => {
          resolve(res);
          reject(err);
        });
      });
    }
  }

  private req(
    _options: {
      endpoint: string;
      post?: boolean;
      args?: { [key: string]: string };
    },
    cb: cb,
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
  private system_ping(cb: cb): void;
  private system_ping(cb?: cb): Promise<pingT> | void {
    return this.request({ endpoint: "system/ping" }, cb);
  }

  private system_browse(path: string): Promise<string[]>;
  private system_browse(path: string, cb: cb): void;
  private system_browse(path: string, cb?: cb): Promise<string[]> | void {
    return this.request(
      { endpoint: "system/browse", args: { current: path } },
      cb,
    );
  }

  private system_restart(): Promise<restartT>;
  private system_restart(cb: cb): void;
  private system_restart(cb?: cb): Promise<restartT> | void {
    return this.request({ endpoint: "system/browse" }, cb);
  }


  public system = {
    browse: this.system_browse,
    ping: this.system_ping,
    restart: this.system_restart,
  };
}

import * as http from "http";

export type config = {
  host?: string;
  port?: number;
  apiKey: string;
};

type cb = (res: unknown, err?: Error) => void;

export class syncthing {
  private config: config;

  private req(
    _options: { endpoint: string; post?: boolean },
    cb: cb,
  ): void | Promise<unknown> {
    const options: http.RequestOptions = {
      hostname: this.config.host,
      port: this.config.port,
      path: `/rest/${_options.endpoint}`,
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

  public constructor(config: config) {
    this.config = {
      host: config.host || "127.0.0.1",
      port: 8384,
      apiKey: undefined,
      ...config,
    };
  }

  public system = {
    ping: (cb: cb) => this.req({ endpoint: "system/ping" }, cb),
    restart: (cb: cb) =>
      this.req({ endpoint: "system/restart", post: true }, cb),
  };
}

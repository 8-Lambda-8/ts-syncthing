export type configT = {
  host?: string;
  port?: number;
  apiKey: string;
};

export type requestOptionsT = {
  endpoint: string;
  post?: boolean;
  args?: { [key: string]: string };
};

export type cbT<T> = (res: T, err?: Error) => void;
export type funOverT<T> = (() => Promise<T>) & ((callback: cbT<T>) => void);

export type pingT = { ping: "pong" };
export type restartT = { ok: "restart" };

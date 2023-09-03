export type config = {
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

export type pingT = { ping: "pong" };
export type restartT = { ok: "restart" };

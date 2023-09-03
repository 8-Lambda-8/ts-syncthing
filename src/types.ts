export type config = {
  host?: string;
  port?: number;
  apiKey: string;
};

export type cbT<T> = (res: T, err?: Error) => void;

export type pingT = { ping: "pong" };
export type restartT = { ok: "restart" };


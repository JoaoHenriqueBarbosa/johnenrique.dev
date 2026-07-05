import { Pool } from "pg";

const globalForPool = globalThis as unknown as { trackingPool?: Pool };

export const pool =
  globalForPool.trackingPool ??
  new Pool({
    connectionString: process.env.TRACKING_DATABASE_URL,
    max: 4,
    idleTimeoutMillis: 30_000,
    connectionTimeoutMillis: 5_000,
  });

if (process.env.NODE_ENV !== "production") globalForPool.trackingPool = pool;

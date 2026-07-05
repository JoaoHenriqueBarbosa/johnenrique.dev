import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

/**
 * `en` is served unprefixed at the root and `pt-BR` under its prefix,
 * without any middleware: requests are rewritten into the `[locale]`
 * segment at the routing layer and `/en/*` is canonicalized away.
 */
/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      { source: "/", destination: "/en" },
      {
        source: "/:path((?!pt-BR(?:/|$)|api(?:/|$)|_next|_vercel|.*\\..*).*)",
        destination: "/en/:path",
      },
    ];
  },
  async redirects() {
    return [
      { source: "/en", destination: "/", permanent: true },
      { source: "/en/:path*", destination: "/:path*", permanent: true },
    ];
  },
};

export default withNextIntl(nextConfig);

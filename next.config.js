/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
await import("./src/env.js");

/** @type {import("next").NextConfig} */
const config = {
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
  images: {
    domains: [
      "images.pexels.com",
      "archives.rep-am.com",
      "vehicle-photos-published.vauto.com",
      "unitedauto.r2.cloudflarestorage.com",
      "unitedautoimages.ivukusic.workers.dev",
    ],
  },
};

export default config;

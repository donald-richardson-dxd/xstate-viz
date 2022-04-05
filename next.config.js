/** @type import('next').NextConfig */
module.exports = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  //basePath: `/viz`,
  productionBrowserSourceMaps: true
};

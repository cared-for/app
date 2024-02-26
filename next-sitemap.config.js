/** @type {import('next-sitemap').IConfig} */
const config = {
  siteUrl: process.env.NEXT_PUBLIC_HOST ?? "https://www.caredfor.care",
  generateRobotsTxt: true, // (optional)
  // ...other options
}

export default config;

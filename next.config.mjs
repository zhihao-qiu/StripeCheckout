/** @type {import("next").NextConfig} */
const config = {
  reactStrictMode: true,

  /**
   * If you are using `appDir` then you must comment the below `i18n` config out.
   *
   * @see https://github.com/vercel/next.js/issues/41980
   */
  i18n: {
    locales: ['en'],
    defaultLocale: 'en',
  },
}
// // Conditionally use performance object
// if (typeof window !== 'undefined' && window.performance) {
//   window.performance.mark('next-start')
// }
export default config

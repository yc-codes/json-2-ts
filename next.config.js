module.exports = {
  reactStrictMode: true,
  experimental: {
    // TypeScript 7 is the native port and no longer exposes the JS compiler
    // API Next.js uses for type checking; drive the tsc CLI instead.
    useTypeScriptCli: true,
  },
}

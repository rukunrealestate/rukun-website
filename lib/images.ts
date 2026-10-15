// Must match images.remotePatterns in next.config.mjs. Photos hosted anywhere else are shown as-is
// (next/image would otherwise refuse to render them).
const OPTIMIZED_PREFIX = 'https://pobhqfookfmfnvtxrlxf.supabase.co/storage/v1/object/public/'

export const skipOptimization = (src: string) => !src.startsWith(OPTIMIZED_PREFIX)

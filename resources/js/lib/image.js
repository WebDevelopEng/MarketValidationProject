export function normalizeImage(path) {
  if (!path) return null
  if (typeof path !== 'string') return null
  // already a data url or absolute URL or starts with slash
  if (path.startsWith('data:') || path.startsWith('http') || path.startsWith('/')) return path
  // stored filenames live under storage/app/public/ProfileImages -> public/storage/ProfileImages
  return `/storage/ProfileImages/${path}`
}

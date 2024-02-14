export function isValid(key: string | null) {
  return key !== null && key.length > 0 && key.startsWith('sk')
}

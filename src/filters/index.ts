// Set utils function parseTime to filter
export { parseTime } from '@/utils'

// Filter to uppercase the first character
export const uppercaseFirstChar = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

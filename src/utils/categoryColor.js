// A small, fixed palette of accessible chip colors. We hash the category
// string to deterministically pick one, so the same category always
// renders with the same color across the whole app.
const PALETTE = [
  { bg: '#e3f6f5', fg: '#0b7f7b' }, // teal
  { bg: '#fef3e0', fg: '#9a6a10' }, // amber
  { bg: '#eef0ff', fg: '#4a4fd1' }, // indigo
  { bg: '#fdecec', fg: '#c23b3f' }, // coral
  { bg: '#eafaf0', fg: '#1f8a4c' }, // green
  { bg: '#fdeef7', fg: '#b3348c' }, // pink
  { bg: '#eaf3fc', fg: '#2166b3' } // blue
]

export function categoryColor(category = '') {
  let hash = 0
  for (let i = 0; i < category.length; i++) {
    hash = category.charCodeAt(i) + ((hash << 5) - hash)
  }
  const index = Math.abs(hash) % PALETTE.length
  return PALETTE[index]
}

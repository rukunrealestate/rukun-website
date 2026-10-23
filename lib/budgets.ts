// Price ranges for the search forms, as [min, max] in USD; 0 means open-ended.
// The form sends "min-max" as `budget`, turned into ?min=&max= (see lib/filters.ts).
export const BUDGETS: Record<'sale' | 'rent', [number, number][]> = {
  sale: [[0, 100000], [100000, 150000], [150000, 200000], [200000, 300000], [300000, 400000], [400000, 500000],
    [500000, 750000], [750000, 1000000], [1000000, 2000000], [2000000, 0]],
  rent: [[0, 500], [500, 750], [750, 1000], [1000, 1500], [1500, 2000], [2000, 3000], [3000, 5000], [5000, 0]],
}

const money = (n: number) => '$' + n.toLocaleString('en-US')

// "Under $100,000" / "$100,000 – $150,000" / "Over $2,000,000"
export function budgetLabel(min: number, max: number, t: { under: string; over: string }) {
  if (!min) return t.under.replace('{p}', money(max))
  if (!max) return t.over.replace('{p}', money(min))
  return `${money(min)} – ${money(max)}`
}

// Adds budget=min-max to the query as min/max
export function applyBudget(params: URLSearchParams, value: string) {
  const [min, max] = value.split('-')
  if (+min) params.set('min', min)
  if (+max) params.set('max', max)
}

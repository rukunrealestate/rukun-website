import { Fragment } from 'react'

interface Option { value: string; label: string; group?: string }

// <option>s for a <select>; options that carry a group are wrapped in <optgroup>s (e.g. areas by region)
export default function OptionList({ options }: { options: Option[] }) {
  const groups: { label?: string; items: Option[] }[] = []
  for (const o of options) {
    const last = groups[groups.length - 1]
    if (last && last.label === o.group) last.items.push(o)
    else groups.push({ label: o.group, items: [o] })
  }
  return (
    <>
      {groups.map((g, i) => {
        const items = g.items.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)
        return g.label ? <optgroup key={g.label} label={g.label}>{items}</optgroup> : <Fragment key={i}>{items}</Fragment>
      })}
    </>
  )
}

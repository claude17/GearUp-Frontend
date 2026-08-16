'use client'

import { useState } from 'react'
import { CalendarDays, MapPin, Search, SlidersHorizontal } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function SearchBar() {
  const [location, setLocation] = useState('')
  return (
    <form className="flex flex-col gap-2 rounded-2xl bg-background p-2 text-foreground shadow-2xl sm:flex-row sm:items-center" onSubmit={(event) => event.preventDefault()}>
      <label className="flex flex-1 items-center gap-3 rounded-xl px-4 py-3 hover:bg-muted">
        <MapPin className="size-5 text-primary" aria-hidden="true" />
        <span className="flex flex-col text-left"><span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Where</span><input value={location} onChange={(event) => setLocation(event.target.value)} placeholder="Choose a location" className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground" aria-label="Location" /></span>
      </label>
      <div className="hidden h-10 w-px bg-border sm:block" />
      <button type="button" className="flex flex-1 items-center gap-3 rounded-xl px-4 py-3 text-left hover:bg-muted"><CalendarDays className="size-5 text-primary" aria-hidden="true" /><span className="flex flex-col"><span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">When</span><span className="text-sm">Add dates</span></span></button>
      <div className="hidden h-10 w-px bg-border sm:block" />
      <button type="button" className="flex flex-1 items-center gap-3 rounded-xl px-4 py-3 text-left hover:bg-muted"><SlidersHorizontal className="size-5 text-primary" aria-hidden="true" /><span className="flex flex-col"><span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">What</span><span className="text-sm">Any type of gear</span></span></button>
      <Button size="lg" className="rounded-xl px-6"><Search data-icon="inline-start" />Find gear</Button>
    </form>
  )
}

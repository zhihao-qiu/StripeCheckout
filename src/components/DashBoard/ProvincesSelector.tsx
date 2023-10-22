import * as React from 'react'

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

const canadaProvinces = [
  {
    id: 1,
    name: 'Alberta',
    value: 'AB',
  },
  {
    id: 2,
    name: 'British Columbia',
    value: 'BC',
  },
  {
    id: 3,
    name: 'Manitoba',
    value: 'MB',
  },
  {
    id: 4,
    name: 'New Brunswick',
    value: 'NB',
  },
  {
    id: 5,
    name: 'Newfoundland and Labrador',
    value: 'NL',
  },
  {
    id: 6,
    name: 'Nova Scotia',
    value: 'NS',
  },
  {
    id: 7,
    name: 'Ontario',
    value: 'ON',
  },
  {
    id: 8,
    name: 'Prince Edward Island',
    value: 'PE',
  },
  {
    id: 9,
    name: 'Quebec',
    value: 'QC',
  },
  {
    id: 10,
    name: 'Saskatchewan',
    value: 'SK',
  },
  {
    id: 11,
    name: 'Northwest Territories',
    value: 'NT',
  },
  {
    id: 12,
    name: 'Nunavut',
    value: 'NU',
  },
  {
    id: 13,
    name: 'Yukon',
    value: 'YT',
  },
]

export function ProvincesSelector({
  onValueChange,
  defaultValue,
}: {
  onValueChange: (value: string) => void
  defaultValue: string
}) {
  return (
    <Select onValueChange={onValueChange} defaultValue={defaultValue}>
      <SelectTrigger className="w-full text-stone-400">
        <SelectValue placeholder="Select a Province" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {canadaProvinces.map((province) => (
            <SelectItem key={province.id} value={province.value}>
              {province.name}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}

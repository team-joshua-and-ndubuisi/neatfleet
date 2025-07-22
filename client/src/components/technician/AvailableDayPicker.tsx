import React from 'react';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { cn } from '@/lib/utils';

type DayT = {
  value: string;
  label: string;
  dayOfWeek: number; // Optional, used for Sunday
};

const daysOfWeek: DayT[] = [
  { value: 'sunday', label: 'Sunday', dayOfWeek: 0 },
  { value: 'monday', label: 'Monday', dayOfWeek: 1 },
  { value: 'tuesday', label: 'Tuesday', dayOfWeek: 2 },
  { value: 'wednesday', label: 'Wednesday', dayOfWeek: 3 },
  { value: 'thursday', label: 'Thursday', dayOfWeek: 4 },
  { value: 'friday', label: 'Friday', dayOfWeek: 5 },
  { value: 'saturday', label: 'Saturday', dayOfWeek: 6 },
];

type AvailableDayPickerPropT = {
  selectedDate?: Date;
};

export default function AvailableDayPicker({ selectedDate = new Date() }: AvailableDayPickerPropT) {
  console.log('selectedDate', selectedDate);

  const currentDate = new Date();

  const selections = daysOfWeek.map(dayOfWeek => {
    return createDaySelection(dayOfWeek, currentDate);
  });

  return (
    <div>
      <ToggleGroup variant='outline' type='multiple' className=''>
        {selections}
      </ToggleGroup>
    </div>
  );
}

function createDaySelection(day: DayT, currentDate: Date) {
  const currentNumberOfDay = currentDate.getDay();

  const isPastDay = day.dayOfWeek < currentNumberOfDay;

  return (
    <ToggleGroupItem
      key={String(day.label + day.value)}
      value={day.value}
      aria-label={`Toggle ${day.value}`}
      className={cn('p-3', { 'bg-slate-500': isPastDay })}
      disabled={isPastDay}
    >
      <span>{day.label}</span>
    </ToggleGroupItem>
  );
}

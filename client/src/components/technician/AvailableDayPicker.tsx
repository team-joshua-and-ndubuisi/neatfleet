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
  clickCallback?: (day: Date) => void;
};

export default function AvailableDayPicker({
  selectedDate = new Date(),
  clickCallback,
}: AvailableDayPickerPropT) {
  console.log('selectedDate', selectedDate);

  const currentDate = new Date();

  const selections = daysOfWeek.map(dayOfWeek => {
    return createDaySelection(dayOfWeek, currentDate, clickCallback);
  });

  return (
    <div>
      <ToggleGroup variant='outline' type='multiple' className=' mx-auto'>
        {selections}
      </ToggleGroup>
    </div>
  );
}

function createDaySelection(day: DayT, currentDate: Date, clickCallback?: (day: Date) => void) {
  const currentNumberOfDay = currentDate.getDay();

  // Check if the day is in the past compared to the current date
  const isPastDay = day.dayOfWeek < currentNumberOfDay;

  const isToday = day.dayOfWeek === currentNumberOfDay;

  // Calculate the offset from the current day to the target day
  // If the day is today, the offset is 0
  const daysFromCurrentDay = day.dayOfWeek - currentNumberOfDay;

  const dayOffset = isToday
    ? 0
    : daysFromCurrentDay < 0
      ? 7 + daysFromCurrentDay
      : daysFromCurrentDay;

  const dayDate = new Date(currentDate);
  dayDate.setDate(currentDate.getDate() + dayOffset);

  return (
    <ToggleGroupItem
      onClick={() => clickCallback && clickCallback(dayDate)}
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

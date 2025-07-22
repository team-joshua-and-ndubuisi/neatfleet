import React from 'react';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';

type DayT = {
  value: string;
  label: string;
};

const daysOfWeek: DayT[] = [
  { value: 'monday', label: 'Monday' },
  { value: 'tuesday', label: 'Tuesday' },
  { value: 'wednesday', label: 'Wednesday' },
  { value: 'thursday', label: 'Thursday' },
  { value: 'friday', label: 'Friday' },
  { value: 'saturday', label: 'Saturday' },
  { value: 'sunday', label: 'Sunday' },
];

export default function AvailableDayPicker() {
  const selections = daysOfWeek.map(day => {
    return createDaySelection(day);
  });

  return (
    <div>
      <ToggleGroup variant='outline' type='multiple' className=''>
        {selections}
      </ToggleGroup>
    </div>
  );
}

function createDaySelection(day: DayT) {
  return (
    <ToggleGroupItem value={day.value} aria-label={`Toggle ${day.value}`} className='p-4'>
      <span>{day.label}</span>
    </ToggleGroupItem>
  );
}

import React from 'react';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';

const currentDate = new Date();

const mockTimeSlots: { date: Date }[] = [
  {
    date: currentDate,
  },
  {
    date: new Date(new Date().setHours(currentDate.getHours() + 1)),
  },
  {
    date: new Date(new Date().setHours(currentDate.getHours() + 2)),
  },
];

type TimeSlotT = {
  date: Date;
};

type AvailableTimePickerPropT = {
  timeSlots: TimeSlotT[];
};

export default function AvailableTimePicker({
  timeSlots = mockTimeSlots,
}: AvailableTimePickerPropT) {
  const timeSelections = timeSlots.map(slot => {
    return timeSelection(slot.date);
  });

  return <div>{timeSelections}</div>;
}

function timeSelection(time: Date) {
  const timeString = time.toLocaleTimeString();
  time.setMinutes(0);

  const hour = timeString.split(':').slice(0, 2).join(':');
  const amPm = timeString.split(' ')[1];

  return (
    <ToggleGroup variant='outline' type='multiple'>
      <ToggleGroupItem value={hour} aria-label='Toggle '>
        <span>{hour}</span>
        <span>{amPm}</span>
      </ToggleGroupItem>
    </ToggleGroup>
  );
}

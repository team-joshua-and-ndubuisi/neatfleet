import React, { useState } from 'react';
import AvailableDayPicker from './AvailableDayPicker';
import AvailableTimePicker from './AvailableTimePicker';
import { Button } from '../ui';
import { DayT } from './AvailableDayPicker';

const weekDays: { [key: number]: string } = {
  0: 'Sunday',
  1: 'Monday',
  2: 'Tuesday',
  3: 'Wednesday',
  4: 'Thursday',
  5: 'Friday',
  6: 'Saturday',
};

export default function TechAvailabilityForm() {
  const currentDate = new Date();
  currentDate.setHours(6, 0, 0, 0); // Set the current date to today at 6 AM

  // Ensure the current date is set to the nearest hour and range is 14 hours 6am to 8pm
  const timeRange = {
    start: new Date(currentDate),
    end: new Date(new Date().setHours(currentDate.getHours() + 14)), // 14 hours later,
  };

  const [selectedDays, setSelectedDays] = useState<DayT[]>([]);

  const handleTimeClick = (time: Date) => {
    console.log('time click', time.toLocaleTimeString());
  };

  const handleDayClick = (day: DayT) => {
    console.log('Selected day:', day.label);
    setSelectedDays(prev => {
      if (prev.length === 0) {
        return [day];
      }

      // filter by label
      let list = prev.filter(d => d.value !== day.value);

      //if list is same size then day was not in list, add it
      if (list.length === prev.length) {
        list = [...prev, day];
      }

      return list.sort((a, b) => a.dayOfWeek - b.dayOfWeek); // Sort by dayOfWeek
    });
  };

  return (
    <section>
      <form action='' onSubmit={e => e.preventDefault()} className=''>
        <section>
          <h2 className='text-4xl'>Set Your Availability</h2>
        </section>

        <section className='border-2 border-gray-200 mb-4 pb-4'>
          <h3 className='font-bold'>Select days available</h3>
          <AvailableDayPicker clickCallback={handleDayClick} selectedDate={currentDate} />
        </section>

        <section className='flex items-center justify-center'>
          <h3 className='bg-accent p-2 rounded-2xl'>
            {selectedDays.map(day => (
              <span className='p-3' key={day.value + day.label}>
                {day.label}
              </span>
            ))}
          </h3>
        </section>

        <section>
          <h3 className='font-bold'>Select time available</h3>
          <AvailableTimePicker clickCallback={handleTimeClick} range={timeRange} />
        </section>

        <section className='mt-4'>
          <Button type='submit'>Confirm availability</Button>
        </section>
      </form>
    </section>
  );
}

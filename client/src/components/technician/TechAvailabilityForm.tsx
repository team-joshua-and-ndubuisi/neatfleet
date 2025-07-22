import React from 'react';
import AvailableDayPicker from './AvailableDayPicker';
import AvailableTimePicker from './AvailableTimePicker';
import { Button } from '../ui';

export default function TechAvailabilityForm() {
  const currentDate = new Date();
  const timeRange = {
    start: new Date(currentDate),
    end: new Date(new Date().setHours(currentDate.getHours() + 8)), // 8 hours later,
  };

  const handleTimeClick = (time: Date) => {
    console.log('time click', time.toLocaleTimeString());
  };

  return (
    <section>
      <form action=''>
        <section>
          <h2>Set Your Availability</h2>
        </section>
        <section>
          <h3>Select days available</h3>
          <AvailableDayPicker
            clickCallback={day => {
              console.log('Selected day:', day);
            }}
            selectedDate={currentDate}
          />
        </section>
        <section>
          <h3>Select time available</h3>
          <AvailableTimePicker clickCallback={handleTimeClick} range={timeRange} />
        </section>

        <Button>Confirm availability</Button>
      </form>
    </section>
  );
}

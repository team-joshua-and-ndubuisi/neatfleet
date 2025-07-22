import React from 'react';
import AvailableDayPicker from './AvailableDayPicker';
import AvailableTimePicker from './AvailableTimePicker';

export default function TechAvailabilityForm() {
  return (
    <section>
      <section>
        <h2>Set Your Availability</h2>
      </section>
      <section>
        <h3>Select days available</h3>
        <AvailableDayPicker />
      </section>
      <section>
        <h3>Select time available</h3>
        <AvailableTimePicker />
      </section>
    </section>
  );
}

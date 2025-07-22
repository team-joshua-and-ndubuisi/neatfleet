import React from 'react';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';

export default function AvailableDayPicker() {
  return (
    <div>
      <ToggleGroup variant='outline' type='multiple'>
        <ToggleGroupItem value='monday' aria-label='Toggle monday'>
          <span>Monday</span>
        </ToggleGroupItem>
        <ToggleGroupItem value='tuesday' aria-label='Toggle tuesday'>
          <span>Tuesday</span>
        </ToggleGroupItem>
        <ToggleGroupItem value='wednesday' aria-label='Toggle wednesday'>
          <span>Wednesday</span>
        </ToggleGroupItem>
        <ToggleGroupItem value='thursday' aria-label='Toggle thursday'>
          <span>Thursday</span>
        </ToggleGroupItem>
        <ToggleGroupItem value='friday' aria-label='Toggle friday'>
          <span>Friday</span>
        </ToggleGroupItem>
        <ToggleGroupItem value='saturday' aria-label='Toggle saturday'>
          <span>Saturday</span>
        </ToggleGroupItem>
        <ToggleGroupItem value='sunday' aria-label='Toggle sunday'>
          <span>Sunday</span>
        </ToggleGroupItem>
      </ToggleGroup>
    </div>
  );
}

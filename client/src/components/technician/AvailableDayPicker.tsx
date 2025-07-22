import React from 'react';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';

export default function AvailableDayPicker() {
  return (
    <div>
      <ToggleGroup variant='outline' type='multiple'>
        <ToggleGroupItem value='bold' aria-label='Toggle bold'>
          monday
        </ToggleGroupItem>
        <ToggleGroupItem value='italic' aria-label='Toggle italic'>
          monday
        </ToggleGroupItem>
        <ToggleGroupItem value='strikethrough' aria-label='Toggle strikethrough'>
          monday
        </ToggleGroupItem>
      </ToggleGroup>
    </div>
  );
}

import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';

type TimeSlotT = {
  date: Date;
};

type AvailableTimePickerPropT = {
  timeSlots?: TimeSlotT[];
  range?: { start: Date; end: Date };
  clickCallback?: (time: Date) => void;
};

export default function AvailableTimePicker({ range, clickCallback }: AvailableTimePickerPropT) {
  //if timeslots provided use them from props
  let timeSelections: JSX.Element[] = [];

  //if range provided then create the timeslots for the range
  if (range) {
    const timeSlotsForRange = createTimeSelectionFromRange(range.start, range.end);
    timeSelections = timeSlotsForRange.map(time => {
      return timeSelectionButton(time, clickCallback);
    });
  }

  return <div className='columns-3 w-11/12 mx-auto'>{timeSelections}</div>;
}

//generate the JSX for the date passed in
function timeSelectionButton(time: Date, callback?: (time: Date) => void) {
  const timeString = time.toLocaleTimeString();
  time.setMinutes(0);

  const hour = timeString.split(':').slice(0, 2).join(':');
  const amPm = timeString.split(' ')[1];

  return (
    <ToggleGroup key={time.toUTCString()} variant='outline' type='multiple' className='w-full'>
      <ToggleGroupItem
        onClick={() => {
          callback && callback(time);
        }}
        value={hour}
        aria-label='Toggle'
      >
        <span>{hour}</span>
        <span>{amPm}</span>
      </ToggleGroupItem>
    </ToggleGroup>
  );
}

//create array of dates for start and end range one hour apart
function createTimeSelectionFromRange(start: Date, end: Date) {
  if (!start || !end) return [];

  const currentDate = new Date(start);
  currentDate.setMinutes(0);
  const times: Date[] = [];

  while (currentDate <= end) {
    times.push(new Date(currentDate));

    currentDate.setHours(currentDate.getHours() + 1);
    currentDate.setMinutes(0);
  }

  return times;
}

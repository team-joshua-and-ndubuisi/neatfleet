import React from 'react';
import { useFormContext } from 'react-hook-form';
import clsx from 'clsx';

interface SelectableButtonProps {
  name: string;
  value: string;
  label: string;
  singleSelect?: boolean;
}

const SelectableButton: React.FC<SelectableButtonProps> = ({
  name,
  value,
  label,
  singleSelect,
}) => {
  const { register, setValue, watch } = useFormContext();
  const selectedValues = watch(name) || (singleSelect ? '' : []);

  const isSelected = singleSelect ? selectedValues === value : selectedValues.includes(value);

  const toggleSelection = () => {
    if (singleSelect) {
      setValue(name, isSelected ? '' : value);
    } else {
      if (isSelected) {
        setValue(
          name,
          selectedValues.filter((v: string) => v !== value)
        );
      } else {
        setValue(name, [...selectedValues, value]);
      }
    }
  };

  return (
    <button
      type='button'
      className={clsx(
        'px-4 py-2 border rounded-md text-sm font-medium',
        isSelected ? 'bg-indigo-500 text-white' : 'bg-white text-gray-700 border-gray-300'
      )}
      onClick={toggleSelection}
    >
      {label}
      <input
        type={singleSelect ? 'radio' : 'checkbox'}
        value={value}
        {...register(name)}
        className='hidden'
      />
    </button>
  );
};

export default SelectableButton;

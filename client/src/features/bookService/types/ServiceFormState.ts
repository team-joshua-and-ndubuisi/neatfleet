import { ServiceFormData } from '@/features/bookService';

export interface ServiceFormState {
  step: number;
  data: ServiceFormData;
  next: () => void;
  back: () => void;
  reset: () => void;
  setFormData: (data: ServiceFormData) => void;
}

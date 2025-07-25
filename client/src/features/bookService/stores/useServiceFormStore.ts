import { create } from 'zustand';
import { ServiceFormData, ServiceFormState } from '@/features/bookService';

export const useServiceFormStore = create<ServiceFormState>(set => ({
  step: 0,
  data: {
    services: [],
    technician: null,
  },
  next: () => set(state => ({ step: state.step + 1 })),
  back: () => set(state => ({ step: Math.max(0, state.step - 1) })),
  reset: () => set({ step: 0, data: { services: [], technician: null } }),
  setFormData: (data: ServiceFormData) => set({ data }),
}));

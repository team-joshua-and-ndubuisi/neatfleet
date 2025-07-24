import { Service } from '@/features/services';
import { Technician } from '@/features/technicians';

export interface ServiceFormData {
  services: Service[];
  technician: Technician | null;
}

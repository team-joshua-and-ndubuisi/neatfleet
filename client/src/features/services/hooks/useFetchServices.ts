import { useQuery } from '@tanstack/react-query';
import { fetchServices } from '@/features/services';

export const useFetchServices = () => {
  return useQuery({ queryKey: ['services'], queryFn: fetchServices });
};

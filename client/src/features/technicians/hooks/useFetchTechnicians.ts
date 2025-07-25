import { useQuery } from '@tanstack/react-query';
import { fetchTechnicians } from '@/features/technicians';

export const useFetchTechnicians = () => {
  return useQuery({ queryKey: ['technicians'], queryFn: fetchTechnicians });
};

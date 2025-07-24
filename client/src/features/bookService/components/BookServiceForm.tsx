import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ErrorComponent, LoadingIndicator } from '@/components';
import { SelectableButton } from '@/components';
import { motion, AnimatePresence } from 'motion/react';
import { useForm, SubmitHandler, FormProvider } from 'react-hook-form';
import { useFetchServices } from '@/features/services';
import { useFetchTechnicians } from '@/features/technicians';
import { ServiceFormData, useServiceFormStore } from '@/features/bookService';

export default function BookServiceForm() {
  const {
    data: services,
    isLoading: areServicesLoading,
    error: servicesError,
  } = useFetchServices();

  const {
    data: technicians,
    isLoading: areTechniciansLoading,
    error: techniciansError,
  } = useFetchTechnicians();

  const methods = useForm<ServiceFormData>({
    defaultValues: useServiceFormStore.getState().data,
    mode: 'onChange',
  });

  const { step, next, back, setFormData } = useServiceFormStore();
  const isLastStep = step === 1;

  const onSubmit: SubmitHandler<ServiceFormData> = data => {
    setFormData(data);
    console.log('Submitted!', data);
    //TODO: Add react-query logic here for posting data
  };

  const handleNext = () => {
    if (isLastStep) {
      methods.handleSubmit(onSubmit)();
    } else {
      next();
    }
  };

  if (areTechniciansLoading) return <LoadingIndicator />;
  if (techniciansError) return <ErrorComponent />;

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} className='w-full max-w-md mx-auto mt-10'>
        <Card className='overflow-hidden min-h-[250px]'>
          <CardContent className='p-6'>
            <AnimatePresence mode='wait'>
              <motion.div
                key={step}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
              >
                {step === 0 && (
                  <>
                    {areServicesLoading ? (
                      <LoadingIndicator />
                    ) : servicesError ? (
                      <ErrorComponent />
                    ) : (
                      <div className='flex flex-wrap gap-2'>
                        {services?.map(service => (
                          <SelectableButton
                            key={service.id}
                            name='services'
                            value={service.id}
                            label={service.name}
                          />
                        ))}
                      </div>
                    )}
                  </>
                )}

                {step === 1 && (
                  <>
                    {areTechniciansLoading ? (
                      <LoadingIndicator />
                    ) : techniciansError ? (
                      <ErrorComponent />
                    ) : (
                      <div className='flex flex-wrap gap-2'>
                        {technicians?.map(technician => (
                          <SelectableButton
                            key={technician.id}
                            name='technician'
                            value={technician.id}
                            label={`${technician.first_name} ${technician.last_name}`}
                            singleSelect
                          />
                        ))}
                      </div>
                    )}
                  </>
                )}
              </motion.div>
            </AnimatePresence>
          </CardContent>
        </Card>

        <div className='flex justify-between mt-4'>
          <Button type='button' variant='outline' onClick={back} disabled={step === 0}>
            Back
          </Button>

          <Button type='button' onClick={handleNext}>
            {isLastStep ? 'Submit' : 'Next'}
          </Button>
        </div>
      </form>
    </FormProvider>
  );
}

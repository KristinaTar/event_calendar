import { useMemo } from 'react';
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  IconButton,
  Input,
  Text,
} from '@chakra-ui/react';
import { CloseIcon, TimeIcon } from '@chakra-ui/icons';
import { Field, Form, Formik, FieldProps } from 'formik';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { HexColorPicker } from 'react-colorful';

import { Appointment } from '../../types';
import { validationSchema } from "../../helpers/validationScheme";
import './calendarForm.css';




interface EventFormProps {
  appointment: Appointment;
  onSubmit: (appointment: Appointment) => void;
  onDelete: (id: string) => void;
  onClose: () => void;
}

interface FormValues extends Appointment {
  start: Date;
  end: Date;
  color: string;
}

export default function CalendarForm({
  appointment,
  onSubmit,
  onDelete,
  onClose,
}: EventFormProps) {
  const label = appointment?.id ? 'Edit event' : 'Add new event';

  const initialValues: FormValues = useMemo(
    () => ({
      event: '',
      ...appointment,
      start: new Date(appointment.start),
      end: new Date(appointment.end),
      color: appointment.color || '#c0bcbc',
    }),
    [appointment],
  );

  const handleDelete = () => {
    if (appointment.id !== undefined) {
      onDelete(appointment.id.toString());
    }
  };

  return (
    <Box className="form-container">
      <Formik
        initialValues={initialValues}
        onSubmit={async values => {
          const updatedAppointment = {
            ...values,
            start: values.start,
            end: values.end,
            color: values.color,
          };
          onSubmit(updatedAppointment);
        }}
        validationSchema={validationSchema}
        enableReinitialize
      >
        {({ values, setFieldValue, errors, touched }) => (
          <Form>
            <Flex justifyContent={'space-between'} alignItems="center">
              <Box>
                <Text fontSize={24} color={"darkgrey"}>
                  {label}
                </Text>
              </Box>
              <Flex gap={2}>
                <IconButton
                  aria-label="Close"
                  icon={<CloseIcon />}
                  onClick={onClose}
                  colorScheme="gray"
                  variant="outline"
                  borderRadius={50}
                  color={"darkgrey"}
                />
              </Flex>
            </Flex>
            <Field name="event">
              {({ field }: FieldProps<string>) => (
                <FormControl isInvalid={!!errors.event && touched.event}>
                  <FormLabel>Event</FormLabel>
                  <Input {...field} value={field.value || ''} />
                  {errors.event && touched.event && (
                    <Text color="red.500">{errors.event}</Text>
                  )}
                </FormControl>
              )}
            </Field>
            <Field name="status">
              {() => (<FormControl isInvalid={!!errors.status && touched.status} />)}
            </Field>
            <Field name="color">
              {({ field }: FieldProps<string>) => (
                <FormControl isInvalid={!!errors.color && touched.color}>
                  <FormLabel>Choose event color</FormLabel>
                  <Box>
                    <HexColorPicker
                      color={field.value || '#c0bcbc'}
                      onChange={color => setFieldValue('color', color)}
                      style={{ width: '300px', padding: '10px',  height: '150px'}}
                    />
                  </Box>
                    <Box className="text-wrapper">
                    <Text>Selected color event:</Text>
                    <Box
                      width="25px"
                      height="25px"
                      bg={field.value || '#ffffff'}
                      borderRadius="25px"
                      border="1px solid #ccc"
                    />
                  </Box>
                  {errors.color && touched.color && (
                    <Text color="red.500">{errors.color}</Text>
                  )}
                </FormControl>
              )}
            </Field>
            <Flex gap={4} mt={4} display={'flex'} flexDirection={'column'}>
              <Flex flexBasis={'50%'}>
                <FormControl isInvalid={!!errors.start && !!touched.start}>
                  <FormLabel className="label-wrapper">Start Time   <TimeIcon/></FormLabel>
                  <DatePicker
                    selected={values.start}
                    onChange={date => setFieldValue('start', date)}
                    showTimeSelect
                    dateFormat="MMMM d, yyyy h:mm aa"
                    className="custom-datepicker"
                  />
                  {errors.start && touched.start && (
                    <Text color="red.500">{errors.start as string}</Text>
                  )}
                </FormControl>
              </Flex>
              <Flex flexBasis={'50%'} >
                <FormControl isInvalid={!!errors.end && !!touched.end}>
                  <FormLabel className="label-wrapper">End Time <TimeIcon/></FormLabel>
                  <DatePicker
                    selected={values.end}
                    onChange={date => setFieldValue('end', date)}
                    showTimeSelect
                    dateFormat="MMMM d, yyyy h:mm aa"
                    className="custom-datepicker"
                  />
                  {errors.start && touched.start && (
                    <Text color="red.500">{errors.start as string}</Text>
                  )}
                </FormControl>
              </Flex>
            </Flex>
            <Flex mt={4}>
              {appointment.id === undefined && (
                <Button
                  onClick={onClose}
                  colorScheme="gray"
                  variant="outline"
                  mr={2}
                >
                  Cancel
                </Button>
              )}
              <Button colorScheme={'whatsapp'} type="submit" mr={2}>
                {label}
              </Button>
              {appointment.id !== undefined && (
                <Button
                  onClick={handleDelete}
                  colorScheme="red"
                  variant="outline"
                >
                  Discard
                </Button>
              )}
            </Flex>
          </Form>
        )}
      </Formik>
    </Box>
  );
}

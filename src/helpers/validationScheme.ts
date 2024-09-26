import * as Yup from "yup";

export const validationSchema = Yup.object({
  event: Yup.string()
    .required('Event is required')
    .max(30, 'Event must be at most 30 characters'),
  status: Yup.string(),
  end: Yup.date().min(Yup.ref('start'), 'End time must be after start time'),
  color: Yup.string().required('Color is required'),
});
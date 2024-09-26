import { Box, Flex, Text } from '@chakra-ui/react';
import {
  AppointmentStatusCode,
  EVENT_STATUS_COLORS,
} from '../../constants';
import { Appointment } from '../../types';
import { isCloserToWhite } from "../../helpers/color";

interface AppointmentEventProps {
  appointment: Appointment;
  onDoubleClick: () => void;
}

export default function CalendarEvent({
  appointment,
  onDoubleClick,
}: AppointmentEventProps) {
  const { status, event, color } = appointment;

  let background = '#c7edca';

  if (color && color !== '#ffffff') {
    background = color;
  } else if (status && status in EVENT_STATUS_COLORS) {
    background = EVENT_STATUS_COLORS[status as AppointmentStatusCode];
  }

  return (
    <Box
      bg={background}
      p={1}
      height="100%"
      color={isCloserToWhite(background) ? "black" : "white"}
      onDoubleClick={onDoubleClick}
    >
      <Flex alignItems={'center'} justifyContent="flex-start">
        <Flex>
          <Text fontSize="s">{event}</Text>
        </Flex>
      </Flex>
    </Box>
  );
}
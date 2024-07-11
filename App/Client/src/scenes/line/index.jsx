import { Box } from "@mui/material";
import Header from "../../components/Header";
import LineChart from "../../components/LineChart";
import { useTheme} from "@mui/material";
import { tokens } from "../../theme";
import { useGetBookingsQuery, useGetRoomsQuery } from "../../state/API";
import CircularProgress from '@mui/material/CircularProgress';

function isBetween(startTime, endTime, currentTime) {
    const start = new Date(startTime);
    const end = new Date(endTime);
    return currentTime >= start && currentTime <= end;
}

const Line = () => {
  const currentDate = new Date();
  const startDate = new Date(currentDate.getTime() - (24 * 60 * 60 * 1000));
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  var { data, isLoading } = useGetRoomsQuery();
  const rooms = data || [];
  const { data:bookings, isLoading: isLoading2 } = useGetBookingsQuery(rooms.map(entry => entry.name));



  if (isLoading||isLoading2) {
      return (
          <Box display="flex" justifyContent="center" alignItems="center" height="75vh">
              <CircularProgress color="secondary" />
          </Box>
      );
  }

  const roomsWithBookingStatus = rooms.map(room => {
      const roomBookings = bookings.filter(booking => booking.room === room.name);
      const booked = roomBookings.some(booking => isBetween(booking.startTime, booking.finishTime, currentDate));
      return { ...room, booked };
  });

  return (
    <Box m="20px">
          <Header title="Ocupação das salas" subtitle="Gerencie a ocupação das salas de sua organização" />
          <Box
              display="flex"
              flexWrap="wrap"
              justifyContent="space-between"
              alignItems="flex-start"
              gap="20px"
          >

            {roomsWithBookingStatus.map(entry => (
                < LineChart isDashboard={false} deviceId={entry.deviceID} roomName={entry.name} startDate={startDate} endDate={currentDate} booked = { entry.booked } />
            ))}

        </Box>
    </Box>
  );
};

export default Line;

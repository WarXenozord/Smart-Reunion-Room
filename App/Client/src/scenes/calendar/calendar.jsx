import { useState } from "react";
import { formatDate } from '@fullcalendar/core';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import CircularProgress from '@mui/material/CircularProgress';
import {
  Box,
  List,
  ListItem,
  ListItemText,
  Typography,
  useTheme,
} from "@mui/material";
import Header from "../../components/Header";
import { tokens } from "../../theme";
import { useGetBookingsQuery, useGetRoomsQuery, usePostBookMutation, useDeleteBookMutation } from "../../state/API";
import { useSelector } from "react-redux";

const Calendar = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [currentEvents, setCurrentEvents] = useState([]);

    const { data: data2, isLoading: isLoading2 } = useGetRoomsQuery();
    const rooms = data2 || [];
    const { data, isLoading:isLoading3 } = useGetBookingsQuery(rooms.map(entry => entry.name));
    const bookings = data || [];

    const userid = useSelector((state) => state.global.userId)
    const initialEvs = bookings.map(entry => ({
        id: entry._id, title: entry.name, start: entry.startTime, end: entry.finishTime, allDay: entry.allDay, extendedProps: {
            bookedBy: entry.userId,
            roomName: entry.room,
        } }))

    var [postBook, { isLoading }] = usePostBookMutation();
    var [deleteBook, { isLoading }] = useDeleteBookMutation();

    if (initialEvs.length === 0)
        return (
        <Box display="flex" justifyContent="center" alignItems="center" height="75vh">
            <CircularProgress color="secondary"/>
        </Box>
        );

    const handleDateClick = async (selected) => {
        const title = prompt("Please enter a new title for your event");
        const place = prompt("Now enter the room")
        const calendarApi = selected.view.calendar;
        calendarApi.unselect();

        if (title) {
            const bookingData = {
                startTime: selected.allDay?selected.endStr:selected.startStr,
                finishTime: selected.endStr,
                room: place, // Replace with actual room data
                name: title,
                userId: userid, // Replace with actual userId obtained from sessions
                allDay: selected.allDay,
            };

            try {
                const result = await postBook(bookingData).unwrap();
                console.log('Booking added:', result);

                if (result) {
                    calendarApi.addEvent({
                        id: result._id,
                        title: result.name,
                        start: result.startTime,
                        end: result.finishTime,
                        allDay: result.allDay,
                        extendedProps: {
                            bookedBy: result.userId,
                            roomName: result.room,
                        }
                    });
                }
            } catch (error) {
                console.error('Failed to add booking:', error.message);
                // Handle error
            }

        };
    }

  const handleEventClick = async (selected) => {
    if (
      window.confirm(
        `Are you sure you want to delete the event '${selected.event.title}'`
      )
    ) {
        const eventId = selected.event.id;
        try {
            await deleteBook(eventId).unwrap();
            selected.event.remove();
        } catch (error) {
            console.error('Failed to delete booking:', error.message);
        }
    }
  };

    const renderEventContent = (eventInfo) => {
        return (
            <div>
                <b>{eventInfo.timeText}</b>:
                <i>{eventInfo.event.title}</i>
                <div><b>Sala:</b> {eventInfo.event.extendedProps.roomName}</div>
            </div>
        );
    };

  return (
    <Box m="20px">
      <Header title="Calendar" subtitle="Full Calendar Interactive Page" />

      <Box display="flex" justifyContent="space-between">
        {/* CALENDAR SIDEBAR */}
        <Box
          flex="1 1 20%"
          backgroundColor={colors.primary[400]}
          p="15px"
          borderRadius="4px"
        >
          <Typography variant="h5">Events</Typography>
          <List>
            {currentEvents.map((event) => (
              <ListItem
                key={event.id}
                sx={{
                  backgroundColor: colors.greenAccent[500],
                  margin: "10px 0",
                  borderRadius: "2px",
                }}
              >
                <ListItemText
                  primary={event.title}
                  secondary={
                    <Typography>
                      {formatDate(event.start, {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </Typography>
                  }
                />
              </ListItem>
            ))}
          </List>
        </Box>

        {/* CALENDAR */}
        <Box flex="1 1 100%" ml="15px">
          <FullCalendar
            height="75vh"
            plugins={[
              dayGridPlugin,
              timeGridPlugin,
              interactionPlugin,
              listPlugin,
            ]}
            headerToolbar={{
              left: "prev,next today",
              center: "title",
              right: "dayGridMonth,timeGridWeek,timeGridDay,listMonth",
            }}
            initialView="dayGridMonth"
            editable={true}
            selectable={true}
            selectMirror={true}
            dayMaxEvents={true}
            select={handleDateClick}
            eventClick={handleEventClick}
            eventsSet={(events) => setCurrentEvents(events)}
            initialEvents={initialEvs}
            eventContent={renderEventContent}
          />
         </Box>
      </Box>
    </Box>
  );
};

export default Calendar;



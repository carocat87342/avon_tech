import React, { useCallback, useEffect, useState } from "react";

import { makeStyles } from "@material-ui/core";
import FormControl from "@material-ui/core/FormControl";
import Grid from "@material-ui/core/Grid";
import Switch from "@material-ui/core/Switch";
import Typography from "@material-ui/core/Typography";
import { useSnackbar } from "notistack";

import useAuth from "../../../hooks/useAuth";
import Appointments from "../../../services/appointments.service";
import DashboardHome from "../../../services/DashboardHome.service";
import Messages from "../../../services/message-to-patient.service";
import { statusToColorCode, isEmpty } from "../../../utils/helpers";
// components
import Calendar from "./components/Calendar/EventCalendar";
import AppointmentRequests from "./components/Cards/AppointmentRequests";
import MessagesUnread from "./components/Cards/MessagesUnread";
import ProviderCards from "./components/Cards/ProviderCards";
import ProviderDetailsCard from "./components/Cards/ProviderDetailsCard";
import MessageHistory from "./components/Modal/MessageHistory";
import MessageToPatient from "./components/Modal/MessageToPatient";
import NewOrEditEvent from "./components/Modal/NewOrEditEvent";

const useStyles = makeStyles((theme) => ({
  pageTitle: {
    marginBottom: theme.spacing(2),
  },
  root: {
    flexGrow: 1,
    padding: "40px 0px",
  },
  formControl: {
    display: "flex",
    flexDirection: "row",
    marginLeft: "60px",
    marginTop: "5px",
    fontSize: "15px",
  },
  headerWrap: {
    display: "flex",
    justifyContent: "space-between",
  },
}));

export default function Home() {
  const classes = useStyles();
  const { user } = useAuth();
  const { enqueueSnackbar } = useSnackbar();
  const [errors, setErrors] = useState(null);
  const [selectedProvider, setSelectedProvider] = useState({});
  const [providerDetails, setProviderDetails] = useState({});
  const [messagesUnread, setMessagesUnread] = useState([]);
  const [appointmentRequests, setAppointmentRequests] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState({});
  const [selectedMsg, setSelectedMsg] = useState("");
  const [providers, setProviders] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isNewEvent, setIsNewEvent] = useState(true);
  const [isNewMessage, setIsNewMessage] = useState(true);
  const [patient_id_to, setPatient_id_to] = useState(null);
  const [isMessageToPatientOpen, setIsMessageToPatientOpen] = useState(false);
  const [isCancelEventsVisible, setIsCancelEventsVisible] = useState(false);
  const [isAppointmentHistoryOpen, setIsAppointmentHistoryOpen] = useState(false);


  const getMapFromArray = (data) => {
    const formedData = data.reduce(
      (acc, item) => [
        ...acc,
        {
          ...item,
          title: item.title ? item.title : `${item.firstname} ${item.lastname}`,
          eventTitle: item.title,
          start: item.start_dt,
          end: item.end_dt,
          backgroundColor: statusToColorCode(item.status),
        },
      ],
      [],
    );

    return formedData;
  };

  async function fetchEventsByProvider(provider) {
    const { data } = await Appointments.getAllByProvider(provider.id);
    const eventsFromAPI = getMapFromArray(data);
    setEvents(eventsFromAPI);
  }

  async function fetchProviderDetails(providerId) {
    const { data } = await DashboardHome.getProviderDetails(providerId);
    setProviderDetails(data);
  }
  async function fetchUnreadPatientMessages(providerId) {
    const { data } = await DashboardHome.getPatientUnreadMessages(providerId);
    setMessagesUnread(data);
  }
  async function fetchPatientApptRequests(providerId) {
    const { data } = await DashboardHome.getPatientApptRequests(providerId);
    setAppointmentRequests(data);
  }
  const handleDayClick = (date) => {
    setIsNewEvent(true);
    setIsOpen(true);
    setSelectedDate(date);
    setErrors(null);
  };

  useEffect(() => {
    if (!isEmpty(selectedProvider)) {
      fetchEventsByProvider(selectedProvider);
      fetchPatientApptRequests(selectedProvider.id);
      fetchProviderDetails(selectedProvider.id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedProvider]);

  const fetchProviders = useCallback(async () => {
    const { data } = await DashboardHome.getProviders();
    // eslint-disable-next-line no-console
    console.log("data = ", data);
    setProviders(data);
    if (data.length > 0) {
      const loggedinUserAsProvider = data.filter((d) => d.id === user.id);
      if (loggedinUserAsProvider.length > 0) {
        setSelectedProvider(loggedinUserAsProvider[0]);
      } else {
        setSelectedProvider(data[0]);
      }
    }
  }, [user.id]);

  useEffect(() => {
    fetchProviders();
  }, [fetchProviders]);

  const handleEventCreation = (payload) => {
    setIsLoading(true);
    Appointments.create(payload).then(
      (response) => {
        setIsLoading(false);
        fetchEventsByProvider(selectedProvider);
        fetchPatientApptRequests(selectedProvider.id);
        enqueueSnackbar(`${response.data.message}`, {
          variant: "success",
        });
        setIsOpen(false);
      },
      (error) => {
        setErrors(error.response.data.message);
      },
    );
  };

  const handleEventClick = (calEvent) => {
    setIsNewEvent(false);
    const eventClicked = events.filter((event) => event.id === parseInt(calEvent.event.id, 10));
    setSelectedEvent(eventClicked[0]);
    setErrors(null);
    setIsOpen(true);
  };

  const handleEventCancellation = (payload) => {
    setIsLoading(true);
    Appointments.cancelEvent(payload).then(
      (response) => {
        setIsLoading(false);
        fetchEventsByProvider(selectedProvider);
        fetchPatientApptRequests(selectedProvider.id);
        fetchProviders();
        fetchProviderDetails(selectedProvider.id);
        enqueueSnackbar(`${response.data.message}`, {
          variant: "success",
        });
        setIsOpen(false);
      },
      (error) => {
        setErrors(error.response.data.message);
      },
    );
  };

  const handleEventUpdate = (payload) => {
    setIsLoading(true);
    Appointments.update(payload).then(
      (response) => {
        setIsLoading(false);
        fetchEventsByProvider(selectedProvider);
        fetchPatientApptRequests(selectedProvider.id);
        fetchProviders();
        fetchProviderDetails(selectedProvider.id);
        enqueueSnackbar(`${response.data.message}`, {
          variant: "success",
        });
        setIsOpen(false);
      },
      () => {
        setIsLoading(false);
      },
    );
  };

  const fetchSingleMessage = () => !isNewMessage
    && Messages.getMessageByID(selectedMsg.id).then(
      (response) => {
        const { data } = response;
        setSelectedMsg(data[0]);
      },
      (error) => {
        if (error.response) {
          setErrors(error.response.data);
        }
      },
    );

  const handleMessageToPatientFormSubmit = (_, message, isNew) => {
    setIsLoading(true);
    const payload = {
      data: {
        ...message,
        user_id_from: selectedProvider.id,
        patient_id_to,
      },
    };
    if (isNew) {
      // Create new message
      Messages.create(payload).then(
        (response) => {
          setIsLoading(false);
          setIsMessageToPatientOpen(false);
          fetchUnreadPatientMessages(selectedProvider.id);
          enqueueSnackbar(`${response.data.message}`, {
            variant: "success",
          });
        },
        () => {
          // on errors
          setIsLoading(false);
          setIsMessageToPatientOpen(false);
        },
      );
    } else {
      // Update message
      Messages.update(payload).then(
        (response) => {
          setIsLoading(false);
          setIsMessageToPatientOpen(false);
          fetchUnreadPatientMessages(selectedProvider.id);
          enqueueSnackbar(`${response.data.message}`, {
            variant: "success",
          });
        },
        () => {
          // no error
          setIsLoading(false);
          setIsMessageToPatientOpen(false);
        },
      );
    }
  };

  const handleProviderClick = (provider) => {
    setSelectedProvider(provider);
    fetchUnreadPatientMessages(provider.id);
  };
  const handleMessageClick = (_, patientIdTo) => {
    setPatient_id_to(patientIdTo);
    setIsMessageToPatientOpen(true);
    setIsNewMessage(true);
  };

  const handleMessageEditClick = (_, msg) => {
    setIsMessageToPatientOpen(true);
    setIsNewMessage(false);
    setSelectedMsg(msg);
  };

  const handleEventsType = async (event) => {
    setIsCancelEventsVisible(event.target.checked);
  };

  return (
    <div className={classes.root}>
      <Grid container spacing={4}>
        <Grid item md={7} xs={12} className={classes.headerWrap}>
          <Typography component="h1" variant="h2" color="textPrimary" className={classes.pageTitle}>
            Home
            {" "}
            {!isEmpty(selectedProvider) && `- ${selectedProvider?.name}`}
          </Typography>
          <FormControl component="div" className={classes.formControl}>
            <p className={classes.formHelperText}>Show Declined</p>
            <Switch
              checked={isCancelEventsVisible}
              size="small"
              name="active"
              color="primary"
              inputProps={{ "aria-label": "primary checkbox" }}
              onChange={handleEventsType}
            />
          </FormControl>

        </Grid>
      </Grid>
      <Grid container spacing={6}>
        <Grid item md={7} xs={12}>
          <Calendar
            events={events}
            filter={isCancelEventsVisible}
            onDayClick={handleDayClick}
            onEventClick={handleEventClick}
          />
        </Grid>
        <Grid item md={5} xs={12}>
          <ProviderCards
            selectedProvider={selectedProvider}
            providers={providers}
            handleProviderClick={handleProviderClick}
          />
          <ProviderDetailsCard
            selectedProvider={selectedProvider}
            providerDetails={providerDetails}
            fetchProviderDetails={() => {
              fetchProviders();
            }}
          />
          {!!selectedProvider && (
            <>
              <MessagesUnread
                appointmentRequests={appointmentRequests}
                messagesUnread={messagesUnread}
                onMessageEdit={handleMessageEditClick}
              />
              <AppointmentRequests
                selectedProvider={selectedProvider}
                appointmentRequests={appointmentRequests}
                onMessageClick={handleMessageClick}
                onHistoryClick={() => setIsAppointmentHistoryOpen(true)}
                onAccept={(payload) => handleEventUpdate(payload)}
                onReject={(payload) => handleEventCancellation(payload)}
              />
            </>
          )}
        </Grid>
      </Grid>
      {isOpen && (
        <NewOrEditEvent
          isLoading={isLoading}
          isNewEvent={isNewEvent}
          event={selectedEvent && selectedEvent}
          selectedDate={selectedDate}
          selectedProvider={selectedProvider}
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          providers={providers}
          onSave={handleEventCreation}
          onEventUpdate={(payload) => handleEventUpdate(payload)}
          errors={errors}
        />
      )}

      {isMessageToPatientOpen && (
        <MessageToPatient
          isLoading={isLoading}
          msg={selectedMsg}
          isNewMessage={isNewMessage}
          onModalEnter={fetchSingleMessage}
          isOpen={isMessageToPatientOpen}
          onSubmit={handleMessageToPatientFormSubmit}
          onClose={() => setIsMessageToPatientOpen(false)}
          errors={errors}
        />
      )}
      {isAppointmentHistoryOpen && (
        <MessageHistory
          isLoading={isLoading}
          isOpen={isAppointmentHistoryOpen}
          onClose={() => setIsAppointmentHistoryOpen(false)}
        />
      )}
    </div>
  );
}

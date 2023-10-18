import React, { useCallback, useEffect, useState } from "react";

import {
  Grid,
  Button,
  Typography,
  makeStyles,
  Box,
} from "@material-ui/core";
import axios from "axios";
import { useSnackbar } from "notistack";
import PropTypes from "prop-types";

import MessageToUserService from "../../services/message-to-user.service";
import MessageSection from "./components/MessageSection";
import UserHistory from "./components/UserHistory";


const useStyles = makeStyles((theme) => ({
  gutterBottom: {
    marginBottom: theme.spacing(2),
  },
  mr3: {
    marginRight: theme.spacing(3),
  },
  historyButton: {
    position: "absolute",
    right: "20%",
    top: "10px",
    [theme.breakpoints.down("md")]: {
      right: "8%",
      top: "7px",
    },
  },
  actionsContainer: {
    background: "white",
    position: "absolute",
    zIndex: 999,
    bottom: 0,
    left: 0,
    width: "100%",
    borderTop: `1px solid  #ddd`,
    padding: theme.spacing(1.5, 4),
  },
}));

const ProcessMessage = (props) => {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const {
    fetchProviderDetails, selectedProvider, selectedMessage, onClose,
  } = props;

  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showHistoryDialog, setShowHistoryDialog] = useState(false);
  const [sectionFormFields, setSectionFormFields] = useState([]);

  const fetchMessages = useCallback(() => {
    const selectedProviderId = selectedProvider?.id;
    MessageToUserService.getAllMessages(selectedProviderId).then((res) => {
      setMessages(res.data);
      setIsLoading(false);
      const messagesResponse = res.data;
      // populating formfields state
      const formFieldsArr = messagesResponse.map((item) => ({
        id: item.id,
        assignTo: item.user_id_to,
        statusSelection: item.status,
        assignmentNotes: item.note_assign,
      }));
      setSectionFormFields([...formFieldsArr]);
    })
      .catch(() => {
        setIsLoading(false);
      });
  }, [selectedProvider?.id]);

  const fetchMessageById = useCallback(() => {
    const messageId = selectedMessage.id;
    MessageToUserService.getMessageByID(messageId).then((res) => {
      setMessages(res.data);
      setIsLoading(false);
    })
      .catch(() => {
        setIsLoading(false);
      });
  }, [selectedMessage]);

  useEffect(() => {
    if (selectedMessage) {
      fetchMessageById();
    } else {
      fetchMessages();
    }
  }, [selectedMessage, fetchMessages, fetchMessageById]);

  const toggleHistoryDialog = () => {
    setShowHistoryDialog((prevState) => !prevState);
  };

  const onChangeHandler = (name, value, index) => {
    const formFieldsClone = [...sectionFormFields];
    formFieldsClone[index][name] = value;
    setSectionFormFields([...formFieldsClone]);
  };

  const updateAllHandler = () => {
    const apiRequests = [...sectionFormFields];
    const promises = [];

    apiRequests.forEach((message) => {
      const reqBody = {
        data: {
          user_id_to: message.assignTo,
          message_status: message.statusSelection,
          note_assign: message.assignmentNotes,
        },
      };
      promises.push(MessageToUserService.updateMessage(message.id, reqBody));
    });

    axios.all(promises)
      .then(axios.spread(() => {
        enqueueSnackbar(`Messages updated successfully`, { variant: "success" });
        fetchMessages();
        fetchProviderDetails();
      }));
  };

  return (
    <>
      {
        !!showHistoryDialog && (
          <UserHistory
            open={showHistoryDialog}
            onClose={toggleHistoryDialog}
          />
        )
      }
      <Button
        className={classes.historyButton}
        onClick={() => toggleHistoryDialog()}
      >
        User History
      </Button>
      <Box mb={8}>
        {
          messages.length
            ? messages.map(((item, index) => (
              <Grid key={item.id}>
                <MessageSection
                  index={index}
                  message={item}
                  showDivider={messages.length !== index + 1}
                  onChangeHandler={onChangeHandler}
                  isEdit={Boolean(selectedMessage)}
                  fetchMessages={() => {
                    if (selectedMessage) {
                      onClose();
                    } else {
                      fetchMessages();
                      fetchProviderDetails();
                    }
                  }}
                />
              </Grid>
            )))
            : (
              <Typography variant="h6">
                {isLoading ? "Fetching Messages..." : "No Messages Found!"}
              </Typography>
            )
        }
      </Box>
      {(!selectedMessage && Boolean(messages.length)) && ( // hidden on patient page
        <Grid
          container
          className={classes.actionsContainer}
        >
          <Button
            onClick={() => updateAllHandler()}
            color="primary"
            variant="outlined"
          >
            Save All
          </Button>
        </Grid>
      )}
    </>
  );
};

ProcessMessage.defaultProps = {
  selectedMessage: null,
  selectedProvider: null,
  onClose: () => { },
};

ProcessMessage.propTypes = {
  fetchProviderDetails: PropTypes.func.isRequired,
  selectedProvider: PropTypes.shape({
    id: PropTypes.number,
  }),
  onClose: PropTypes.func,
  selectedMessage: PropTypes.shape({
    id: PropTypes.number,
  }),
};

export default ProcessMessage;

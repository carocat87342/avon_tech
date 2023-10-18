import React, { useCallback, useEffect, useState } from "react";

import {
  Button, Divider, Grid, makeStyles,
} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import moment from "moment";
import { useSnackbar } from "notistack";

import useAuth from "../../../hooks/useAuth";
import MessagesService from "../../../services/patient_portal/messages.service";
import MessageModal from "./components/MessageModal";

const isLessThan60Minutes = (createdTime) => (moment()
  .subtract(60, "minutes")
  .format()
  < moment(createdTime)
    .format()
);

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: "40px 0px",
  },
  title: {
    paddingBottom: theme.spacing(1),
  },
  titleSection: {
    display: "flex",
    alignItems: "center",
  },
  newMessage: {
    fontSize: "14px",
    marginLeft: theme.spacing(4),
  },
  content: {
    marginTop: "30px",
  },
  divider: {
    margin: "10px 0 16px 0",
  },
  labelBold: {
    fontWeight: "bold",
  },
  mr1: {
    marginRight: theme.spacing(1),
  },
}));

export default function Messages() {
  const classes = useStyles();
  const { user } = useAuth();
  const { enqueueSnackbar } = useSnackbar();
  const [messages, setMessages] = useState([]);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [open, setOpen] = useState(false);

  const [modalView, setModalView] = useState("new");

  const fetchMessages = async () => {
    const msg = await MessagesService.getMessages();
    setMessages(msg.data.data);
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const handleClose = () => {
    setOpen(false);
    if (selectedMessage) {
      setSelectedMessage(null);
    }
  };

  const onNewMessageButton = () => {
    setModalView("new");
    setOpen(true);
  };

  const onHandleReplyClick = (msg) => {
    setModalView("reply");
    setSelectedMessage(msg);
    setOpen(true);
  };

  const handleMessageEdit = (msg) => {
    setModalView("edit");
    setSelectedMessage(msg);
    setOpen(true);
  };

  const handleMessageDelete = (msg) => {
    MessagesService.deleteMessage(msg.id).then((response) => {
      enqueueSnackbar(`${response.data.message}`, {
        variant: "success",
      });
      fetchMessages();
    });
  };

  const getTitle = useCallback((msg) => {
    let title = "";
    const subject = msg?.subject;
    if (modalView === "new") {
      title = "Send A Secure Message";
    } else if (modalView === "edit") {
      title = `Edit Message || ${subject}`;
    } else if (modalView === "reply") {
      title = `Reply Message || ${subject}`;
    }
    return title;
  }, [modalView]);

  const userName = `${user.firstname} ${user.lastname}`;

  return (
    <>
      {open && (
        <MessageModal
          isOpen={open}
          onClose={handleClose}
          title={getTitle(selectedMessage)}
          reloadData={fetchMessages}
          selectedMessage={selectedMessage}
        />
      )}
      <div className={classes.root}>
        <div className={classes.titleSection}>
          <Typography component="h1" variant="h2" color="textPrimary" className={classes.title}>
            Messages
          </Typography>
          <Button
            className={classes.newMessage}
            onClick={() => onNewMessageButton()}
            variant="outlined"
            color="primary"
          >
            New Message
          </Button>
        </div>
        <Typography component="p" variant="body2" color="textPrimary">
          This page is used to send administrative messages to your practitioner. To send a new message click
          New Message.
        </Typography>

        <div className={classes.content}>
          {messages.map((msg) => (
            <div key={msg.id}>
              <Grid container spacing={4} alignItems="flex-start">
                <Grid item xs={6}>
                  <Typography component="p" variant="body2" color="textPrimary">
                    <span className={classes.labelBold}>Time: </span>
                    <span className={classes.mr1}>
                      {moment(msg.created).format("ll, h:mmA")}
                    </span>
                    <span className={classes.labelBold}>From: </span>
                    <span className={classes.mr1}>
                      {msg.user_to_from || msg.patient_to_from}
                    </span>
                    <span className={classes.labelBold}>To: </span>
                    <span className={classes.mr1}>
                      {msg.user_to_name ? msg.user_to_name : userName}
                    </span>
                    <br />
                    {msg.message}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Grid container spacing={2}>
                    <Grid item>
                      {msg.user_id_from
                        && (
                          <Button size="small" variant="outlined" onClick={() => onHandleReplyClick(msg)}>
                            Reply
                          </Button>
                        )}
                    </Grid>
                    {
                      isLessThan60Minutes(msg.created) && (
                        <>
                          <Grid item>
                            <Button size="small" variant="outlined" onClick={() => handleMessageEdit(msg)}>
                              Edit
                            </Button>
                          </Grid>
                          <Grid item>
                            <Button size="small" variant="outlined" onClick={() => handleMessageDelete(msg)}>
                              Delete
                            </Button>
                          </Grid>
                        </>
                      )
                    }
                  </Grid>
                </Grid>
              </Grid>
              <Divider className={classes.divider} />
            </div>
          ))}
          {/* {messages.length === 0 && <p>No records found!</p>} */}
        </div>
      </div>
    </>
  );
}

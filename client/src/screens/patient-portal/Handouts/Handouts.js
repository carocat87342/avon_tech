import React, { useState, useEffect, useCallback } from "react";

import {
  CssBaseline,
  makeStyles,
} from "@material-ui/core";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Typography from "@material-ui/core/Typography";
import PictureAsPdfIcon from "@material-ui/icons/PictureAsPdfOutlined";
import moment from "moment";

import useAuth from "../../../hooks/useAuth";
import PatientPortalService from "../../../services/patient_portal/patient-portal.service";
import HandoutDocumentViewerModal from "./components/modal/HandoutDocumentViewerModal";

const useStyles = makeStyles((theme) => ({
  paper: {
    paddingTop: theme.spacing(5),
    display: "flex",
    flexDirection: "column",
    alignItems: "left",
  },
  handouts: {
    marginTop: theme.spacing(2),
  },
  title: {
    marginBottom: theme.spacing(0.5),
  },
  listItem: {
    paddingLeft: theme.spacing(0),
  },
}));

const Handouts = () => {
  const classes = useStyles();
  const { user } = useAuth();
  const [handouts, setHandouts] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedFilepath, setSelectedFilepath] = useState(null);

  const fetchHandouts = useCallback(() => {
    PatientPortalService.getHandouts().then((res) => {
      setHandouts(res.data);
    });
  }, []);

  useEffect(() => {
    fetchHandouts();
  }, [fetchHandouts]);

  const handleOnClick = (_, filename) => {
    setSelectedFilepath(`${process.env.REACT_APP_API_URL}static/handouts/c${user.client_id}_${filename}`);
    setIsOpen(true);
  };

  return (
    <>
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h2" color="textPrimary" className={classes.title}>
          Handouts
        </Typography>
        <Typography component="h5" variant="body1" color="textPrimary">
          This page is used to view handouts from your provider.
        </Typography>
        <List aria-label="main mailbox folders" className={classes.handouts}>
          {
            handouts.length
              ? handouts.map((item) => (
                <ListItem
                  button
                  key={item.id}
                  onClick={(_) => handleOnClick(_, item.filename)}
                  className={classes.listItem}
                >
                  <ListItemIcon>
                    <PictureAsPdfIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary={`${item?.filename}  ${moment(item?.created).format("MMM Do YYYY")}`}
                  />
                </ListItem>
              ))
              : <Typography>No handouts found...</Typography>
          }
        </List>
      </div>

      <HandoutDocumentViewerModal
        filePath={selectedFilepath}
        isOpen={isOpen}
        hendleOnClose={() => setIsOpen(false)}
      />
    </>
  );
};

export default Handouts;

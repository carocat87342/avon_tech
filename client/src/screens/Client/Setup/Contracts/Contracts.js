import React, { useEffect, useState, useCallback } from "react";

import {
  Container,
  CssBaseline,
  makeStyles,
} from "@material-ui/core";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Typography from "@material-ui/core/Typography";
import PictureAsPdfIcon from "@material-ui/icons/PictureAsPdf";

import userService from "../../../../services/users.service";
import ContractDetailModal from "./components/ContractDetailModal";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    paddingTop: theme.spacing(5),
    paddingBottom: theme.spacing(5),
  },
  Contracts: {
    marginTop: theme.spacing(3),
  },
}));

const Contracts = () => {
  const classes = useStyles();

  const [isOpen, setIsOpen] = useState(false);
  const [contracs, setContracts] = useState([]);
  const [selectedFilepath, setSelectedFilepath] = useState(null);

  const fetchContracts = useCallback(() => {
    userService.getContractlists().then((response) => {
      setContracts(response.data.data);
    });
  }, []);

  useEffect(() => {
    fetchContracts();
  }, [fetchContracts]);

  const handleOnClick = (_, fileName) => {
    setSelectedFilepath(`${process.env.REACT_APP_API_URL}static/client/${fileName}`);
    setIsOpen(true);
  };
  return (
    <>
      <CssBaseline />
      <Container maxWidth={false} className={classes.root}>
        <Typography component="h1" variant="h2" color="textPrimary" m>
          Contracts
        </Typography>
        <List component="nav" aria-label="main mailbox folders" className={classes.Contracts}>
          {
            contracs.length
              ? contracs.map((item) => (
                <ListItem button key={item.id} onClick={(_) => handleOnClick(_, item.filename)}>
                  <ListItemIcon>
                    <PictureAsPdfIcon />
                  </ListItemIcon>
                  <ListItemText primary={item.filename} />
                </ListItem>
              ))
              : <Typography>No contracts found...</Typography>
          }
        </List>
      </Container>
      <ContractDetailModal
        filePath={selectedFilepath}
        isOpen={isOpen}
        handleOnClose={() => setIsOpen(false)}
      />
    </>
  );
};

export default Contracts;

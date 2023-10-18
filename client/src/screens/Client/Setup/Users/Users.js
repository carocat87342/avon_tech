import React, { useState, useEffect, useCallback } from "react";

import {
  Button,
  Container,
  CssBaseline,
  FormControlLabel,
  makeStyles,
  Switch,
} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import _ from "lodash";

import useAuth from "../../../../hooks/useAuth";
import UsersService from "../../../../services/users.service";
import NewOrEditUserModal from "./component/modal/NewOrEditUserModal";
import UsersTable from "./component/UsersTable";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: "40px 0px",
  },
  uploadButtons: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    maxWidth: "550px",
    marginBottom: theme.spacing(1),
    "& h1": {
      [theme.breakpoints.up("md")]: {
        marginRight: theme.spacing(4),
      },
    },
  },
}));

const Users = () => {
  const classes = useStyles();
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [isNewUser, setIsNewUser] = useState(true);
  const [allUsers, setAllUsers] = useState([]);
  const [forwardEmailList, setForwardEmailList] = useState([]);
  const [userValues, setUserValues] = useState("");
  const [isShowDeleted, setIsShowDeleted] = useState(false);

  const fetchAllUsers = useCallback(() => {
    UsersService.getAllUsers().then((res) => {
      const users = res.data.data;
      setAllUsers(users);
      if (isShowDeleted === false) {
        const tempUsers = users.filter((u) => u.status !== "D");
        setAllUsers(tempUsers);
      } else {
        setAllUsers(users);
      }
    });
  }, [isShowDeleted]);

  useEffect(() => {
    fetchAllUsers();
  }, [isShowDeleted, fetchAllUsers]);

  const fetchForwardEmailList = () => {
    UsersService.getForwardEmailList().then((res) => setForwardEmailList(res.data.data));
  };

  useEffect(() => {
    fetchForwardEmailList();
  }, []);

  const handleOnNewClick = () => {
    setIsOpen(true);
    setIsNewUser(true);
    setUserValues({
      admin: false,
      status: "A",
      schedule: "F",
      type: "",
      appointments: true,
    });
  };

  const handleOnEditClick = (id) => {
    setIsOpen(true);
    setIsNewUser(false);
    const selectUserById = allUsers.filter((u) => u.id === id);
    return selectUserById && setUserValues(_.head(selectUserById));
  };

  return (
    <>
      <CssBaseline />
      <Container maxWidth={false} className={classes.root}>
        <div className={classes.uploadButtons}>
          <Typography component="h1" variant="h2" color="textPrimary">
            Users
          </Typography>
          <FormControlLabel
            control={(
              <Switch
                checked={isShowDeleted}
                size="small"
                name="active"
                color="primary"
                onChange={() => setIsShowDeleted(!isShowDeleted)}
              />
            )}
            label="Show deleted users"
            labelPlacement="start"
          />
          <Button
            variant="contained"
            color="primary"
            component="span"
            onClick={() => handleOnNewClick()}
          >
            New
          </Button>
        </div>
        <Grid container justify="center">
          <Grid item md={12} xs={12}>
            <Typography component="p" variant="body2" color="textPrimary">
              This page is used to manage users
            </Typography>
            <UsersTable
              users={allUsers}
              handleOnEditClick={handleOnEditClick}
            />
          </Grid>
        </Grid>
        {isOpen && (
          <NewOrEditUserModal
            isOpen={isOpen}
            handleOnClose={() => setIsOpen(false)}
            isNewUser={isNewUser}
            forwardEmailList={forwardEmailList}
            fetchAllUsers={fetchAllUsers}
            authUser={user}
            user={userValues}
            allUsers={allUsers}
          />
        )}
      </Container>
    </>
  );
};

export default Users;

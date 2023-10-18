// Todo: Have to add validation
import React, { useEffect, useState } from "react";

import { makeStyles } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import Grid from "@material-ui/core/Grid";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { KeyboardDatePicker } from "@material-ui/pickers";
import moment from "moment";
import PropTypes from "prop-types";
import NumberFormat from "react-number-format";

import Accounting from "../../../../services/accountingSearch.service";
import AccountingSearchResults from "./components";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: "25px 0px",
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 180,
  },
  title: {
    paddingBottom: theme.spacing(0.5),
  },
  form: {
    display: "flex",
    flexDirection: "column",
    marginTop: theme.spacing(1),
  },
  formElments: {
    display: "flex",
    flexDirection: "column",
    maxWidth: "500px",
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    marginTop: "20px",
    maxWidth: "440px",
  },
  customSelect: {
    width: "200px",
  },
  type: {
    marginTop: "20px",
  },
  paper: {
    maxWidth: "456px",
  },
  textField: {
    width: "200px",
  },
  amount: {
    marginTop: "18px",
  },
}));

function NumberFormatCustom(props) {
  const {
    inputRef,
    onChange,
    name,
    ...other
  } = props;

  return (
    <NumberFormat
      // eslint-disable-next-line react/destructuring-assignment
      {...other}
      getInputRef={inputRef}
      onValueChange={(values) => {
        onChange({
          target: {
            name,
            value: values.value,
          },
        });
      }}
      thousandSeparator
      isNumericString
      prefix="$"
    />
  );
}

NumberFormatCustom.defaultProps = {
  name: null,
};

NumberFormatCustom.propTypes = {
  inputRef: PropTypes.func.isRequired,
  name: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

export default function AccountingSearch() {
  const classes = useStyles();
  const [amountFrom, setAmountFrom] = useState("0.00");
  const [amountTo, setAmountTo] = useState("100.00");
  const [dateFrom, setDateFrom] = useState(
    moment().subtract(7, "days").format("YYYY-MM-DD"),
  );
  const [dateTo, setDateTo] = useState(moment().format("YYYY-MM-DD"));
  const [types, setTypes] = useState([]);
  const [selectType, setSelectedType] = useState("");
  const [searchResult, setSearchResults] = useState([]);
  const [emptyResult, setEmptyResult] = useState("");

  const searchAccounts = (e) => {
    e.preventDefault();
    const payload = {
      data: {
        amount1: amountFrom,
        amount2: amountTo,
        dateFrom,
        dateTo,
        typeID: selectType,
      },
    };
    Accounting.search(payload).then((res) => {
      if (res.data.data.length > 0) {
        setSearchResults(res.data.data);
      } else {
        setSearchResults([]);
        setEmptyResult("None Found");
      }
    });
  };

  useEffect(() => {
    Accounting.searchType().then((res) => setTypes(res.data.data));
  }, []);

  return (
    <div className={classes.root}>
      <div className={classes.paper}>
        <Grid container direction="column" justify="center">
          <Typography
            component="h1"
            variant="h2"
            color="textPrimary"
            className={classes.title}
          >
            Accounting Search
          </Typography>
          <Typography component="p" variant="body2" color="textPrimary">
            This page is used to search accounting records
          </Typography>
          <form
            className={classes.form}
            noValidate
            onSubmit={(e) => searchAccounts(e)}
          >
            <Grid container spacing={2}>
              <Grid item xs={6} sm={6}>
                <TextField
                  autoFocus
                  variant="outlined"
                  label="Amount From"
                  value={amountFrom}
                  id="amountFrom"
                  className={`${classes.textField} ${classes.amount}`}
                  onChange={(event) => setAmountFrom(event.target.value)}
                  InputProps={{
                    inputComponent: NumberFormatCustom,
                    maxLength: 16,
                  }}
                  error={amountFrom.length >= 13}
                  helperText={
                    amountFrom
                    && amountFrom.length >= 13
                    && "Enter between 12 digit"
                  }
                  size="small"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Amount To"
                  variant="outlined"
                  value={amountTo}
                  id="amountTo"
                  onChange={(event) => setAmountTo(String(Number(event.target.value)?.toFixed(2)))}
                  className={`${classes.textField} ${classes.amount}`}
                  InputProps={{
                    inputComponent: NumberFormatCustom,
                    maxLength: 16,
                  }}
                  error={amountTo.length >= 13}
                  helperText={
                    amountTo
                    && amountTo.length >= 13
                    && "Enter between 12 digit"
                  }
                  size="small"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <KeyboardDatePicker
                  autoOk
                  variant="outlined"
                  id="date"
                  label="Date From"
                  value={dateFrom}
                  className={classes.textField}
                  onChange={(date) => setDateFrom(date)}
                  clearable
                  KeyboardButtonProps={{
                    "aria-label": "change date",
                  }}
                  format="yyyy/MM/dd"
                  inputVariant="outlined"
                  size="small"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <KeyboardDatePicker
                  autoOk
                  clearable
                  KeyboardButtonProps={{
                    "aria-label": "change date",
                  }}
                  format="yyyy/MM/dd"
                  inputVariant="outlined"
                  variant="outlined"
                  id="date"
                  label="Date To"
                  value={dateTo}
                  className={classes.textField}
                  onChange={(date) => setDateTo(date)}
                  size="small"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl
                  variant="outlined"
                  className={classes.customSelect}
                  size="small"
                >
                  <InputLabel htmlFor="age-native-simple">Type</InputLabel>
                  <Select
                    native
                    value={selectType}
                    onChange={(event) => setSelectedType(event.target.value)}
                    inputProps={{
                      name: "type",
                      id: "age-native-simple",
                    }}
                    label="Age"
                  >
                    <option aria-label="None" value="" />
                    {types.map((type) => (
                      <option key={type.id} value={type.id}>
                        {type.name}
                      </option>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
            <Grid item xs={12} sm={12}>
              <Button
                fullWidth
                size="small"
                type="submit"
                variant="contained"
                color="primary"
                className={classes.submit}
                onSubmit={() => searchAccounts()}
              >
                Search
              </Button>
            </Grid>
          </form>
        </Grid>
      </div>
      {searchResult.length > 0 ? (
        <AccountingSearchResults results={searchResult} />
      ) : (
        <Typography component="p" variant="body2" color="textPrimary">
          {emptyResult}
        </Typography>
      )}
    </div>
  );
}

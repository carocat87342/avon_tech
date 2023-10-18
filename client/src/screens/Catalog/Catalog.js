import React, { useCallback, useEffect, useState } from "react";

import {
  Box, Grid, Typography, Button, TextField, FormControlLabel, Checkbox,
  TableContainer, Table, TableRow, TableBody, TableHead,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import InfoIcon from "@material-ui/icons/InfoOutlined";

import { StyledTableRowSm, StyledTableCellSm } from "../../components/common/StyledTable";
import HoverPopover from "../../components/HoverPopover";
import CatalogService from "../../services/catalog.service";
import { CatalogLabCompanies, APP_LOGIN_LINK } from "../../static/catalog";
import DetailToolTip from "./components/DetailToolTip";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: "20px 0px",
  },
  borderSection: {
    position: "relative",
    border: "1px solid rgba(0, 0, 0, 0.23)",
    borderRadius: "4px",
    padding: theme.spacing(1, 1.5),
    minHeight: 120,
    marginRight: theme.spacing(3),

    [theme.breakpoints.down("sm")]: {
      marginRight: 0,
    },
  },
  link: {
    color: theme.palette.text.primary,
    textDecoration: "none",
    "&:hover": {
      textDecoration: "underline",
    },
  },
  iconContainer: {
    "& svg": {
      cursor: "pointer",
      position: "relative",
      top: 3,
    },
  },
}));

const Catalog = () => {
  const classes = useStyles();
  const DEFAULT_SELECTED_CHECKBOX = ["2"]; // Quest

  const [isLoading, setIsLoading] = useState(false);
  const [catalog, setCatalog] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [selectedCompanies, setSelectedCompanies] = useState(DEFAULT_SELECTED_CHECKBOX);
  const [selectedItem, setSelectedItem] = useState(null);

  const fetchCatalogData = useCallback((text) => {
    setIsLoading(true);
    const reqBody = {
      data: {
        text,
        labCompanyId: selectedCompanies.length ? selectedCompanies : null,
      },
    };
    CatalogService.searchCatalog(reqBody).then((res) => {
      setCatalog(res.data);
      setIsLoading(false);
    })
      .catch(() => {
        setIsLoading(false);
      });
  }, [selectedCompanies]);

  const onFormSubmit = (e) => {
    e.preventDefault();
    fetchCatalogData(searchText);
  };

  useEffect(() => {
    fetchCatalogData(searchText);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCompanies]);

  const onCheckBoxChangeHandler = (e) => {
    const tempSelectedCompanies = [...selectedCompanies];
    if (e.target.checked) {
      tempSelectedCompanies.push(e.target.name);
      setSelectedCompanies([...tempSelectedCompanies]);
    } else {
      const index = selectedCompanies.findIndex((x) => x === e.target.name);
      tempSelectedCompanies.splice(index, 1);
      setSelectedCompanies([...tempSelectedCompanies]);
    }
  };

  const handlePopoverOpen = (lab) => {
    setSelectedItem(lab);
  };

  return (
    <div className={classes.root}>
      <Typography
        component="h1"
        variant="h2"
        color="textPrimary"
      >
        Test Catalog
      </Typography>
      <Box mt={3}>
        <Grid container spacing={2}>
          <Grid item md={4} xs={12}>
            <Grid className={classes.borderSection}>
              <Typography
                component="h4"
                variant="h4"
                color="textPrimary"
                className={classes.title}
                gutterBottom
              >
                Lab Company
              </Typography>
              {
                CatalogLabCompanies.map((item) => (
                  <Grid key={item.id}>
                    <FormControlLabel
                      value={item.id}
                      label={item.name}
                      control={(
                        <Checkbox
                          name={item.id}
                          color="primary"
                          checked={selectedCompanies?.includes(item.id)}
                          onChange={(e) => onCheckBoxChangeHandler(e)}
                        />
                      )}
                    />
                  </Grid>
                ))
              }
            </Grid>
          </Grid>
          <Grid item md={8} xs={12}>
            <Box mb={2}>
              <form onSubmit={onFormSubmit}>
                <Grid container spacing={2} alignItems="center">
                  <Grid item sm={9} xs={9}>
                    <TextField
                      autoFocus
                      fullWidth
                      size="small"
                      variant="outlined"
                      value={searchText}
                      onChange={(e) => setSearchText(e.target.value)}
                    />
                  </Grid>
                  <Grid item>
                    <Button
                      variant="outlined"
                      type="submit"
                      fullWidth
                    >
                      Search
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </Box>
            {/* Table starts here  */}
            <TableContainer>
              <Table stickyHeader size="small">
                <TableHead>
                  <TableRow>
                    <StyledTableCellSm padding="checkbox">Lab Company</StyledTableCellSm>
                    <StyledTableCellSm>Test Name</StyledTableCellSm>
                    <StyledTableCellSm>Detail</StyledTableCellSm>
                    <StyledTableCellSm>Price</StyledTableCellSm>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {(!isLoading && catalog.length)
                    ? catalog.map((item) => (
                      <StyledTableRowSm
                        key={item.proc_id}
                        className={classes.pointer}
                      >
                        <StyledTableCellSm padding="checkbox">{item.lab_name}</StyledTableCellSm>
                        <StyledTableCellSm>{item.proc_name}</StyledTableCellSm>
                        {item.detail ? (
                          <StyledTableCellSm
                            onMouseEnter={() => handlePopoverOpen(item)}
                            className={classes.iconContainer}
                          >
                            <HoverPopover
                              bodyElement={(
                                selectedItem ? <DetailToolTip data={selectedItem} /> : ""
                              )}
                            >
                              <InfoIcon fontSize="small" />
                            </HoverPopover>
                          </StyledTableCellSm>
                        ) : (
                          <StyledTableCellSm /> // empty column
                        )}

                        <StyledTableCellSm>
                          {item.lab_name === null || item.lab_id === 2 // Quest
                            ? `$${Number(item.price).toFixed(2)}`
                            : (
                              <a className={classes.link} href={APP_LOGIN_LINK}>
                                Login to see price
                              </a>
                            )}
                        </StyledTableCellSm>
                      </StyledTableRowSm>
                    ))
                    : (
                      <StyledTableRowSm>
                        <StyledTableCellSm colSpan={4}>
                          <Typography align="center" variant="body1">
                            {isLoading ? "Loading..." : "No Records Found..."}
                          </Typography>
                        </StyledTableCellSm>
                      </StyledTableRowSm>
                    )}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

Catalog.propTypes = {
};

export default Catalog;

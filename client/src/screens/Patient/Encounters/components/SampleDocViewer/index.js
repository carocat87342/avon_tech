import React, { useEffect, useState } from "react";

import { Box, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Pagination from "@material-ui/lab/Pagination";
import { useSnackbar } from "notistack";
import PropTypes from "prop-types";
import { pdfjs, Document, Page } from "react-pdf";

import PdfFilePath from "../../../../../assets/docs/sample.pdf";

pdfjs
  .GlobalWorkerOptions
  .workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const useStyles = makeStyles((theme) => ({
  paginationWrap: {
    display: "flex",
    justifyContent: "center",
    position: "absolute",
    bottom: theme.spacing(1),
    width: `calc(100% - ${theme.spacing(4 * 2)}px)`, // 2 x 2 sides = 4
  },
}));

const SampleDocViewer = ({ filePath }) => {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const [billingDocFilePath, setBillingDocFilePath] = useState(false);
  const [paginationState, setPaginationState] = useState({
    pageNumber: 1,
    totalPages: 1,
  });

  useEffect(() => {
    setBillingDocFilePath(filePath);
  }, [filePath]);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setPaginationState({
      ...paginationState,
      totalPages: numPages,
    });
  };

  const onError = (e) => {
    enqueueSnackbar(e?.message, { variant: "error" });
  };

  const handlePaginationChange = (event, value) => {
    setPaginationState({
      ...paginationState,
      pageNumber: value,
    });
  };


  return (
    <Box minHeight={300}>
      <Document
        file={billingDocFilePath}
        onLoadSuccess={(event) => onDocumentLoadSuccess(event)}
        onLoadError={(event) => onError(event)}
      >
        <Page pageNumber={paginationState.pageNumber} />
      </Document>
      <Grid className={classes.paginationWrap}>
        <Pagination
          count={paginationState.totalPages}
          shape="rounded"
          onChange={handlePaginationChange}
        />
      </Grid>
    </Box>
  );
};

SampleDocViewer.defaultProps = {
  filePath: PdfFilePath,
};

SampleDocViewer.propTypes = {
  filePath: PropTypes.string,
};

export default SampleDocViewer;

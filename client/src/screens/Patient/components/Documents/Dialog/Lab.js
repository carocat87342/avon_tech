import React, { useEffect, useState } from "react";

import { Button } from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import Dialog from "@material-ui/core/Dialog";
import IconButton from "@material-ui/core/IconButton";
import Slide from "@material-ui/core/Slide";
import { makeStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import CloseIcon from "@material-ui/icons/CloseOutlined";
import Pagination from "@material-ui/lab/Pagination";
import { useSnackbar } from "notistack";
import PropTypes from "prop-types";
import FileViewer from "react-file-viewer";
import { pdfjs, Document, Page } from "react-pdf";

pdfjs
  .GlobalWorkerOptions
  .workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const Transition = React.forwardRef((props, ref) => <Slide direction="up" ref={ref} {...props} />);

const useStyles = makeStyles((theme) => ({
  appBar: {
    textAlign: "right",
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
    justifyContent: "space-between",
  },
  PDFViewer: {
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(2),
    marginLeft: theme.spacing(2),
  },
  PaginationWrap: {
    display: "flex",
    justifyContent: "center",
  },
  download: {
    "& a": {
      color: "#ffffff",
      textDecoration: "none",
    },
  },
}));

function checkFileExtension(fileName) {
  const extension = fileName.substring(fileName.lastIndexOf(".") + 1);
  return extension;
}

const Lab = ({
  open, documentName, patientId, handleClose,
}) => {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const [file, setFile] = useState("");
  const [totalPages, setTotalPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [type, setType] = useState("");

  useEffect(() => {
    const filePath = `${process.env.REACT_APP_API_URL}static/patient/pid${patientId}_${documentName}`;
    setFile(filePath);
    const fileType = checkFileExtension(filePath);
    setType(fileType);
  }, [documentName, patientId]);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setTotalPages(numPages);
    setPageNumber(1);
  };

  const handleChange = (event, value) => {
    setPageNumber(value);
  };

  const onError = (e) => {
    enqueueSnackbar(e, { variant: "error" });
    console.error("onError", e);
  };


  return (
    <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
      <AppBar className={classes.appBar}>
        <Toolbar className={classes.title} variant="dense">
          <Button variant="contained" color="primary" className={classes.download}>
            <a href={file} download>Download</a>
          </Button>
          <IconButton edge="end" color="inherit" onClick={handleClose} aria-label="close">
            <CloseIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      {type && (type === "pdf")
        ? (
          <div className={classes.PDFViewer}>
            <Document
              file={(file)}
              onLoadSuccess={onDocumentLoadSuccess}
            >
              <Page pageNumber={pageNumber} />
            </Document>
            <div className={classes.PaginationWrap}>
              <Pagination count={totalPages} shape="rounded" onChange={handleChange} />
            </div>
          </div>
        )
        : (
          <FileViewer
            fileType={type}
            filePath={file}
            onError={onError}
          />
        )}
    </Dialog>
  );
};

Lab.propTypes = {
  open: PropTypes.bool.isRequired,
  patientId: PropTypes.string.isRequired,
  documentName: PropTypes.string.isRequired,
  handleClose: PropTypes.func.isRequired,
};
export default Lab;

import React, {
  useEffect, useState, useRef,
} from "react";

import { makeStyles } from "@material-ui/core/styles";
import Pagination from "@material-ui/lab/Pagination";
import throttle from "lodash/throttle";
import { useSnackbar } from "notistack";
import PropTypes from "prop-types";
import DocViewer, { DocViewerRenderers } from "react-docs-viewer";
import FileViewer from "react-file-viewer";
import { pdfjs, Document, Page } from "react-pdf";

const checkFileExtension = (fileName) => fileName.substring(fileName.lastIndexOf(".") + 1);

pdfjs
  .GlobalWorkerOptions
  .workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

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
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    marginLeft: theme.spacing(2),
    display: "grid",
    gridTemplateColumns: "max-content",
    justifyContent: "center",
    alignContent: "center",
  },
  PaginationWrap: {
    display: "flex",
    justifyContent: "center",
  },
  documentPage: {
    background: "red",
    textAlign: "center",
  },
  "my-doc-viewer-style": {
    background: "#fff !important",
  },
}));

const PatientLabDocumentViewer = ({
  documentName, patientId,
}) => {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const [file, setFile] = useState("");
  const [totalPages, setTotalPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [type, setType] = useState("");
  const [initialWidth, setInitialWidth] = useState(580);
  const pdfWrapper = useRef(null);

  useEffect(() => {
    const filePath = `${process.env.REACT_APP_API_URL}static/patient/pid${patientId}_${documentName}`;
    setFile(filePath);
    const fileType = checkFileExtension(filePath);
    setType(fileType);
  }, [documentName, patientId]);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setTotalPages(numPages);
  };

  const handleChange = (event, value) => {
    setPageNumber(value);
  };

  const onError = (e) => {
    enqueueSnackbar(e, { variant: "error" });
    console.error("onError", e);
  };

  const setPdfSize = () => {
    if (pdfWrapper && pdfWrapper.current) {
      setInitialWidth(pdfWrapper.current.getBoundingClientRect().width);
    }
  };

  useEffect(() => {
    window.addEventListener("resize", throttle(setPdfSize, 3000));
    setPdfSize();
    return () => {
      window.removeEventListener("resize", throttle(setPdfSize, 3000));
    };
  }, []);

  const renderDocumentView = () => {
    if (type && type === "pdf") {
      return (
        <div className={classes.PDFViewer} ref={pdfWrapper}>
          <Document
            file={(file)}
            onLoadSuccess={onDocumentLoadSuccess}
          >
            <Page pageNumber={pageNumber} width={initialWidth} />
          </Document>
          {totalPages && (
            <div className={classes.PaginationWrap}>
              <Pagination count={totalPages} shape="rounded" onChange={handleChange} />
            </div>
          )}
        </div>
      );
    }
    if (type === "docx") {
      return (
        <FileViewer
          fileType={type}
          filePath={file}
          onError={onError}
        />
      );
    }
    return (
      <DocViewer
        className={classes["my-doc-viewer-style"]}
        config={{
          header: {
            disableHeader: true,
            disableFileName: true,
            retainURLParams: true,
          },
        }}
        pluginRenderers={DocViewerRenderers}
        documents={[
          { uri: file },
        ]}
      />
    );
  };
  return (
    <>
      {renderDocumentView()}
    </>
  );
};

PatientLabDocumentViewer.propTypes = {
  patientId: PropTypes.string.isRequired,
  documentName: PropTypes.string.isRequired,
};
export default PatientLabDocumentViewer;

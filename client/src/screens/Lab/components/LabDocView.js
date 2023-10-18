import React, {
  memo,
} from "react";

import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import DocViewer, { DocViewerRenderers } from "react-docs-viewer";

const useStyles = makeStyles(() => ({
  "my-doc-viewer-style": {
    background: "#fff !important",
  },
}));

const LabDocView = memo(({
  file,
}) => {
  const classes = useStyles();
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
});

LabDocView.propTypes = {
  file: PropTypes.string.isRequired,
};
export default LabDocView;

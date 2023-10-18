import React from "react";

import PropTypes from "prop-types";

import Dialog from "../../../../../../components/Dialog";
import TestGraph from "../../../../../MarkerGraph";

const GraphDialog = (props) => {
  const {
    isOpen, onClose, fileName,
  } = props;

  return (
    <Dialog
      open={isOpen}
      title={fileName}
      message={(
        <TestGraph />
      )}
      cancelForm={() => onClose()}
      hideActions
      size="xl"
    />
  );
};

GraphDialog.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  fileName: PropTypes.string.isRequired,
};

export default GraphDialog;

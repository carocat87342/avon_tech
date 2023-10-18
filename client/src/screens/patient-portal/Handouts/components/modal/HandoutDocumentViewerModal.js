import React from "react";

import PropTypes from "prop-types";

import Dialog from "../../../../../components/Dialog";
import SampleDocViewer from "../../../../Patient/Encounters/components/SampleDocViewer";

const HandoutDocumentViewerModal = ({
  isOpen,
  hendleOnClose,
  filePath,
}) => (
  <Dialog
    size="sm"
    open={isOpen}
    cancelForm={hendleOnClose}
    title="Handout Detail"
    fullHeight
    message={(
      <SampleDocViewer filePath={filePath} />
    )}
  />
);

HandoutDocumentViewerModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  hendleOnClose: PropTypes.func.isRequired,
  filePath: PropTypes.string.isRequired,
};
export default HandoutDocumentViewerModal;

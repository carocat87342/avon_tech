import React from "react";

import PropTypes from "prop-types";

import Dialog from "../../../../../components/Dialog";
import SampleDocViewer from "../../../../Patient/Encounters/components/SampleDocViewer";

const ContractDetailModal = ({
  isOpen,
  handleOnClose,
  filePath,
}) => (
  <Dialog
    size="sm"
    open={isOpen}
    cancelForm={handleOnClose}
    title="Contract Detail"
    message={(
      <SampleDocViewer filePath={filePath} />
    )}
  />
);

ContractDetailModal.defaultProps = {
  filePath: null,
};

ContractDetailModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  handleOnClose: PropTypes.func.isRequired,
  filePath: PropTypes.string,
};
export default ContractDetailModal;

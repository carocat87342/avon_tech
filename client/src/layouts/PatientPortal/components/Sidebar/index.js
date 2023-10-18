import React from "react";

import { Drawer } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import PaymentIcon from "@material-ui/icons/PaymentOutlined";
import ReceiptIcon from "@material-ui/icons/ReceiptOutlined";
import {
  mdiAccount,
  mdiMessageOutline,
  mdiHome,
  mdiTestTube,
  mdiPrescription,
  mdiPharmacy,
  mdiCalendar,
  mdiLogoutVariant,
  mdiTextBoxOutline,
  mdiFileDocumentEditOutline,
  mdiFileDocumentOutline,
} from "@mdi/js";
import Icon from "@mdi/react";
import clsx from "clsx";
import PropTypes from "prop-types";

import { SidebarNav } from "./components";

const useStyles = makeStyles((theme) => ({
  drawer: {
    width: 240,
    [theme.breakpoints.up("lg")]: {
      marginTop: 64,
      height: "calc(100% - 64px)",
    },
  },
  root: {
    backgroundColor: theme.palette.white,
    display: "flex",
    flexDirection: "column",
    height: "100%",
    padding: theme.spacing(2),
  },
  divider: {
    margin: theme.spacing(2, 0),
  },
  nav: {
    marginBottom: theme.spacing(2),
  },
}));

const Sidebar = (props) => {
  const {
    open, variant, onClose, className, ...rest
  } = props;
  const classes = useStyles();

  const pages = [
    {
      id: 1,
      title: "Home",
      href: "/patient",
      icon: <Icon path={mdiHome} size={1} horizontal vertical rotate={180} />,
    },
    {
      id: 2,
      title: "Messages",
      href: "/patient/messages",
      icon: <Icon path={mdiMessageOutline} size={1} horizontal vertical rotate={180} />,
    },
    {
      id: 8,
      title: "Appointments",
      href: "/patient/appointments",
      icon: (
        <Icon path={mdiCalendar} size={1} horizontal vertical rotate={180} />
      ),
    },
    {
      id: 9,
      title: "Provider Billing",
      href: "/patient/billing",
      icon: <ReceiptIcon />,
    },
    {
      id: 4,
      title: "Handouts",
      href: "/patient/handouts",
      icon: (
        <Icon path={mdiTextBoxOutline} size={1} horizontal vertical rotate={180} />
      ),
    },
    {
      id: 3,
      title: "Encounters",
      href: "/patient/encounters",
      icon: (
        <Icon path={mdiFileDocumentOutline} size={1} horizontal vertical rotate={180} />
      ),
    },
    {
      id: 6,
      title: "Purchase Labs",
      href: "/patient/purchase-labs",
      icon: (
        <Icon path={mdiTestTube} size={1} horizontal vertical rotate={180} />
      ),
    },
    {
      id: 7,
      title: "Lab Requisitions",
      href: "/patient/labs-requisition",
      icon: (
        <Icon path={mdiFileDocumentEditOutline} size={1} horizontal vertical rotate={180} />
      ),
    },
    {
      id: 16,
      title: "Lab Billing",
      href: "/patient/lab-billing",
      icon: <ReceiptIcon />,
    },
    {
      id: 5,
      title: "Documents / Lab Results",
      href: "/patient/labs",
      icon: (
        <Icon path={mdiTestTube} size={1} horizontal vertical rotate={180} />
      ),
    },
    {
      id: 10,
      title: "Payment Methods",
      href: "/patient/payment-methods",
      icon: <PaymentIcon />,
    },
    // {
    // id: 9,
    // title: "Allergies",
    // href: "/patient/allergies",
    // icon: <Icon path={mdiAllergy} size={1} horizontal vertical rotate={180} />,
    // },
    {
      id: 11,
      title: "Prescriptions",
      href: "/patient/prescriptions",
      icon: (
        <Icon
          path={mdiPrescription}
          size={1}
          horizontal
          vertical
          rotate={180}
        />
      ),
    },
    {
      id: 12,
      title: "Pharmacies",
      href: "/patient/pharmacies",
      icon: (
        <Icon path={mdiPharmacy} size={1} horizontal vertical rotate={180} />
      ),
    },
    {
      id: 13,
      title: "Profile",
      href: "/patient/profile",
      icon: <Icon path={mdiAccount} size={1} horizontal vertical rotate={180} />,
    },
    {
      id: 14,
      title: "Forms",
      href: "/patient/forms",
      icon: (
        <Icon path={mdiTextBoxOutline} size={1} horizontal vertical rotate={180} />
      ),
    },
    {
      id: 15,
      title: "Signoff",
      href: "/",
      logout: true,
      icon: (
        <Icon
          path={mdiLogoutVariant}
          size={1}
          horizontal
          vertical
          rotate={180}
        />
      ),
    },
  ];

  return (
    <Drawer
      anchor="left"
      classes={{ paper: classes.drawer }}
      onClose={onClose}
      open={open}
      variant={variant}
    >
      {/* eslint-disable-next-line react/jsx-props-no-spreading */}
      <div {...rest} className={clsx(classes.root, className)}>
        <SidebarNav className={classes.nav} pages={pages} />
      </div>
    </Drawer>
  );
};

Sidebar.defaultProps = {
  className: null,
  onClose: () => { },
};

Sidebar.propTypes = {
  className: PropTypes.string,
  onClose: PropTypes.func,
  open: PropTypes.bool.isRequired,
  variant: PropTypes.string.isRequired,
};

export default Sidebar;

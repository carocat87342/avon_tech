import React, { useState } from "react";

import { Menu, MenuItem, makeStyles } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import ArrowDropDownOutlinedIcon from "@material-ui/icons/ArrowDropDownOutlined";
import ArrowDropUpOutlinedIcon from "@material-ui/icons/ArrowDropUpOutlined";
import PropTypes from "prop-types";
import { Link as RouterLink } from "react-router-dom";


const useStyles = makeStyles((theme) => ({
  itemWithSubmenus: {
    color: theme.palette.white,
    padding: "16px 15px",
    textDecoration: "none",
  },
  subMenu: {
    minWidth: "230px",
  },
  MenuItem: {
    borderBottom: "1px solid #E9EBEE",
    paddingTop: "13px !important",
    paddingBottom: "13px !important",
    backgroundColor: theme.palette.background.paper,
  },
}));

const MenuWithDropDowns = (
  (
    {
      parentId,
      parentName,
      parentChildrenItems,
    },
  ) => {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
      setAnchorEl(null);
    };

    return (
      <>
        <Button
          aria-controls={parentId}
          aria-haspopup="true"
          className={classes.itemWithSubmenus}
          onClick={handleClick}
        >
          {parentName}
          {anchorEl ? <ArrowDropUpOutlinedIcon /> : <ArrowDropDownOutlinedIcon />}
        </Button>
        <Menu
          id={parentId}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          keepMounted
          PaperProps={{ className: classes.subMenu }}
          getContentAnchorEl={null}
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          {parentChildrenItems.map((item) => (
            <MenuItem
              key={item.id}
              component={RouterLink}
              to={item.href}
              className={classes.MenuItem}
              onClick={handleClose}
            >
              {item.title}
            </MenuItem>
          ))}
        </Menu>
      </>
    );
  }
);

MenuWithDropDowns.propTypes = {
  parentId: PropTypes.number.isRequired,
  parentName: PropTypes.string.isRequired,
  parentChildrenItems: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string,
    href: PropTypes.string,
  })).isRequired,
};

export default MenuWithDropDowns;

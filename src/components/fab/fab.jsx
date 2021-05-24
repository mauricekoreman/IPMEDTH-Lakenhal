import React from "react";
import PropTypes from "prop-types";
import { Fab as FloatingBtn } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";

const Fab = ({ position, color, ariaLabel, size }) => {
  return (
    <FloatingBtn
      size={size ?? "small"}
      color={color}
      aria-label={ariaLabel}
      className={position}
    >
      <EditIcon />
    </FloatingBtn>
  );
};

Fab.propTypes = {
  position: PropTypes.any.isRequired,
  color: PropTypes.string.isRequired,
  ariaLabel: PropTypes.string,
  size: PropTypes.string,
};

export default Fab;

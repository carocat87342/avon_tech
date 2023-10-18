import React, { useRef } from "react";

import PropTypes from "prop-types";

import defaultErrorImage from "../../../../assets/img/NoClientLogo.png";

const Image = ({
  src, alt, className, onErrorImage,
}) => {
  const imageEl = useRef(null);
  return (
    <img
      src={src}
      alt={alt}
      className={className}
      onError={() => {
        imageEl.current.src = onErrorImage;
      }}
      ref={imageEl}
    />
  );
};

Image.defaultProps = {
  onErrorImage: defaultErrorImage,
};

Image.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
  onErrorImage: PropTypes.string,
};

export default Image;

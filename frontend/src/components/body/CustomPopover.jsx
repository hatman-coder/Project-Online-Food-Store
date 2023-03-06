import React from "react";
import Button from "react-bootstrap/Button";
import Overlay from "react-bootstrap/Overlay";
import Tooltip from "react-bootstrap/Tooltip";
import { useEffect, useRef, useState } from "react";

const CustomPopover = ({ buttonName, popoverText }) => {
  const [show, setShow] = useState(false);
  const target = useRef(null);

  return (
    <>
      <Button
        style={{}}
        ref={target}
        onClick={() => {
          setShow(!show);
        }}
      >
        {buttonName}
      </Button>
      <Overlay target={target.current} show={show} placement="right">
        {(props) => (
          <Tooltip id="overlay-example" {...props}>
            {popoverText}
          </Tooltip>
        )}
      </Overlay>
    </>
  );
};

export default CustomPopover;

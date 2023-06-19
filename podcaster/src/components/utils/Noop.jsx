import React from "react";
import PropTypes from "prop-types";

const Noop = ({ component: Component, children, condition, props }) =>
  condition ? <Component {...props}>{children}</Component> : <>{children}</>;

Noop.propTypes = {
  component: PropTypes.elementType.isRequired,
  children: PropTypes.node.isRequired,
  condition: PropTypes.bool.isRequired,
  props: PropTypes.object,
};

export default Noop;

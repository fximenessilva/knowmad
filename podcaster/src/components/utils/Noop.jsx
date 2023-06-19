const Noop = ({ component: Component, children, condition, props }) =>
  condition ? <Component {...props}>{children}</Component> : <>{children}</>;

export default Noop;

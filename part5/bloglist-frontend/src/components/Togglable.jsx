import { useState } from "react";

const Togglable = (props) => {
  const [isVisible, setVisible] = useState(false);

  if (isVisible) {
    return (
      <div>
        <div>{props.children}</div>
        <button onClick={() => setVisible(false)}>cancel</button>
      </div>
    );
  }

  return <button onClick={() => setVisible(true)}>{props.buttonLabel}</button>;
};

export default Togglable;

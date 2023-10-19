const Notification = ({ message }) => {
  if (message.type === "error") {
    return <div className="error">{message.body}</div>;
  }
  return <div className="info">{message.body}</div>;
};

export default Notification;

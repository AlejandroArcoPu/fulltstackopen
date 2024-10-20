const notifyWithTimeout = (
  setType,
  setMessage,
  type,
  message,
  timeout = 5000,
) => {
  setType(type);
  setMessage(message);
  setTimeout(() => {
    setMessage(null);
    setType(null);
  }, timeout);
};

export default { notifyWithTimeout };

export default error => {
  return error ? (error.message ? error.message : "An error occured.") : "";
};

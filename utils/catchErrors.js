const catchErrors = (error, displayError) => {
  let errorMsg;
  let status;
  if (error.response) {
    // The request was made and the server responsed with a status code that is not in the range of 2XX
    errorMsg = error.response.data;
    status = error.response.status;
    console.error("Error response", errorMsg);

    // For Cloudinary image uploads
    if (error.response.data.error) {
      errorMsg = error.response.data.error.message;
    }
  } else if (error.request) {
    // The request was made, but no response was received
    errorMsg = error.request;
    status = error.status;
    console.error("Error request", errorMsg);
  } else {
    // Something else happened in making the request that triggered an error
    errorMsg = error.message;
    status = error.status;
    console.error("Error message", errorMsg);
  }
  displayError({ text: errorMsg, status: status });
};

export default catchErrors;

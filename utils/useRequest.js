import React from 'react';

const requestStatusOption = {
  iddle: 'iddle',
  loading: 'loading',
  success: 'success',
  error: 'error'
};

function useRequest() {
  const [requestStatus, setRequestStatus] = React.useState({
    name: requestStatusOption.iddle,
    data: null
  });

  const changeRequestStatus = (name, data = null) => {
    setRequestStatus({
      name: requestStatusOption[name],
      data
    });
  };

  return {requestStatus, changeRequestStatus};
}

export default useRequest;

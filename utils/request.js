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

  const onChangeRequestStatus = (status, data) => {
    setRequestStatus({
      name: requestStatusOption[status],
      data: data || requestStatus.data
    });
  };

  return {requestStatus, onChangeRequestStatus};
}

export default useRequest;

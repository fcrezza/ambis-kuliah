import React from 'react';

function useProfileEdit(defaultFullname, defaultUsername, defaultBio) {
  const [usernameValue, setUsername] = React.useState(() => defaultUsername);
  const [fullnameValue, setFullname] = React.useState(() => defaultFullname);
  const [bioValue, setBio] = React.useState(() => defaultBio);

  const onUsernameChange = e => {
    setUsername(e.target.value);
  };
  const onFullnameChange = e => {
    setFullname(e.target.value);
  };
  const onBioChange = e => {
    setBio(e.target.value);
  };

  return {
    usernameValue,
    fullnameValue,
    bioValue,
    onUsernameChange,
    onFullnameChange,
    onBioChange
  };
}

export default useProfileEdit;

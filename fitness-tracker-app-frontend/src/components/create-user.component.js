import React, { useState } from 'react';
import axios from 'axios';

const CreateUser = () => {
  const [username, setUsername] = useState('');

  const onChangeUsername = e => {
    setUsername(e.target.value);
  };

  const onSubmit = e => {
    e.preventDefault();
    const newUser = {
      username: username,
    };
    console.log(newUser);
    axios
      .post('http://localhost:5001/users/add', newUser)
      .then(res => console.log(res.data))
      .catch(err => console.log(err));
    setUsername('');
  };

  return (
    <div>
      <h3>Create New User</h3>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label>Username: </label>
          <input
            type="text"
            required
            className="form-control"
            value={username}
            onChange={onChangeUsername}
          />
        </div>
        <div className="form-group">
          <input
            type="submit"
            value="Create User"
            className="btn btn-primary"
          />
        </div>
      </form>
      <div>
        <center>
          <img src="/gitfitbanner.png" width="800" alt=""></img>
        </center>
      </div>
    </div>
  );
};

export default CreateUser;
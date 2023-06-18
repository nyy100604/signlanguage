import React, { useState } from 'react';
import axios from 'axios';

const SignupForm = () => {
  const [username, setUsername] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // 構建請求體
    const requestData = {
      id: username,
      name: name,
      pwd: password
    };

    try {
      const response = await axios.post('http://localhost:5000/sign_up', requestData);

      if (response.data === 'True') {
        setMessage('註冊成功');
      } else {
        setMessage('註冊失敗');
      }
    } catch (error) {
      setMessage('請求失敗');
      console.error(error);
    }

    // 清空輸入欄位
    setUsername('');
    setName('');
    setPassword('');
  };

  return (
    <div>
      <h2>註冊</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">學號</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={handleUsernameChange}
            style={{ border: '1px solid black' }}
          />
        </div>
        <div>
          <label htmlFor="name">姓名:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={handleNameChange}
            style={{ border: '1px solid black' }}
          />
        </div>
        <div>
          <label htmlFor="password">密碼:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
            style={{ border: '1px solid black' }}
          />
        </div>
        <button type="submit" style={{ border: '1px solid black' }}>註冊</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default SignupForm;

import React, { useState } from 'react';
import axios from 'axios';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // 構建請求體
    const requestData = {
      id: username,
      pwd: password
    };

    try {
      const response = await axios.post('http://localhost:5000/sign_in', requestData);

      if (response.data === 'True') {
        setMessage('登入成功');
      } else {
        setMessage('登入失敗');
      }
    } catch (error) {
      setMessage('請求失敗');
      console.error(error);
    }

    // 清空輸入欄位
    setUsername('');
    setPassword('');
  };

  return (
    <div>
      <h2>登入</h2>
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
          <label htmlFor="password">密碼:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
            style={{ border: '1px solid black' }}
          />
        </div>
        <button style={{ border: '1px solid black' }} type="submit">登入</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default LoginForm;

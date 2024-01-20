// src/components/AuthComponent.js
import React, { useState } from 'react';
import { signUp, signIn, signOut } from '../Auth';

const AuthComponent = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = () => {
    signUp(email, password);
  };

  const handleSignIn = () => {
    signIn(email, password);
  };

  const handleSignOut = () => {
    signOut();
  };

  return (
    <div>
      <h2>Authentication</h2>
      <input type="text" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
      <button onClick={handleSignUp}>Sign Up</button>
      <button onClick={handleSignIn}>Sign In</button>
      <button onClick={handleSignOut}>Sign Out</button>
    </div>
  );
};

export default AuthComponent;

// src/App.js
import React from 'react';
import AuthComponent from './components/AuthComponent';
import ProjectForm from './components/ProjectForm';
import ProjectList from './components/ProjectList';
import UserProfile from './components/UserProfile';

const App = () => {
  return (
    <div>
      <h1>Project Matchmaker</h1>
      <AuthComponent />
      <UserProfile />
      <ProjectForm />
      <ProjectList />
    </div>
  );
};

export default App;

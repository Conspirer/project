// src/components/UserProjects.js
import React, { useEffect, useState } from 'react';
import { getUserProjects } from '../Firestore';
import { auth } from '../firebase';

const UserProjects = () => {
  const [userProjects, setUserProjects] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserProjects = async () => {
      const projects = await getUserProjects();
      setUserProjects(projects);
    };

    fetchUserProjects();

    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div style={{ textAlign: 'center', padding: '20px', fontFamily: 'Arial, sans-serif', color: '#333' }}>
      {user ? (
        <>
          <h2 style={{ color: '#008080' }}>Your Projects</h2>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {userProjects.map((project) => (
              <li key={project.id} style={{ borderBottom: '1px solid #ccc', padding: '10px' }}>
                <strong>{project.title}</strong>
                <p style={{ marginTop: '5px' }}>{project.description}</p>
                <p style={{ color: '#888' }}>Tags: {project.tags.join(', ')}</p>
              </li>
            ))}
          </ul>
        </>
      ) : (
        <p style={{ color: '#888' }}>Please log in to view your projects.</p>
      )}
    </div>
  );
};

export default UserProjects;

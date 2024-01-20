// src/components/ProjectList.js
import React, { useEffect, useState } from 'react';
import { getAllProjects } from '../Firestore';
import UserProjects from './UserProjects';
import { fetchProjects } from '../Firestore';
import { auth } from '../firebase';

const ProjectList = () => {
  const [projects, setProjects] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchProjectsData = async () => {
      const allProjects = await getAllProjects();
      setProjects(allProjects);
    };

    fetchProjectsData();

    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  const filteredProjects = projects.filter((project) =>
    project.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ textAlign: 'center', padding: '20px', fontFamily: 'Arial, sans-serif', color: '#333' }}>
      {user ? (
        <>
          <h2 style={{ color: '#008080' }}>Projects</h2>
          <input
            type="text"
            placeholder="Search Projects"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ marginBottom: '10px', padding: '5px', fontFamily: 'Arial, sans-serif' }}
          />
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {filteredProjects.map((project) => (
              <li key={project.id} style={{ borderBottom: '1px solid #ccc', padding: '10px' }}>
                <strong>{project.title}</strong>
                <p style={{ marginTop: '5px' }}>{project.description}</p>
                <p style={{ color: '#888' }}>Tags: {project.tags.join(', ')}</p>
              </li>
            ))}
          </ul>
        </>
      ) : (
        <p style={{ color: '#888' }}>Please log in to view projects.</p>
      )}
    </div>
  );
};

export default ProjectList;

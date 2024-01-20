// src/components/ProjectForm.js
import React, { useState } from 'react';
import { addProject } from '../Firestore';

const ProjectForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState('');

  const handleAddProject = () => {
    const projectData = {
      title,
      description,
      tags: tags.split(',').map((tag) => tag.trim()),
    };
    addProject(projectData);
  };

  return (
    <div>
      <h2>Add Project</h2>
      <input type="text" placeholder="Project Title" onChange={(e) => setTitle(e.target.value)} />
      <textarea placeholder="Project Description" onChange={(e) => setDescription(e.target.value)} />
      <input type="text" placeholder="Tags (comma-separated)" onChange={(e) => setTags(e.target.value)} />
      <button onClick={handleAddProject}>Add Project</button>
    </div>
  );
};

export default ProjectForm;

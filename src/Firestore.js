// src/Firestore.js
import { firestore, auth } from './firebase';
import { getDocs, collection } from 'firebase/firestore';


export const getUserProfile = async () => {
  try {
    const user = auth.currentUser;
    if (user) {
      const userDoc = await firestore.collection('users').doc(user.uid).get();
      return userDoc.data();
    } else {
      console.error('User not authenticated');
      return null;
    }
  } catch (error) {
    console.error('Error getting user profile from Firestore:', error.message);
    return null;
  }
};

export const updateUserProfile = async (profileData) => {
  try {
    const user = auth.currentUser;
    if (user) {
      await firestore.collection('users').doc(user.uid).set(profileData, { merge: true });
      console.log('User profile updated in Firestore');
    } else {
      console.error('User not authenticated');
    }
  } catch (error) {
    console.error('Error updating user profile in Firestore:', error.message);
  }
};
export const addProject = async (projectData) => {
  try {
    const user = auth.currentUser;
    if (user) {
      const projectsCollection = firestore.collection('projects');
      await projectsCollection.add({
        ...projectData,
        userId: user.uid,
      });
      console.log('Project added to Firestore');
    } else {
      console.error('User not authenticated');
    }
  } catch (error) {
    console.error('Error adding project to Firestore:', error.message);
  }
};

export const fetchProjects = async () => {
  try {
    const projectsSnapshot = await firestore.collection('projects').get();
    const projects = projectsSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    return projects;
  } catch (error) {
    console.error('Error getting projects from Firestore:', error.message);
    return [];
  }
};

export const getUserProjects = async () => {
  try {
    const user = auth.currentUser;
    if (user) {
      const projectsSnapshot = await firestore
        .collection('projects')
        .where('userId', '==', user.uid)
        .get();
      const projects = projectsSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      return projects;
    } else {
      console.error('User not authenticated');
      return [];
    }
  } catch (error) {
    console.error('Error getting user projects from Firestore:', error.message);
    return [];
  }
};

export const getAllProjects = async () => {
  try {
    const projectsCollection = firestore.collection('projects');
    const projectsSnapshot = await getDocs(projectsCollection);
    const projects = projectsSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    return projects;
  } catch (error) {
    console.error('Error getting projects from Firestore:', error.message);
    return [];
  }
};
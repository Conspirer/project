// src/components/UserProfile.js
import React, { useState, useEffect } from 'react';
import { auth, firestore } from '../firebase';

const UserProfile = () => {
  const [userDetails, setUserDetails] = useState({
    displayName: '',
    bio: '',
    skills: '',
    socialMedia: '',
  });

  useEffect(() => {
    const fetchUserProfile = async () => {
      const user = auth.currentUser;
      if (user) {
        const userDoc = await firestore.collection('users').doc(user.uid).get();
        if (userDoc.exists) {
          setUserDetails(userDoc.data());
        }
      }
    };

    fetchUserProfile();
  }, []);

  const handleUpdateProfile = async () => {
    try {
      const user = auth.currentUser;
      if (user) {
        await firestore.collection('users').doc(user.uid).set(userDetails, { merge: true });
        console.log('User profile updated successfully');
      }
    } catch (error) {
      console.error('Error updating user profile:', error.message);
    }
  };

  const handleChange = (e) => {
    setUserDetails({
      ...userDetails,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div>
      <h2>Your Profile</h2>
      <label>
        Display Name:
        <input
          type="text"
          name="displayName"
          value={userDetails.displayName}
          onChange={handleChange}
        />
      </label>
      <label>
        Bio:
        <textarea name="bio" value={userDetails.bio} onChange={handleChange}></textarea>
      </label>
      <label>
        Skills:
        <input type="text" name="skills" value={userDetails.skills} onChange={handleChange} />
      </label>
      <label>
        Social Media:
        <input
          type="text"
          name="socialMedia"
          value={userDetails.socialMedia}
          onChange={handleChange}
        />
      </label>
      <button onClick={handleUpdateProfile}>Update Profile</button>
    </div>
  );
};

export default UserProfile;

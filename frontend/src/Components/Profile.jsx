// Profile.jsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Profile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Fetch user details when the component mounts
    fetchUserDetails();
  }, []);

  const fetchUserDetails = async () => {
    try {
      // Make a request to your backend API to fetch user details
      const response = await axios.get('/localhost:8000/api/user'); // Adjust the endpoint accordingly
      setUser(response.data); // Assuming response.data contains user details
    } catch (error) {
      console.error('Error fetching user details:', error);
    }
  };

  return (
    <div>
      <h2>Profile</h2>
      {user && (
        <div>
          <p><strong>Name:</strong> {user.firstName} {user.lastName}</p>
          <p><strong>Email:</strong> {user.email}</p>
          {/* Add more user details as needed */}
        </div>
      )}
    </div>
  );
};

export default Profile;

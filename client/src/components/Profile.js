import React from 'react';
import { Container } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext';


function Profile() {
  const { user } = useAuth();


  return (
    <Container>
      <h2>Welcome, {user.email}!</h2>
    </Container>
  );
}


export default Profile;
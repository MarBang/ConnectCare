import React, { useState } from 'react';
import { Form, Button, Container, Alert } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import './Login.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const { login } = useAuth();
  const navigate = useNavigate();

  const validateForm = () => {
  const newErrors = {};
  if (!email) newErrors.email = 'Email is required';
  else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = 'Email is invalid';

  if (!password) newErrors.password = 'Password is required';
  else if (password.length < 6) newErrors.password = 'Password must be at least 6 characters';
  return newErrors;
};

const handleSubmit = async (e) => {
  e.preventDefault();
  const formErrors = validateForm();
  if (Object.keys(formErrors).length > 0) {
    setErrors(formErrors);
  } else {
    setErrors({});
    try {
      await login({ email, password }); // call backend
      navigate('/profile');
    } catch (err) {
      setErrors({ form: err.message || 'Login failed' });
    }
  }
};

  return (
    <div className="login-wrapper">
      <Container className="login-container">
        <h2 className="login-title">Login</h2>
        {errors.form && <Alert variant="danger">{errors.form}</Alert>}
        <Form className="login-form" onSubmit={handleSubmit}>
          <Form.Group controlId="formEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="Enter email"
            />
          </Form.Group>
          <Form.Group controlId="formPassword" className="mt-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="Enter password"
              isInvalid={!!errors.password}
            />
            <Form.Control.Feedback type="invalid">
                {errors.password}
            </Form.Control.Feedback>
          </Form.Group>
          <Button type="submit" className="login-button mt-3">Login</Button>
        </Form>
      </Container>
    </div>
  );
}

export default Login;

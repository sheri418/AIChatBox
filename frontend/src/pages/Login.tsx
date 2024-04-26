import React from 'react';
import { IoIosLogIn } from 'react-icons/io';
import { useAuth } from '../context/AuthContext';
import { Box, Typography, TextField, Button, Link } from '@mui/material';
import {toast} from 'react-hot-toast';
const Login = () => {
  const auth =useAuth();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email");
    const password = formData.get("password");
    console.log(email, password);
    try {
      toast.loading("Signing In", { id: "login" });
      await auth?.login(email, password);
      toast.success("Signed In Successfully", { id: "login" });
    } catch (error) {
      console.log(error);

      toast.error("Signing In Failed", { id: "login" });
    }
    // You can perform further actions here, like sending the form data to a backend server
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
      }}
    >
      <Typography variant="h4" gutterBottom>
        Login
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit} // Attach handleSubmit to the onSubmit event of the form
        sx={{
          width: '300px',
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
          backgroundColor: '#f5f5f5', // Off-white background color
          padding: '20px',
          borderRadius: '10px',
          boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
        }}
      >
        <TextField
          name="email"
          label="Email"
          variant="outlined"
          fullWidth
          size="small"
          InputProps={{
            style: { backgroundColor: '#ffffff' }, // White background for input field
          }}
        />
        <TextField
          name="password"
          label="Password"
          type="password"
          variant="outlined"
          fullWidth
          size="small"
          InputProps={{
            style: { backgroundColor: '#ffffff' }, // White background for input field
          }}
        />
        <Button type="submit" variant="contained" fullWidth> {/* Make the button type="submit" */}
          Login
        </Button>
      </Box>
      <Typography variant="body2" mt={2}>
        Don't have an account?{' '}
        <Link href="/signup" color="primary">
          Sign Up
        </Link>
      </Typography>
    </Box>
  );
};

export default Login;

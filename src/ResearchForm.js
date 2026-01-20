import React, { useState } from 'react';
import { Box, TextField, Button, Typography } from '@mui/material';

function ResearchForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // TODO: Replace with your actual Google Form ID and entry IDs
    const GOOGLE_FORM_ACTION = 'https://docs.google.com/forms/d/e/1FAIpQLSf0qD3djMuQwOzSJWK_UV-HHD2k3KT0PEBVJG1iQhqAfmJgCQ/formResponse';

    const formDataEncoded = new FormData();
    formDataEncoded.append('entry.1717205639', formData.name);
    // formDataEncoded.append('entry.YOUR_EMAIL_FIELD_ID', formData.email);
    // formDataEncoded.append('entry.YOUR_MESSAGE_FIELD_ID', formData.message);

    try {
      await fetch(GOOGLE_FORM_ACTION, {
        method: 'POST',
        body: formDataEncoded,
        mode: 'no-cors'
      });
      setSubmitted(true);
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  if (submitted) {
    return (
      <Box sx={{ textAlign: 'center', py: 4 }}>
        <Typography variant="h5" sx={{ color: '#ffffff', mb: 2 }}>
          Thank you for your interest!
        </Typography>
        <Typography sx={{ color: '#b0b0b0', mb: 3 }}>
          We'll get back to you soon.
        </Typography>
        <Button
          variant="outlined"
          onClick={() => setSubmitted(false)}
          sx={{
            borderColor: '#ffffff',
            color: '#ffffff',
            '&:hover': {
              borderColor: '#e0e0e0',
              backgroundColor: 'rgba(255, 255, 255, 0.1)'
            }
          }}
        >
          Submit Another Response
        </Button>
      </Box>
    );
  }

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        maxWidth: '600px',
        mx: 'auto',
        p: 4
      }}
    >
      <Typography variant="h4" sx={{ color: '#ffffff', mb: 4, textAlign: 'center', fontWeight: '' }}>
        Join Our Research Team
      </Typography>

      <TextField
        fullWidth
        required
        name="name"
        label="Name"
        value={formData.name}
        onChange={handleChange}
        margin="normal"
        sx={{
          '& .MuiOutlinedInput-root': {
            color: '#ffffff',
            '& fieldset': {
              borderColor: '#666666',
            },
            '&:hover fieldset': {
              borderColor: '#999999',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#ffffff',
            },
          },
          '& .MuiInputLabel-root': {
            color: '#b0b0b0',
          },
          '& .MuiInputLabel-root.Mui-focused': {
            color: '#ffffff',
          },
        }}
      />

      <TextField
        fullWidth
        // required
        name="email"
        label="Email"
        type="email"
        value={formData.email}
        onChange={handleChange}
        margin="normal"
        sx={{
          '& .MuiOutlinedInput-root': {
            color: '#ffffff',
            '& fieldset': {
              borderColor: '#666666',
            },
            '&:hover fieldset': {
              borderColor: '#999999',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#ffffff',
            },
          },
          '& .MuiInputLabel-root': {
            color: '#b0b0b0',
          },
          '& .MuiInputLabel-root.Mui-focused': {
            color: '#ffffff',
          },
        }}
      />

      <TextField
        fullWidth
        // required
        name="message"
        label="Why do you want to join?"
        multiline
        rows={4}
        value={formData.message}
        onChange={handleChange}
        margin="normal"
        sx={{
          '& .MuiOutlinedInput-root': {
            color: '#ffffff',
            '& fieldset': {
              borderColor: '#666666',
            },
            '&:hover fieldset': {
              borderColor: '#999999',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#ffffff',
            },
          },
          '& .MuiInputLabel-root': {
            color: '#b0b0b0',
          },
          '& .MuiInputLabel-root.Mui-focused': {
            color: '#ffffff',
          },
        }}
      />

      <Button
        type="submit"
        variant="contained"
        fullWidth
        sx={{
          mt: 3,
          py: 1.5,
          backgroundColor: '#ffffff',
          color: '#0a0a0a',
          fontWeight: 'bold',
          fontSize: '1rem',
          '&:hover': {
            backgroundColor: '#e0e0e0',
          },
        }}
      >
        Submit
      </Button>
    </Box>
  );
}

export default ResearchForm;

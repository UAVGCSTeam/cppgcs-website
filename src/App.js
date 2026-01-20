import React, { useRef } from 'react';
import { AppBar, Toolbar, Typography, Box, Button } from '@mui/material';
import ResearchForm from './ResearchForm';
import './App.css';

function App() {
  const researchSectionRef = useRef(null);

  const scrollToResearch = () => {
    researchSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="App">
      {/* Header */}
      {/* <AppBar position="static" sx={{ backgroundColor: '#0a0a0a' }}> */}
      {/*   <Toolbar> */}
      {/*     <Typography variant="h5" component="div" sx={{ flexGrow: 1, fontWeight: 'bold' }}> */}
      {/*       Ground Control Station at Cal Poly Pomona */}
      {/*     </Typography> */}
      {/*   </Toolbar> */}
      {/* </AppBar> */}

      {/* Full-Width Banner */}
      <Box
        sx={{
          minHeight: 'calc(100vh - 64px)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          // backgroundColor: '#121212',
          backgroundImage: 'url(/banner2-small.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          color: '#e0e0e0',
          px: 4,
          textAlign: 'center'
        }}
      >
        <Typography
          variant="h2"
          component="h1"
          gutterBottom
          sx={{
            fontWeight: 'bold',
            lineHeight: 1,
            color: '#ffffff',
            mb: 4,
          }}
        >
          The Ground Control Station
        </Typography>
        <Typography
          variant="h3"
          component="h2"
          gutterBottom
          sx={{
            fontSize: '2rem',
            // fontWeight: 'bold',
            color: '#ffffff',
            mb: 4,
          }}
        >
          Cal Poly Pomona
        </Typography>
        <Typography
          variant="body1"
          sx={{
            fontSize: '1.05rem',
            lineHeight: 1.8,
            maxWidth: '800px',
            color: '#b0b0b0',
          }}
        >
          We’re building a modern, user friendly, ground control station for UAV research teams at Cal Poly Pomona. We aim to enable fleet control over UAV’s, for use cases within agriculture, surveyance, and defense.
        </Typography>

        <Typography
          variant="body1"
          sx={{
            fontSize: '1.05rem',
            lineHeight: 1.8,
            maxWidth: '800px',
            color: '#b0b0b0',
          }}
        >
          We operate using the industry standard agile framework, utilizing scrums and group meetings. The desktop application is supported by Qt's QML/C++ framework. Testing is done through ArduPilot and Gazebo simulations with connections through RF modules.
        </Typography>
        <Button
          variant="contained"
          onClick={scrollToResearch}
          sx={{
            backgroundColor: '#ffffff',
            color: '#0a0a0a',
            marginTop: '2.5rem',
            marginBottom: '2.5rem',
            fontWeight: 'bold',
            '&:hover': {
              backgroundColor: '#e0e0e0'
            }
          }}
        >
          Apply Now
        </Button>
      </Box>

      {/* Research Section */}
      <Box
        ref={researchSectionRef}
        sx={{
          // minHeight: '100vh',
          backgroundColor: '#1a1a1a',
          color: '#e0e0e0',
          py: 8,
          px: 4,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <ResearchForm />
      </Box>
    </div>
  );
}

export default App;

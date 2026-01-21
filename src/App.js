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
      {/*     <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 'bold' }}> */}
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
          Bee Control
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
          Ground control station at Cal Poly Pomona
        </Typography>
        {/* <Typography */}
        {/*   variant="body1" */}
        {/*   sx={{ */}
        {/*     fontSize: '1.05rem', */}
        {/*     lineHeight: 1.8, */}
        {/*     maxWidth: '800px', */}
        {/*     color: '#b0b0b0', */}
        {/*   }} */}
        {/* > */}
        {/*   We’re building a modern, user friendly, ground control station for UAV research teams at Cal Poly Pomona. We aim to enable fleet control over UAV’s, for use cases within agriculture, surveyance, and defense. */}
        {/* </Typography> */}
        {/**/}
        {/* <Typography */}
        {/*   variant="body1" */}
        {/*   sx={{ */}
        {/*     fontSize: '1.05rem', */}
        {/*     lineHeight: 1.8, */}
        {/*     maxWidth: '800px', */}
        {/*     color: '#b0b0b0', */}
        {/*   }} */}
        {/* > */}
        {/*   We operate using the industry standard agile framework, utilizing scrums and group meetings. The desktop application is supported by Qt's QML/C++ framework. Testing is done through ArduPilot and Gazebo simulations with connections through RF modules. */}
        {/* </Typography> */}
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
          Apply
        </Button>
      </Box>

      {/* Qualifications Section */}
      <Box
        sx={{
          minHeight: '20vh',
          backgroundColor: '#1a1a1a',
          color: '#e0e0e0',
          py: 8,
          px: 4
        }}
      >
        <Box sx={{ maxWidth: '900px', mx: 'auto' }}>
          {/* Job Qualifications */}
          {/* <Typography variant="h4" sx={{ color: '#ffffff', mb: 4, fontWeight: 'bold' }}> */}
          {/*   Position Overview */}
          {/* </Typography> */}
          <Typography variant="body1" sx={{ color: '#b0b0b0', mb: 4, lineHeight: 1.8 }}>
            {/* [Brief description of the research position and what team members will be working on] */}
            We are ____, a research team on campus working under Dr. Bhandari and funded by Lockheed Martin. Our team consists of mostly software and emedded engineers focusing to build an application and simulation service to UAV teams on campus. We aid teams in their missions by providing a multi-uav capable system to
          </Typography>
          <Typography variant="body1" sx={{ color: '#b0b0b0', mb: 4, lineHeight: 1.8 }}>
            We are currently recruiting students for the upcoming 2026 spring and fall semester to join the following sub-divisions and also possess the following skills:
          </Typography>

          <Typography variant="h6" sx={{ color: '#ffffff', mt: 5, mb: 3, fontWeight: 'bold' }}>
            Sub-Divisions
          </Typography>
          <Box component="ul" sx={{ color: '#b0b0b0', pl: 3, mb: 4 }}>
            <li style={{ marginBottom: '0.5rem' }}>UI Design</li>
            <li style={{ marginBottom: '0.5rem' }}>Backend</li>
            <li style={{ marginBottom: '0.5rem' }}>Simulation Testing and Research</li>
          </Box>

          <Typography variant="h6" sx={{ color: '#ffffff', mt: 5, mb: 3, fontWeight: 'bold' }}>
            Required Qualifications
          </Typography>
          <Box component="ul" sx={{ color: '#b0b0b0', pl: 3, mb: 4 }}>
            <li style={{ marginBottom: '0.5rem' }}>Strong teamworking and communication skills</li>
            <li style={{ marginBottom: '0.5rem' }}>Willingness to learn new tech stack and operational structures</li>
            <li style={{ marginBottom: '0.5rem' }}>Able to commit around 10 hours a week to this project</li>
            <li style={{ marginBottom: '0.5rem' }}>Experience with coding in C++ and Python (knowledge on ROS2 will be a plus)</li>
          </Box>

          <Typography variant="h6" sx={{ color: '#ffffff', mt: 5, mb: 3, fontWeight: 'bold' }}>
            Desired Qualifications
          </Typography>
          <Box component="ul" sx={{ color: '#b0b0b0', pl: 3, mb: 4 }}>
            <li style={{ marginBottom: '0.5rem' }}>Leadership</li>
            <li style={{ marginBottom: '0.5rem' }}>Documentation and Unit Testing</li>
          </Box>
        </Box>
      </Box>
      <Box
        ref={researchSectionRef}
        sx={{
          minHeight: '20vh',
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

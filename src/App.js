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
            // lineHeight: 1,
            color: '#ffffff',
            mb: 2,
          }}
        >
          CPP Ground Control
        </Typography>
        <Typography
          variant="h3"
          component="h2"
          gutterBottom
          sx={{
            fontSize: '2rem',
            // fontWeight: 'bold',
            color: '#ffffff',
            mb: 6,
          }}
        >
          Cal Poly Pomona
        </Typography>
        {/* <Typography */}
        {/*   sx={{ */}
        {/*     fontSize: '0.8rem', */}
        {/*     fontStyle: 'italic', */}
        {/*     // fontWeight: 'bold', */}
        {/*     color: '#ffffff', */}
        {/*     mb: 2, */}
        {/*   }} */}
        {/* > */}
        {/*   “Never regret thy fall, O Icarus of the fearless flight, for the greatest tragedy of them all is never to feel the burning light.” */}
        {/* </Typography> */}
        {/* <Typography */}
        {/*   gutterBottom */}
        {/*   sx={{ */}
        {/*     fontSize: '0.8rem', */}
        {/*     fontStyle: 'italic', */}
        {/*     // fontWeight: 'bold', */}
        {/*     color: '#ffffff', */}
        {/*     mb: 4, */}
        {/*   }} */}
        {/* > */}
        {/*   — Oscar Wilde */}
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
          py: 6,
          px: 4
        }}
      >
        <Box sx={{ maxWidth: '900px', mx: 'auto', paddingTop: 8 }}>
          <Typography variant="body1" sx={{ color: '#b0b0b0', mb: 4, lineHeight: 1.8 }}>
            We are ______, a research team on campus working under Dr. Bhandari and funded by Lockheed Martin. Our team is composed primarily of software and embedded systems engineers focused on building a ground control application and simulation service to support UAV teams on campus. We aid these teams in their missions by providing a multi-UAV-capable system with tools for planning, monitoring, and hosting coordinated multi-drone missions.
          </Typography>
          <Typography variant="body1" sx={{ color: '#b0b0b0', mb: 4, lineHeight: 1.8 }}>
            Each semester, we present our progress and technical milestones to Lockheed Martin engineers. As a team, we operate under the Agile Scrum methodology, holding regular working sessions, sprint meetings, and performance reviews to simulate a real-world software engineering environment. Members are able to gain hands-on experience working on sponsor-backed projects, collaborating in Agile teams, and developing software used by real UAV systems.
          </Typography>
          <Typography variant="body1" sx={{ color: '#b0b0b0', mb: 4, lineHeight: 1.8 }}>
            We welcome students from all academic years, offering roles that range from entry-level onboarding positions to leadership opportunities where members lead teams and work deeply within our core system architecture. This team is ideal for students interested in embedded systems, autonomy, and defense-related software.
          </Typography>
          <Typography variant="body1" sx={{ color: '#b0b0b0', mb: 4, lineHeight: 1.8 }}>
            We are currently recruiting students to join the following sub-divisions and also possess the following skills:
          </Typography>

          <Typography variant="h7" sx={{ color: '#ffffff', mt: 5, mb: 3, fontWeight: 'bold' }}>
            Sub-Divisions
          </Typography>
          <Box component="ul" sx={{ color: '#b0b0b0', pl: 3, mb: 4 }}>
            <li style={{ marginBottom: '0.5rem' }}>UI Design</li>
            <li style={{ marginBottom: '0.5rem' }}>Backend</li>
            <li style={{ marginBottom: '0.5rem' }}>Simulation Testing and Research</li>
          </Box>

          <Typography variant="h7" sx={{ color: '#ffffff', mt: 5, mb: 3, fontWeight: 'bold' }}>
            Required Qualifications
          </Typography>
          <Box component="ul" sx={{ color: '#b0b0b0', pl: 3, mb: 4 }}>
            <li style={{ marginBottom: '0.5rem' }}>Strong teamworking and communication skills</li>
            <li style={{ marginBottom: '0.5rem' }}>Willingness to learn new tech stack and operational structures</li>
            <li style={{ marginBottom: '0.5rem' }}>Able to commit around 10 hours a week to this project</li>
            <li style={{ marginBottom: '0.5rem' }}>Experience with coding in C++ and Python (knowledge on ROS2 will be a plus)</li>
          </Box>

          <Typography variant="h7" sx={{ color: '#ffffff', mt: 5, mb: 3, fontWeight: 'bold' }}>
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
          py: 6,
          px: 4,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <ResearchForm />
      </Box>

    </div>
  );
}

export default App;

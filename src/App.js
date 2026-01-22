import React, { useRef } from 'react';
import { AppBar, Toolbar, Typography, Box, Button } from '@mui/material';
import ResearchForm from './ResearchForm';
import './App.css';
import ImageCarouselSection from "./ImageCarouselSection";
import ScrollHint from './ScrollHint';
import IconSection from './IconSection';
import { useEffect, useState } from "react";

import img1 from './/assets/images/TeamImage.jpg';
import img2 from './/assets/images/badparking.jpg';
import img3 from './/assets/images/carlosFlight.jpg';
import img4 from './/assets/images/flyingImage.jpg';
import img5 from './/assets/images/TeamImage1.jpg';
import img6 from './/assets/images/viewingJet.jpg';
import img7 from './/assets/images/Peanuts.jpg';
import scrollArrow from './assets/images/scrollArrow.png';

// Tool Icon Images
import cpp from './assets/brand-logos/cppIcon.svg';
import discord from './assets/brand-logos/discordIcon.svg';
import github from './assets/brand-logos/github-whiteIcon.svg';
import notion from './assets/brand-logos/notionIcon.svg';
import figma from './assets/brand-logos/figmaIcon.svg';
import raspberrypi from './assets/brand-logos/raspberryPiIcon.svg';


const images = [
  { src: img1, alt: "Team Image" },
  { src: img5, alt: "Team Image 1" },
  { src: img3, alt: "Carlos Flight" },
  { src: img4, alt: "Flying Image" },
  { src: img6, alt: "Viewing Jet" },
  { src: img2, alt: "Bad Parking" },
  { src: img7, alt: "Peanuts" },
];
const icons = [
  { src: cpp, alt: "C++" },
  { src: discord, alt: "Discord" },
  { src: github, alt: "GitHub" },
  { src: notion, alt: "Notion" },
  { src: figma, alt: "Figma" },
  { src: raspberrypi, alt: "Raspberry Pi" },
];


function App() {
  const nextSectionRefScroll = React.useRef(null);

  const researchSectionRef = useRef(null);

  const scrollToResearch = () => {
    researchSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  const [atTop, setAtTop] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setAtTop(window.scrollY < 10);
    };

    // run once on mount
    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);


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
          Apply now!
        </Button>
      </Box>
      {atTop && (
        <ScrollHint imageSrc={scrollArrow}
          sx={{
            opacity: atTop ? 1 : 0,
            pointerEvents: atTop ? "auto" : "none",
            transition: "opacity 1s ease",
          }}
          onClick={() => nextSectionRefScroll.current?.scrollIntoView({ behavior: "smooth" })}
        />
      )}


      <Box ref={nextSectionRefScroll}>
        {/* Spacer */}
        <Box sx={{ height: '4vh', backgroundColor: '#0a0a0a' }} />

        {/* Main container */}
        <Box
          sx={{
            display: 'flex',
            width: '100%',
            minHeight: '40vh',
            backgroundColor: '#0a0a0a',
          }}
        >
          {/*Left box – text
          <Box
            sx={{
              flex: 1,
              padding: 4,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              color: '#ffffff',
            }}
          >
            <Box sx={{ fontSize: '2rem', fontWeight: 600, mb: 2 }}>
              Diving into the Team
            </Box>
            <Box sx={{ fontSize: '1rem', lineHeight: 1.6 }}>
              We are all Cal Poly Students passionate about UAVs and software engineering! But mostly, are looking to get real world experiences, create memories, and have a great time. Join us to be a part of an amazing team and work on cutting-edge technology in the field of UAVs!
            </Box>
          </Box>}

          {/* Right box – image */}
          <Box
            sx={{
              flex: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: 4,
            }}
          >
            <ImageCarouselSection
              images={images}
              title="Diving into the Team!"
              text="We are all Cal Poly Students passionate about UAVs and software engineering! But mostly, are looking to get real world experiences, create memories, and have a great time. Join us to be a part of an amazing team and work on cutting-edge technology in the field of UAVs!"
              autoplay={true}
              interval={3500}
              height="45vh"
            />
          </Box>
        </Box>
        <Box
          sx={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 4,
            backgroundColor: '#0a0a0a',
            paddingBottom: 10,
          }}>
          <IconSection
            title="Our Toolbox!"
            text="Here is a list of all of the tools and skills that we are using within our team. While different sections of our team deal with various tools, as a member you will have the ability to learn and gain exposure to industry standard tools!"
            icons={icons}
            iconSize={70}
          />;
        </Box>
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
          <Typography variant="h7" sx={{ color: '#ffffff', mt: 5, mb: 3, fontWeight: 'bold', fontSize: '1.5rem' }}>
            Team Member Description
          </Typography>

          {/* <Typography variant="body1" sx={{ color: '#b0b0b0', mb: 4, lineHeight: 1.8 }}>
            We are ______, a research team on campus working under Dr. Bhandari and funded by Lockheed Martin. Our team is composed primarily of software and embedded systems engineers focused on building a ground control application and simulation service to support UAV teams on campus. We aid these teams in their missions by providing a multi-UAV-capable system with tools for planning, monitoring, and hosting coordinated multi-drone missions.
          </Typography> */}
          <Typography variant="body1" sx={{ color: '#b0b0b0', mt: 3, mb: 4, lineHeight: 1.8 }}>
            We welcome students from all academic years, offering roles that range from entry-level onboarding positions to leadership opportunities where members lead teams and work deeply within our core system architecture. This team is ideal for students interested in embedded systems, autonomy, and defense-related software.
          </Typography>
          <Typography variant="body1" sx={{ color: '#b0b0b0', mb: 4, lineHeight: 1.8 }}>
            Each semester, we present our progress and technical milestones to Lockheed Martin engineers. As a team, we operate under the Agile Scrum methodology, holding regular working sessions, sprint meetings, and performance reviews to simulate a real-world software engineering environment. Members are able to gain hands-on experience working on sponsor-backed projects, collaborating in Agile teams, and developing software used by real UAV systems.
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

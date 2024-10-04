import { Box } from "@mui/material";
import React from "react";

interface aboutProps {
  title: string;
  description: string;
}
const About = ({ title, description }: aboutProps) => {
  return (
    <Box>
      <h1>{title}</h1>
      <p>{description}</p>
    </Box>
  );
};

export default About;

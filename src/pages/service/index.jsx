import React from "react";
import {
  Container,
  Box,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  CardMedia,
} from "@mui/material";

const services = [
  {
    title: "Web Development",
    description: "We build responsive and high-quality web applications.",
    image: "https://via.placeholder.com/300x200?text=Web+Development",
  },
  {
    title: "Mobile Development",
    description:
      "We create mobile apps that provide a seamless user experience.",
    image: "https://via.placeholder.com/300x200?text=Mobile+Development",
  },
  {
    title: "UI/UX Design",
    description: "We design user-friendly and visually appealing interfaces.",
    image: "https://via.placeholder.com/300x200?text=UI%2FUX+Design",
  },
];

const Index = () => {
  return (
    <div>
      {/* Hero Section */}
      <Box
        sx={{
          height: "50vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          bgcolor: "secondary.main",
          color: "white",
          textAlign: "center",
          p: 2,
        }}
      >
        <Typography variant="h2" component="h1" gutterBottom>
          Our Services
        </Typography>
        <Typography variant="h5" component="p" gutterBottom>
          We offer a wide range of services to meet your needs.
        </Typography>
      </Box>

      {/* Services Grid */}
      <Container sx={{ my: 4 }}>
        <Grid container spacing={4}>
          {services.map((service, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Card>
                <CardMedia
                  component="img"
                  height="140"
                  image={service.image}
                  alt={service.title}
                />
                <CardContent>
                  <Typography variant="h5" component="div">
                    {service.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {service.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Call-to-Action Section */}
      <Box
        sx={{
          bgcolor: "primary.main",
          color: "white",
          py: 4,
          textAlign: "center",
        }}
      >
        <Typography variant="h4" component="h2" gutterBottom>
          Ready to Get Started?
        </Typography>
        <Typography variant="h6" component="p" gutterBottom>
          Contact us today to discuss your project requirements.
        </Typography>
        <Button variant="contained" color="secondary" size="large">
          Contact Us
        </Button>
      </Box>
    </div>
  );
};

export default Index;

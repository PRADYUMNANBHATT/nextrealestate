import Image from "next/image";
// import styles from "./page.module.css";
import { Box, Typography } from "@mui/material";
import bg from "./images/banner.webp";

// const styles = {
//   paperContainer: {
//     backgroundImage: `url(${bg})`,
//     backgroundRepeat: "no-repeat",
//     backgroundSize: "cover",
//   },
// };
export default function Home() {
  return (
    <>
      <Box
        display={"flex"}
        width={"100vw"}
        height={"100vh"}
        sx={{
          position: "relative",

          height: "100vh",
          width: "100vw",
          display: "flex",
          alignContent: "center",
          justifyContent: "center",
          alignItems: "center",
          paddingRight: "10%",
          paddingLeft: "10%",
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundImage:
              "linear-gradient(to top, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5))",
            zIndex: 1,
          },
        }}
        // style={styles.paperContainer}
      >
        <Image src={bg} alt="hero" style={{ objectFit: "cover" }} />
        <Typography
          variant="h1"
          sx={{ color: "white", fontWeight: "bold", position: "absolute" }}
        >
          Title
        </Typography>
        <Typography
          variant="body2"
          sx={{
            color: "white",
            bottom: "10px",
            mt: 0,
            mb: 4,
            fontSize: "20px",
            position: "absolute",
          }}
        >
          Sub-title
        </Typography>
      </Box>
    </>
  );
}

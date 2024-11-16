import { Box } from "@mui/material";
import React from "react";
import PacmanLoader from "react-spinners/PacmanLoader";

const Loader = () => {
  return (
    <Box
      sx={{
        height: "100vh",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <PacmanLoader color="#c0f1ed" margin={2} size={25} speedMultiplier={1} />
    </Box>
  );
};

export default Loader;

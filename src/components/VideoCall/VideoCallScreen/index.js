import React from "react";
import {
  Button,
  Grid,
  Typography,
  FormControl,
  RadioGroup,
  FormControlLabel,
  FormLabel,
  Radio,
  Chip,
  useMediaQuery,
  Avatar,
} from "@mui/material";
import Box from "@mui/material/Box";
import ProductCard from "../../Dashboard/ProductCard";
import { useTheme } from "@mui/material/styles";

const Index = () => {
  const radioButton = [
    { name: "cat", quantity: 12 },
    { name: "Dog", quantity: 2 },
    { name: "Others", quantity: 32 },
  ];

  const theme = useTheme();
  const tabView = useMediaQuery(theme.breakpoints.up("sm"));
  const mobileView = useMediaQuery(theme.breakpoints.up("xs"));
  const LapTopView = useMediaQuery(theme.breakpoints.up("md"));
  return (
    <Box>
      <Box
        sx={{
          width: "100%",
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <img
          src={"/images/video_call_full_bg.svg"}
          alt={"banner"}
          style={{
            width: "100%",
            height: "auto",
          }}
        />
        {/* <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "flex-start",
            flexDirection: "column",
            position: "absolute",
            zIndex: 5,
            top: 0,
            width: "100%",
            height: "100%",
            pl: (tabView||LapTopView)?5:2,
          }}
        >
          <img src='/images/video_call_time.svg' style={{
                                    width: '15%',
                                    height: 'auto',
                                }}/>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "flex-start",
            flexDirection: "column",
            position: "absolute",
            zIndex: 5,
            top: -100,
            width: "100%",
            height: "100%",
            pl: (tabView||LapTopView)?5:2,
          }}
        >
          <img src='/images/full_screen.svg' style={{
                                    width: '5%',
                                    height: 'auto',
                                }}/>
        </Box> */}
      </Box>
    </Box>
  );
};

export default Index;
    
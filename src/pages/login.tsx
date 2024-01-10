import React, { useState } from "react";
import {
  Typography,
  AppBar,
  Container,
  TextField,
  Button,
  Box,
  FormControlLabel,
  Checkbox,
  CssBaseline,
  Snackbar,
} from "@mui/material";
import { useRouter } from "next/router";
import { useSetRecoilState } from "recoil";
import { userState } from "@/store/atoms";
import axios from "axios";
import { BASE_URL } from "@/config";

const Login = () => {
  //------------------------------VARIABLES------------------------------//
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const setUser = useSetRecoilState(userState);
  const router = useRouter();

  //------------------------------HANDLERS------------------------------//
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.target.name == "email"
      ? setEmail(e.target.value)
      : setPassword(e.target.value);
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post(`${BASE_URL}admin/login`, {
        email: email,
        password: password,
      });

      const responseData = response.data;
      if (responseData.message === "Logged in successfully") {
        const token = responseData.token;
        localStorage.setItem("token", token);
        setUser({ userEmail: email });
        router.push("/courses");
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        // Now TypeScript knows that error is an AxiosError
        if (
          error.response &&
          error.response.status === 400 &&
          error.response.data.message === "Admin already exists!"
        ) {
          setOpenSnackbar(true);
          setTimeout(() => {
            router.push("/login");
          }, 3000);
        }
      } else {
        // Handle non-Axios errors here
        console.error("An unexpected error occurred:", error);
      }
    }
  };

  //------------------------------COMPONENTS------------------------------//
  return (
    <Container
      maxWidth="sm"
      component={Box}
      boxShadow={3}
      bgcolor="white"
      mt={8}
      p={3}
      borderRadius={2}
    >
      <CssBaseline />
      <Snackbar
        open={openSnackbar}
        autoHideDuration={5000}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        ContentProps={{
          style: {
            backgroundColor: "#004d40",
            color: "white",
            borderRadius: "8px",
          },
        }}
        message="Please Sign in first !!!"
        action={
          <Button
            size="small"
            style={{ color: "#009688" }}
            onClick={() => setOpenSnackbar(false)}
          >
            Close
          </Button>
        }
      />
      <AppBar
        position="relative"
        elevation={0}
        style={{
          background: "linear-gradient(45deg, #009688, #004d40)",
          marginBottom: "2rem",
          borderRadius: "8px 8px 0 0",
          boxShadow: "none",
        }}
      >
        <Typography
          variant="h5"
          component="div"
          sx={{ fontWeight: "bold", py: 1, px: 2 }}
        >
          Log In
        </Typography>
      </AppBar>

      <Box mb={3}>
        <Typography variant="subtitle1" fontWeight="medium" mb={1}>
          Enter your Email
        </Typography>
        <TextField
          name="email"
          id="email-input"
          label="Email"
          fullWidth
          variant="outlined"
          sx={{ mb: 2 }}
          onChange={handleChange}
        />
      </Box>

      <Box mb={3}>
        <Typography variant="subtitle1" fontWeight="medium" mb={1}>
          Enter your Password
        </Typography>
        <TextField
          name="password"
          id="password-input"
          label="Password"
          fullWidth
          variant="outlined"
          type="password"
          onChange={handleChange}
        />
      </Box>

      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={3}
      >
        <FormControlLabel
          control={<Checkbox color="primary" />}
          label="Remember Me"
        />
      </Box>

      <Button
        variant="contained"
        fullWidth
        size="large"
        style={{
          backgroundColor: "#009688",
          color: "white",
        }}
        onClick={handleSubmit}
      >
        Log In
      </Button>
    </Container>
  );
};

export default Login;

import { useEffect } from "react";
import { Typography, AppBar, useTheme, Button } from "@mui/material";
import { useRouter } from "next/router";
import Link from "next/link";
import logo from "/fevicon.png";
import Image from "next/image.js";
import userState from "@/store/atoms/courses";
import { useRecoilState } from "recoil";
import axios from "axios";
import { BASE_URL } from "@/config";

const Header = () => {
  //------------------------------VARIABLES------------------------------//
  const theme = useTheme();
  const router = useRouter();
  // const [email, setEmail] = useState(null);
  const [user, setUser] = useRecoilState(userState);

  //------------------------------HANDLERS------------------------------//

  // to populate the array with email
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`${BASE_URL}admin/me`, {
          headers: {
            authorization: "Bearer " + localStorage.getItem("token"),
          },
        });

        const responseData = response.data;
        if (responseData.email != null) {
          setUser({ email: responseData.email });
        }
      } catch (error) {}
    };

    fetchUser();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  //------------------------------COMPONENTS------------------------------//
  return (
    <div>
      <AppBar
        position="static"
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          padding: ".5rem 1rem",
          background: "linear-gradient(45deg, #009688, #004d40)", // gradient background
          boxShadow: theme.shadows[5],
          transition: "all 0.3s", // smooth transition for hover effects
          "&:hover": {
            transform: "scale(1.02)", // subtle scale on hover
          },
        }}
      >
        <div
          className="companyLogo"
          style={{
            display: "flex",
            alignItems: "center",
            gap: ".5rem", // gap between items
          }}
        >
          <Image
            src="/favicon.png"
            alt="Company Logo"
            style={{
              width: "3rem",
              height: "100%",
              objectFit: "contain",
              borderRadius: "20%", // circular logo
              boxShadow: theme.shadows[3], // add shadow
              cursor: "pointer",
            }}
            onClick={() => {
              // if (localStorage.getItem("token") != null) {
              //   navigate("/courses");
              // } else {
              router.push("/");
            }}
          />
          <Typography
            align="center"
            ml={1}
            variant="h5"
            color="white"
            style={{
              fontSize: "1.5rem",
              fontWeight: "500",
            }}
          >
            Course Lelo
          </Typography>
        </div>
        {user.email == null ? (
          <div className="signinButtons">
            <Link to="/signup">
              <Button
                size="large"
                variant="filled"
                style={{
                  backgroundColor: "#002D23",
                }}
              >
                SignUp
              </Button>
            </Link>
            <Link to="/login">
              <Button
                size="large"
                variant="filled"
                style={{
                  backgroundColor: "#002D23",
                  marginInline: "1rem 2rem",
                }}
              >
                Login
              </Button>
            </Link>
          </div>
        ) : (
          <div
            className="logOutButtons"
            style={{ display: "flex", alignItems: "center" }}
          >
            <Typography
              align="center"
              mr={1}
              variant="h5"
              color="white"
              style={{
                fontSize: "1.2rem",
                fontWeight: "500",
              }}
            >
              {user.email}
            </Typography>
            <Button
              size="large"
              variant="filled"
              style={{
                backgroundColor: "#002D23",
              }}
              onClick={handleLogout}
            >
              Log out
            </Button>
          </div>
        )}
      </AppBar>
    </div>
  );
};

export default Header;

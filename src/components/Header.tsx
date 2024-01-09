import { useEffect } from "react";
import { Typography, AppBar, useTheme, Button } from "@mui/material";
import { useRouter } from "next/router";
import Link from "next/link";
import logo from "/fevicon.png";
import Image from "next/image";
import { userState } from "@/store/atoms/";
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
  // useEffect(() => {
  //   const fetchUser = async () => {
  //     try {
  //       const response = await axios.get(`${BASE_URL}admin/me`, {
  //         headers: {
  //           authorization: "Bearer " + localStorage.getItem("token"),
  //         },
  //       });

  //       const responseData = response.data;
  //       if (responseData.email != null) {
  //         setUser({ email: responseData.email });
  //       }
  //     } catch (error) {}
  //   };

  //   fetchUser();
  // }, []);

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
            src="/fevicon.png"
            alt="Company Logo"
            width={100}
            height={100}
            quality={100}
            priority={true}
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
              fontFamily: "Roboto",
            }}
          >
            Course Lelo
          </Typography>
        </div>
        {user.userEmail == null ? (
          <div className="signinButtons">
            <Link href="/signup">
              <Button
                size="large"
                style={{
                  color: "white",
                  backgroundColor: "#002D23",
                }}
              >
                SignUp
              </Button>
            </Link>
            <Link href="/login">
              <Button
                size="large"
                style={{
                  color: "white",
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
              {user.userEmail}
            </Typography>
            <Button
              size="large"
              style={{
                color: "white",
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

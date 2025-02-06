import { useState } from "react";
import {
  Box,
  IconButton,
  InputBase,
  Typography,
  Select,
  MenuItem,
  FormControl,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import {
  Search,
  Message,
  DarkMode,
  LightMode,
  Notifications,
  Help,
  Menu,
  Close,
} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { setMode, setLogout } from "state";
import { useNavigate } from "react-router-dom";
import FlexBetween from "components/FlexBetween";

const Navbar = () => {
  const [isMobileMenuToggled, setIsMobileMenuToggled] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");

  const theme = useTheme();
  const neutralLight = theme.palette.neutral.light;
  const dark = theme.palette.neutral.dark;
  const background = theme.palette.background.default;
  const primaryLight = theme.palette.primary.light;
  const alt = theme.palette.background.alt;

  const fullName = `${user.firstName} ${user.lastName}`;

  return (
    <FlexBetween
      padding="1rem 6%"
      backgroundColor={alt}
      data-cy="navbar-container"
    >
      <FlexBetween gap="1.75rem" data-cy="navbar-logo-search">
        <Typography
          fontWeight="bold"
          fontSize="clamp(1rem, 2rem, 2.25rem)"
          color="primary"
          onClick={() => navigate("/home")}
          sx={{
            "&:hover": {
              color: primaryLight,
              cursor: "pointer",
            },
          }}
          data-cy="navbar-logo"
        >
          Sociopedia
        </Typography>
        {isNonMobileScreens && (
          <FlexBetween
            backgroundColor={neutralLight}
            borderRadius="9px"
            gap="3rem"
            padding="0.1rem 1.5rem"
            data-cy="navbar-search"
          >
            <InputBase placeholder="Search..." data-cy="navbar-search-input" />
            <IconButton data-cy="navbar-search-button">
              <Search />
            </IconButton>
          </FlexBetween>
        )}
      </FlexBetween>

      {/* DESKTOP NAV */}
      {isNonMobileScreens ? (
        <FlexBetween gap="2rem" data-cy="navbar-desktop-nav">
          <IconButton
            onClick={() => dispatch(setMode())}
            data-cy="navbar-theme-toggle"
          >
            {theme.palette.mode === "dark" ? (
              <DarkMode sx={{ fontSize: "25px" }} />
            ) : (
              <LightMode sx={{ color: dark, fontSize: "25px" }} />
            )}
          </IconButton>
          <Message sx={{ fontSize: "25px" }} data-cy="navbar-message-icon" />
          <Notifications
            sx={{ fontSize: "25px" }}
            data-cy="navbar-notifications-icon"
          />
          <Help sx={{ fontSize: "25px" }} data-cy="navbar-help-icon" />
          <FormControl
            variant="standard"
            value={fullName}
            data-cy="navbar-user-menu"
          >
            <Select
              value={fullName}
              sx={{
                backgroundColor: neutralLight,
                width: "150px",
                borderRadius: "0.25rem",
                p: "0.25rem 1rem",
                "& .MuiSvgIcon-root": {
                  pr: "0.25rem",
                  width: "3rem",
                },
                "& .MuiSelect-select:focus": {
                  backgroundColor: neutralLight,
                },
              }}
              input={<InputBase />}
            >
              <MenuItem value={fullName} data-cy="navbar-user-menu-name">
                <Typography>{fullName}</Typography>
              </MenuItem>
              <MenuItem
                onClick={() => dispatch(setLogout())}
                data-cy="navbar-logout-button"
              >
                Log Out
              </MenuItem>
            </Select>
          </FormControl>
        </FlexBetween>
      ) : (
        <IconButton
          onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}
          data-cy="navbar-mobile-menu-toggle"
        >
          <Menu />
        </IconButton>
      )}

      {/* MOBILE NAV */}
      {!isNonMobileScreens && isMobileMenuToggled && (
        <Box
          position="fixed"
          right="0"
          bottom="0"
          height="100%"
          zIndex="10"
          maxWidth="500px"
          minWidth="300px"
          backgroundColor={background}
          data-cy="navbar-mobile-menu"
        >
          {/* CLOSE ICON */}
          <Box
            display="flex"
            justifyContent="flex-end"
            p="1rem"
            data-cy="navbar-mobile-close"
          >
            <IconButton
              onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}
            >
              <Close />
            </IconButton>
          </Box>

          {/* MENU ITEMS */}
          <FlexBetween
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            gap="3rem"
            data-cy="navbar-mobile-items"
          >
            <IconButton
              onClick={() => dispatch(setMode())}
              sx={{ fontSize: "25px" }}
              data-cy="navbar-mobile-theme-toggle"
            >
              {theme.palette.mode === "dark" ? (
                <DarkMode sx={{ fontSize: "25px" }} />
              ) : (
                <LightMode sx={{ color: dark, fontSize: "25px" }} />
              )}
            </IconButton>
            <Message
              sx={{ fontSize: "25px" }}
              data-cy="navbar-mobile-message-icon"
            />
            <Notifications
              sx={{ fontSize: "25px" }}
              data-cy="navbar-mobile-notifications-icon"
            />
            <Help sx={{ fontSize: "25px" }} data-cy="navbar-mobile-help-icon" />
            <FormControl
              variant="standard"
              value={fullName}
              data-cy="navbar-mobile-user-menu"
            >
              <Select
                value={fullName}
                sx={{
                  backgroundColor: neutralLight,
                  width: "150px",
                  borderRadius: "0.25rem",
                  p: "0.25rem 1rem",
                  "& .MuiSvgIcon-root": {
                    pr: "0.25rem",
                    width: "3rem",
                  },
                  "& .MuiSelect-select:focus": {
                    backgroundColor: neutralLight,
                  },
                }}
                input={<InputBase />}
              >
                <MenuItem value={fullName} data-cy="navbar-mobile-user-name">
                  <Typography>{fullName}</Typography>
                </MenuItem>
                <MenuItem
                  onClick={() => dispatch(setLogout())}
                  data-cy="navbar-mobile-logout-button"
                >
                  Log Out
                </MenuItem>
              </Select>
            </FormControl>
          </FlexBetween>
        </Box>
      )}
    </FlexBetween>
  );
};

export default Navbar;


import { useState } from "react";
import { setLogin } from "state"; // or wherever the action is defined

import {
  Box,
  Button,
  TextField,
  useMediaQuery,
  Typography,
  useTheme,
} from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import Dropzone from "react-dropzone";
import FlexBetween from "components/FlexBetween";

const registerSchema = yup.object().shape({
  firstName: yup.string().required("First name is required"),
  lastName: yup.string().required("Last name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().required("Password is required"),
  location: yup.string().required("Location is required"),
  occupation: yup.string().required("Occupation is required"),
  picture: yup.mixed().required("Profile picture is required"),
});

const loginSchema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().required("Password is required"),
});

const initialValuesRegister = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  location: "",
  occupation: "",
  picture: "",
};

const initialValuesLogin = {
  email: "",
  password: "",
};

const Form = () => {
  const [pageType, setPageType] = useState("login"); // Login form is shown by default
  const { palette } = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const isLogin = pageType === "login";
  const isRegister = pageType === "register";

  const [loginError, setLoginError] = useState(null);
  const [registerError, setRegisterError] = useState(null);

  // Handle Registration
  const register = async (values, onSubmitProps) => {
    setRegisterError(null); // Reset register error
    try {
      const formData = new FormData();
      for (let value in values) {
        formData.append(value, values[value]);
      }
      formData.append("picturePath", values.picture.name);

      const response = await fetch("http://localhost:3001/auth/register", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        setPageType("login");
        onSubmitProps.resetForm();
      } else {
        if (data.error === "Email already registered") {
          setRegisterError("This email is already registered.");
        } else {
          setRegisterError("Registration failed. Please check your inputs.");
        }
      }
    } catch (error) {
      setRegisterError("Something went wrong. Please try again.");
    }
  };

  // Handle Login
  const login = async (values, onSubmitProps) => {
    setLoginError(null); // Reset login error
    try {
      const response = await fetch("http://localhost:3001/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      const data = await response.json();

      if (response.ok) {
        dispatch(setLogin({ user: data.user, token: data.token }));
        navigate("/home");
        onSubmitProps.resetForm();
      } else {
        if (data.msg === "Invalid credentials. ") {
          setLoginError("Invalid credentials.");
        } else if (data.msg === "User does not exist.") {
          setLoginError("User not found. Please register.");
        } else {
          setLoginError("Login failed. Please check your credentials.");
        }
      }
    } catch (error) {
      setLoginError("Something went wrong. Please try again.");
    }
  };

  const handleFormSubmit = async (values, onSubmitProps) => {
    // Manually mark all fields as touched before submit to trigger validation
    for (const field in values) {
      onSubmitProps.setFieldTouched(field, true, false); // Mark all fields as touched
    }

    // Check if there are any validation errors
    if (isLogin) {
      await login(values, onSubmitProps);
    }
    if (isRegister) {
      await register(values, onSubmitProps);
    }
  };

  return (
    <Formik
      onSubmit={handleFormSubmit}
      initialValues={isLogin ? initialValuesLogin : initialValuesRegister}
      validationSchema={isLogin ? loginSchema : registerSchema}
      validateOnSubmit={true} // Enable validation on submit
      validateOnBlur={true} // Enable validation on blur to show errors
      validateOnChange={true} // Enable validation on change to show errors immediately
    >
      {({
        values,
        errors,
        touched,
        handleBlur,
        handleChange,
        handleSubmit,
        setFieldValue,
        resetForm,
        isValid,
        dirty,
        setFieldTouched,
      }) => (
        <form onSubmit={handleSubmit}>
          <Box
            display="grid"
            gap="30px"
            gridTemplateColumns="repeat(4, minmax(0, 1fr))"
            sx={{
              "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
            }}
          >
            {isRegister && (
              <>
                <TextField
                  label="First Name *"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.firstName}
                  name="firstName"
                  error={Boolean(touched.firstName) && Boolean(errors.firstName)}
                  helperText={touched.firstName && errors.firstName}
                  sx={{ gridColumn: "span 2" }}
                  inputProps={{ "data-cy": "first-name-input" }} // Added data-cy
                />
                <TextField
                  label="Last Name *"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.lastName}
                  name="lastName"
                  error={Boolean(touched.lastName) && Boolean(errors.lastName)}
                  helperText={touched.lastName && errors.lastName}
                  sx={{ gridColumn: "span 2" }}
                  inputProps={{ "data-cy": "last-name-input" }} // Added data-cy
                />
                <TextField
                  label="Location *"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.location}
                  name="location"
                  error={Boolean(touched.location) && Boolean(errors.location)}
                  helperText={touched.location && errors.location}
                  sx={{ gridColumn: "span 4" }}
                  inputProps={{ "data-cy": "location-input" }} // Added data-cy
                />
                <TextField
                  label="Occupation *"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.occupation}
                  name="occupation"
                  error={Boolean(touched.occupation) && Boolean(errors.occupation)}
                  helperText={touched.occupation && errors.occupation}
                  sx={{ gridColumn: "span 4" }}
                  inputProps={{ "data-cy": "occupation-input" }} // Added data-cy
                />
                <Box
                  gridColumn="span 4"
                  border={`1px solid ${palette.neutral.medium}`}
                  borderRadius="5px"
                  p="1rem"
                >
                  <Dropzone
                    acceptedFiles=".jpg,.jpeg,.png"
                    multiple={false}
                    onDrop={(acceptedFiles) =>
                      setFieldValue("picture", acceptedFiles[0])
                    }
                  >
                    {({ getRootProps, getInputProps }) => (
                      <Box
                        {...getRootProps()}
                        border={`2px dashed ${palette.primary.main}`}
                        p="1rem"
                        sx={{ "&:hover": { cursor: "pointer" } }}
                        data-cy="dropzone" // Added data-cy
                      >
                        <input {...getInputProps()} />
                        {!values.picture ? (
                          <p>Add Picture Here</p>
                        ) : (
                          <FlexBetween>
                            <Typography>{values.picture.name}</Typography>
                          </FlexBetween>
                        )}
                      </Box>
                    )}
                  </Dropzone>
                </Box>
              </>
            )}

            <TextField
              label="Email *"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.email}
              name="email"
              error={Boolean(touched.email) && Boolean(errors.email)}
              helperText={touched.email && errors.email}
              sx={{ gridColumn: "span 4" }}
              inputProps={{ "data-cy": "email-input" }} // Added data-cy
            />
            <TextField
              label="Password *"
              type="password"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.password}
              name="password"
              error={Boolean(touched.password) && Boolean(errors.password)}
              helperText={touched.password && errors.password}
              sx={{ gridColumn: "span 4" }}
              inputProps={{ "data-cy": "password-input" }} // Added data-cy
            />
          </Box>

          {isRegister && registerError && (
            <Typography color="error" sx={{ textAlign: "center" }} data-cy="register-error">
              {registerError}
            </Typography>
          )}
          {isLogin && loginError && (
            <Typography color="error" sx={{ textAlign: "center" }} data-cy="login-error">
              {loginError}
            </Typography>
          )}

          <Box>
            <Button
              fullWidth
              type="submit"
              sx={{
                m: "2rem 0",
                p: "1rem",
                backgroundColor: palette.primary.main,
                color: palette.background.alt,
                "&:hover": { color: palette.primary.main },
              }}
              disabled={!(isValid && dirty)} // Disable button if form is invalid or not touched
              data-cy="submit-button" // Added data-cy
            >
              {isLogin ? "LOGIN" : "REGISTER"}
            </Button>
            <Typography
              onClick={() => {
                setPageType(isLogin ? "register" : "login");
                resetForm();
              }}
              sx={{
                textDecoration: "underline",
                color: palette.primary.main,
                cursor: "pointer",
                textAlign: "center",
              }}
              data-cy="toggle-form" // Added data-cy
            >
              {isLogin
                ? "Don't have an account? Sign up here."
                : "Already have an account? Login here."}
            </Typography>
          </Box>
        </form>
      )}
    </Formik>
  );
};

export default Form;




























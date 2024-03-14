import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"
import "../styles/Register.scss";

const RegisterPage = () => {
  // Declaration of Inputs in form and this will be keeng copy the data
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    profileImage: null,
  });
  // *************************

  // Getting data from the user
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: value,
      [name]: name === "profileImage" ? files[0] : value,
    });
  };
  // *************************

  // Comparing password --> backend
  const [passwordMatch, setPasswordMatch] = useState(true);
  useEffect(() => {
    setPasswordMatch(
      formData.password === formData.confirmPassword ||
        formData.confirmPassword === ""
    );
  },[formData.password, formData.confirmPassword]);
  // ****************************

  const navigate = useNavigate(); //Reroute to login page

  // This will be sending data to the backend
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const register_form = new FormData(); //Because we have a file thats why we use register_form

      for (var key in formData) {
        register_form.append(key, formData[key]); //Checks each value with its key and sending the form to the backend
      }

      // Sending the form to the backend
      const response = await fetch("http://localhost:3001/auth/register", {
        method: "POST",
        body: register_form,
      });

      if (response.ok) {
        navigate("/login");
      }
    } catch (err) {
      console.log("Registration failed", err.message);
    }
  };
  // ***********************************

  // Console data to browser console This can later be commented out in PRODUCTION MODE
  console.log(formData);
  // *********************************************************************************


  // PAGE VIEW CODES
  return (
    <div className="register">
      <div className="register_content">
        {/* The hendleSubmit function sends data to the backend */}
        <form className="register_content_form" onSubmit={handleSubmit}>
          <input
            placeholder="First Name"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
          <input
            placeholder="Last Name"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
          <input
            placeholder="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            placeholder="Password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            type="password"
            required
          />
          <input
            placeholder="Confirm Password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            type="password"
            required
          />

          {/* Once the password is not correct THEN Disable the Register Button*/}
          {!passwordMatch && (
            <p style={{ color: "red" }}>Passwords are not matched!</p>
          )}
          {/* ******************************** *********************************/}

          <input
            id="image"
            type="file"
            name="profileImage"
            accept="image/*"
            style={{ display: "none" }}
            onChange={handleChange}
            required
          />
          <label htmlFor="image">
            <img src="/assets/addImage.png" alt="add profile pic" />
            <p>Upload Your Photo</p>
          </label>

          {/* This allows to display the photo selected immediately after selecting it */}
          {formData.profileImage && (
            <img
              src={URL.createObjectURL(formData.profileImage)}
              alt="profile pic"
              style={{ maxWidth: "80px" }}
            />
          )}
          {/* ************************************************************************ */}
          <button type="submit" disabled={!passwordMatch}>
            REGISTER
          </button>
        </form>
        <a href="/login">Already have an account? Log In Here</a>
      </div>
    </div>
  );
};

export default RegisterPage;

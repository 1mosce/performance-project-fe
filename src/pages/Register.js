import { useDispatch } from "react-redux";
import { saveRegisterData } from "../store/features/registerFeatures/registerSlice";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault(); // Prevents the default form submission behavior
    const data = {
      email: e.target.email.value,
      password: e.target.password.value,
      name: e.target.name.value,
    };

    // Assuming you have an action creator named 'registerUser'
    dispatch(saveRegisterData(data));
    navigate("/");
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Enter your email" name="email" />
        <input
          type="password"
          placeholder="Enter your password"
          name="password"
        />
        <input type="text" placeholder="Enter your name" name="name" />
        <input type="submit" />
      </form>
    </div>
  );
};

export default Register;

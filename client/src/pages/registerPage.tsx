import NavBar from "../components/navBar";
import Register from "../components/registerCard";

function RegisterPage() {
  return (
    <div>
      <NavBar />
      <div className="text-3xl font-semibold text-center md:text-5xl">
        Register Page
      </div>
      <div>
        <Register />
      </div>
    </div>
  );
}

export default RegisterPage;


import LoginCard from "../components/loginCard";
import NavBar from "../components/navBar";

function LoginPage() {
  return (
    <div>
      <NavBar/>
      <div className="text-3xl font-semibold text-center md:text-5xl">
        Login Page
      </div>
      <div>
        <LoginCard />
      </div>
    </div>
  );
}

export default LoginPage;

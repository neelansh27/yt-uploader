import {useAuth} from "../context/useAuth.ts";

const Login = () => {
    const { login } = useAuth();

    return (
        <div className="login-container">
            <h2>Login to Your Account</h2>
            <button onClick={login} className="google-login-btn">
                <img src="https://www.citypng.com/public/uploads/preview/google-logo-icon-gsuite-hd-701751694791470gzbayltphh.png?v=2025061907" alt="Google" height={"30px"} />
                Sign in with Google
            </button>
        </div>
    );
};

export default Login;
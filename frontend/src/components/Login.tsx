import { useAuth } from "../context/useAuth.ts";
import { FaGoogle } from "react-icons/fa";

const Login = () => {
    const { login } = useAuth();

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
            <div className="bg-white shadow-md rounded-2xl p-8 max-w-sm w-full text-center">
                <h2 className="text-2xl font-semibold text-gray-800 mb-6">
                    Login to Your Account
                </h2>
                <button
                    onClick={login}
                    className="flex items-center justify-center w-full px-6 py-3 text-white bg-red-500 hover:bg-red-600 rounded-lg transition-colors duration-200"
                >
                    <FaGoogle className="mr-2 text-lg" />
                    Sign in with Google
                </button>
            </div>
        </div>
    );
};
export default Login;

import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { LogIn, Mail, Lock, ArrowRight, Eye, EyeOff, Loader } from "lucide-react";
 import { useUserStore } from "../stores/useUserStore";
import { toast } from 'react-hot-toast'
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  
    const [email, setEmail] = useState("");
   // const[phone,setPhone]= useState("");
	const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    
    const { login, loading } = useUserStore();  // ✅ Store logic

    const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
    const user = await login(email, password); // get user info
    toast.success("Login successful!");

    // Redirect based on user type
    if (user.role === "artist" || user.userType === "artist") {
      navigate("/artistdash");
    } else {
      navigate("/"); // or other route for clients/admins
    }


		} catch (error) {
			toast.error(error.message);
		}
	};

  return(
    <div className='flex flex-col justify-center py-12 sm:px-6 lg:px-8'>
        <motion.div
            className='sm:mx-auto sm:w-full sm:max-w-md'
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
        >
            <h2 className='mt-6 text-center text-3xl font-extrabold text-gray-800'>Login</h2>
        </motion.div>

        <motion.div
            className='mt-8 sm:mx-auto sm:w-full sm:max-w-md'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
        >
            <div className='bg-[#E4DFCF] py-8 px-4 shadow sm:rounded-lg sm:px-10'>
                <form onSubmit={handleSubmit} className='space-y-6'>
                    <div>
                        <label htmlFor='email' className='block text-sm font-medium text-gray-800'>
                            Email address 
                        </label>
                        <div className='mt-1 relative rounded-md shadow-sm'>
                            <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                                <Mail className='h-5 w-5 text-gray-800' aria-hidden='true' />
                            </div>
                            <input
                                id='email'
                                type='email'
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className=' block w-full px-3 py-2 pl-10 bg-white border border-gray-500 
                                rounded-md shadow-sm
                                placeholder-gray-500  focus:ring-gray
                                focus:border-gray sm:text-sm'
                                placeholder='you@example.com'
                            />
                        </div>
                    </div>

                    <div>
                        <label htmlFor='password' className='block text-sm font-medium text-gray-800'>
                            Password
                        </label>
                        <div className='mt-1 relative rounded-md shadow-sm'>
                            <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                                <Lock className='h-5 w-5 text-gray-800' aria-hidden='true' />
                            </div>
                            <input
                                id='password'
                                type={showPassword ? "text" : "password"}
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className=' block w-full px-3 py-2 pl-10 bg-white border border-gray-600 
                                rounded-md shadow-sm placeholder-gray-500  focus:ring-gray focus:border-gray sm:text-sm'
                                placeholder='••••••••'
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword((prev) => !prev)}
                                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-700 focus:outline-none"
                                tabIndex={-1}
                                >
                                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                        </div>
                        <div className="mt-2 text-right text-sm">
                            <Link
                            to="/forgot-password"
                            className="text-black font-medium hover:text-[#3EBDC6]"
                            >
                            Forgot password?
                            </Link>
                        </div>
                    </div>

                    <button
                                
                        type='submit' 
                        className='w-full flex justify-center py-2 px-4 border border-transparent 
                        rounded-md shadow-sm text-sm font-medium text-white bg-[#1EA0D1]
                        hover:bg-[#3EBDC6] hover:text-white focus:ring-gray focus:border-gray focus:ring-offset-2
                        focus:ring-black-400 transition duration-150 ease-in-out disabled:opacity-50'
                        // disabled={loading}
                    
                    >
                        {/* { (
                            <>
                                <Loader className='mr-2 h-5 w-5 animate-spin' aria-hidden='true' />
                                Loading...
                            </>
                        )  ( */}
                        {(
                            <>
                                
                                <LogIn className='mr-2 h-5 w-5' aria-hidden='true' />
                                Login
                            </>
                        )}
                    </button>
                </form>

                <p className='mt-8 text-center text-sm text-gray-500'>
                    Don't have an account?{" "}
                    <Link to='/signup-select' className='font-medium text-black hover:text-[#3EBDC6]'>
                        Sign up now <ArrowRight className='inline h-4 w-4' />
                    </Link>
                </p>
            </div>
        </motion.div>
    </div>
)
}      
                    
export default LoginPage

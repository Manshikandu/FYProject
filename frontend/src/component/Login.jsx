// import React from 'react'

// const SignUp = () => {
//   return (
//     <div>
//       signuppage
//     </div>
//   )
// }

// export default SignUp


//import React from 'react'
import { useState } from "react";
import { Link } from "react-router-dom";
import { UserPlus, Mail, Lock, User, ArrowRight, Loader } from "lucide-react";
import { motion } from "framer-motion";
//import { useUserStore } from "../stores/useUserStore";
//import {toast} from "react-hot-toast"


const SignUpPage = () => {
    const loading = false;
	const [formData, setFormData] = useState({
		Fullname: "",
		email: "",
        PhoneNumber: "",
		password: "",
		confirmPassword: "",
        CitizenshipNo : "",
	});

	//const { signup,loading } = useUserStore();

	const handleSubmit = (e) => {
		e.preventDefault();
        console.log("called here");
		// signup(formData);
        // {toast.success("login Successful")}
	};

	return (
		<div className='flex flex-col justify-center py-12 sm:px-6 lg:px-8'>
			<motion.div
				className='sm:mx-auto sm:w-full sm:max-w-md'
				initial={{ opacity: 0, y: -20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.8 }}
			>
				<h2 className='mt-6 text-center text-3xl font-extrabold text-gray-800'>Create your account/Signup</h2>
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
							<label htmlFor='name' className='block text-sm font-medium text-gray-800'>
								Full name
							</label>
							<div className='mt-1 relative rounded-md shadow-sm'>
								<div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
									<User className='h-5 w-5 text-gray-800' aria-hidden='true' />
								</div>
								<input
									id='name'
									type='text'
									required
									value={formData.name}
									onChange={(e) => setFormData({ ...formData, name: e.target.value })}
									className='block w-full px-3 py-2 pl-10 bg-white border border-gray-600 rounded-md shadow-sm
									 placeholder-gray-500 focus:outline-none focus:ring-black  focus:border-black sm:text-sm'
									placeholder='Your Name'
								/>
							</div>
						</div>

                        

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
									value={formData.email}
									onChange={(e) => setFormData({ ...formData, email: e.target.value })}
									className=' block w-full px-3 py-2 pl-10 bg-white border border-gray-600 
									rounded-md shadow-sm
									 placeholder-gray-500 focus:outline-none focus:ring-black
									 focus:border-black sm:text-sm'
									placeholder='you@example.com'
								/>
							</div>
						</div>
                   
                        <div>
							<label htmlFor='PhoneNumber' className='block text-sm font-medium text-gray-800'>
								Phone Number
							</label>
							<div className='mt-1 relative rounded-md shadow-sm'>
								<div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
									<Mail className='h-5 w-5 text-gray-800' aria-hidden='true' />
								</div>
								<input
									id='PhoneNumber'
									type='PhoneNumber'
									required
									value={formData.email}
									onChange={(e) => setFormData({ ...formData, email: e.target.value })}
									className=' block w-full px-3 py-2 pl-10 bg-white border border-gray-600 
									rounded-md shadow-sm
									 placeholder-gray-500 focus:outline-none focus:ring-black
									 focus:border-black sm:text-sm'
									placeholder='Phone No.'
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
									type='password'
									required
									value={formData.password}
									onChange={(e) => setFormData({ ...formData, password: e.target.value })}
									className=' block w-full px-3 py-2 pl-10 bg-white border border-gray-600 
									rounded-md shadow-sm placeholder-gray-500 focus:outline-none focus:ring-black focus:border-black sm:text-sm'
									placeholder='••••••••'
								/>
							</div>
						</div>

						<div>
							<label htmlFor='confirmPassword' className='block text-sm font-medium text-gray-800'>
								Confirm Password
							</label>
							<div className='mt-1 relative rounded-md shadow-sm'>
								<div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
									<Lock className='h-5 w-5 text-gray-800' aria-hidden='true' />
								</div>
								<input
									id='confirmPassword'
									type='password'
									required
									value={formData.confirmPassword}
									onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
									className=' block w-full px-3 py-2 pl-10 bg-white border
									 border-gray-600 rounded-md shadow-sm placeholder-gray-500 focus:outline-none focus:ring-black focus:border-black sm:text-sm'
									placeholder='••••••••'
								/>
							</div>
						</div>
                        
                        <div>
							<label htmlFor='CitizenshipNo' className='block text-sm font-medium text-gray-800'>
								Citizenship No.
							</label>
							<div className='mt-1 relative rounded-md shadow-sm'>
								<div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
									<Mail className='h-5 w-5 text-gray-800' aria-hidden='true' />
								</div>
								<input
									id='CitizenshipNo'
									type='CitizenshipNo'
									required
									value={formData.email}
									onChange={(e) => setFormData({ ...formData, email: e.target.value })}
									className=' block w-full px-3 py-2 pl-10 bg-white border border-gray-600 
									rounded-md shadow-sm
									 placeholder-gray-500 focus:outline-none focus:ring-black
									 focus:border-black sm:text-sm'
									placeholder='Citizenship No.'
								/>
							</div>
						</div>
						<button
							type='submit'
							className='w-full flex justify-center py-2 px-4 border border-transparent 
							rounded-md shadow-sm text-sm font-medium text-white bg-[#1EA0D1]
]
							  hover:bg-[#3EBDC6] hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2
							  focus:ring-black transition duration-150 ease-in-out disabled:opacity-50'
							disabled={loading}
						>
							{loading ? (
								<>
									<Loader className='mr-2 h-5 w-5 animate-spin' aria-hidden='true' />
									Loading...
								</>
							) : (
								<>
									<UserPlus className='mr-2 h-5 w-5' aria-hidden='true' />
									Sign up
								</>
							)}
						</button>
					</form>

					<p className='mt-8 text-center text-sm text-gray-800'>
						Already have an account?{" "}
						<Link to='/login' className='font-medium text-black hover:text-[#3EBDC6]'>
							Login here <ArrowRight className='inline h-4 w-4' />
						</Link>
					</p>
				</div>
			</motion.div>
		</div>
	);
};
export default SignUpPage;
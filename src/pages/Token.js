import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const Token = () => {
	const navigate = useNavigate();

	const handleGetToken = async () => {
		try {
			const { data } = await axios.post(
				"https://frontend-test.alluvium.net/token"
			);
			console.log(data);
			localStorage.setItem("token", data.access_token);
			toast.success("Token retrieved successfully!", {
				position: "top-right",
			});
			setTimeout(() => {
				navigate("/user-info");
			}, 1500);
		} catch (error) {
			console.error(error);
			// Show error toast
			toast.error("Failed to retrieve token. Please try again.", {
				position: "top-right",
			});
		}
		// Redirecting to another page
	};
	return (
		<div className='flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-100 to-white'>
			<div className='bg-white p-8 rounded-lg shadow-lg w-full max-w-md'>
				<h2 className='text-2xl font-bold text-center mb-6'>Get Access</h2>
				<div className='space-y-4 text-center'>
					<button
						onClick={handleGetToken}
						className='w-full bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition duration-300'
					>
						Get Access
					</button>
				</div>
			</div>
			<ToastContainer />
		</div>
	);
};

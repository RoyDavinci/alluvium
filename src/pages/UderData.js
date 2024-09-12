import React, { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

export const UderData = () => {
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		portfolio_url: "",
	});

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value });
	};

	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			const token = localStorage.getItem("token");
			const { data } = await axios.post(
				"https://frontend-test.alluvium.net/submit_user_info",
				formData,
				{ headers: { Authorization: `Bearer ${token}` } }
			);
			console.log(data);
			if (data.detail === "Not authenticated") {
				toast.error("Not Authorized", {
					position: "top-right",
				});
			}
			toast.success("User info submitted successfully!", {
				position: "top-right",
			});
		} catch (error) {
			console.error(error);
			if (error.response) {
				// Handle status codes
				const { status } = error.response;

				if (status === 401 || status === 403) {
					// Unauthorized, possibly token issue
					toast.error("Not Authorized. Redirecting to get token...", {
						position: "top-right",
					});
					// Redirect to the Get Token page
					setTimeout(() => {
						localStorage.clear();
						navigate("/");
					}, 1500);
				} else if (status === 400) {
					// Bad request
					toast.error("Bad request. Please check your input.", {
						position: "top-right",
					});
					setTimeout(() => {
						localStorage.clear();
						navigate("/");
					}, 1500);
				} else {
					// Other errors (500, 404, etc.)
					toast.error("An error occurred. Please try again.", {
						position: "top-right",
					});
				}
			} else {
				// Network error or request not reaching the server
				toast.error("Network error. Please try again.", {
					position: "top-right",
				});
				setTimeout(() => {
					localStorage.clear();
					navigate("/");
				}, 1500);
			}
		}
	};
	return (
		<div className='flex justify-center items-center min-h-screen bg-gradient-to-r from-green-100 to-white'>
			<div className='bg-white p-8 rounded-lg shadow-lg w-full max-w-md'>
				<h2 className='text-2xl font-bold text-center mb-6'>
					Submit User Info
				</h2>
				<form onSubmit={handleSubmit} className='space-y-4'>
					<div>
						<label className='block text-gray-700'>Name</label>
						<input
							type='text'
							name='name'
							value={formData.name}
							onChange={handleChange}
							className='w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500'
							placeholder='Enter your name'
							required
						/>
					</div>
					<div>
						<label className='block text-gray-700'>Email</label>
						<input
							type='email'
							name='email'
							value={formData.email}
							onChange={handleChange}
							className='w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500'
							placeholder='Enter your email'
							required
						/>
					</div>
					<div>
						<label className='block text-gray-700'>Portfolio URL</label>
						<input
							type='url'
							name='portfolio_url'
							value={formData.portfolio_url}
							onChange={handleChange}
							className='w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500'
							placeholder='Enter your portfolio URL'
							required
						/>
					</div>
					<button
						type='submit'
						className='w-full bg-green-600 text-white p-2 rounded-lg hover:bg-green-700 transition duration-300'
					>
						Submit
					</button>
				</form>
			</div>
			<ToastContainer />
		</div>
	);
};

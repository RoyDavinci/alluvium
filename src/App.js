import React from "react";
import { useNavigate } from "react-router-dom";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Token } from "./pages/Token";
import { UderData } from "./pages/UderData";

function App() {
	const router = createBrowserRouter([
		{
			path: "/",
			element: <Token />,
		},
		{
			path: "/user-info",
			element: <UderData />,
		},
	]);

	return <RouterProvider router={router} />;
}

export default App;

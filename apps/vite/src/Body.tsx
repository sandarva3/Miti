import { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import AnnouncementAlert from "./components/AnnouncementAlert.tsx";
import { DarkModeContext } from "./components/DarkModeProvider.tsx";
import Footer from "./components/Footer.tsx";
import Navbar from "./components/Navbar.tsx";
import About from "./pages/About.tsx";
import DateConverter from "./pages/DateConverter.tsx";
import GoogleApiDisclosure from "./pages/GoogleApiDisclosure.tsx";
import Home from "./pages/Home.tsx";
import PrivacyPolicy from "./pages/PrivacyPolicy.tsx";

const Body = () => {
	const { darkMode } = useContext(DarkModeContext);

	return (
		<div className={(darkMode ? "dark" : "") + " flex min-h-screen flex-col"}>
			<AnnouncementAlert />
			<Navbar />
			<div className="flex-grow">
				<Routes>
					<Route path="/:pageType?/:BSYear?/:BSMonth?" element={<Home />} />
					<Route path="/privacy" element={<PrivacyPolicy />} />
					<Route path="/converter" element={<DateConverter />} />
					<Route path="/about" element={<About />} />
					<Route
						path="/google-api-disclosure"
						element={<GoogleApiDisclosure />}
					/>
				</Routes>
			</div>
			<Footer />
		</div>
	);
};

export default Body;

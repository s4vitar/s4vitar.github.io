import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "@containers/Layout";
import { Home 	} from "@pages/Home";
import { NotFound } from "@pages/NotFound";

import { GlobalStyle } from "../GlobalStyle"
import "../_vars.scss"//(@)=>

import ThemeContext from "../components/ThemeContext";

const App =()=> { 

	const [light,setDark] = React.useState(false);
  const color = React.useContext(ThemeContext);

return (
	<BrowserRouter basename="/videos">
	<GlobalStyle/>
		<Layout light={light} 
			setDark={setDark} 
			color={color}
		>
			<Routes>
				 <Route exact path="/" 
					element={
						<Home light={light} 
							color={color} 
						/>} 
				 />

				<Route exact path="*" element={<NotFound />} />
			</Routes>
		</Layout>
	</BrowserRouter>
); }; export { App };

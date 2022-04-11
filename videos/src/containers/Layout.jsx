import * as React from "react";
import { SunIcon, MoonIcon } from '@chakra-ui/icons'
import { motion } from 'framer-motion'

const styleLayout = {
	textAlign: "center",
	backgroundColor: "var(--takuya)",
	minHeight: "100vh",
  minWidth: "100%",
	padding: "40px 90px",
	maxWidth: "100vw",
};

const Layout = ( {children, light, setDark, color} )=> {

return (

<div className={`Layout ${light && color.theme3}`}
	style={styleLayout}
>
	<button 
		type="button" 
		onClick={()=> setDark(!light)}
		style={{
			padding: "2px 4px",
			borderRadius: "100%",
			border: "none",
			background: "transparent",
	}}>
		<motion.div
			style={{ display: 'inline-block' }}
			initial={{ y: -20, opacity: 0 }}
			animate={{ y: 0, opacity: 1 }}
			exit={{ y: 20, opacity: 0 }}
			transition={{ duration: 0.2 }}
		>
			{ !light?  
				<MoonIcon w={40} h={40} color="tomato"/> 
				:
				<SunIcon w={40} h={40} color="gold"/>
			}
		</motion.div>
	</button>
		{children}
</div>
) }; export { Layout };
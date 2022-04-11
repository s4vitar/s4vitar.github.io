import React from "react";
import { Container,
	Heading, Text, Input,
  Tabs, TabList, TabPanels, Tab, 
	TabPanel,
	InputGroup, InputLeftElement,
 } from '@chakra-ui/react'
import { MachineList } from "../components/MachineList";
import { SearchHook, NotFound, } from "../components/SearchHook2";
import { SearchIcon, } from "@chakra-ui/icons";
import { Neofetch } from '../components/Neofetch.jsx';
import { Animate } from "./Animate";
import { Footer } from "../components/Footer";

const Home =({color, light})=> { 
	const {
		searchValue,
    setSearchValue, 
    searchedText,
	} = SearchHook();

	const handleChange =(e)=> {
		setSearchValue(e.target.value)
	}

return ( <> <Animate>

<Container as='main' fontFamily={'Hack'} centerContent>
	<Container as='header' centerContent>
		<Heading as='h1' 
			style={{
				marginTop: '40px',
				fontSize: '2.1rem',
				filter: 'blur(0.6px)',
			}}>
				S4vitar Machine's Resolutions
		</Heading>

		<Heading as='h2'
			style={{
				fontSize: '1.3rem',
				filter: 'contrast(0.2)',
				fontWeight: '100',
				marginTop: '40px',
				filter: 'contrast(0.1) blur(0.4px)',
			}}>
				Resolved things
			</Heading><br/><br/><br/>
	</Container>

	<Container as='section'>
		<Tabs variant='enclosed'>
			<TabList css={{
				justifyContent: 'center',
				filter: 'contrast(0.8) blur(0.4px)',
			}}>
				<Tab 
					fontFamily={'Hack'}  color="#e06c76"
					style={{backgroundColor: "transparent", border:"none"}}
					_selected={{ 
						color: '#98c379', 
						bg: 'transparent', 
						border: "none" 
				}}>
					<Text style={{
							fontSize: "30px",
							fontWeight: "100",
						}} 
						ml={40} mr={40}
					>Machines</Text>
				</Tab>
				<Tab
					fontFamily={'Hack'} color="#e06c76"
					style={{backgroundColor: "transparent", border:"none"}}
					_selected={{ 
						color: '#98c379', 
						bg: 'transparent', 
						border: "none" 
				}}>
					<Text style={{
							fontSize: "30px",
							fontWeight: "100",
							background: "transparent",
						}} 
						m={20} mr={40}
					>About</Text>
				</Tab>
			</TabList>

			<TabPanels>
				<TabPanel>
				<InputGroup>
					<InputLeftElement
						children={
							<SearchIcon
								mt={51} ml={26}
								sx={{filter: "contrast(0.1)",
									'&:hover': {
										filter: 'contrast(0.9)',
										transition: 'filter 0.2s ease-in-out',
									},
								}}
							/>
						}
					/>

					<Input border="none" autoFocus className={light && color.theme4}
						type='search' placeholder='Search (filter by) name, so, difficulty, skills, like.'
						size='lg' fontSize={'20px'}
						borderRadius={'8px'}
						minW={'280px'} w="100%" 
						pl={'60px'} pt={9} pb={9}
						mt={40} mb={8}
						onChange={handleChange}
					/>
				</InputGroup>

					<MachineList 
						light={light}
						color={color}
						objetosFiltrados={searchedText}
						NotFound={()=> NotFound(searchValue)}
					/>
				</TabPanel>

				<TabPanel>
					<Neofetch/>
				</TabPanel>
			</TabPanels>
		</Tabs>
	</Container>
</Container>
<Footer/>
</Animate>
</>	); }; export { Home };
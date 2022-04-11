import * as React from "react";
import neo from "@imgs/neo.png";
import s4 from "@logos/s4vitar.svg";
import { 
  Box, Container, Button, Img,
} from "@chakra-ui/react";
import {  ViewIcon } from "@chakra-ui/icons";

const Neofetch =()=> { return (<>
<Container bg="white" p={8} as="section"  centerContent
  css={{borderRadius: "8px"}} mt={48}
  boxShadow="0px 0px 40px rgba(0, 0, 0, 0.13)"
>
  <Container alignContent={'center'} centerContent
    bg="white" p={8} mb={8} mt={8}
      textAlign={'center'}
      css={{borderRadius: "8px"}}
    boxShadow={"0px 0px 40px rgba(0, 0, 0, 0.13)"}
  >
    <Box mt={48}>

      <Box borderWidth="1px" p="8" maxW="820px">
        <Img src={neo} alt="neofetch" w="100%"
          style={{ borderRadius: "8px"}}
        /><br/>
      </Box>

        <Button m={10}
          leftIcon={<ViewIcon/>}
          as='a' target='_blank' 
          href="https://www.youtube.com/watch?v=fshLf6u8B-w"
          css={{ color: "crimson" }}
          _hover={{ color: "#48BB78" }} >
          ASÍ es el ENTORNO de un HACKER
        </Button><br/>
            
      <a href="https://discord.com/invite/u3dsh9M"
        target="_blank" rel="noopener noreferrer">

        <img width="600px" src={s4} alt="neofetch"
          style={{ borderRadius: "8px", marginTop: "-80px"}}
        />
      </a>
    </Box>
  </Container>
</Container>
</> ) }; export {Neofetch};
import React from "react";
import { Button } from '@chakra-ui/react'
import { AtSignIcon } from '@chakra-ui/icons'
import cheat from "@logos/cheat.jpg"

const Footer =()=> { return (<>

<p style={{
  marginTop: "9px",
  fontWeight: "bold",
  fontFamily: "Hack",
}}>Made by &nbsp;
  <Button 
      as='a' target='_blank' 
        variant='outline' 
      href="https://twitter.com/cheatmodes4/"
    css={{ color: "crimson" }}
    _hover={{ color: "#48BB78" }}
  >
    <AtSignIcon/>CheatModes4
    <img src={cheat} width="20px" height="20px"
      style={{ borderRadius: "100%", margin: "0 4px"}}
    />
    </Button>
  using React/ChakraUi, with affection to the Hack4u community.
</p>

</> ) }; export {Footer};
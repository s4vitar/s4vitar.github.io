import { extendTheme } from "@chakra-ui/react"
import { mode        } from "@chakra-ui/theme-tools"

const styles = {
  global: props=> ({
    "#root": {
      bg: mode('black')(props)
    },
  })
}

const config = {
  initialColorMode: 'dark',
  useSystemColorMode: true 
}

const theme = extendTheme({
  config,
  styles,
})

export { theme }
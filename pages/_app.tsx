import { ChakraProvider } from "@chakra-ui/provider"
import { DefaultSeo } from "next-seo"
import theme from "lib/theme"
import "../styles/prism.css"
import siteConfig from "site.config"

export default function App({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme}>
      <DefaultSeo {...siteConfig.seo} />
      <Component {...pageProps} />
    </ChakraProvider>
  )
}

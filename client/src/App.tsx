import { ChakraProvider, theme } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import Footer from "./Features/Footer/Footer";
import Navbar from "./Features/Navbar/Navbar";

export const App = () => (
  <ChakraProvider theme={theme}>
    <Navbar />
    <Outlet />
    <Footer />
  </ChakraProvider>
);

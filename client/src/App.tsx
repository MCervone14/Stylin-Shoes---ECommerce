import { ChakraProvider, theme } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import Footer from "./Components/Footer/Footer";
import Navbar from "./Components/Navbar/Navbar";

export const App = () => (
  <ChakraProvider theme={theme}>
    <Navbar />
    <Outlet />
    <Footer />
  </ChakraProvider>
);

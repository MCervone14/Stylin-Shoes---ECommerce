import {
  Box,
  Flex,
  HStack,
  Link,
  IconButton,
  Icon,
  Text,
  useDisclosure,
  Button,
  Stack,
  useColorModeValue,
  useColorMode,
  useToast,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  MenuDivider,
  Badge,
} from "@chakra-ui/react";
import { Link as ReactLink } from "react-router-dom";
import {
  HamburgerIcon,
  CloseIcon,
  MoonIcon,
  SunIcon,
  ChevronDownIcon,
} from "@chakra-ui/icons";
import { CgProfile } from "react-icons/cg";
import { MdShoppingCart, MdLocalShipping } from "react-icons/md";
import { IoMdLogOut } from "react-icons/io";
import { ReactNode } from "react";
import { useAppDispatch, useAppSelector } from "../../Redux/hooks";
import { logout } from "../../Redux/Actions/userActions";

interface INavLinkProps {
  path?: string;
  children: ReactNode;
}

const links = [{ linkName: "Products", path: "products" }];

const NavLink = ({ path = "", children }: INavLinkProps) => (
  <Link
    as={ReactLink}
    to={path}
    p={2}
    rounded="md"
    _hover={{
      textDocoration: "none",
      bg: useColorModeValue("gray.200", "gray.700"),
    }}
  >
    {children}
  </Link>
);

const Navbar = () => {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const { colorMode, toggleColorMode } = useColorMode();
  const { userInfo } = useAppSelector((state) => state.user);
  const { cart } = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();
  const toast = useToast();

  const logoutHandler = () => {
    dispatch(logout());
    toast({
      description: "You have been logged out.",
      status: "success",
      isClosable: true,
    });
  };

  return (
    <Box bg={useColorModeValue("gray.100", "gray.900")} px={4}>
      <Flex h={16} alignItems="center" justifyContent="space-between">
        <IconButton
          size="md"
          aria-label=""
          icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
          display={{ md: "none" }}
          onClick={isOpen ? onClose : onOpen}
        />
        <HStack>
          <Link as={ReactLink} to="/">
            <Text fontWeight="extrabold">Stylin Shoes</Text>
          </Link>
          <HStack as="nav" spacing={4} display={{ base: "none", md: "flex" }}>
            {links.map((link) => (
              <NavLink key={link.linkName} path={link.path}>
                {link.linkName}
              </NavLink>
            ))}
          </HStack>
        </HStack>
        <Flex alignItems="center">
          <Icon
            as={colorMode === "light" ? MoonIcon : SunIcon}
            alignSelf="center"
            onClick={() => toggleColorMode()}
            cursor="pointer"
            ml="2px"
          />
          {userInfo ? (
            <Menu>
              <MenuButton px={4} py={2} transition="all 0.3s" as={Button}>
                {userInfo.name} <ChevronDownIcon />
              </MenuButton>
              <MenuList>
                <MenuItem as={ReactLink} to="/profile">
                  <CgProfile />
                  <Text ml={2}>Profile</Text>
                </MenuItem>
                <MenuItem as={ReactLink} to="/cart">
                  <MdShoppingCart />
                  <Text ml={2}>Shopping Cart</Text>
                </MenuItem>
                <MenuItem as={ReactLink} to="/orders">
                  <MdLocalShipping />
                  <Text ml={2}>Your Orders</Text>
                </MenuItem>
                <MenuDivider />
                <MenuItem as={ReactLink} to="/" onClick={logoutHandler}>
                  <IoMdLogOut />
                  <Text ml={2}>Logout</Text>
                </MenuItem>
              </MenuList>
            </Menu>
          ) : (
            <>
              <Button
                as={ReactLink}
                p={2}
                fontSize="sm"
                fontWeight={400}
                variant="link"
                to="/login"
              >
                Sign In
              </Button>
              <Button
                as={ReactLink}
                m={2}
                display={{ base: "none", md: "inline-flex" }}
                fontSize="sm"
                fontWeight={600}
                to="/register"
                _hover={{ bg: "orange.400" }}
                color="#ffffff"
                bg="orange.500"
              >
                Sign Up
              </Button>
              <Button as={ReactLink} to="/cart">
                <MdShoppingCart fontSize={25} />
                <Badge
                  variant="subtle"
                  colorScheme={"blue"}
                  fontSize={15}
                  borderRadius="50%"
                >
                  {cart.length}
                </Badge>
              </Button>
            </>
          )}
        </Flex>
      </Flex>
      {isOpen ? (
        <Box pb={4} display={{ md: "none" }}>
          <Stack>
            {links.map((link) => (
              <NavLink key={link.linkName} path={link.path}>
                {link.linkName}
              </NavLink>
            ))}
            <NavLink key="sign up" path="/register">
              Sign Up
            </NavLink>
          </Stack>
        </Box>
      ) : null}
    </Box>
  );
};

export default Navbar;

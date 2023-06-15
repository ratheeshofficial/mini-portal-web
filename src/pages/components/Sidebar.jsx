import React, { useContext, useEffect } from "react";
import {
  IconButton,
  Avatar,
  Box,
  CloseButton,
  Flex,
  HStack,
  VStack,
  Icon,
  useColorModeValue,
  Drawer,
  DrawerContent,
  Text,
  useDisclosure,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Card,
  CardBody,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Image,
  Badge,
} from "@chakra-ui/react";
import {
  FiHome,
  FiTrendingUp,
  FiMenu,
  FiClock,
  FiChevronDown,
  FiCalendar,
  FiList,
  FiCheckSquare,
} from "react-icons/fi";
import { Link, useLocation, useNavigate } from "react-router-dom";
import ROUTES from "../../constants/Routes";
import { Logo } from "../../constants/ImageData";

const LinkItems = [
  { name: "Dashboard", icon: FiHome, route: ROUTES.DASHBOARD },
  { name: "Student", icon: FiTrendingUp, route: ROUTES.STUDENT },
  { name: "Create Admin", icon: FiClock, route: ROUTES.CREATEADMIN },
  //   { name: "Timeline", icon: FiClock, route: ROUTES.TIMELINE },
  //   { name: "Todo", icon: FiList, route: ROUTES.TODOS },
  //   // { name: 'Reports', icon: FiDatabase, route: '/reports' },
  //   {
  //     name: "Requests",
  //     icon: FiCalendar,
  //     route: ROUTES.LEAVE_REQUEST,
  //   },
  //   {
  //     name: "Approval",
  //     icon: FiCheckSquare,
  //     route: ROUTES.APPROVAL_REQUEST,
  //   },
];

export default function SidebarWithHeader({ children }) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  //   const passwordChangeAlertDisc = useDisclosure();

  //   function renderPasswordChangeAlert() {
  //     if (!passwordChangeAlertDisc.isOpen) {
  //       return null;
  //     }

  //     return (
  //       <Alert status="warning">
  //         <AlertIcon fontSize={'sm'} />
  //         <AlertTitle fontSize={'sm'} fontWeight={'normal'}>
  //           Change your Password at
  //         </AlertTitle>
  //         <AlertDescription fontSize={'sm'} fontWeight={'bold'}>
  //           <Breadcrumb separator={'>'}>
  //             <BreadcrumbItem isCurrentPage>
  //               <BreadcrumbLink href="#">Login</BreadcrumbLink>
  //             </BreadcrumbItem>

  //             <BreadcrumbItem isCurrentPage>
  //               <BreadcrumbLink href="#">Forgot Password</BreadcrumbLink>
  //             </BreadcrumbItem>
  //           </Breadcrumb>
  //         </AlertDescription>
  //         <CloseButton
  //           alignSelf="flex-end"
  //           onClick={passwordChangeAlertDisc.onClose}
  //         />
  //       </Alert>
  //     );
  //   }

  return (
    <Box
      minH="100vh"
      // bg={useColorModeValue('gray.100', 'gray.900')}
    >
      <SidebarContent
        onClose={() => onClose}
        display={{ base: "none", md: "block" }}
      />
      <Drawer
        autoFocus={false}
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full"
      >
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>
      {/* mobilenav */}
      <MobileNav onOpen={onOpen} />
      <Box ml={{ base: 0, md: 60 }} borderTop={`1px solid #eee9e9`}>
        {/* {renderPasswordChangeAlert()} */}
        {children}
      </Box>
    </Box>
  );
}

const SidebarContent = ({ onClose, ...rest }) => {
  return (
    <Box
      transition=".1s ease"
      bg={useColorModeValue("white", "gray.900")}
      borderRight="1px"
      borderRightColor={useColorModeValue("gray.200", "gray.700")}
      w={{ base: "full", md: 60 }}
      pos="fixed"
      h="full"
      {...rest}
    >
      <Flex flexDirection="column" h="full">
        <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
          {/* <Image src={Logo} display={{ base: "none", md: "flex" }} /> */}
          <CloseButton
            display={{ base: "flex", md: "none" }}
            onClick={onClose}
          />
        </Flex>
        {LinkItems.map((link) => (
          <NavItem key={link.name} icon={link.icon} route={link.route}>
            {link.name}
            {link.route === ROUTES.APPROVAL_REQUEST ? (
              <Badge ml="auto" bg="brand.300" borderRadius="2xl" px="2">
                01
              </Badge>
            ) : (
              ""
            )}
          </NavItem>
        ))}
        <Card bg="gray.100" variant="filled" mt="auto" mx="4" mb="4">
          <CardBody p="4">
            <Text fontSize="xs" mt="1">
              © 2023 All rights reserved
            </Text>
          </CardBody>
        </Card>
      </Flex>
    </Box>
  );
};

const NavItem = ({ icon, children, route, ...rest }) => {
  console.log(rest);
  const location = useLocation();
  const isSelected = location.pathname === route;

  return (
    <Link
      to={route}
      style={{ textDecoration: "none" }}
      _focus={{ boxShadow: "none" }}
    >
      <Flex
        mb="2"
        fontWeight="600"
        align="center"
        p="3"
        mx="4"
        borderRadius="md"
        role="group"
        bgColor={isSelected ? "brand.200" : "inherit"}
        color={isSelected ? "brand.700" : "inherit"}
        cursor="pointer"
        _hover={{
          bg: "brand.200",
          color: "brand.700",
        }}
        {...rest}
      >
        {icon && (
          <Icon
            color={isSelected ? "brand.700" : "inherit"}
            mr="4"
            fontSize="16"
            _groupHover={{
              color: "brand.700",
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    </Link>
  );
};

const MobileNav = ({ onOpen, ...rest }) => {
  const navigate = useNavigate();
  const handleSignout = () => {
    localStorage.removeItem("loginDetails");
    navigate(ROUTES.ROOT_SCREEN);
  };
  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 4 }}
      height="8vh"
      alignItems="center"
      bg={useColorModeValue("white", "gray.900")}
      // borderBottomWidth="1px"
      // borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
      justifyContent={{ base: "space-between", md: "flex-end" }}
      {...rest}
    >
      <IconButton
        display={{ base: "flex", md: "none" }}
        onClick={onOpen}
        variant="outline"
        aria-label="open menu"
        icon={<FiMenu />}
      />
      <Image display={{ base: "flex", md: "none" }} w="50%" src={Logo} />

      <HStack spacing={{ base: "0", md: "6" }}>
        {/* <ColorModeSwitcher /> */}
        {/* <IconButton
          size="lg"
          variant="ghost"
          aria-label="open menu"
          icon={<FiBell />}
        /> */}
        <Flex alignItems={"center"}>
          <Menu>
            <MenuButton
              py={2}
              transition="all 0.3s"
              _focus={{ boxShadow: "none" }}
            >
              <HStack>
                <Avatar size={"sm"} name={"NA"} bgColor={"purple.400"} />
                <VStack
                  display={{ base: "none", md: "flex" }}
                  alignItems="flex-start"
                  spacing="0px"
                  ml="2"
                >
                  <Text fontSize="sm">{"NA"}</Text>
                  <Text fontSize="xs" color="gray.600">
                    Role
                  </Text>
                </VStack>
                <Box display={{ base: "none", md: "flex" }}>
                  <FiChevronDown />
                </Box>
              </HStack>
            </MenuButton>
            <MenuList
              bg={useColorModeValue("white", "gray.900")}
              borderColor={useColorModeValue("gray.200", "gray.700")}
              zIndex="5"
            >
              {/* <MenuItem>Profile</MenuItem>
              <MenuItem>Settings</MenuItem>
              <MenuItem>Billing</MenuItem> */}
              {/* <MenuDivider /> */}
              <MenuItem zIndex="popover" onClick={handleSignout}>
                Sign out
              </MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </HStack>
    </Flex>
  );
};

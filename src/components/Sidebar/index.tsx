import {
  IconButton,
  Box,
  CloseButton,
  Flex,
  Icon,
  useColorModeValue,
  Text,
  Drawer,
  DrawerContent,
  useDisclosure,
  BoxProps,
  FlexProps
} from '@chakra-ui/react';
import { FiMenu } from 'react-icons/fi';
import { IconType } from 'react-icons';
import { useUserContext } from '@/context/UserContext';
import { FaHome, FaHeart } from 'react-icons/fa';

interface LinkItemProps {
  name: string;
  icon?: IconType;
}

interface SidebarProps extends BoxProps {
  onClose: () => void;
}

interface NavItemProps extends FlexProps {
  icon?: IconType;
}

interface NavProps extends FlexProps {
  onOpen: () => void;
}

export default function SimpleSidebar() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box display={{ base: 'flex' }}>
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
      >
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>
      <Nav display={{ base: 'flex' }} onOpen={onOpen} />
    </Box>
  );
}

const SidebarContent = ({ onClose, ...rest }: SidebarProps) => {
  const { user } = useUserContext();
  const LinkItems: Array<LinkItemProps> = [
    { name: 'Inicio', icon: FaHome },
    { name: 'Mis favoritas', icon: FaHeart },
    { name: 'Cerrar sesión' }
  ];

  return (
    <Box
      borderRight="1px"
      borderRightColor={useColorModeValue('gray.200', 'gray.700')}
      w={{ base: 'full' }}
      pos="fixed"
      h="full"
      {...rest}
    >
      <Flex
        h="20"
        alignItems="center"
        mx="8"
        borderBottomWidth="1px"
        borderBottomColor="white"
        justifyContent="space-between"
      >
        <Text>Hola {user.name}!</Text>
        <CloseButton display={{ base: 'flex' }} onClick={onClose} />
      </Flex>
      {LinkItems.map((link) => (
        <NavItem key={link.name} icon={link.icon}>
          {link.name}
        </NavItem>
      ))}
    </Box>
  );
};

const NavItem = ({ icon, children, ...rest }: NavItemProps) => {
  return (
    <Box
      as="a"
      href="#"
      style={{ textDecoration: 'none' }}
      _focus={{ boxShadow: 'none' }}
    >
      <Flex
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        _hover={{
          bg: 'purple.400',
          color: 'white'
        }}
        {...rest}
      >
        {icon && (
          <Icon
            mr="4"
            fontSize="16"
            _groupHover={{
              color: 'white'
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    </Box>
  );
};

const Nav = ({ onOpen, ...rest }: NavProps) => {
  return (
    <Flex
      ml={{ base: 0 }}
      px={{ base: 4 }}
      height="20"
      alignItems="center"
      justifyContent="flex-start"
      {...rest}
    >
      <IconButton
        variant="solid"
        onClick={onOpen}
        aria-label="open menu"
        icon={<FiMenu />}
      />
    </Flex>
  );
};

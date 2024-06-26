import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import {
  Flex,
  Box,
  Heading,
  Input,
  Button,
  InputGroup,
  Stack,
  FormControl,
  Text,
  InputRightElement,
  InputLeftElement,
  Spinner
} from '@chakra-ui/react';
import { useUserContext } from '@/context/UserContext';
import { LoginMessage } from '@/types';
import { FaUserAlt, FaLock } from 'react-icons/fa';

export default function Login() {
  const navigate = useNavigate();
  const [spinner, showSpinner] = useState<boolean>(true);
  const [message, setMessage] = useState<string>('');

  const [showPassword, setShowPassword] = useState(false);
  const handleShowClick = () => setShowPassword(!showPassword);

  const {
    user: { name, password, loggedIn },
    updateUser
  } = useUserContext();

  useEffect(() => {
    showSpinner(false);
    const URL = loggedIn ? '/gallery' : '/';
    navigate(URL);
  }, []);

  const validateUser = () => {
    return /^[a-z]+$/.test(name);
  };

  const validatePassword = () => {
    if (/^123[A-Z][a-z]+$/.test(password)) {
      const username = password.substring(3).toLowerCase();
      if (username === name) return true;
    }
    return false;
  };

  const validateAuth = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateUser() && validatePassword()) {
      updateUser('loggedIn', true);
      setMessage(LoginMessage.SUCCESS);
      setTimeout(() => navigate('/gallery'), 1000);
    } else {
      setMessage(LoginMessage.ERROR);
    }
  };

  const handleChange = (prop: string, value: string) => {
    updateUser(prop, value);
    setMessage('');
  };

  return (
    <>
      {spinner ? (
        <Box
          height="full"
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Spinner />
        </Box>
      ) : (
        <Flex
          flexDirection="column"
          width="100wh"
          height="100vh"
          justifyContent="center"
          alignItems="center"
        >
          <Stack
            flexDir="column"
            mb="2"
            justifyContent="center"
            alignItems="center"
          >
            <Heading color="white.500">Image gallery app</Heading>
            <Box minW={{ base: '90%', md: '400px' }}>
              <form onSubmit={(e) => validateAuth(e)}>
                <Stack spacing={4} p="1rem">
                  <FormControl>
                    <InputGroup>
                      <InputLeftElement>
                        <FaUserAlt />
                      </InputLeftElement>
                      <Input
                        type="text"
                        placeholder="Usuario"
                        onChange={(e) => handleChange('name', e.target.value)}
                      />
                    </InputGroup>
                  </FormControl>
                  <FormControl>
                    <InputGroup>
                      <InputLeftElement>
                        <FaLock />
                      </InputLeftElement>
                      <Input
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Contraseña"
                        onChange={(e) =>
                          handleChange('password', e.target.value)
                        }
                      />
                      <InputRightElement width="5rem">
                        <Button h="1.75rem" size="sm" onClick={handleShowClick}>
                          {showPassword ? 'Ocultar' : 'Ver'}
                        </Button>
                      </InputRightElement>
                    </InputGroup>
                  </FormControl>
                  <Button
                    borderRadius={2}
                    type="submit"
                    variant="solid"
                    colorScheme="purple"
                    width="full"
                    isLoading={loggedIn}
                  >
                    Login
                  </Button>
                </Stack>
              </form>
            </Box>
            <Text align="center" display="block" height="20px">
              {message}
            </Text>
          </Stack>
        </Flex>
      )}
    </>
  );
}

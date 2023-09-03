import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import {
  Flex,
  Heading,
  Input,
  Button,
  InputGroup,
  Stack,
  Box,
  FormControl,
  Text,
  InputRightElement,
  Spinner
} from '@chakra-ui/react';
import { useUserContext } from '@/context/UserContext';
import { LoginMessage } from '@/types';

export default function Login() {
  const navigate = useNavigate();
  const [spinner, showSpinner] = useState<boolean>(true);
  const [message, setMessage] = useState<string>('');

  const [showPassword, setShowPassword] = useState(false);
  const handleShowClick = () => setShowPassword(!showPassword);

  const {
    user: { name, password },
    updateUser
  } = useUserContext();

  useEffect(() => {
    showSpinner(false);
    const URL =
      JSON.parse(localStorage.getItem('loggedIn')!) === null ? '/' : '/gallery';
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
  };

  return (
    <>
      {spinner ? (
        <Spinner />
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
            <Box minW={{ base: '90%', md: '468px' }}>
              <form onSubmit={(e) => validateAuth(e)}>
                <Stack spacing={4} p="1rem">
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Username"
                      onChange={(e) => handleChange('name', e.target.value)}
                    />
                  </FormControl>
                  <FormControl>
                    <InputGroup>
                      <Input
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Password"
                        onChange={(e) =>
                          handleChange('password', e.target.value)
                        }
                      />
                      <InputRightElement width="4.5rem">
                        <Button h="1.75rem" size="sm" onClick={handleShowClick}>
                          {showPassword ? 'Hide' : 'Show'}
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
                  >
                    Login
                  </Button>
                  <Text align="center">{message}</Text>
                </Stack>
              </form>
            </Box>
          </Stack>
        </Flex>
      )}
    </>
  );
}

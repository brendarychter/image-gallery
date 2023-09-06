import { Text, Box } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

export default function Message({ text, link, linkMessage }: any) {
  return (
    <Box>
      <Text display="inline-block">{text}</Text>{' '}
      {link && (
        <Link color="teal.500" to={`${link}`}>
          <Text display="inline-block" color="purple.300" as="b">
            {linkMessage}
          </Text>
        </Link>
      )}
    </Box>
  );
}

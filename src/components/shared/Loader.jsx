import { Spinner, VStack } from '@chakra-ui/react';

const Loader = ({ color = 'yellow.500' }) => {
  return (
    <VStack h="100vh" justifyContent={'center'}>
      <div style={{ transform: 'scale(4)' }}>
        <Spinner
          thickness="2px"
          speed="0.65s"
          emptyColor="transparent"
          color={color}
          size="lg"
        />
      </div>
    </VStack>
  );
};

export default Loader;
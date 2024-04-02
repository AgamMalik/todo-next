
import Header from "@/components/Header"
import Todo from "@/components/Todo"
import { Box } from "@chakra-ui/react";



export default function Home() {
  return (
    <Box bg="tomato" w="50%" p={4} color="white" ml="25%" h="100%" borderRadius="1rem">
      
      
        <Header />
        <Todo />
      
    </Box>
  );
}

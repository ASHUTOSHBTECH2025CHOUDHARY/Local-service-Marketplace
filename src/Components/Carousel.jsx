import React, { useEffect, useState } from 'react';
import { Box, Image, Flex, Text, Button } from '@chakra-ui/react';
import { motion, AnimatePresence } from 'framer-motion';

const petData = [
  {
    name: 'Repair Services',
    image: 'https://media.istockphoto.com/id/1345670559/photo/electrician-fixing-an-electrical-outlet-and-measuring-the-voltage.webp?b=1&s=170667a&w=0&k=20&c=GjEjw7IgEzw38npgp3Jon9OZkB2LUdG1MvpfXLaZ_kU=',
    description: 'For any repairment services you want',
    fact: '',
  },
  {
    name: 'Home Services',
    image: 'https://media.istockphoto.com/id/1457344277/photo/happy-smiling-painter-man-talking-on-mobile-phone-by-holding-brush-at-apartment-concept-of.jpg?s=612x612&w=0&k=20&c=NFRaof04QJj0YGCmdP63LOPNmSIX4QamMtMJbaZ18vI=',
    description: 'HWe are availbale for any home services',
    fact: '',
  },
  {
    name: 'Personal Services',
    image: 'https://media.istockphoto.com/id/1284843352/photo/the-technicians-are-cleaning-the-air-conditioner-by-spraying-water-hand-and-water-spray-are.jpg?s=612x612&w=0&k=20&c=pfIt5M1vW3W5v-5eF0yWFisMIVIR9pRokHQpiJnD7Xk= ',
    description: 'Any services you need personally are also available',
    fact: '',
  },
  {
    name: 'Repair Services',
    image: 'https://media.istockphoto.com/id/1345670559/photo/electrician-fixing-an-electrical-outlet-and-measuring-the-voltage.webp?b=1&s=170667a&w=0&k=20&c=GjEjw7IgEzw38npgp3Jon9OZkB2LUdG1MvpfXLaZ_kU=',
    description: 'For any repairment services you want',
    fact: '',
  },
  {
    name: 'Home Services',
    image: 'https://media.istockphoto.com/id/1457344277/photo/happy-smiling-painter-man-talking-on-mobile-phone-by-holding-brush-at-apartment-concept-of.jpg?s=612x612&w=0&k=20&c=NFRaof04QJj0YGCmdP63LOPNmSIX4QamMtMJbaZ18vI=',
    description: 'HWe are availbale for any home services',
    fact: '',
  },
  {
    name: 'Personal Services',
    image: 'https://media.istockphoto.com/id/1284843352/photo/the-technicians-are-cleaning-the-air-conditioner-by-spraying-water-hand-and-water-spray-are.jpg?s=612x612&w=0&k=20&c=pfIt5M1vW3W5v-5eF0yWFisMIVIR9pRokHQpiJnD7Xk= ',
    description: 'Any services you need personally are also available',
    fact: '',
  },
  // Add more pets as needed
];

const Carousel = () => {
  const [index, setIndex] = useState(0);

  const handleNext = () => {
    setIndex((prevIndex) => (prevIndex + 1) % petData.length);
  };

  const handlePrev = () => {
    setIndex((prevIndex) => (prevIndex - 1 + petData.length) % petData.length);
  };

  useEffect(() => {
    const interval = setInterval(handleNext, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Box height={"300px"} width={"100%"}  className='border-2'>
      {/* <Flex justify="center" mb={4}>
        <Button onClick={handlePrev} mr={2}>Previous</Button>
        <Button onClick={handleNext}>Next</Button>
      </Flex> */}
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.5 }}
        >
          <Box
            position="relative"
            width="100%"
            height="300px"
            borderWidth="1px"
            borderRadius="lg"
            overflow="hidden"
          >
            <Image
              src={petData[index].image}
              alt={petData[index].name}
              objectFit="cover"
              width="100%"
              height="400px"
            />
            <Box
              position="absolute"
              bottom={0}
              left={0}
              width="100%"
              bgGradient="linear(to-t, rgba(0, 0, 0, 0.8), transparent)"
              color="white"
              p={4}
              zIndex={2}
            >
              <Text fontWeight="bold" fontSize="xl">
                {petData[index].name}
              </Text>
              <Text mt={2}>{petData[index].description}</Text>
              <Text mt={2} fontStyle="italic" color="gray.300">
                {petData[index].fact}
              </Text>
            </Box>
          </Box>
        </motion.div>
      </AnimatePresence>
    </Box>
  );
};

export default Carousel;

import {
  Avatar,
  Box,
  Button,
  Flex,
  HStack,
  Image,
  Heading,
  Text,
  VStack,
  IconButton,
  useColorModeValue,
  InputGroup,
  InputLeftElement,
  Input 
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addpostid, addtoken } from "../Store/Slice/Userslice";
import { SearchIcon, CloseIcon } from '@chakra-ui/icons';
import { motion } from 'framer-motion';
import Carousel from "./Carousel";
import Review from "./Review";

const MotionBox = motion(Box);
const MotionIconButton = motion(IconButton);

const Dashboard = () => {
  const [post, setPost] = useState([]);
  const navigate = useNavigate();
  const [user, setuser] = useState([]);
  const dispatch = useDispatch();
  let admin = '';
  let token = localStorage.getItem("token");
  dispatch(addtoken(token));
  const id = useSelector(state => state.userdata._id);

  async function findPosts() {
    try {
      const res = await axios.get("http://localhost:8080/api/v2/getAllPosts")
        .catch((err) => console.log(err));
      if (!res) {
        navigate("/login");
      }
      const data = res.data.allposts;
      return data;
    } catch (error) {
      console.log(error);
      return [];
    }
  }

  const handleclick = (id) => {
    dispatch(addpostid(id));
    navigate(`/singlepost/${id}`);
  }

  const findadmin = async () => {
    let res = await axios.get(`http://localhost:8080/api/v1/getuser/${id}`)
      .catch((error) => console.log(error));
    let { role } = res.data.user;
    return res.data.user;
  }

  useEffect(() => {
    findadmin().then((data) => setuser(data)).catch((error) => console.log("Findamin nhi chala"));
    findPosts().then((data) => setPost(data)).catch((err) => console.log("findposts nhi chala"));
    if (user.role == "admin") {
      admin = "admin";
    }
  }, []);

  const [inputVisible, setInputVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const inputBg = useColorModeValue('white', 'gray.700');

  const handleToggle = () => {
    setInputVisible(!inputVisible);
  };

  const findCategory = async () => {
    let res = await axios.post(`http://localhost:8080/api/v2/findcategorie`, {
      category: searchTerm
    }).catch((err) => console.log("connect nhi hua"));
    return res.data.post.length == 0 ? post : res.data.post;
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      findCategory().then((data) => setPost(data)).catch((err) => console.log("Search nhi chala"));
      handleToggle();
    }
  };

  return (
    <VStack>
      <Carousel/>
      <HStack spacing={8} className="mt-4 w-screen">
            <Flex className="mr-4 border-2 ml-10"
            align="center"
            justify="space-between"
            bg="gray.100"
            p={2}
            borderRadius="md"
            width="200px"

          >
            {/* <Avatar name="John Doe" src="https://via.placeholder.com/150" /> */}
            <img className="h-12 w-12 rounded-2xl"src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTlMOFX0fJUy09h-WW6cY-4T7nzH65wjvfJNK2gIMteOXVs0ZK2dn3SoxbkxA&s"/>
            <Box ml={2}className="">
              <Text fontSize="xl">{user.username}</Text>
              <Text fontSize="sm" color="gray.600">
                {user.email}
              </Text>
            </Box>
            {
              user.role === "admin" ? <Link to='/adminpanel'><Button colorScheme="teal" variant="outline" size="sm">
                See all users
              </Button></Link> : ""
            }
          </Flex>
          <HStack className="ml-96">

            <MotionIconButton
              icon={inputVisible ? <CloseIcon /> : <SearchIcon />}
              onClick={handleToggle}
              aria-label="Search"
              initial={{ rotate: 0 }}
              animate={{ rotate: inputVisible ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            />
            <MotionBox
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: inputVisible ? '300px' : 0, opacity: inputVisible ? 1 : 0 }}
              transition={{ duration: 0.5 }}
              overflow="hidden"
            >
              <InputGroup>
                <InputLeftElement pointerEvents="none">
                  <SearchIcon color="gray.300" />
                </InputLeftElement>
                <Input
                  type="text"
                  placeholder="Search..."
                  bg={inputBg}
                  width="200px"
                  _placeholder={{ color: 'gray.500' }}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="border-2"
                />
              </InputGroup>
            </MotionBox>
            <InputGroup>
                <InputLeftElement pointerEvents="none">
                  <SearchIcon color="gray.300" />
                </InputLeftElement>
                <Input
                  type="text"
                  placeholder="Location..."
                  bg={inputBg}
                  width={"200px"}
                  _placeholder={{ color: 'gray.500' }}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyDown={handleKeyDown}
                />
              </InputGroup>
          </HStack>
          </HStack>
      <VStack width="100%" padding={"10px"} className="mb-2 ">
        <h1 className="text-3xl font-semibold mt-2">Our Services</h1>
        <VStack height="50%" m={2}>
          {/* <Carousel /> */}

        </VStack>

        <HStack
          id="add"
          width="100%"
          height="10%"
          overflowY="auto"
          css={{ "&::-webkit-scrollbar": { display: "none" } }}
        >
          
          {post && post.map((posts, index) => (
            <MotionBox
            key={posts._id}
            direction={{ base: "column", sm: "row" }}
            boxShadow="md"
            borderRadius="lg"
            overflow="visible"
            variant="outline"
            width="400px"  // Adjusted width to 400px
            height="200px" // Adjusted height to 600px
            position="relative"
            // margin="10px"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            whileHover={{ scale: 1.05 }}
            className="border-2 shadow-2xl"
          >
            <HStack px={4} py={2} spacing={4} width="50%" height="50%" className="mt-8">
              <Image
                objectFit="cover"
                maxW="200px"
                maxH="200px"
                src={posts.image}
                alt="Pet Image"
                margin="10px"
                padding="2px"
              />
              <VStack align="start" spacing={2} flex="1" maxW="calc(100% - 200px)" py={4}>
                <Heading size="md">{posts.name}</Heading>
                <Heading size="md">{posts.categories}</Heading>
                <Text>{posts.content.split(" ").slice(0, 10).join(" ")}...</Text>
              </VStack>
            </HStack>
            <Button
              variant="solid"
             bg="teal.300"
              position="absolute"
              bottom="2"
              right="6"
              fontSize="sm"
              width="100px"
              height="40px"
              lineHeight="40px"
              borderRadius="md"
              onClick={() => handleclick(posts._id)}
            >
              Book Now
            </Button>
          </MotionBox>
          ))}
        </HStack>
      </VStack>
      <h1 className="text-3xl font-semibold mt-2">Customer Reviews</h1>
      <Review/>
      
    </VStack>
  );
};

export default Dashboard;

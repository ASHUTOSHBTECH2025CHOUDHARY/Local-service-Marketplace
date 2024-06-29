import React, { useEffect, useState } from 'react';
import {
  Box, Button,Container, Heading, Input, HStack, Image, Text, extendTheme, ChakraProvider, FormControl, FormLabel, Spacer, VStack,
  Slider
} from '@chakra-ui/react';
import axios from 'axios';
import { useLocation, useNavigate, useNavigation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { addtoken } from '../Store/Slice/Userslice';

const Singlepost = () => {
  const activeLabelStyles = {
    transform: "scale(0.85) translateY(-24px)"
  };
  const navigate=useNavigate()
  let token =localStorage.getItem("token")
  const dispatch=useDispatch()
  dispatch(addtoken(token))
  const [receiverid,setrecieverid]=useState('');
  const userid=useSelector(state=>state.userdata._id)
  const [firstname, setfirstname] = useState('');
  const [Application,setApplication]=useState([]);
  const [lastname, setlastname] = useState('');
  const [content, setcontent] = useState('');
  const [email, setemail] = useState('');
  const handlefirstname = (e) => {
    setfirstname(e.target.value)
    console.log(firstname)
  }
  const findallplicatioins=async()=>{
    console.log("find application chala")
    let res=await axios.get(`http://localhost:8080/api/v3/getapplicaton/${_id}`).catch((err)=>{
        console.log(err)
    })
    return res.data.allapplication
}
  const handlelastnname = (e) => {
    setlastname(e.target.value)
    console.log(lastname)
  }
  const handleemail = (e) => {
    setemail(e.target.value)
    console.log(email)
  }
  const handlecontent = (e) => {
    setcontent(e.target.value)
    console.log(content)
  }
  const handleconversation=async()=>{
    await axios.post(`http://localhost:8080/api/v4/createconversation`,{
      senderid:_id,
      receiverid:receiverid
    })
    navigate(`/messenger/:${_id}`)
  }
  
  const theme = extendTheme({
    components: {
      Form: {
        variants: {
          floating: {
            container: {
              _focusWithin: {
                label: {
                  ...activeLabelStyles
                }
              },
              "input:not(:placeholder-shown) + label, .chakra-select__wrapper + label, textarea:not(:placeholder-shown) ~ label": {
                ...activeLabelStyles
              },
              "textarea:not(:placeholder-shown) + label, .chakra-select__wrapper + label, textarea:not(:placeholder-shown) ~ label": {
                ...activeLabelStyles
              },
              label: {
                top: 0,
                left: 0,
                zIndex: 2,
                position: "absolute",
                backgroundColor: "white",
                pointerEvents: "none",
                mx: 3,
                px: 1,
                my: 2,
                transformOrigin: "left top"
              }
            }
          }
        }
      }
    }
  });

  const location = useLocation();
  const [post, setpost] = useState([]);
  let _id = '';
  
  const logout = async () => {
    let res = await axios.get("http://localhost:8080/api/v1/logout", {
      withCredentials: true,
    });
    localStorage.clear()
    navigate("/login");
  };
  const findpost = async () => {
    let res = await axios.get(`http://localhost:8080/api/v2/getthispost/${_id}`,{withCredentials:true}).catch((error) => {
      logout()
  console.log(error)
  });
    let data = res.data.post;
    setrecieverid(data.userid)
    // console.log(receiverid)
    return data;
  }
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
  };
  const submithandler = async (e) => {
    e.preventDefault();
    let arr = location.pathname.split('/');
    _id = arr[2];
    console.log(_id);
    await axios.post(`http://localhost:8080/api/v3/createapplication`, {
      firstname: firstname,
      lastname: lastname,
      content: content,
      email: email,
      userid,
      postid: _id
    }).catch((err) => console.log(err));
    setfirstname('');
    setlastname('');
    setemail('');
    setcontent('');
    findallplicatioins().then((data)=>setApplication(data)).catch((err)=>console.log(err));
  }

  useEffect(() => {
    let arr = location.pathname.split('/');
    _id = arr[2];
    findpost().then((data) => setpost(data)).catch((err)=>console.log(err));
    findallplicatioins().then((data)=>setApplication(data)).catch((err)=>console.log(err));
    console.log(userid,_id)
  }, []);
  return (
    <VStack>
        <HStack p={10}>
          <Box
          direction={{ base: "column", sm: "row" }}
          boxShadow="lg"
          padding={4}
          borderRadius="md"
          overflow="hidden"
          variant="outline"
          width="100%"
          maxW="50%"
          minH="50vh"
          bg="white"
          border="1px solid #E2E8F0"
          _hover={{ boxShadow: "xl" }}
        >
        <Image
          objectFit="cover"
          width="full"
          maxH="300px"
          src={`${post.image}`}
          alt="Caffe Latte"
        />
        <Box px={4} py={2} width="100%">
          <Heading size="md" mt={4} mb={2}>Name: {post.name}</Heading>
          <Heading size="sd" mt={4} mb={2}>Categorie: {post.categories}</Heading>
          <Text fontWeight="semibold" py="2">
            {post.content}
          </Text>
          <Button onClick={handleconversation}>
            Chat
          </Button>
        </Box>
      </Box>
      <Box
        width="50%"
        m={3}
        border="1px solid #E2E8F0"
        borderRadius="md"
        boxShadow="md"
        p={4}
      >
        <ChakraProvider theme={theme}>
          <Heading p={3}>Review</Heading>
          <form onSubmit={submithandler}>
            <Box display="flex" justifyContent="space-between" flexWrap="wrap">
             
              
              <FormControl variant="floating" isRequired width="100%" mt={3}>
                <Input
                  value={email}
                  onChange={handleemail}
                  placeholder=" "
                />
                <FormLabel>Email</FormLabel>
              </FormControl>
              <FormControl variant="floating" isRequired width="100%" mt={3}>
                <Input
                  value={content}
                  onChange={handlecontent}
                  placeholder=" "
                />
                <FormLabel>Application</FormLabel>
              </FormControl>
            </Box>
            <Button mt={6} type="submit" colorScheme="blue">
              Submit
            </Button>
          </form>
        </ChakraProvider>
      </Box>
    </HStack>
    <Box overflowX="auto" maxW="100%" padding={3}>
    <Slider {...settings}>

    
    <HStack marginTop={0}>
        {
            Application.map((item,index)=>{
                return <Box
                key={index}
                direction={{ base: "column", sm: "row" }}
                boxShadow="md"
                borderRadius="lg"
                overflow="visible"
                variant="outline"
                width="100%"
                position="relative"
                minW="400px"
                maxW="full" 
                minH="200px" // Set maximum width // Set fixed height
              >
                <HStack px={4} py={2} spacing={4} width=" 100%" height="100%"> 
                  <VStack align="start" spacing={2} flex="1" maxW="calc(100% - 200px)" py={4}>
                    <Heading size="md">{item.firstname}</Heading>
                    <Heading size="md">{item.lastname}</Heading>
                    <Box maxW="100%" overflow="hidden" overflowY="auto">
                      <Text>
                          {item.content}
                      </Text>
                    </Box>
                  </VStack>
                </HStack>
                    <Button
                      variant="solid"
                      colorScheme="blue"
                      position="absolute"
                      bottom="4"
                      right="4"
                      fontSize="sm" // Set font size
                      width="100px" // Set fixed width
                      height="40px" // Set fixed height
                      lineHeight="40px" // Center button content vertically
                      borderRadius="md" // Apply border radius
                    >
                      Adopt it
                    </Button>
                <Button
                  variant="solid"
                  colorScheme="blue"
                  position="absolute"
                  bottom="4"
                  right="4"
                  fontSize="sm" // Set font size
                  width="100px" // Set fixed width
                  height="40px" // Set fixed height
                  lineHeight="40px" // Center button content vertically
                  borderRadius="md" // Apply border radius
                  
                >
                  Approve it
                </Button>
              </Box>
            })
        }
        </HStack>
        </Slider>
        </Box> 
    </VStack>
  );
}

export default Singlepost;
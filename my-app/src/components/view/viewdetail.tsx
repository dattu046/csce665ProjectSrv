import { Grid, GridItem, Box, Text, Button, useToast } from "@chakra-ui/react";
import { useLocation } from "react-router";
import { BsHandThumbsUp} from 'react-icons/bs';
import { useEffect, useState } from "react";

interface Post{
    id: string,
    postedBy: string,
    content: string,
    postedOn: string,
    views: number,
    credibility: number
}

const ViewDetail: React.FC = () => {
    const location = useLocation();
    const toast = useToast();

    const defaultState : Post = {} as Post;
    const [post, setPost] = useState(defaultState);

    useEffect(()=>{
        async function getBlogPost(){
            let data = await fetch(`http://localhost:8080/blogposts/${location.state.postId}`);
            const jsonData = await data.json();
            setPost(jsonData);
        }
        getBlogPost().catch(console.error);
    },[]);

    async function handleLike(){
        await fetch(`http://localhost:8080/blogposts/like/${post.id}`,{
                    method: 'POST',
                    headers:{
                        'Content-Type': "application/json"
                    },
        });

        toast({
            title: 'Post Liked !',
            status: 'success',
            isClosable: true,
            position: 'top-right'
          });
    }

    return (
        <Grid templateColumns='1fr' justifyItems='center'>
            <GridItem height='56px' />
            <GridItem width='1200px' height='900px' overflow='auto'>
                <Box border='0.8px solid #E6E8F0' borderRadius='8px' height='850px' overflow='auto'>
                    <Text fontSize='4xl' padding='16px'>Content</Text>
                    <Text fontSize='2xl' fontWeight='400' padding='16px'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Non arcu risus quis varius quam. Neque ornare aenean euismod elementum nisi quis eleifend. Cras pulvinar mattis nunc sed. Praesent tristique magna sit amet purus. Risus commodo viverra maecenas accumsan lacus vel. Mi tempus imperdiet nulla malesuada pellentesque elit eget gravida cum. In cursus turpis massa tincidunt dui ut. Facilisis mauris sit amet massa vitae tortor condimentum lacinia. Turpis in eu mi bibendum neque egestas congue. Pretium vulputate sapien nec sagittis aliquam.

Tincidunt dui ut ornare lectus. Feugiat sed lectus vestibulum mattis. Mi eget mauris pharetra et ultrices neque. Dictum non consectetur a erat nam at. Enim diam vulputate ut pharetra. Eu nisl nunc mi ipsum. Integer vitae justo eget magna fermentum iaculis eu non diam. Mattis molestie a iaculis at. Dolor sit amet consectetur adipiscing elit pellentesque habitant. Ut etiam sit amet nisl purus in mollis. Porttitor leo a diam sollicitudin tempor id eu. Aliquet sagittis id consectetur purus. Odio tempor orci dapibus ultrices in. Ultrices neque ornare aenean euismod elementum nisi quis. Pharetra magna ac placerat vestibulum lectus. Fermentum leo vel orci porta non pulvinar neque. Dictumst quisque sagittis purus sit amet volutpat consequat mauris nunc.

Maecenas volutpat blandit aliquam etiam erat. In fermentum posuere urna nec tincidunt praesent semper feugiat. Cursus risus at ultrices mi tempus imperdiet. Non quam lacus suspendisse faucibus. Dignissim sodales ut eu sem integer vitae justo eget. Ultrices gravida dictum fusce ut placerat orci. Semper viverra nam libero justo laoreet sit amet. Nec ultrices dui sapien eget mi proin sed libero enim. Sed libero enim sed faucibus turpis in eu. Ut sem nulla pharetra diam sit amet. Dolor morbi non arcu risus quis varius quam quisque. Ac felis donec et odio pellentesque diam volutpat. Ac tortor vitae purus faucibus. Auctor augue mauris augue neque gravida in fermentum et. Pellentesque adipiscing commodo elit at imperdiet. Quam vulputate dignissim suspendisse in est. Lacinia quis vel eros donec ac odio tempor orci dapibus. Massa eget egestas purus viverra accumsan in nisl. Lorem sed risus ultricies tristique nulla aliquet enim. Malesuada pellentesque elit eget gravida cum.

Diam sit amet nisl suscipit. Mauris cursus mattis molestie a. Suspendisse ultrices gravida dictum fusce ut placerat orci. At auctor urna nunc id cursus metus. Vivamus arcu felis bibendum ut tristique et. Rhoncus dolor purus non enim praesent. A erat nam at lectus urna duis convallis. Nec feugiat nisl pretium fusce id velit ut tortor. Bibendum enim facilisis gravida neque convallis a cras semper auctor. Morbi tristique senectus et netus et malesuada fames.

Justo eget magna fermentum iaculis eu non diam. Sit amet commodo nulla facilisi. Sem nulla pharetra diam sit amet nisl suscipit adipiscing. Tempor orci dapibus ultrices in iaculis nunc sed. Dolor sit amet consectetur adipiscing elit ut. Etiam sit amet nisl purus in. Elementum sagittis vitae et leo duis. Tempus urna et pharetra pharetra. Quis auctor elit sed vulputate mi sit amet. Sit amet dictum sit amet. Lobortis feugiat vivamus at augue eget. Non odio euismod lacinia at quis risus sed vulputate odio. At varius vel pharetra vel turpis nunc. Nisl tincidunt eget nullam non. Porta lorem mollis aliquam ut porttitor leo a diam sollicitudin. Cursus euismod quis viverra nibh. Erat imperdiet sed euismod nisi porta lorem. Sem integer vitae justo eget magna. Pellentesque id nibh tortor id aliquet. Feugiat sed lectus vestibulum mattis ullamcorper velit.</Text>
                </Box>
                
            </GridItem>
            <GridItem width='1200px' height='100px' overflow='auto'>
            <Button rightIcon={<BsHandThumbsUp />} 
                    colorScheme='blue' 
                    variant='outline' 
                    float='right'
                    onClick={handleLike}>
                Like Post
            </Button>
            </GridItem>
        </Grid>
    )
}

export default ViewDetail;
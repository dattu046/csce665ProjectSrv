import { Flex, Text, Spacer, Button, ButtonGroup } from "@chakra-ui/react";
import './styles.css';
import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface PageNavigationState {
    viewPage: boolean,
    createPage: boolean,
    createSanPage: boolean
}

const NavBar: React.FC = () => {
    const defaultPageNavigationState: PageNavigationState = {
        viewPage: true,
        createPage: false,
        createSanPage: false
    };

    const [pageNavState, setPageNavState] = useState(defaultPageNavigationState);
    const navigate = useNavigate();

    function handlePageNavigate(event: any) {
        switch (event.target.id) {
            case 'view':
                navigate('/view');
                setPageNavState({ viewPage: true, createPage: false, createSanPage: false });
                break;
            case 'create':
                navigate('/create')
                setPageNavState({ viewPage: false, createPage: true, createSanPage: false });
                break;
            case 'createsan':
                navigate('/createsan')
                setPageNavState({ viewPage: false, createPage: false, createSanPage: true });
                break;
            default:
                break;
        }
    }

    return (
        <Flex bg="#FFFFFF" borderBottom='0.5px solid #E6E8F0' width="100vw" alignItems='center' gap='24px' height='56px'>
                    <Spacer />
                    <Text alignSelf='center'>A Simple Blog Post Page</Text>
                    <Spacer />
                    <ButtonGroup onClick={handlePageNavigate}>
                        <Button className={`nav-button-container ${pageNavState.viewPage ? 'selected' : ''}`} id='view'>
                            <Text className={`nav-text ${pageNavState.viewPage ? 'bold' : ''}`}>View</Text>
                        </Button>
                        <Button className={`nav-button-container ${pageNavState.createPage ? 'selected' : ''}`} id='create'>
                            <Text className={`nav-text ${pageNavState.createPage ? 'bold' : ''}`}>Create</Text>
                        </Button>
                        <Button className={`nav-button-container ${pageNavState.createSanPage ? 'selected' : ''}`} id='createsan'>
                            <Text className={`nav-text ${pageNavState.createSanPage ? 'bold' : ''}`}>Create Sanitized</Text>
                        </Button>
                    </ButtonGroup>
        </Flex>
    );
}

export default NavBar;
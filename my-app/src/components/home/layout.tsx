import { Grid, GridItem } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import NavBar from "./navbar";

const Layout: React.FC = () => {
    return (
        <Grid
            templateAreas={`"header header"
                  "main main"`}
            gridTemplateRows={'56px 1fr'}
            height='100vh'
            width='100vw'
            fontWeight='bold'
        >
            <NavBar />
            <GridItem bg='#F5F5F5' area={'main'}>
                <Outlet />
            </GridItem>
        </Grid>
    );
}

export default Layout;
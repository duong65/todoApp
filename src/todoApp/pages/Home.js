import Container from "@mui/material/Container";
import Snackbar from "@mui/material/Snackbar";

import Layout from "../components/Layout";

const HomePage = () => {


    return (
        <Layout>
            <Snackbar
                autoHideDuration={2000}
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
            >
            </Snackbar>
            <Container maxWidth="xl">
                HOME PAGES
            </Container>
        </Layout>
    );
};

export default HomePage;
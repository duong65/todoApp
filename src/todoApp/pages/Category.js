import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import HomeIcon from "@mui/icons-material/Home";
import Layout from "../components/Layout";
import SearchComponent from "../components/Categories/Search";
import CategoryList from "../components/Categories/CategoryList";
import { getToken } from "../apis/userApi";
import * as api from "../apis/categoryApi";

const CategoryPage = () => {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const data = getToken();

        const getData = async () => {
            if (data) {
                const response = await api.getCategories(data.token);
                if (response.status === 200) {
                    setCategories(response.data.items);
                }
            }
        };

        getData();
    }, []);

    const handleSearch = (keyword) => {
        const getData = async () => {
            const data = getToken();
            const response = await api.getCategories(data.token);

            if (response.status === 200) {
                const categories =
                    keyword !== ""
                        ? response.data.items.filter(
                            (category) => category.name.toLowerCase().indexOf(keyword.toLowerCase()) !== -1
                        )
                        :
                        response.data.items;
                setCategories(categories);
            }
        };

        getData();
    };

    return (
        <Layout>
            <Container maxWidth="xl">
                <Grid container spacing={4} sx={{ my: 1.25 }}>
                    <Grid item xs={12}>
                        <Grid container sx={{ mb: 2.5 }}>
                            <Grid item xs={6}>
                                <Link
                                    to="/"
                                    style={{ textDecoration: "none", color: "#ffffff" }}
                                >
                                    <Button
                                        variant="contained"
                                        startIcon={<HomeIcon />}
                                        color="error"
                                        size="small"
                                    >
                                        Trang chủ
                                    </Button>
                                </Link>
                            </Grid>
                            <Grid item xs={6}>
                                <SearchComponent onSearch={handleSearch} />
                            </Grid>
                        </Grid>
                        <Grid container sx={{ my: 2.5 }}>
                            <Grid item xs={12}>
                                <CategoryList categories={categories} />
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Container>
        </Layout>
    );
};

export default CategoryPage;
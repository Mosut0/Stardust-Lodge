import React from "react";
import "./home.css";
import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import Featured from "../../components/featured/Featured";
import Footer from "../../components/footer/Footer";
import { useTranslation } from "react-i18next";

const Home = () => {
    const { t } = useTranslation();

    return (
        <div>
            <Navbar />
            <Header />
            <div className="homeContainer" role="main">
                <h1 className="homeTitle">{t("home.featured")}</h1>
                <Featured />
                <Footer />
            </div>
        </div>
    );
};

export default Home;

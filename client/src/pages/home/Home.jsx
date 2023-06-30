import "./home.css";
import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import Featured from "../../components/featured/Featured";
import PropertyList from "../../components/propertyList/PropertyList";
import Footer from "../../components/footer/Footer"

const Home = () => {
    return (
        <div>
            <Navbar />
            <Header />
            <div className="homeContainer">
                <h1 className="homeTitle">Featured Cities</h1>
                <Featured/>
                <Footer/>
            </div>
        </div>
    )
}

export default Home
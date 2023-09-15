import Header from "../Components/Header"
import MainContent from "../Components/MainContent"
import Footer from "../Components/Footer"

function Homepage() {
    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <MainContent className="flex-grow" />
            <Footer />
        </div>
    )
};

export default Homepage;
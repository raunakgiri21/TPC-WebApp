import SideMenu from "../components/nav/sideMenu"
const Home = () => {
    return (
        <div className="row">
            <div className="col-md-3">
                <SideMenu/>
            </div>
            <div className="col-md-9">
                <h4>Welcome to Home Page!</h4>
            </div>
        </div>
    )
}

export default Home
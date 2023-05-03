import SideMenu from "../components/nav/sideMenu"
const Home = () => {
    return (
        <div className="row">
            <div className="col-md-3 p-0">
                <SideMenu/>
            </div>
            <div className="col-md-9 p-0" style={{maxHeight: '92vh', overflowY: 'auto'}}>
                <h4>Welcome to Home Page!</h4>
            </div>
        </div>
    )
}

export default Home
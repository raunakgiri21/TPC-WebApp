import SideMenu from "../../components/nav/sideMenu"
import DrivesTable from "../../components/table/DrivesTable"

const MyDrives = () => {
    return (
        <div className="row">
            <div className="col-md-3 p-0">
                <SideMenu/>
            </div>
            <div className="col-md-9 p-0" style={{maxHeight: '92vh', overflowY: 'auto'}}>
                <DrivesTable myDrive={true}/>
            </div>
        </div>
    )
}

export default MyDrives
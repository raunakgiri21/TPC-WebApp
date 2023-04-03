import { useState, useEffect } from "react";
import { useAuth } from "../../context/auth"
// import UserMenu from "../../components/nav/UserMenu";
import TableComponent from "../../components/table/table";
import moment from 'moment'
import { Checkbox, InputNumber, Input, Button } from "antd";

const AdminDashboard = () => {
    const [auth,setAuth] = useAuth();
    const [userInfo,setInfo] = useState({});

    useEffect(() => {
        const data = auth.user;
        const dob = moment(data.dob).format('DD-MM-YYYY')
        setInfo({...data,dob: dob})
    },[])

    return (
        <>
        <div className="row">
            <div className="p-3 mt-2 mb-2 bg-light text-center">
                <h3>Students Data</h3>
            </div>
            <div className="row">
                <div className="col-md-3 bg-light vh-100">
                    <div className='container'>
                        <h5 className='p-3 mt-2 mb-2 rounded text-center' >
                            Filter By Branch
                        </h5>
                        <Checkbox value="ME">ME</Checkbox>
                        <Checkbox value="CE">CE</Checkbox>
                        <Checkbox value="EE">EE</Checkbox>
                        <Checkbox value="CHE">CHE</Checkbox>
                        <Checkbox value="ETE">ETE</Checkbox>
                        <Checkbox value="CSE">CSE</Checkbox>
                        <Checkbox value="INS">INS</Checkbox>
                        <Checkbox value="IPE">IPE</Checkbox>
                    </div>
                    <hr/>
                    <div className='container'>
                        <h5 className='p-3 mt-2 mb-2 rounded text-center' >
                            Search by Roll No.
                        </h5>
                        <div className="d-flex justify-content-between">
                        <InputNumber placeholder="Roll No." min={0} size="small"/>
                        <Button>Search</Button>
                        </div>
                    </div>
                    <hr/>
                </div>    
                <div className="col-md-9">
                    <div className="mt-2 mb-2 w-25">
                        <Input placeholder="Search by name"/>
                    </div>
                    <TableComponent/>
                </div>
            </div>
        </div>
        </>
    )
}

export default AdminDashboard
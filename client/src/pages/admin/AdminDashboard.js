import { useState} from "react";
// import UserMenu from "../../components/nav/UserMenu";
import TableComponent from "../../components/table/Table";
import { Checkbox, Input, Button, Row, Col } from "antd";

const AdminDashboard = () => {
    const [branch,setBranch] = useState([])
    const [search,setSearch] = useState('')
    const [rollNo,setRollNo] = useState('')
    const [trigger,setTrigger] = useState(true)

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
                        <Checkbox.Group value={branch} onChange={e => {setTrigger(prev => !prev);setBranch(e);setSearch('');setRollNo('')}}>
                            <Row>
                                <Col span={8}>
                                    <Checkbox value="ME">ME</Checkbox>                                    
                                </Col>
                                <Col span={8}>
                                    <Checkbox value="CE">CE</Checkbox>
                                </Col>
                                <Col span={8}>
                                    <Checkbox value="EE">EE</Checkbox>
                                </Col>
                                <Col span={8}>
                                    <Checkbox value="CHE">CHE</Checkbox>
                                </Col>
                                <Col span={8}>
                                    <Checkbox value="ETE">ETE</Checkbox>
                                </Col>
                                <Col span={8}>
                                    <Checkbox value="CSE">CSE</Checkbox>
                                </Col>
                                <Col span={8}>
                                    <Checkbox value="INS">INS</Checkbox>
                                </Col>
                                <Col span={8}>
                                    <Checkbox value="IPE">IPE</Checkbox>
                                </Col>
                            </Row>
                        </Checkbox.Group>
                    </div>
                    <hr/>
                    <div className='container'>
                        <h5 className='p-3 mt-2 mb-2 rounded text-center' >
                            Search by Roll No.
                        </h5>
                        <div className="d-flex justify-content-between">
                        <Input placeholder="Roll No." min={0} size="small" value={rollNo} onChange={e => setRollNo(e.target.value)}/>
                        <Button onClick={() => {setTrigger(prev => !prev);setBranch([]);setSearch('')}}>Search</Button>
                        </div>
                    </div>
                    <hr/>
                </div>    
                <div className="col-md-9">
                    <div className="mt-2 mb-2 w-25">
                        <Input placeholder="Search by name" value={search} onChange={(e) => {setTrigger(prev => !prev);setSearch(e.target.value);setRollNo('')}}/>
                    </div>
                    <TableComponent branch={branch} search={search} rollNo={rollNo} trigger={trigger}/>
                </div>
            </div>
        </div>
        </>
    )
}

export default AdminDashboard
import { useEffect, useState } from 'react';
import moment from 'moment';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import SideMenu from '../../components/nav/sideMenu';

import {Button,Col,DatePicker,Form,Input,InputNumber,Row,Select,Checkbox} from 'antd';
import { useNavigate, useParams } from 'react-router-dom';

const EditDrive = () => {
    const [name, setName] = useState('');
    const [designation,setDesignation] = useState('');
    const [description,setDescription] = useState('');
    const [tier,setTier] = useState(3);
    const [tierType,setTierType] = useState(3);
    const [salary,setSalary] = useState('');
    const [eligibleBranch,setEligibleBranch] = useState([])
    const [backlogsAllowed,setBacklogsAllowed] = useState('Yes')
    const [cgpaRequired,setCgpaRequired] = useState('');
    const [_12thPercentRequired,set_12thPercentRequired] = useState('');
    const [_10thPercentRequired,set_10thPercentRequired] = useState('');
    const [jobLocation,setJobLocation] = useState('');
    const [bond,setBond] = useState('');
    const [applyBefore,setApplyBefore] = useState(0);
    const [newApplyBefore,setNewApplyBefore] = useState(0);

    const [loading,setLoading] = useState(true)

    const params = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        loadDrive()
    },[])

    const loadDrive = async() => {
        try {
            setLoading(true)
            const {data} = await axios.get(`/drive/${params.driveID}`)
            const drive = data?.drive
            setName(drive?.name)
            setDescription(drive?.description)
            setDesignation(drive?.designation)
            setTier(drive?.tier)
            setTierType(drive?.tierType)
            setSalary(drive?.salary)
            setCgpaRequired(drive?.cgpaRequired)
            setEligibleBranch(drive?.eligibleBranch)
            set_10thPercentRequired(drive?._10thPercentRequired)
            set_12thPercentRequired(drive?._12thPercentRequired)
            setJobLocation(drive?.jobLocation)
            setBond(drive?.bond)
            setBacklogsAllowed(drive?.backlogsAllowed)
            setApplyBefore(drive?.applyBefore)
            setLoading(false)
        } catch (error) {
            toast.error("Error fetching drive data!")
        }
    }

    const updateButtonHandler = async(e) => {
        // e.preventDefault();
        try {
            const body = {
                name,designation,description,tier,tierType,salary,eligibleBranch,backlogsAllowed,cgpaRequired,_12thPercentRequired,_10thPercentRequired,jobLocation,bond
            }
            if(newApplyBefore){
                body.applyBefore = newApplyBefore;
            }
            const {data} = await axios.put(`/drive/update-post/${params.driveID}`,{body})
            navigate(`/view-drive/${params.driveID}`)
            toast.success(`SuccessFully Updated the drive!`)
        } catch (error) {
            console.log(error)
            toast.error(error?.response?.data?.error || "Error!")
        }
    }
    return (
    <div className="row">
        <div className="col-md-3">
            <SideMenu/>
        </div>
        <div className="col-md-9 p-5" style={{height: '91vh', overflowY: 'scroll'}}>
        {loading ? <h6>Loading</h6> :
        (<Form
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 14 }}
        layout="horizontal"
        style={{ maxWidth: 600}}
        initialValues={{eligibleBranch: eligibleBranch,comanyName: name}}
        onFinish={(e) => updateButtonHandler(e)}
        >
        <h5 style={{paddingLeft: '4rem', paddingBottom: '2rem'}}>Edit Company's Details</h5>
        <Form.Item label="Company Name" name="companyName">
            <Input placeholder="Company's Name" defaultValue={name} onChange={(e) => setName(e.target.value)}/>
        </Form.Item>
        <Form.Item label="Tier">
            <Form.Item name="tierNo" style={{ display: 'inline-block', width: '50%'}}>
            <Row gutter={8}>
                <Col span={12}>
                    <Select defaultValue={tier} onChange={(e) => setTier(e)}>
                        <Select.Option value={1}>I</Select.Option>
                        <Select.Option value={2}>II</Select.Option>
                        <Select.Option value={3}>III</Select.Option>
                    </Select>
                </Col>    
            </Row> 
            </Form.Item>
            <Form.Item name="tierType" style={{ display: 'inline-block', width: '50%'}}>
                <Row gutter={8}>
                <Col span={12}>    
                    <Select defaultValue={tierType} onChange={(e) => setTierType(e)}>
                        <Select.Option value={1}>Core</Select.Option>
                        <Select.Option value={2}>IT</Select.Option>
                        <Select.Option value={3}>Others</Select.Option>
                    </Select>
                </Col>
                </Row>
            </Form.Item> 
        </Form.Item>
        <Form.Item label="Designation" name="designation">
            <Input placeholder="" defaultValue={designation} onChange={(e) => setDesignation(e.target.value)}/>
        </Form.Item>
        <Form.Item label="Description" name="description">
            <Input.TextArea placeholder='Write description...' defaultValue={description} onChange={(e) => setDescription(e.target.value)}/>
        </Form.Item>
        <Form.Item label="Salary" name="salary">
            <Input placeholder="" defaultValue={salary} onChange={(e) => setSalary(e.target.value)}/>
        </Form.Item>
        <Form.Item label="Eligible Branch" name="eligibleBranch">
            <Checkbox.Group onChange={e => setEligibleBranch(e)}>
            <Row>
            <Col span={8}>
                <Checkbox value="ME" style={{ lineHeight: '32px' }}>
                ME
                </Checkbox>
            </Col>
            <Col span={8}>
                <Checkbox value="CE" style={{ lineHeight: '32px' }}>
                CE
                </Checkbox>
            </Col>
            <Col span={8}>
                <Checkbox value="EE" style={{ lineHeight: '32px' }}>
                EE
                </Checkbox>
            </Col>
            <Col span={8}>
                <Checkbox value="CHE" style={{ lineHeight: '32px' }}>
                CHE
                </Checkbox>
            </Col>
            <Col span={8}>
                <Checkbox value="ETE" style={{ lineHeight: '32px' }}>
                ETE
                </Checkbox>
            </Col>
            <Col span={8}>
                <Checkbox value="CSE" style={{ lineHeight: '32px' }}>
                CSE
                </Checkbox>
            </Col>
            <Col span={8}>
                <Checkbox value="INS" style={{ lineHeight: '32px' }}>
                INS
                </Checkbox>
            </Col>
            <Col span={8}>
                <Checkbox value="IPE" style={{ lineHeight: '32px' }}>
                IPE
                </Checkbox>
            </Col>
            </Row>
            </Checkbox.Group>
        </Form.Item>
        <Form.Item label="Backlogs Allowed?" initialValue={backlogsAllowed} name="backlogsAllowed">
            <Select onChange={(e) => setBacklogsAllowed(e)}>
                <Select.Option value={"Yes"}>Yes</Select.Option>
                <Select.Option value={"No"}>No</Select.Option>
                <Select.Option value={"1"}>1</Select.Option>
                <Select.Option value={"2"}>2</Select.Option>
                <Select.Option value={"3"}>3</Select.Option>
            </Select>
        </Form.Item>
        <Form.Item label="Required CGPA" name="cgpaRequired">
            <Input placeholder="e.g. '7.5'" defaultValue={cgpaRequired} onChange={(e) => setCgpaRequired(e.target.value)}/>
        </Form.Item>
        <Form.Item label="Min. 10th Percentage" name="_10thPercentRequired">
            <Input placeholder="e.g. '85'" defaultValue={_10thPercentRequired} onChange={(e) => set_10thPercentRequired(e.target.value)}/>
        </Form.Item>
        <Form.Item label="Min. 12th Percentage" name="_12thPercentRequired">
            <Input placeholder="e.g. '75'" defaultValue={_12thPercentRequired}  onChange={(e) => set_12thPercentRequired(e.target.value)}/>
        </Form.Item>              
        <Form.Item label="Job Location" name="jobLocation">
            <Input placeholder="" defaultValue={jobLocation} onChange={(e) => setJobLocation(e.target.value)}/>
        </Form.Item>
        <Form.Item label="Bond" name="bond">
            <Input defaultValue={bond} onChange={(e) => setBond(e.target.value)}/>
        </Form.Item>
        <Form.Item label="Last Apply Date">
            <span className="ant-form-text">{moment(applyBefore).format('hh:mm A / DD-MM-YYYY')}</span>
        </Form.Item>
        <Form.Item label="Change Apply Within" initialValue={0} name="applyBefore">
            <Select onChange={(e) => setNewApplyBefore(e)}>
                <Select.Option value={0}>No Change</Select.Option>
                <Select.Option value={1}>1 Hour from Now</Select.Option>
                <Select.Option value={2}>2 Hour from Now</Select.Option>
                <Select.Option value={3}>3 Hour from Now</Select.Option>
                <Select.Option value={6}>6 Hour from Now</Select.Option>
                <Select.Option value={12}>12 Hour from Now</Select.Option>
                <Select.Option value={24}>1 day from Now</Select.Option>
                <Select.Option value={48}>2 days from Now</Select.Option>
                <Select.Option value={72}>3 days from Now</Select.Option>
                <Select.Option value={96}>4 days from Now</Select.Option>
                <Select.Option value={120}>5 days from Now</Select.Option>
                <Select.Option value={144}>6 days from Now</Select.Option>
                <Select.Option value={168}>1 week from Now</Select.Option>
            </Select>
        </Form.Item>
        <Form.Item>
            <Button type="primary" htmlType="submit">Update</Button>
        </Form.Item>
        </Form>)}
        </div>
    </div>
    )
}

export default EditDrive
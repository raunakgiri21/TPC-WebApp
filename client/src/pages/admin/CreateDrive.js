import { useState } from 'react';
import moment from 'moment';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import SideMenu from '../../components/nav/sideMenu';

import {Button,Col,DatePicker,Form,Input,InputNumber,Row,Select,Checkbox} from 'antd';

const CreateDrive = () => {
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
    const [applyBefore,setApplyBefore] = useState(24);

    const submitButtonHandler = async(e) => {
        // e.preventDefault();
        try {
            const body = {
                name,designation,description,tier,tierType,salary,eligibleBranch,backlogsAllowed,cgpaRequired,_12thPercentRequired,_10thPercentRequired,jobLocation,bond,applyBefore
            }
            const {data} = await axios.post('/drive/post',{body})
            toast.success(`SuccessFully Created a Post!`)
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
        <Form
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 14 }}
        layout="horizontal"
        style={{ maxWidth: 600}}
        onFinish={(e) => submitButtonHandler(e)}
        >
        <h5 style={{paddingLeft: '4rem', paddingBottom: '2rem'}}>Enter Company's Details</h5>
        <Form.Item label="Company Name" name="companyName" rules={[{ required: true, message: "Please enter company's name" }]}>
            <Input placeholder="Company's Name" onChange={(e) => setName(e.target.value)}/>
        </Form.Item>
        <Form.Item label="Tier">
            <Form.Item name="tierNo" style={{ display: 'inline-block', width: '50%'}}>
            <Row gutter={8}>
                <Col span={12}>
                    <Select defaultValue={3} onChange={(e) => setTier(e)}>
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
                    <Select defaultValue={3} onChange={(e) => setTierType(e)}>
                        <Select.Option value={1}>Core</Select.Option>
                        <Select.Option value={2}>IT</Select.Option>
                        <Select.Option value={3}>Others</Select.Option>
                    </Select>
                </Col>
                </Row>
            </Form.Item> 
        </Form.Item>
        <Form.Item label="Designation" name="designation" rules={[{ required: true }]}>
            <Input placeholder="" onChange={(e) => setDesignation(e.target.value)}/>
        </Form.Item>
        <Form.Item label="Description" name="description" rules={[{ required: true, message: "Please enter company's description!" }]}>
            <Input.TextArea placeholder='Write description...' onChange={(e) => setDescription(e.target.value)}/>
        </Form.Item>
        <Form.Item label="Salary" name="salary" rules={[{ required: true }]}>
            <Input placeholder="" onChange={(e) => setSalary(e.target.value)}/>
        </Form.Item>
        <Form.Item label="Eligible Branch" name="eligibleBranch" rules={[ {required: true}]}>
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
        <Form.Item label="Backlogs Allowed?" initialValue={"Yes"} name="backlogsAllowed" rules={[{ required: true }]}>
            <Select onChange={(e) => setBacklogsAllowed(e)}>
                <Select.Option value={"Yes"}>Yes</Select.Option>
                <Select.Option value={"No"}>No</Select.Option>
                <Select.Option value={"1"}>1</Select.Option>
                <Select.Option value={"2"}>2</Select.Option>
                <Select.Option value={"3"}>3</Select.Option>
            </Select>
        </Form.Item>
        <Form.Item label="Required CGPA" name="cgpaRequired" rules={[{ required: true }]}>
            <Input placeholder="e.g. '7.5'" onChange={(e) => setCgpaRequired(e.target.value)}/>
        </Form.Item>
        <Form.Item label="Min. 10th Percentage" name="_10thPercentRequired" rules={[{ required: true }]}>
            <Input placeholder="e.g. '85'" onChange={(e) => set_10thPercentRequired(e.target.value)}/>
        </Form.Item>
        <Form.Item label="Min. 12th Percentage" name="_12thPercentRequired" rules={[{ required: true }]}>
            <Input placeholder="e.g. '75'" onChange={(e) => set_12thPercentRequired(e.target.value)}/>
        </Form.Item>              
        <Form.Item label="Job Location" name="jobLocation" rules={[{ required: true }]}>
            <Input placeholder="" onChange={(e) => setJobLocation(e.target.value)}/>
        </Form.Item>
        <Form.Item label="Bond" name="bond" rules={[ {required: true}]}>
            <Input onChange={(e) => setBond(e.target.value)}/>
        </Form.Item>
        <Form.Item label="Apply Before" initialValue={24} name="applyBefore" rules={[ {required: true}]}>
            <Select onChange={(e) => setApplyBefore(e)}>
                <Select.Option value={1}>1 Hour</Select.Option>
                <Select.Option value={3}>3 Hour</Select.Option>
                <Select.Option value={6}>6 Hour</Select.Option>
                <Select.Option value={12}>12 Hour</Select.Option>
                <Select.Option value={24}>1 day</Select.Option>
                <Select.Option value={48}>2 days</Select.Option>
                <Select.Option value={72}>3 days</Select.Option>
                <Select.Option value={96}>4 days</Select.Option>
                <Select.Option value={120}>5 days</Select.Option>
                <Select.Option value={144}>6 days</Select.Option>
                <Select.Option value={168}>1 week</Select.Option>
            </Select>
        </Form.Item>
        <Form.Item>
            <Button type="primary" htmlType="submit">Submit</Button>
        </Form.Item>
        </Form>
        </div>
    </div>
    )
}

export default CreateDrive
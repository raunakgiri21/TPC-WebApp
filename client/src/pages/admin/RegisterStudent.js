import { useState } from 'react';
import moment from 'moment';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import SideMenu from '../../components/nav/sideMenu';

import {Button,DatePicker,Form,Input,InputNumber,Select} from 'antd';

const RegisterStudent = () => {
    const [name, setName] = useState('');
    const [email,setEmail] = useState('');
    const [rollNo,setRollNo] = useState('');
    const [branch,setBranch] = useState('');
    const [caste,setCaste] = useState('');
    const [dob,setDob] = useState('')
    const [overAllCGPA,setOverAllCGPA] = useState('')
    const [backlogCount,setBacklogCount] = useState(0);
    const [_12thPercent,set_12thPercent] = useState('');
    const [_10thPercent,set_10thPercent] = useState('');
    const [isTier1Placed,setIsTier1Placed] = useState(false);
    const [isTier2Placed,setIsTier2Placed] = useState(0);
    const [isBlacklisted,setIsBlacklisted] = useState(false);

    const submitButtonHandler = async(e) => {
        // e.preventDefault();
        try {
            const password = name.split(' ').join('') + String(rollNo)
            const _data = {
                name,email,password,rollNo,branch,caste,dob,overAllCGPA,backlogCount,_12thPercent,_10thPercent,isT1Placed: isTier1Placed,isT2Placed: isTier2Placed,isBlacklisted
            }
            const {data} = await axios.post('/auth/register-user',_data)
            toast.success(`SuccessFully Registered a new User!`)
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
            <h5 style={{paddingLeft: '4rem', paddingBottom: '2rem'}}>Enter Student's Details</h5>
            <Form.Item label="Name" name="Name" rules={[{ required: true, message: "Please enter student's name" }]}>
                <Input placeholder="Student's Name" onChange={(e) => setName(e.target.value)}/>
            </Form.Item>
            <Form.Item label="Email" name="email" rules={[{ required: true, message: "Please enter student's email" },{type: 'email',message: "Invalid Email"}]}>
                <Input placeholder="Student's Email" onChange={(e) => setEmail(e.target.value)}/>
            </Form.Item>
            <Form.Item label="Roll No." name="rollNo" rules={[{ required: true, message: "Please enter student's roll no." },{type: 'number',message: "Invalid"}]}>
                <InputNumber placeholder='e.g. 19111' onChange={(e) => setRollNo(e)}/>
            </Form.Item>
            <Form.Item label="Branch" name="branch" rules={[ {required: true}]}>
                <Select placeholder="Select Branch" onChange={(e) => setBranch(e)}>
                <Select.Option value="ME">ME</Select.Option>
                <Select.Option value="CE">CE</Select.Option>
                <Select.Option value="EE">EE</Select.Option>
                <Select.Option value="CHE">CHE</Select.Option>
                <Select.Option value="ETE">ETE</Select.Option>
                <Select.Option value="CSE">CSE</Select.Option>
                <Select.Option value="INS">INS</Select.Option>
                <Select.Option value="IPE">IPE</Select.Option>
                </Select>
            </Form.Item>
            <Form.Item label="Caste" name="caste" rules={[ {required: true}]}>
                <Select placeholder="Select Caste" onChange={(e) => setCaste(e)}>
                <Select.Option value="General">General</Select.Option>
                <Select.Option value="EWS">EWS</Select.Option>
                <Select.Option value="OBC">OBC</Select.Option>
                <Select.Option value="SC">SC</Select.Option>
                <Select.Option value="ST">ST</Select.Option>
                </Select>
            </Form.Item>
            <Form.Item  label="Date of Birth" name="dob" rules={[ {required: true}]}>
                <DatePicker onChange={(e) => setDob(moment(e).format('DD/MM/YYYY'))}/>
            </Form.Item>
            <Form.Item label="OverAll CGPA" name="overAllCGPA" rules={[{ required: true}]}>
                <Input placeholder='e.g. 8.4' onChange={(e) => setOverAllCGPA(e.target.value)}/>
            </Form.Item>
            <Form.Item label="Backlogs" name="backlogCount" rules={[{ required: true},{type: 'number',message: "Invalid"}]}>
                <InputNumber onChange={(e) => setBacklogCount(e)}/>
            </Form.Item>
            <Form.Item label="12th Percentage" name="_12thPercent" rules={[{ required: true}]}>
                <Input placeholder='e.g. 82.5' onChange={(e) => set_12thPercent(e.target.value)}/>
            </Form.Item>
            <Form.Item label="10th Percentage" name="_10thPercent" rules={[{ required: true}]}>
                <Input placeholder='e.g. 85' onChange={(e) => set_10thPercent(e.target.value)}/>
            </Form.Item>
            <Form.Item label="Tier 1 Placed" name="isTier1Placed">
                <Select defaultValue={false} onChange={(e) => setIsTier1Placed(e)}>
                <Select.Option value={true}>Yes</Select.Option>
                <Select.Option value={false}>No</Select.Option>
                </Select>
            </Form.Item>
            <Form.Item label="Tier 2 Placed" name="isTier2Placed">
                <Select defaultValue={0} onChange={(e) => setIsTier2Placed(e)}>
                <Select.Option value={0}>No</Select.Option>
                <Select.Option value={1}>Core</Select.Option>
                <Select.Option value={2}>IT</Select.Option>
                <Select.Option value={3}>Others</Select.Option>
                </Select>
            </Form.Item>
            <Form.Item label="Blacklist" name="isBlacklisted">
                <Select defaultValue={false} onChange={(e) => setIsBlacklisted(e)}>
                <Select.Option value={false}>No</Select.Option>
                <Select.Option value={true}>Yes</Select.Option>
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

export default RegisterStudent
import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { Form, Input, InputNumber, Select, DatePicker, Button } from "antd";
import { Navigate, useNavigate, useParams } from "react-router-dom";

import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';

const ViewUser = () => {
    dayjs.extend(customParseFormat);

    const [name, setName] = useState('');
    const [email,setEmail] = useState('');
    const [rollNo,setRollNo] = useState('');
    const [branch,setBranch] = useState('');
    const [caste,setCaste] = useState('');
    const [dob,setDob] = useState('')
    const [prevDob,setPrevDob] = useState('')
    const [overAllCGPA,setOverAllCGPA] = useState('')
    const [backlogCount,setBacklogCount] = useState(0);
    const [_12thPercent,set_12thPercent] = useState('');
    const [_10thPercent,set_10thPercent] = useState('');
    const [isTier1Placed,setIsTier1Placed] = useState('');
    const [isTier2Placed,setIsTier2Placed] = useState(0);
    const [isBlacklisted,setIsBlacklisted] = useState(false);
    const [address,setAddress] = useState('');

    const [loading, setLoading] = useState(true);

    const params = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        setLoading(true)
        loadData();
    },[])

    const loadData = async() => {
        try {
            const _data = await axios.get(`/auth/${params.userID}`)
            setName(_data.data.name)
            setEmail(_data.data.email)
            setBranch(_data.data.branch)
            setCaste(_data.data.caste)
            setRollNo(_data.data.rollNo)
            setDob(_data.data.dob)
            setOverAllCGPA(_data.data.overAllCGPA)
            setBacklogCount(_data.data.backlogCount)
            set_12thPercent(_data.data._12thPercent)
            set_10thPercent(_data.data._10thPercent)
            setIsBlacklisted(_data.data.isBlacklisted)
            setIsTier1Placed(_data.data.isT1Placed)
            setIsTier2Placed(_data.data.isT2Placed)
            setAddress(_data.data.address)
            setPrevDob(_data.data.dob.slice(0,10))
            setLoading(false)
        } catch (error) {
            toast.error("Error fetching user details!")
            console.log(error)
        }
    }

    const submitButtonHandler = async(e) => {
        // e.preventDefault();
        try {
            const password = name+String(rollNo)
            const _data = {
                name,email,password,rollNo,branch,caste,dob,overAllCGPA,backlogCount,_12thPercent,_10thPercent,isT1Placed: isTier1Placed,isT2Placed: isTier2Placed,isBlacklisted,address
            }
            const {data} = await axios.put(`/auth/register-user/${params.userID}`,_data)
            toast.success(`SuccessFully Updated User!`)
        } catch (error) {
            console.log(error)
            toast.error(error?.response?.data?.error || "Error!")
        }
    }

    const deleteButtonHandler = async() => {
        try {
            const {data} = await axios.delete(`/auth/delete-user/${params.userID}`)
            toast.success(`Deleted ${data?.user?.name}`)
            navigate('/admin/dashboard')
        } catch (error) {
            
        }
    }

    const html = !loading ? (
        <Form
            className="d-flex flex-column justify-content-center"
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 14 }}
            layout="horizontal"
            style={{ minWidth: 300}}
            initialValues={{name,email,rollNo,branch,caste,overAllCGPA,_10thPercent,_12thPercent,isBlacklisted,isTier1Placed,isTier2Placed,backlogCount}}
            onFinish={(e) => submitButtonHandler(e)}
            >
            <Form.Item label="Name" name="name" rules={[{ required: true, message: "Please enter student's name" }]}>
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
            <Form.Item label="Date of Birth" name="dob">
                <DatePicker placeholder={prevDob} onChange={(e) => setDob(e)}/>
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
                <Select defaultValue={isTier1Placed} onChange={(e) => setIsTier1Placed(e)}>
                <Select.Option value={true}>Yes</Select.Option>
                <Select.Option value={false}>No</Select.Option>
                </Select>
            </Form.Item>
            <Form.Item label="Tier 2 Placed" name="isTier2Placed">
                <Select defaultValue={isTier2Placed} onChange={(e) => setIsTier2Placed(e)}>
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
                <div className="d-flex justify-content-evenly text-center">
                    <Button type="primary" htmlType="submit">Update</Button>
                    <Button type="primary" danger onClick={deleteButtonHandler}>Delete</Button>
                </div>
            </Form>
    ):<h5>Loading</h5>

    return (
        <div >
            <div className="p-5" style={{height: '91vh', overflowY: 'scroll'}}>
            {html}
            </div>
        </div>
        
    )
}

export default ViewUser
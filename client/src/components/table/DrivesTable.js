import { Table } from 'antd';
import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useAuth } from '../../context/auth';
const columns = [
  {
    title: 'Post No.',
    dataIndex: 'postNo',
    key: 'postNo',
  },
  {
    title: 'Company',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Tier',
    dataIndex: 'tier',
    key: 'tier',
  },
  {
    title: 'Tier-Type',
    dataIndex: 'tierType',
    key: 'tierType',
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
  },
  {
    title: 'Action',
    dataIndex: '',
    key: 'x',
    render: (_,record) => <NavLink className='list-group-item list-group-item-action' style={{color: 'blue'}} to={`/view-drive/${record._id}`}>View</NavLink>,
  },
];
const data = [
  {
    postNo: 1,
    company: 'TCS',
    tier: 2,
    tierType: 'IT',
    description: 'My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.',
  },
];
const DrivesTable = () => {
    // state
    const [data,setData] = useState([])
    const [auth,setAuth] = useAuth()

    useEffect(() => {
        loadDrives()
    },[]);

    const loadDrives = async() => {
        try {
            const _tier = ['I','II','III'];
            const _tierType = ['Core','IT','Others'];
            const {data} = await axios.get('/drive')
            const _data = data?.drive.map(d => {
                return {
                    _id: d._id,
                    key: d._id,
                    postNo: d.postNo,
                    name: d.name,
                    tier: _tier[d.tier - 1],
                    tierType: _tierType[d.tierType - 1],
                    status: d?.appliedBy?.includes(auth?.user?.userID) ? 'Applied' : '-',
                }
            })
            setData(_data)
        } catch (error) {
            console.log(error)
            toast.error("Error fetching Drives Data!")
        }
    }

    return(
        <Table
        columns={columns}
        dataSource={data}
        bordered size={'large'}/>
    )
}
export default DrivesTable;
import { Table } from 'antd';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { NavLink } from 'react-router-dom';
const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    width: 250,
  },
  {
    title: 'Branch',
    dataIndex: 'branch',
    width: 150,
  },
  {
    title: 'Email',
    dataIndex: 'email',
    width: 250,
  },
  {
    title: 'RollNo.',
    dataIndex: 'rollNo',
  },
  {
    title: 'Action',
    key: 'operation',
    fixed: 'right',
    width: 100,
    render: (_,record) => <NavLink className='list-group-item list-group-item-action' style={{color: 'blue'}} to={`/admin/view-user/${record._id}`}>View</NavLink>,
  },
];
const data = [];
for (let i = 0; i < 100; i++) {
  data.push({
    _id: i,
    name: `Edward King ${i}`,
    branch: 32,
    rollNo: `London, Park Lane no. ${i}`,
  });
}
const TableComponent = ({branch,search,rollNo,trigger}) => {
    const [data,setData] = useState([]);

    useEffect(() => {
        loadData();
    },[trigger])

    const loadData = async() => {
      try {
        const queryStrings = {
          params: {}
        }
        if(search) {
          queryStrings.params['search'] = search;
        }
        if(branch) {
          queryStrings.params['branch'] = branch;
        }
        if(rollNo) {
          queryStrings.params['rollNo'] = rollNo;
        }
        const _data = await axios.get('/auth',queryStrings);
        setData(_data?.data);
      } catch (error) {
          toast.error(error?.response?.data?.error || 'Error fetching data!')
          console.log(error)
      }
    }
    return (
        <Table
          columns={columns}
          dataSource={data}
          pagination={{
            pageSize: 50,
          }}
          scroll={{
            y: 450,
          }}
        />
      );
}
export default TableComponent;
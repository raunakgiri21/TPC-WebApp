import { useState, useEffect } from "react";
import { useAuth } from "../../context/auth"
// import UserMenu from "../../components/nav/UserMenu";
import moment from 'moment'

const UserDashboard = () => {
    const [auth,setAuth] = useAuth();
    const [userInfo,setInfo] = useState({});
    const t2 = ['No','Core','IT','Others'];

    useEffect(() => {
        const data = auth.user;
        const dob = moment(data.dob).format('DD-MM-YYYY')
        setInfo({...data,dob: dob})
    },[])

    return (
        <>
        
        <div className="container-fluid">
            <div className="row">
                <div className="col">
                    <div className="p-3 mt-2 mb-2 bg-light">
                        <h4>{auth?.user?.isAdmin ? 'Admin' : 'User'} Information</h4>
                    </div>

                    <table className="table">
                    <tbody>
                        <tr className="table-light">
                        <th scope="row">Name</th>
                        <td>{userInfo.name}</td>
                        <td></td>
                        </tr>
                        <tr className="table">
                        <th scope="row">Email</th>
                        <td>{userInfo.email}</td>
                        <td></td>
                        </tr>
                        <tr className="table-light">
                        <th scope="row">Branch</th>
                        <td>{String(userInfo.branch).toUpperCase()}</td>
                        <td></td>
                        </tr>
                        <tr className="table">
                        <th scope="row">Roll No.</th>
                        <td>{userInfo.rollNo}</td>
                        <td></td>
                        </tr>
                        <tr className="table-light">
                        <th scope="row">Caste</th>
                        <td>{userInfo.caste}</td>
                        <td></td>
                        </tr>
                        <tr className="table">
                        <th scope="row">DOB</th>
                        <td>{userInfo.dob}</td>
                        <td></td>
                        </tr>
                        <tr className="table-light">
                        <th scope="row">Is T1 Placed?</th>
                        <td>{userInfo.isT1Placed?'Yes':'No'}</td>
                        <td></td>
                        </tr>
                        <tr className="table">
                        <th scope="row">Is T2 Placed?</th>
                        <td>{t2[userInfo.isT2Placed]}</td>
                        <td></td>
                        </tr>
                        <tr className={userInfo.isBlacklisted?'table-danger':'table-light'}>
                        <th scope="row">BlackListed</th>
                        <td>{userInfo.isBlacklisted?'Yes':'No'}</td>
                        <td></td>
                        </tr>
                        <tr className="table">
                        <th scope="row">Overall CGPA</th>
                        <td>{userInfo.overAllCGPA} CGPA</td>
                        <td></td>
                        </tr>
                        <tr className='table-light'>
                        <th scope="row">Backlog Count</th>
                        <td>{userInfo.backlogCount}</td>
                        <td></td>
                        </tr>
                        <tr className="table">
                        <th scope="row">12th Percentage</th>
                        <td>{userInfo._12thPercent}%</td>
                        <td></td>
                        </tr>
                        <tr className="table-light">
                        <th scope="row">10th Percentage</th>
                        <td>{userInfo._10thPercent}%</td>
                        <td></td>
                        </tr>
                        <tr className="table">
                        <th scope="row">Address</th>
                        <td>{userInfo.address}</td>
                        <td></td>
                        </tr>
                    </tbody>
                    </table>
                </div>
            </div>
        </div>
        </>
    )
}

export default UserDashboard
import { useParams } from "react-router-dom"
import SideMenu from "../../components/nav/sideMenu"
import { useEffect, useState } from "react"
import moment from "moment"
import axios from "axios"
import { Statistic, Button } from "antd"
import { toast } from "react-hot-toast"

const ViewDrive = () => {
    const _tier = ['I','II','III'];
    const _tierType = ['Core','IT','Others']

    // states
    const [drive,setDrive] = useState({})
    const [isExpired,setIsExpired] = useState(true)
    const [trigger,setTrigger] = useState(false)
    // hooks
    const params = useParams()

    const {Countdown} = Statistic;

    useEffect(() => {
        loadDrive()
    },[trigger])

    const loadDrive = async() => {
        try {
            const {data} = await axios.get(`/drive/${params.driveID}`)
            setDrive(data?.drive)
            setIsExpired(new Date() > (new Date(data?.drive?.applyBefore)))
        } catch (error) {
            toast.error("Error viewing drive")
        }
    }
    const countdownFinish = async() => {
        try {
            if(new Date() > (new Date(drive?.applyBefore)))
                setTrigger(prev => !prev)
        } catch (error) {
            toast.error("Something went wrong!")
        }
    }
    return(
        <div className="row">
            <div className="col-md-3 p-0">
                <SideMenu/>
            </div>
            <div className="col-md-7 p-5" style={{maxHeight: '92vh', overflowY: 'auto'}}>
            <dl className="row">
                <dt className="col-sm-3" style={{fontSize: '24px'}}>Post No. {drive?.postNo}</dt>
                <hr/>
                <dt className="col-sm-3">Company</dt>
                <dd className="col-sm-9">{drive?.name}</dd>
                <dt className="col-sm-3">Tier</dt>
                <dd className="col-sm-9">{_tier[drive?.tier - 1]}  -  {_tierType[drive?.tierType - 1]}</dd>
                <dt className="col-sm-3">Package</dt>
                <dd className="col-sm-9">{drive?.salary}</dd>
                <dt className="col-sm-3 text-truncate">Designation</dt>
                <dd className="col-sm-9">{drive?.designation}</dd>
                <dt className="col-sm-3">Description</dt>
                <dd className="col-sm-9">{drive?.description}</dd>
                <dt className="col-sm-3">Job Location</dt>
                <dd className="col-sm-9">{drive?.jobLocation}</dd>
                <dt className="col-sm-3">Bond</dt>
                <dd className="col-sm-9">{drive?.bond}</dd>
                <dt className="col-sm-3" style={{marginTop: '10px',marginBottom: '5px'}}><u>Eligibility Criteria</u> :-</dt>
                <dl className="row" style={{paddingLeft: '2.5rem'}}>
                    <dt className="col-sm-4">Branch</dt>
                    <dd className="col-sm-8">{drive?.eligibleBranch?.join(', ')}</dd>
                    <dt className="col-sm-4">Minimum Current CGPA</dt>
                    <dd className="col-sm-8">{drive?.cgpaRequired} CGPA</dd>
                    <dt className="col-sm-4">Minimum Score in 12th</dt>
                    <dd className="col-sm-8">{drive?._12thPercentRequired}%</dd>
                    <dt className="col-sm-4">Minimum Score in 10th</dt>
                    <dd className="col-sm-8">{drive?._10thPercentRequired}%</dd>
                    <dt className="col-sm-4">Backlogs Allowed</dt>
                    <dd className="col-sm-8">{drive?.backlogsAllowed}</dd>
                </dl>
                <dt className="col-sm-3">Apply Before</dt>
                <dd className="col-sm-9">{moment(drive?.applyBefore).format('hh:mm A / DD-MM-YYYY')}</dd>
            </dl>
                <Button type="primary" hidden={isExpired}>Apply</Button>
            </div>
            <div className="col-md-2">
                <h5 className={`text-${isExpired?'danger':'success'} p-5 text-center`}>{isExpired? 'Expired' : 'Eligible'}</h5>
                {!isExpired ? 
                <div className="d-flex flex-column align-items-center">
                    <h5>Time Remaining</h5>
                    <Countdown value={drive?.applyBefore} onFinish={() => countdownFinish()} format="Dd HH:mm:ss"  />
                </div>: <></>}
            </div>
        </div>
    )
}

export default ViewDrive
import { useNavigate, useParams } from "react-router-dom"
import SideMenu from "../../components/nav/sideMenu"
import { useEffect, useState } from "react"
import moment from "moment"
import axios from "axios"
import { Statistic, Button, Spin } from "antd"
import { toast } from "react-hot-toast"
import { useAuth } from "../../context/auth"

const ViewDrive = () => {
    const _tier = ['I','II','III'];
    const _tierType = ['Core','IT','Others']

    // context
    const [auth,setAuth] = useAuth()
    // states
    const [drive,setDrive] = useState({})
    const [isExpired,setIsExpired] = useState(true)
    const [isApplied,setIsApplied] = useState(false)
    const [isEligible,setIsEligible] = useState(true)
    const [reason,setReason] = useState("")
    const [trigger,setTrigger] = useState(false)
    const [loading,setLoading] = useState(true)
    // hooks
    const params = useParams()
    const navigate = useNavigate()

    const {Countdown} = Statistic;

    useEffect(() => {
        loadDrive()
    },[trigger])

    const loadDrive = async() => {
        try {
            setLoading(true)
            const {data} = await axios.get(`/drive/${params.driveID}`)
            if(auth.user?.isBlacklisted){
                setReason("You are blacklisted for the time being!")
                setIsEligible(false)
            }
            else if(auth.user?.isT1Placed){
                setReason("You are already placed in a Tier 1 Company!")
                setIsEligible(false)
            }
            else if(data?.drive?.tier ===2 && auth.user?.isT2Placed === data?.drive?.tierType){
                setReason(`You are already placed in Tier 2 ${_tierType[data?.drive?.tier]}`)
                setIsEligible(false)
            }
            else if(!data?.drive?.eligibleBranch?.includes(auth.user.branch)){
                setReason("Your Branch is not eligible for this drive!")
                setIsEligible(false)
            }
            else if((data?.drive?.backlogsAllowed !== "Yes") && ((data?.drive?.backlogsAllowed === "No" && auth.user?.backlogCount) || (auth.user?.backlogCount > Number(data?.drive?.backlogsAllowed)))){
                setReason(`Only ${data?.drive?.backlogsAllowed} backlog(s) is/are allowed, but you have ${auth.user?.backlogCount} backlog(s)!`)
                setIsEligible(false)
            }
            else if(Number(data?.drive?.cgpaRequired) > Number(auth.user?.overAllCGPA)){
                setReason(`Your CGPA (${auth.user?.overAllCGPA}) doesn't meet the drive's eligibilty criteria!`)
                setIsEligible(false)
            }
            else if(Number(data?.drive?._10thPercentRequired) > Number(auth.user?._10thPercent)){
                setReason(`Your have low Percentage in 10th!`)
                setIsEligible(false)
            }
            else if(Number(data?.drive?._12thPercentRequired) > Number(auth.user?._12thPercent)){
                setReason(`Your have low Percentage in 12th!`)
                setIsEligible(false)
            }
            setDrive(data?.drive)
            setIsApplied(data?.drive?.appliedBy?.includes(auth?.user?.userID))
            setIsExpired(new Date() > (new Date(data?.drive?.applyBefore)))
            setLoading(false)
        } catch (error) {
            setLoading(false)
            toast.error("Error viewing drive")
        }
    }
    
    const applyButtonHandler = async() => {
        try {
            setLoading(true)
            const {data} = await axios.put('/drive/apply',{userID: auth?.user.userID,driveID: drive?._id})
            toast.success("Successfully Applied!")
            setTrigger(prev => !prev)
        } catch (error) {
            setLoading(false)
            toast.error("Error applying to drive")
        }
    }
    
    const withdrawButtonHandler = async() => {
        try {
            setLoading(true)
            const {data} = await axios.put('/drive/withdraw',{userID: auth?.user.userID,driveID: drive?._id})
            toast("Application Withdrawn!",{icon: '🚫'})
            setTrigger(prev => !prev)
        } catch (error) {
            setLoading(false)
            toast.error("Error withdrawing the drive")
        }
    }

    const editButtonHandler = async() => {
        try {
            navigate(`/admin/edit-drive/${drive?._id}`)
        } catch (error) {
            toast.error("Error opening edit form!")
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
            {loading ? 
            <div className="col-md-9 p-0 d-flex align-items-center justify-content-center">
                <Spin size="large"/>
            </div> :
            <>
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
                {auth?.user?.role === 'Admin' ?
                <Button type="primary" onClick={() => editButtonHandler()}>Edit</Button>
                : (isApplied ? 
                <Button type="primary" hidden={isExpired} onClick={withdrawButtonHandler} disabled={!isEligible} danger>
                    Withdraw
                </Button> :
                <Button type="primary" hidden={isExpired} onClick={applyButtonHandler} disabled={!isEligible}>
                    Apply
                </Button>)
                }
            </div>
            <div className="col-md-2">
                <h5 className={`text-${auth?.user?.role === 'Admin' ? 'info': (isExpired?'danger':isEligible?'success':'warning')} p-5 text-center`}>{auth?.user?.role === 'Admin' ? 'Admin' :(isExpired? 'Expired' : isEligible? 'Eligible' : 'Not Eligible')}<h6 className={`text-muted text-center p-1`} hidden={isEligible || isExpired}><br></br>{reason}</h6></h5>
                {!isExpired ? 
                <div className="d-flex flex-column align-items-center">
                    <h5>Time Remaining</h5>
                    <Countdown value={drive?.applyBefore} onFinish={() => countdownFinish()} format="Dd HH:mm:ss"  />
                </div>: <></>}
            </div>
            </>}
        </div>
    )
}

export default ViewDrive
const User = require('../models/user')

const jwt = require('jsonwebtoken')
const {hashPassword, comparePassword} = require('../helpers/auth')


const registerAdmin = async(req,res) => {
    try {
        const body = req.body;
        const {name, email, password} = body;
        if(!name.trim()){
            return res.status(400).json({error: "Name is required!"})
        }
        if(!email){
            return res.status(400).json({error: "email is required!"})
        }
        if(!password || password.length<8){
            return res.status(400).json({error: "Password must be atleast 8 characters long!"})
        }
        const isExisting = await User.findOne({email: email})
        if(isExisting){
            return res.status(400).json({error: "User already exixts!"})
        }
        const hashedPassword = await hashPassword(password);
        const user = await User.create({...body, password: hashedPassword, isAdmin: 1})
        // jwt
        const token = jwt.sign({_id: user._id}, process.env.JWT_SECRET, {expiresIn: "7d"});
        res.status(200).json({user: {
            userID: user._id,
            name: user.name,
            email: user.email,
            rollNo: user.rollNo,
            role: !user.isAdmin?'Student':'Admin',
            branch: user.branch,
            overAllCGPA: user.overAllCGPA,
            backlogCount: user.backlogCount,
            _12thPercent: user._12thPercent,
            _10thPercent: user._10thPercent,
            isBlacklisted: user.isBlacklisted,
            isT1Placed: user.isT1Placed,
            isT2Placed: user.isT2Placed,
            address: user.address,
        },token});
    } catch (error) {
        res.status(400).json({msg : "Error while registering!"});
        console.log(error)
    }
}

const registerUser = async(req,res) => {
    try {
        const body = req.body;
        const {name, email, password, dob} = body;
        if(!name.trim()){
            return res.status(400).json({error: "Name is required!"})
        }
        if(!email){
            return res.status(400).json({error: "email is required!"})
        }
        if(!password || password.length<8){
            return res.status(400).json({error: "Password must be atleast 8 characters long!"})
        }
        const isExisting = await User.findOne({email: email})
        if(isExisting){
            return res.status(400).json({error: "User already exixts!"})
        }
        const hashedPassword = await hashPassword(password);
        const _dob = parseInt(new Date(dob).valueOf());
        // console.log(_dob,new Date(_dob).toLocaleDateString("en-US"))
        const user = await User.create({...body, password: hashedPassword, dob: _dob})
        res.status(200).json({user: {
            userID: user._id,
            name: user.name,
            email: user.email,
            rollNo: user.rollNo,
            role: !user.isAdmin?'Student':'Admin',
            branch: user.branch,
            overAllCGPA: user.overAllCGPA,
            backlogCount: user.backlogCount,
            _12thPercent: user._12thPercent,
            _10thPercent: user._10thPercent,
            isBlacklisted: user.isBlacklisted,
            isT1Placed: user.isT1Placed,
            isT2Placed: user.isT2Placed,
            address: user.address,
        }});
    } catch (error) {
        res.status(400).json({msg : "Error while registering!"});
        console.log(error)
    }
}

const login = async(req,res) => {
    try {
        const body = req.body;
        const {email, password} = body;
        if(!email){
            return res.status(400).json({error: "email is required!"})
        }
        if(!password){
            return res.status(400).json({error: "password is required!"})
        }
        const user = await User.findOne({email: email});
        if(!user){
            return res.status(400).json({error: "User doesn't exists!"})
        }
        const isPasswordCorrect = await comparePassword(password,user.password);
        if(!isPasswordCorrect){
            return res.status(400).json({error: "incorrect password!"})
        }
        // jwt
        const token = jwt.sign({_id: user._id}, process.env.JWT_SECRET, {expiresIn: "7d"});
        res.status(201).json({user: {
            userID: user._id,
            name: user.name,
            email: user.email,
            rollNo: user.rollNo,
            role: !user.isAdmin?'Student':'Admin',
            branch: user.branch,
            caste: user.caste,
            dob: user.dob,
            overAllCGPA: user.overAllCGPA,
            backlogCount: user.backlogCount,
            _12thPercent: user._12thPercent,
            _10thPercent: user._10thPercent,
            isBlacklisted: user.isBlacklisted,
            isT1Placed: user.isT1Placed,
            isT2Placed: user.isT2Placed,
            address: user.address,
        },token});
    } catch (error) {
        res.status(400).json({msg : "Login Failed!"});
        console.log(error)
    }
}

const getAllUsers = async(req,res) => {
    try {
        const {branch,search,rollNo} = req.query;
        const queryObject = {}
        if(branch){
            queryObject.branch = branch ;
        }
        if(rollNo){
            queryObject.rollNo = {$regex: rollNo, $options: 'i'};
        }
        if(search){
            queryObject.name = {$regex: search, $options: 'i'};
        }
        const users = await User.find(queryObject).select('-password');
        res.status(200).json(users);
    } catch (error) {
        res.status(400).json({msg : "Unable to get users data!"});
        console.log(error)
    }
}

const getUserByID = async(req,res) => {
    try {
        const users = await User.findById(req.params.userID).select('-password');
        res.status(200).json(users);
    } catch (error) {
        res.status(400).json({msg : "Unable to get users data!"});
        console.log(error)
    }
}

const updateUser = async(req,res) => {
    try {
        // console.log(req.body)
        // const hashedPassword = await hashPassword(req.body?.password);
        const user = await User.findByIdAndUpdate(req.params.userID,{...req.body},{new: true});
        res.status(200).json({user: {
            userID: user._id,
            name: user.name,
            email: user.email,
            rollNo: user.rollNo,
            role: !user.isAdmin?'Student':'Admin',
            branch: user.branch,
            caste: user.caste,
            overAllCGPA: user.overAllCGPA,
            backlogCount: user.backlogCount,
            _12thPercent: user._12thPercent,
            _10thPercent: user._10thPercent,
            isBlacklisted: user.isBlacklisted,
            isT1Placed: user.isT1Placed,
            isT2Placed: user.isT2Placed,
            address: user.address,
        }})
    } catch (error) {
        res.status(400).json({msg : "Unable to update users data!"});
        console.log(error)        
    }
}

const deleteUser = async(req,res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.userID)
        if(!user){
            return res.status(404).json({msg: "User Doesn't Exists!"})
        }
        res.status(200).json({msg: "SuccessFully deleted!",user})
    } catch (error) {
        res.status(400).json({msg : "Unable to update users data!"});
        console.log(error)          
    }
}

module.exports = {registerAdmin,registerUser,login,getAllUsers,getUserByID,updateUser,deleteUser}
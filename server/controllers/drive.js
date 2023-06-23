const Drive = require('../models/drive')
const User = require('../models/user')
const excelJS = require('exceljs')
const moment = require('moment');

const getPost = async(req,res) => {
    try {
        const drive = await Drive.find({}).sort('-postNo');
        res.status(200).json({msg: "Success",drive})
    } catch (error) {
        res.status(400).json({msg: "error while getting posts"})
        console.log(error)
    }
}

const getPostByID = async(req,res) => {
    try {
        const drive = await Drive.findById(req.params.driveID);
        res.status(200).json({msg: "Success",drive})
    } catch (error) {
        res.status(400).json({msg: "error while getting post data"})
        console.log(error)
    }
}
 
const createPost = async(req,res) => {
    try {
        const body = req.body.body;
        const drives = await Drive.find({}).limit(1).sort({$natural:-1});
        const postNo = drives[0].postNo + 1;
        const _applyBefore = parseInt(new Date().valueOf()) + body.applyBefore*3600*1000;
        // console.log(_applyBefore,body.applyBefore,new Date(_applyBefore).toLocaleString("en-US"))
        const drive = await Drive.create({...body,postNo: postNo, applyBefore: _applyBefore})
        res.status(200).json({msg: "Success",drive})
    } catch (error) {
        res.status(400).json({msg: "error while creating a post"})
        console.log(error)
    }
}

const updatePost = async(req,res) => {
    try {
        const body = req.body;
        const postID = req.params.postID;
        if(body?.body?.applyBefore){
            const _applyBefore = parseInt(new Date().valueOf()) + body?.body?.applyBefore*3600*1000;
            const drive = await Drive.findByIdAndUpdate(postID,{...body.body, applyBefore: _applyBefore},{new: true});
            return res.status(200).json({msg: "Success",drive})
        }
        const drive = await Drive.findByIdAndUpdate(postID,{...body.body},{new: true});
        return res.status(200).json({msg: "Success",drive})
    } catch (error) {
        res.status(400).json({msg: "error while updating the post"})
        console.log(error)
    }
}

const applyToPost = async(req,res) => {
    try {
        const {userID,driveID} = req.body;
        const drive = await Drive.findByIdAndUpdate(driveID,
            { $addToSet: { appliedBy: userID } },
            {new: true})
        res.status(200).json({msg: 'success',drive})    
    } catch (error) {
        res.status(400).json({msg: "error while applying the post"})
        console.log(error) 
    }
}

const withdrawFromPost = async(req,res) => {
    try {
        const {userID,driveID} = req.body;
        const drive = await Drive.findByIdAndUpdate(driveID,
            { $pull: { appliedBy: userID } },
            {new: true})
        res.status(200).json({msg: 'success',drive})    
    } catch (error) {
        res.status(400).json({msg: "error while withdrawing the post"})
        console.log(error) 
    }
}

const deletePost = async(req,res) => {
    try {
        const postID = req.params.postID;
        const drive = await Drive.findByIdAndDelete(postID);
        if(!drive){
            return res.status(404).json({msg: "Post Doesn't Exists!"})
        }
        return res.status(200).json({msg: "Success",drive})
    } catch (error) {
        res.status(400).json({msg: "error while deleting the post"})
        console.log(error)
    }
}

const generateExcelSheet = async(req,res) => {
    try {
        const workbook = new excelJS.Workbook();
        const workSheet = workbook.addWorksheet("Students Data");
        
        workSheet.columns = [
            {header: "S.No.",key: "s_no"},
            {header: "Name",key: "name", width: "20"},
            {header: "Email",key: "email", width: "20"},
            {header: "Branch",key: "branch", width: "10"},
            {header: "Roll No.",key: "rollNo", width: "10"},
            {header: "CGPA",key: "overAllCGPA", width: "10"},
            {header: "12th Percentage",key: "_12thPercent", width: "15"},
            {header: "10th Percentage",key: "_10thPercent", width: "15"},
            {header: "DOB",key: "newDob", width: "12"},
        ];
        
        let counter = 1;
        
        const driveData = await Drive.findById(req.params.driveID);
        const userList = driveData?.appliedBy;
        const userData = await User.find({'_id': { $in: userList }});

        userData.forEach((user) => {
            user.s_no = counter++;
            user.newDob = moment(user.dob).format("DD/MM/YYYY")
            workSheet.addRow(user);
        })

        workSheet.getRow(1).eachCell((cell) => {
            cell.font = {bold: true}
        })

        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.setHeader("Content-Disposition", "attachment; filename=" + "Report.xlsx");
        workbook.xlsx.write(res)
            .then(() => {
                res.status(200);
                console.log('File write done........');
            });

    } catch (error) {
        res.status(400).json({msg: "error while generating excel sheet!"})
        console.log(error)
    }
}

module.exports = {createPost, getPost, getPostByID, updatePost, deletePost, applyToPost, withdrawFromPost, generateExcelSheet}
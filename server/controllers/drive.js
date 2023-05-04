const Drive = require('../models/drive')

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

module.exports = {createPost, getPost, getPostByID, updatePost, deletePost, applyToPost, withdrawFromPost}
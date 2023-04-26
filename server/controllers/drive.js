const Drive = require('../models/drive')

const getPost = async(req,res) => {
    try {
        const drive = await Drive.find({});
        res.status(200).json({msg: "Success",drive})
    } catch (error) {
        res.status(400).json({msg: "error while getting posts"})
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
        if(body.applyBefore){
            const _applyBefore = parseInt(new Date().valueOf()) + body.applyBefore*3600*1000;
            const drive = await Drive.findByIdAndUpdate(postID,{...body, applyBefore: _applyBefore},{new: true});
            return res.status(200).json({msg: "Success",drive})
        }
        const drive = await Drive.findByIdAndUpdate(postID,{...body});
        return res.status(200).json({msg: "Success",drive})
    } catch (error) {
        res.status(400).json({msg: "error while updating the post"})
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

module.exports = {createPost, getPost, updatePost, deletePost}
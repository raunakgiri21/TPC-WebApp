const express = require('express');
const router = express.Router();

// middleware


// controllers
const {registerAdmin,registerUser,login,getAllUsers,getUserByID,updateUser,deleteUser} = require('../controllers/auth');
const { authenticationMiddleware, isAdminMiddleware } = require('../middleware/auth');


// routes
router.get('/',authenticationMiddleware,isAdminMiddleware,getAllUsers)
router.get('/auth-check',authenticationMiddleware,(req,res) => {
    res.status(200).json({ok: true})
})
router.get('/admin-check',authenticationMiddleware,isAdminMiddleware,(req,res) => {
    res.status(200).json({ok: true})
})
router.get('/:userID',authenticationMiddleware,getUserByID)
router.post('/register',registerAdmin)
router.post('/login',login)
router.post('/register-user',authenticationMiddleware,isAdminMiddleware,registerUser)
router.put('/register-user/:userID',authenticationMiddleware,isAdminMiddleware,updateUser)
router.delete('/delete-user/:userID',authenticationMiddleware,isAdminMiddleware,deleteUser)


module.exports = router
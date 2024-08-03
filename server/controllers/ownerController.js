const Owner= require('../models/ownerSchema');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const signup = async(req, res)=>{
    try{
        const {email, discordId, password, confirmPassword} = req.body;

        if(!email || !discordId || !password || !confirmPassword){
            return res.status(400).json({msg: 'Please enter all fields'});
        }

        if (!email.includes('@') || !email.includes('.')) {
            return res.status(400).json({ msg: 'Invalid email format' });
        }
        else if (!/^\d+$/.test(discordId)) {
            return res.status(400).json({msg: 'Discord ID should contain only numbers'});
        }
        else if(password.length < 8){
            return res.status(400).json({msg: 'Password must be at least 8 characters long'});
        }
        else if(confirmPassword !== password){
            return res.status(400).json({msg: 'Passwords do not match'});
        }


        const existingOwner = await Owner.findOne({email});
        if(existingOwner){
            return res.status(400).json({msg: 'Owner already exists'});
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const owner = await Owner.create({email, discordId, password: hashedPassword});

        const token = jwt.sign({id:owner._id}, process.env.JWT_SECRET);
        res.cookie('token', token, {httpOnly: true})

        return res.status(201).json({msg: 'Owner created', owner, token});
    }
    catch(err){
        console.log(err);
        return res.status(500).json({msg: 'Internal server error'});
    }
}

const signin = async(req, res)=>{
    try{
        const { email, password } = req.body;

        if(!email || !password){
            return res.status(400).json({msg: 'Please enter all fields'});
        }

        if (!email.includes('@') || !email.includes('.')) {
            return res.status(400).json({ msg: 'Invalid email format' });
        }
        else if(password.length < 8){
            return res.status(400).json({msg: 'Password must be at least 8 characters long'});
        }

        const existingOwner = await Owner.findOne({email});
        const passwordMatch = await bcrypt.compare(password, existingOwner.password);
        if(!existingOwner || !passwordMatch){
            return res.status(400).json({msg: 'Invalid credentials'});
        }

        const token = jwt.sign({id:existingOwner._id}, process.env.JWT_SECRET);
        res.cookie('token', token, {httpOnly: true});

        return res.status(200).json({msg: 'Owner signed in', owner: existingOwner, token});
    }
    catch(err){
        console.log(err);
        return res.status(500).json({msg: 'Internal server error'});
    }
}

const getMembers = async(req, res)=>{
    try{
        console.log(req.user);
        const ownerId = req.user;
        const owner = await Owner.findById(ownerId);

        const members = owner.members;

        return res.status(200).json({members});
    }
    catch(err){
        console.log(err);
        return res.status(500).json({msg: 'Internal server error'});
    }
}

module.exports = { signup, signin, getMembers };
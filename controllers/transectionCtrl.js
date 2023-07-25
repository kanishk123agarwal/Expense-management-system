const transectionModel=require('../models/transectionModel');
const moment=require('moment');

const getAllTransection=async(req,res)=>{
    try {
        const {frequency,selectedDate,type} = req.body
        const transection=await transectionModel.find({
            ...(frequency !== 'custom' ?{
                date:{
                    $gt:moment().subtract(Number(frequency),'d').toDate()
                  },
            }:{
                date:{
                    $gte:selectedDate[0],
                    $lte:selectedDate[1]
                }
            }),
            userid:req.body.userid,
            ...(type!=="all" && {type}),
        });
        res.status(200).json(transection);
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}

const editTransection=async(req,res)=>{
    try {
        await transectionModel.findOneAndUpdate({_id:req.body.trasactionId},req.body.payload);
        res.status(200).send("Edit successfully");
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}

const deleteTransection=async(req,res)=>{
    try {
        await transectionModel.findOneAndDelete({_id:req.body.transactionId})
        res.status(200).send("Transaction deleted successfully")
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}

const addTransection=async(req,res)=>{
    try {
        const newTransection=new transectionModel(req.body);
        await newTransection.save();
        res.status(201).send("Transection add successfully");
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}

module.exports={
    getAllTransection,
    addTransection,
    editTransection,
    deleteTransection
}
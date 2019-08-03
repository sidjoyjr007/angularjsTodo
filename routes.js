const express=require('express');
const router=express.Router();
const mongo=require('mongodb').MongoClient
router.post("/",(req,res)=>{
    console.log(req.body.id)
    req.header("Accept","application/json")
  setTimeout(function(){   mongo.connect("mongodb://127.0.0.1:27017",(err,db)=>{
         let dbo=db.db('todos');
         if(err) res.send({data:'not_ok'})
         else{
            dbo.collection('todolist').insertOne({
                 _id: req.body.id,
                todo:req.body.todo,
                date:req.body.date
            },(err,response)=>{
                    if(err) {console.log(err); res.send({data:'not_ok'})}
                    else{res.send({data:'ok'})}
                })
                db.close();
         }
        
     })
    },2000)
})

router.get("/:date",(req,res)=>{
    console.log(req.params.date)
    setTimeout(function(){   mongo.connect("mongodb://127.0.0.1:27017",(err,db)=>{
        let dbo=db.db('todos');
        if(err) res.send({data:'not_ok'})
        else{
           dbo.collection('todolist').find({date:req.params.date
           }).toArray((err,response)=>{
               console.log(response)
                   if(err)  res.send({data:'not_ok'})
                   else{res.send( {data:'ok',response:response})}
               })
               db.close();
        }
       
    })
   },2000)
})

router.post("/delete",(req,res)=>{
    console.log(req.body)
    setTimeout(function(){   mongo.connect("mongodb://127.0.0.1:27017",(err,db)=>{
        let dbo=db.db('todos');
        if(err) res.send({data:'not_ok'})
        else{
           dbo.collection('todolist').deleteOne({_id:req.body.id},(err,response)=>{
               console.log(response)
                   if(err)  res.send({data:'not_ok'})
                   else{res.send( {data:'ok',response:response})}
               })
               db.close();
        }
       
    })
   },2000)
})

router.post("/update",(req,res)=>{
    console.log(req.body)
    setTimeout(function(){   mongo.connect("mongodb://127.0.0.1:27017",(err,db)=>{
        let dbo=db.db('todos');
        if(err) res.send({data:'not_ok'})
        else{
           dbo.collection('todolist').updateOne({_id:req.body.id},{$set:{completed:true}} ,(err,response)=>{
               console.log(response)
                   if(err)  res.send({data:'not_ok'})
                   else{res.send( {data:'ok',response:response})}
               })
               db.close();
        }
       
    })
   },2000)
})
module.exports=router
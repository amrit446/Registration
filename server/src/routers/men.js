const express=require("express");
const router =new express.Router();

const Users=require("../models/mens")



router.get("/users",  async (req, res, next) => {
  let users;
  try {
    users = await Users.find();
  } catch (err) {
    console.log(err);
  }

  if (!users) {
    return res.status(404).json({ message: "No products found" });
  }
  return res.status(200).json({ users });
})
  

  

  
  

  
router.post("/reg", async(req, res)=>{
    try{
      const addingMensRecords=new Users(req.body);
      console.log(req.body);
      const insertMens=await addingMensRecords.save();
      res.status(201).send(insertMens);
    }
    catch(e){
      res.send(e);
    }
  })
  
  
module.exports = router;
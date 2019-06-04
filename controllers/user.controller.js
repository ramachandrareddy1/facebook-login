let methods={};

methods.getApi=(req,res,next)=>{
    res.send('test api');
};

module.exports=methods;
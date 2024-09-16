
const onlyAdminAccess =async (req,res,next)=>{
    try{
        if(req.user.role != 1){
            return res.status(403).json({message:"Access denied"})
            
        }
    }
    catch (error) {
        return res.status(400).json({
            success: false,
            msg: 'something went wrong'
        });
    }
}

module.exports = onlyAdminAccess
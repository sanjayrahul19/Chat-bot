export const html=async(req,res)=>{
try {
  res.sendFile(__dirname + '/index.html');
} catch (error) {
    console.log(error)
}
}
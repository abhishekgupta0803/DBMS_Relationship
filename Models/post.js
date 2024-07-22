const mongoose = require('mongoose');
const Schema = mongoose.Schema;

main().then((reslt)=>{
    console.log("Connect to DB");
}).catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/rltShip');

};

const userSchema = mongoose.Schema({
    username: String,
    email: String,
});

const postSchema = mongoose.Schema({
     content:String,
     likes:Number,
     user:{
        type: Schema.Types.ObjectId,
        ref:"User",
     }
});
const User = mongoose.model("User",userSchema);
const Post = mongoose.model("Post",postSchema);

const addData  = async () =>{

    let user1 = new User({
        username:"Rahul_Kumar",
        email:"rahul@gmail.com",

    });

    let post1= new Post({
        content:"bye bye",
        likes: 7,

    });

      post1.user = user1;

    // let usr =   await user1.save();
    let pst =   await post1.save();

    // console.log(usr);
    console.log(pst);
} 

addData();
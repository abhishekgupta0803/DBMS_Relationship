//one to many r/s
const mongoose = require('mongoose');


main().then((reslt)=>{
    console.log("Connect to DB");
}).catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/rltShip');

};

let userSchema = mongoose.Schema({
    userName: String,
    address:[
        {   
            _id:false,
            location: String,
            city: String,
        },
    ],
});

let user = mongoose.model("user",userSchema);

const UserDetails = async ()=>{

    let details = new user({
        userName: "Abhishek",
        address: {
            location : "Pooja Sweets..",
            city: "Muzaffarnagar",
        }
    });

    details.address.push({location:"Gandhi Park", city:"GZB"});

    let result = await details.save();
    console.log(result);
    
};

UserDetails();

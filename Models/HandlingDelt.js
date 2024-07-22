const mongoose = require('mongoose');
const Schema = mongoose.Schema;

main().then((reslt)=>{
    console.log("Connect to DB");
}).catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/rltShip');

};

let OrderSchema = mongoose.Schema({
    item: String,
    price: Number,
});


//customer schema
const customerSchema = mongoose.Schema({
    name:String,
    orders:[
        {
            type:Schema.Types.ObjectId,
            ref: "Order",
        },
    ],
});

// customerSchema.pre("findOneAndDelete", async ()=>{
//  console.log("Pre  MIDDLEWARE");
// });

customerSchema.post("findOneAndDelete", async (customer)=>{
    if(customer.orders.length){
    let rs =  await  Order.deleteMany({_id: {$in: customer.orders}});
    console.log(rs);
    }
   });

let Order = mongoose.model("Order",OrderSchema);
let customer = mongoose.model("customer",customerSchema);

const addCustomer = async ()=>{
    let cust1 = new customer({
        name: "Shanu Kumar",

    });
    let result = await customer.find({}).populate("orders");
    console.log(result);

};
//add customer
const addCust = async ()=>{

    let newCust = new customer({
        name:"Rathi Arjun"
    });  

    let newOrder = new Order({

        item:"Dosa",
        price:250,
    });
    // addCust();

    newCust.orders.push(newOrder);

    await newOrder.save();
    await newCust.save();

};
const delCust = async ()=>{
    let data = await customer.findByIdAndDelete("669df7ad4f1fc9e630e3ebf2");
    console.log(data);
}

delCust();












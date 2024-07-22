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
let Order = mongoose.model("Order",OrderSchema);
let customer = mongoose.model("customer",customerSchema);

const addCustomer = async ()=>{
    let cust1 = new customer({
        name: "Rahul Kumar",

    });

    // let order1 = await Order.findOne({item:"Chips"});
    // let order2 = await Order.findOne({item:"Choclate"});

    // cust1.orders.push(order1);
    // cust1.orders.push(order2);

    let result = await customer.find({}).populate("orders");
    console.log(result[0]);

};

addCustomer();

/*const addOrder = async ()=>{

    let res = await Order.insertMany([
    {item:"somasa", price: 12},
    {item:"Chips", price: 10},
    {item:"Choclate", price: 40},
    
    ]);

    console.log(res);
};

addOrder();

*/
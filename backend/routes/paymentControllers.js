
const stripe = require("stripe")(``);
const router = express.Router();

router.post("/payment", async(req,res)=>{
    const {products,customerInfo} = req.body
    console.log(customerInfo)
    try {
        const lineItems = products.map((item) => {
            const priceInNum = parseInt(item.price, 10);
         
            return {
                price_data: {
                    currency: 'inr',
                    product_data: {
                        name: item.name,
                    },
                    unit_amount: priceInNum * 100,
                },
                quantity: item.qty,
               
            };
        });

        const params = {
            payment_method_types: ['card'],
            line_items: lineItems,
            mode: 'payment',
            payment_intent_data: {
                shipping: {
                    name: customerInfo.name,
                    address: customerInfo.address
                    
                }
            },
            success_url: `http://localhost:3000/success`, 
            cancel_url: `http://localhost:3000/failed`,
        };
       
        const session = await stripe.checkout.sessions.create(params);
        console.log('Created session:', session);
        res.status(200).json({ id: session.id });

    } catch (error) {
        console.log(error)
    }})

module.exports ={payment}
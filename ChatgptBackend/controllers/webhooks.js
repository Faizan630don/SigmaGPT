import Stripe from "stripe";
import User from "../models/User.js";
import Transaction from "../models/Transaction.js";


export const stripeWebhooks = async (req, res) => {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
    const sig = req.headers['stripe-signature'];
    let event;
    try {
        event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
    } catch (error) {
        return res.json({ received: false, message: error.message });
    }
    try {
        switch (event.type) {
            case "payment_intent.succeeded": {
                const { paymentIntent } = event.data.object;
                const sessionList = await stripe.checkout.sessions.list({
                    payment_intent: paymentIntent.id,

                })
                const session = sessionList.data[0];
                const { transactionId, appId } = session.metadata;

                if (appId === "SigmaGpt") {
                    const transaction = await Transaction.findOne({ _id: transactionId, isPaid: false });

                    await User.updateOne({ _id: transaction.userId }, { $inc: { credits: transaction.credits } })
                    transaction.isPaid = true;
                    await transaction.save();

                }
                else {
                    return res.json({ received: false, message: "Invalid app id" });
                }
                break;
            }
            default:
                console.log("Unhandled event type:", event.type);
                break;
        }
        res.json({ received: true });
    } catch (error) {
        console.error("Error processing webhook:", error);
        res.json({ received: false, message: error.message });
    }
}   
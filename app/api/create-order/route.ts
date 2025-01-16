import {  NextRequest, NextResponse } from "next/server"
import RazorPay from "razorpay"

if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECERET) {
    throw new Error("RAZORPAY_KEY_ID and RAZORPAY_KEY_SECERET must be defined in environment variables.");
}

const razorpay = new RazorPay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECERET
})


export async function POST(request: NextRequest) {
    try {
        const { amount, currency } = (await request.json()) as {
            amount: string;
            currency: string;
        };

        const order = await razorpay.orders.create({
            amount: amount,
            currency: currency,
            receipt: "receipt_" + Math.random().toString(36).substring(7)
        })

        return NextResponse.json({
            orderId: order.id
        }, {status: 200})

    } catch (error) {
        console.log("Something went wrong",error)
        return NextResponse.json({
            message: "Something went wrong"
        },{status: 500})
    }
}

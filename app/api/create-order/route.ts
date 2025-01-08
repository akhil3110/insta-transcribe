import { NextRequest, NextResponse } from "next/server"
import RazorPay from "razorpay"

const razorpay = new RazorPay({
    key_id: process.env.RAZORPAY_KEY_ID!,
    key_secret: process.env.RAZORPAY_KEY_SECERET!
})


export async function POST(request: NextRequest) {
    try {
        const order = await razorpay.orders.create({
            amount: 100,
            currency: "INR",
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
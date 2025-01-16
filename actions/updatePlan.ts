"use server"

import prisma from "@/lib/db"
import { Plan } from "@prisma/client"

export const updatePlan =async(email: string, plan: Plan) =>{
    try {
        
        console.log(email)
        console.log(plan)
        const userExist = await prisma.user.findFirst({where: {email}})

        if(!userExist){
            console.log("User does not exist")
            return
        }

        const updatePlan = await prisma.user.update({
            where: {
                email: email
            },
            data: {
                plan: plan
            }
        })

        return updatePlan

    } catch (error) {
        console.log(error)
    }
}
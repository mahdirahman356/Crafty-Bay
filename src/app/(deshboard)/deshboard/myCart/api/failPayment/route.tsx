import { NextResponse } from "next/server"

export const POST = async () => {

     const redirectUrl = new URL('/deshboard/failPayment', "http://localhost:3000")
     return NextResponse.redirect(redirectUrl.toString(), 302)

}
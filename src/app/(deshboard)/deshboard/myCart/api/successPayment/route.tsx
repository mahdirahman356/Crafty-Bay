import { NextResponse } from "next/server";

export const POST = async(response: NextResponse) =>{
      
       const successData = await response.json()
       console.log(successData)
}
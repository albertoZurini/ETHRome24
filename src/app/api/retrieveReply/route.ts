
import type { NextApiRequest, NextApiResponse } from 'next'
import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { comment } from 'postcss'

const supabase = createClient('https://nxvkmtaqpifboujrqlrv.supabase.co', 
    process.env.SUPABASE_KEY || "")

type ResponseData = {
  message: string
}

async function sha256(message : string) {
    const encoder = new TextEncoder();
    const data = encoder.encode(message);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(byte => byte.toString(16).padStart(2, '0')).join('');
    return hashHex;
}
 
async function handler(
  req: Request,
  res: NextApiResponse<ResponseData>
) {
    // Save the shit on a database
    let body = await req.json()
    let emailHash;

    await sha256(body.email).then(hash => emailHash = hash)

    console.log("==== emailhash", emailHash)

    let { data, error } = await supabase
    .from('requests')
    .select('*')
    .eq("hash", emailHash)
    .neq("response", null)
    
    if (error) {
        console.error('Connection failed:', error.message);
    } else {
        console.log('Connection successful!');
        console.log(data)
    }


    return NextResponse.json(data, { status: 200 })
}

export { handler as GET, handler as POST };

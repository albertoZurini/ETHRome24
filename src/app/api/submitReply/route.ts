
import type { NextApiRequest, NextApiResponse } from 'next'
import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { comment } from 'postcss'

const supabase = createClient('https://nxvkmtaqpifboujrqlrv.supabase.co', 
    process.env.SUPABASE_KEY || "")

type ResponseData = {
  message: string
}

async function handler(
  req: Request,
  res: NextApiResponse<ResponseData>
) {
    let body = await req.json()
    console.log(body)

    // Save the shit on a database
    
    let { data, error } = await supabase
    .from('requests')
    .upsert([
        { id: body.id, response: body.content },
    ])
    .select()
    
    if (error) {
        console.error('Connection failed:', error.message);
    } else {
        console.log('Connection successful!');
        console.log(data)
    }

    // TODO: shazam should put here the email shit

    return NextResponse.json(data, { status: 200 })
}

export { handler as GET, handler as POST };

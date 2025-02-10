import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
 
export async function GET() {

  try {

    const cookieStore = await cookies();  

    if(cookieStore.has('jwt'))
        cookieStore.delete('jwt');

    if(cookieStore.has('refresh-token'))
        cookieStore.delete('refresh-token');

    if(cookieStore.has('profile'))
        cookieStore.delete('profile');

    return NextResponse.json({ status: 200 }); 
       
  } catch (error) {
      console.error('API Error:', error);
      return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
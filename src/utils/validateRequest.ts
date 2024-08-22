import { NextResponse } from 'next/server';
import getSession from '@/lib/getSession';

export const validateRequest = async () => {
  const session = await getSession();
  const user = session?.user;
  
  if (!user || !user.id)
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  else {
    return true;
  }
};

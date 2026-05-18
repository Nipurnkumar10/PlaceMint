import { NextResponse } from 'next/server';
import { clerkClient, currentUser } from '@clerk/nextjs/server';

const ADMIN_EMAIL = 'nipurnkumar295@gmail.com';

export async function GET() {
  try {
    const user = await currentUser();

    // Verify Admin Permissions securely on the backend
    if (!user || !user.emailAddresses.some(e => e.emailAddress === ADMIN_EMAIL)) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // Fetch up to 100 users sorted by newest first
    const client = await clerkClient();
    const response = await client.users.getUserList({
      orderBy: '-created_at',
      limit: 100,
    });

    // Map the response safely depending on whether response is an array or object with data
    const usersList = Array.isArray(response) ? response : (response.data || []);

    const users = usersList.map((u: any) => ({
      id: u.id,
      firstName: u.firstName,
      lastName: u.lastName,
      imageUrl: u.imageUrl,
      email: u.emailAddresses[0]?.emailAddress || 'No Email',
      createdAt: u.createdAt,
      lastSignInAt: u.lastSignInAt,
    }));

    return NextResponse.json(users);
  } catch (error) {
    console.error("[USERS_GET]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

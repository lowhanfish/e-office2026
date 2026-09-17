import { ReactNode } from 'react';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function AuthLayout({ children }: { children: ReactNode }) {
    const cookieStore = await cookies();
    const token = cookieStore.get('access_token')?.value;
    let isAuthenticated = false;

    if (token) {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8000';

        try {
            const response = await fetch(`${apiUrl}/api/v1/auth/check-auth`, {
                cache: 'no-store',
                headers: {
                    Cookie: `access_token=${token}`,
                },
            });
            isAuthenticated = response.ok;
        } catch {
            isAuthenticated = false;
        }
    }

    if (isAuthenticated) {
        redirect('/simpeg/home');
    }

    return <>{children}</>;
}

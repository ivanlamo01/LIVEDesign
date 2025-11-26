import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/app/lib/firebaseAdmin';
import { cookies } from 'next/headers';

// Force Node.js runtime for Firebase Admin compatibility
export const runtime = 'nodejs';

export async function GET(request: NextRequest) {
    try {
        const cookieStore = await cookies();
        const sessionCookie = cookieStore.get('session')?.value;

        if (!sessionCookie) {
            return NextResponse.json(
                { authenticated: false, error: 'No hay sesión activa' },
                { status: 401 }
            );
        }

        // Verificar la sesión cookie
        const decodedClaims = await auth.verifySessionCookie(sessionCookie, true);

        return NextResponse.json(
            {
                authenticated: true,
                user: {
                    uid: decodedClaims.uid,
                    email: decodedClaims.email,
                    displayName: decodedClaims.name,
                    photoURL: decodedClaims.picture,
                },
            },
            { status: 200 }
        );
    } catch (error: any) {
        console.error('Error al verificar sesión:', error);
        return NextResponse.json(
            { authenticated: false, error: 'Sesión inválida o expirada' },
            { status: 401 }
        );
    }
}

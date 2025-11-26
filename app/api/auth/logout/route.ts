import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/app/lib/firebaseAdmin';
import { cookies } from 'next/headers';

// Force Node.js runtime for Firebase Admin compatibility
export const runtime = 'nodejs';

export async function POST(request: NextRequest) {
    try {
        const cookieStore = await cookies();
        const sessionCookie = cookieStore.get('session')?.value;

        if (!sessionCookie) {
            return NextResponse.json(
                { error: 'No hay sesión activa' },
                { status: 400 }
            );
        }

        // Verificar y revocar la sesión
        try {
            const decodedClaims = await auth.verifySessionCookie(sessionCookie);
            await auth.revokeRefreshTokens(decodedClaims.uid);
        } catch (error) {
            console.error('Error al revocar sesión:', error);
            // Continuar para eliminar la cookie aunque falle la revocación
        }

        // Eliminar la cookie
        cookieStore.set('session', '', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 0,
            path: '/',
        });

        return NextResponse.json(
            { success: true, message: 'Sesión cerrada' },
            { status: 200 }
        );
    } catch (error: any) {
        console.error('Error al cerrar sesión:', error);
        return NextResponse.json(
            { error: 'Error al cerrar la sesión', details: error.message },
            { status: 500 }
        );
    }
}

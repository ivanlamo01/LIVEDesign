import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/app/lib/firebaseAdmin';
import { cookies } from 'next/headers';

// Force Node.js runtime for Firebase Admin compatibility
export const runtime = 'nodejs';

export async function POST(request: NextRequest) {
    try {
        const { idToken } = await request.json();

        if (!idToken) {
            return NextResponse.json(
                { error: 'Token no proporcionado' },
                { status: 400 }
            );
        }

        console.log('[API Login] Verifying ID token...');
        // Verificar el token con Firebase Admin
        const decodedToken = await auth.verifyIdToken(idToken);
        console.log('[API Login] Token verified for user:', decodedToken.uid);

        // Crear una sesión cookie que dure 7 días
        const expiresIn = 60 * 60 * 24 * 7 * 1000; // 7 días en milisegundos
        const sessionCookie = await auth.createSessionCookie(idToken, {
            expiresIn,
        });

        // Establecer la cookie HTTP-only
        const cookieStore = await cookies();

        // NOTA: En localhost a veces 'secure: true' da problemas si no es https
        const isProduction = process.env.NODE_ENV === 'production';

        console.log(`[API Login] Environment: ${process.env.NODE_ENV}`);
        console.log(`[API Login] Setting session cookie. Secure: ${isProduction}, SameSite: lax, Path: /`);

        cookieStore.set('session', sessionCookie, {
            httpOnly: true,
            secure: isProduction,
            sameSite: 'lax',
            maxAge: 60 * 60 * 24 * 7, // 7 días en segundos
            path: '/',
        });

        return NextResponse.json(
            {
                success: true,
                user: {
                    uid: decodedToken.uid,
                    email: decodedToken.email,
                },
            },
            { status: 200 }
        );
    } catch (error: any) {
        console.error('Error al crear sesión:', error);
        return NextResponse.json(
            { error: 'Error al crear la sesión', details: error.message },
            { status: 401 }
        );
    }
}

import { NextRequest, NextResponse } from 'next/server';
import { getAdminAuth } from '@/app/lib/firebaseAdmin';
import { cookies } from 'next/headers';

// Force Node.js runtime for Firebase Admin compatibility
export const runtime = 'nodejs';

export async function POST(request: NextRequest) {
    console.log('[API Login] Request received');
    try {
        let body;
        try {
            body = await request.json();
        } catch (e) {
            console.error('[API Login] Failed to parse JSON body:', e);
            return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
        }

        const { idToken } = body;

        if (!idToken) {
            console.error('[API Login] No idToken provided');
            return NextResponse.json(
                { error: 'Token no proporcionado' },
                { status: 400 }
            );
        }

        console.log('[API Login] Verifying ID token...');

        let auth;
        try {
            auth = getAdminAuth();
        } catch (e: any) {
            console.error('[API Login] Failed to initialize Firebase Admin Auth:', e);
            return NextResponse.json({
                error: 'Server configuration error (Auth init)',
                details: e.message,
                code: e.code
            }, { status: 500 });
        }

        let decodedToken;
        try {
            decodedToken = await auth.verifyIdToken(idToken);
            console.log('[API Login] Token verified for user:', decodedToken.uid);
        } catch (e) {
            console.error('[API Login] Token verification failed:', e);
            return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
        }

        // Crear una sesión cookie que dure 7 días
        const expiresIn = 60 * 60 * 24 * 7 * 1000; // 7 días en milisegundos

        let sessionCookie;
        try {
            sessionCookie = await auth.createSessionCookie(idToken, { expiresIn });
        } catch (e) {
            console.error('[API Login] Failed to create session cookie:', e);
            return NextResponse.json({ error: 'Failed to create session' }, { status: 500 });
        }

        // Establecer la cookie HTTP-only
        const cookieStore = await cookies();
        const isProduction = process.env.NODE_ENV === 'production';

        console.log(`[API Login] Setting session cookie. Secure: ${isProduction}`);

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
        console.error('[API Login] Unhandled error:', error);
        return NextResponse.json(
            { error: 'Internal Server Error', details: error.message },
            { status: 500 }
        );
    }
}

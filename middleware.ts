import { NextRequest, NextResponse } from 'next/server';

export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // Obtener la cookie de sesión
    const sessionCookie = request.cookies.get('session')?.value;

    console.log(`[Middleware] Path: ${pathname}, Cookie: ${sessionCookie ? 'Present' : 'Missing'}`);

    // Si no hay cookie de sesión, redirigir a login
    if (!sessionCookie) {
        console.log(`[Middleware] Redirecting to login from ${pathname}`);
        const loginUrl = new URL('/login', request.url);
        loginUrl.searchParams.set('redirect', pathname);
        return NextResponse.redirect(loginUrl);
    }

    // Si hay cookie, permitir continuar
    // La verificación completa de la cookie se hará en el servidor
    return NextResponse.next();
}

// Configurar qué rutas deben ser protegidas por el middleware
export const config = {
    matcher: [
        '/profile/:path*',
        '/admin/:path*',
    ],
};

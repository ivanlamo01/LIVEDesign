'use server';

import { getAdminDb } from './firebaseAdmin';

export async function submitContactForm(data: {
    name?: string;
    contactInfo: string;
    method: string;
    message?: string;
}) {
    try {
        const db = getAdminDb();
        const docRef = await db.collection('contact_requests').add({
            ...data,
            timestamp: new Date(),
            status: 'new',
        });

        try {
            await fetch('https://n8n.varelaenzoo.cloud/webhook-test/Liv_design_Chabot', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
        } catch (error) {
            console.log("No se pudo avisar a n8n, pero no rompas el flujo");
        }

        return { success: true, id: docRef.id };
    } catch (error) {
        console.error('Error submitting contact form:', error);
        return { success: false, error: 'Failed to submit contact form' };
    }
}

export async function updateContactForm(id: string, data: {
    email?: string;
    phone?: string;
    message?: string;
}) {
    try {
        const db = getAdminDb();
        await db.collection('contact_requests').doc(id).update({
            ...data,
            updatedAt: new Date()
        });
        return { success: true };
    } catch (error) {
        console.error('Error updating contact form:', error);
        return { success: false, error: 'Failed to update contact form' };
    }
}

export async function subscribeToNewsletter(email: string) {
    try {
        const db = getAdminDb();
        // Check if email already exists to avoid duplicates (optional, but good practice)
        const snapshot = await db.collection('newsletter_subscriptions')
            .where('email', '==', email)
            .get();

        if (!snapshot.empty) {
            return { success: true, message: 'Already subscribed' };
        }

        await db.collection('newsletter_subscriptions').add({
            email,
            timestamp: new Date(),
            source: 'footer',
            status: 'active'
        });

        return { success: true };
    } catch (error) {
        console.error('Error subscribing to newsletter:', error);
        return { success: false, error: 'Failed to subscribe' };
    }
}

export async function updateBlogPost(id: string, data: any) {
    try {
        const db = getAdminDb();

        // Remove undefined values to avoid Firebase errors
        const cleanData = Object.fromEntries(
            Object.entries(data).filter(([_, v]) => v !== undefined)
        );

        await db.collection('blog_posts').doc(id).update({
            ...cleanData,
            updatedAt: new Date()
        });

        try {
            await fetch('https://n8n.varelaenzoo.cloud/webhook-test/Liv_design_Chabot', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id, ...cleanData, type: 'blog_post_update' })
            });
        } catch (error) {
            console.log("No se pudo avisar a n8n, pero no rompas el flujo");
        }

        return { success: true };
    } catch (error) {
        console.error('Error updating blog post:', error);
        return { success: false, error: 'Failed to update blog post' };
    }
}

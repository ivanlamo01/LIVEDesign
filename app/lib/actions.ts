'use server';

import { db } from './firebaseAdmin';

export async function submitContactForm(data: {
    name?: string;
    contactInfo: string;
    method: string;
    message?: string;
}) {
    try {
        const docRef = await db.collection('contact_requests').add({
            ...data,
            timestamp: new Date(),
            status: 'new',
        });

        try {
            await fetch('https://n8n.srv1141970.hstgr.cloud/webhook-test/Nuevo_cliente_live', {
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

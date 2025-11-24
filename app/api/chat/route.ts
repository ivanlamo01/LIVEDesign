import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
    try {
        const { messages } = await req.json();

        if (!process.env.OPENAI_API_KEY) {
            return NextResponse.json(
                { error: 'OpenAI API key not configured' },
                { status: 500 }
            );
        }

        const systemPrompt = `Eres el asistente virtual de LIVE Design, una agencia de desarrollo web, automatización e inteligencia artificial.
    
    Tu tono es profesional pero cercano, innovador y tecnológico.
    
    Servicios que ofrecemos:
    - Desarrollo Web: Sitios modernos, rápidos y optimizados (Next.js, React, Tailwind).
    - Automatización: Optimización de procesos de negocio.
    - Inteligencia Artificial: Chatbots, análisis de datos, integración de LLMs.
    
    Objetivo: Ayudar a los visitantes a entender nuestros servicios y animarlos a contactarnos para una cotización.
    
    Si te preguntan precios, diles que cada proyecto es único y anímalos a agendar una llamada.
    Responde siempre en español, de forma concisa y útil.`;

        const completion = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [
                { role: "system", content: systemPrompt },
                ...messages,
            ],
        });

        const reply = completion.choices[0].message.content;

        return NextResponse.json({ reply });
    } catch (error) {
        console.error('Error in chat API:', error);
        return NextResponse.json(
            { error: 'Error processing your request' },
            { status: 500 }
        );
    }
}

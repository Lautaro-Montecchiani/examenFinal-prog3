export interface Benefit {
    title: string;
    desc: string;
}

export interface Solution {
    id: string;
    slug: string;
    title: string;
    summary: string;
    description?: string;
    fullDescription?: string;
    benefits: Benefit[];
    features: string[];
}

export const solutionsData: Solution[] = [
    {
        id: 'sol-agente-atencion-ia',
        slug: 'agente-atencion-ia',
        title: 'Agente de IA de Atención Automática',
        summary: 'Automatizamos la atención al cliente con modelos fundacionales que entienden y resuelven el 85% de las consultas.',
        description: 'Una solución conversacional avanzada entrenada con los documentos internos de la empresa. Reduce radicalmente los tiempos de espera y ejecuta acciones directamente como cancelaciones o presupuestos.',
        benefits: [
            { title: 'Resolución Instantánea', desc: 'Respuestas en milisegundos sin intervención humana.' },
            { title: 'Ejecución de Tareas', desc: 'Conectado a APIs internas para procesar reembolsos o agendar turnos.' },
            { title: 'Soporte Multilenguaje', desc: 'Atención 24/7 en más de 20 idiomas nativamente.' },
            { title: 'Ahorro de Costos', desc: 'Escabilidad absoluta en picos de demanda.' }
        ],
        features: ['Modelos NLP (LLM)', 'Vectores de contexto', 'Basses de datos vectoriales', 'Omnicanalidad (WhatsApp, Web)']
    },
    {
        id: 'sol-ecommerce-headless',
        slug: 'ecommerce-headless',
        title: 'Plataforma E-commerce Headless',
        summary: 'Arquitectura ultra veloz que separa el frontend del backend para tiendas transaccionales a gran escala.',
        description: 'Construido para soportar alto tráfico, este eCommerce gestiona productos, carrito y logística de forma descentralizada. Permite experiencias visuales impactantes sin comprometer el SEO técnico.',
        benefits: [
            { title: 'Velocidad Extrema', desc: 'Carga de páginas sub-milisegundo gracias al renderizado estático.' },
            { title: 'Omnipresente', desc: 'Una misma API alimenta apps móviles, la web y totems físicos.' },
            { title: 'Seguridad', desc: 'Arquitectura desacoplada que mitiga vectores de ataque.' },
            { title: 'Agnóstico a Vendedores', desc: 'Facilidad para intercambiar Shopify, Magento u otros atrás de escena.' }
        ],
        features: ['Next.js / Vite Frontends', 'FastAPI Backend', 'Microservicios', 'Redis Caching']
    },
    {
        id: 'sol-dashboard-predictivo',
        slug: 'dashboard-predictivo',
        title: 'Dashboard Analítico con Modelos Predictivos',
        summary: 'Visualiza el futuro de tus ventas mediante analítica de datos avanzada y aprendizaje automático.',
        description: 'Herramienta de business intelligence (BI) enfocada no solo en mostrar lo que pasó, sino lo que va a pasar. Absorbe gigabytes de datos para generar estimaciones de stock, rotación y alertas de mercado.',
        benefits: [
            { title: 'Decisiones informadas', desc: 'Gráficos interactivos generados en tiempo real.' },
            { title: 'Prevención de quiebre', desc: 'Avisos preventivos en base a patrones históricos de demanda.' },
            { title: 'Machine Learning', desc: 'Modelos predictivos que se retroalimentan mes a mes.' },
            { title: 'Integración ERP', desc: 'Se enlaza a SAP o sistemas contables legados.' }
        ],
        features: ['Gráficos dinámicos', 'Regresiones Lineales', 'Data Pipelines', 'Reportes Automáticos']
    }
];

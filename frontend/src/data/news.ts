export interface NewsItem {
    id: string;
    slug: string;
    title: string;
    date: string;
    summary: string;
    content: string;
    imageUrl: string;
    category: string;
}

export const newsData: NewsItem[] = [
    {
        id: 'news-1',
        slug: 'e-commerce-go-rosario-2025',
        title: 'Estuvimos en E-commerce Go Rosario 2025',
        date: '15 de Mayo, 2025',
        summary: 'Participamos como sponsors oficiales del evento más importante de comercio electrónico en el interior del país, presentando nuestras soluciones con IA.',
        content: `
      <h2>El evento de comercio electrónico más importante de Rosario</h2>
      <p>Este año tuvimos el honor de participar en el e-commerce Go Rosario 2025, un espacio clave donde las empresas líderes del sector tecnológico y de ventas se reúnen para compartir tendencias y soluciones innovadoras.</p>
      
      <h3>Nuestra propuesta de valor</h3>
      <p>Durante la jornada, nuestro equipo presentó el impacto de integrar <strong>Agentes de Inteligencia Artificial</strong> en los canales de atención de e-commerce convencionales. Demostramos cómo la automatización inteligente no solo reduce los tiempos de respuesta, sino que incrementa significativamente las tasas de conversión al ofrecer recomendaciones personalizadas en tiempo real.</p>
      
      <h3>Agradecimientos</h3>
      <p>Queremos agradecer a todos los clientes y partners que se acercaron a nuestro stand. Fue una excelente oportunidad para conectar, escuchar sus desafíos actuales y explorar cómo desde AIDS (Artificial Intelligent Digital Solutions) podemos ayudarlos a escalar sus ventas unificando tecnología y estrategia.</p>
    `,
        imageUrl: 'https://images.unsplash.com/photo-1540317580384-e5d43616b9aa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
        category: 'Eventos'
    },
    {
        id: 'news-2',
        slug: 'aids-en-expoagro-2025',
        title: 'AIDS presente en Expoagro 2025',
        date: '8 de Marzo, 2025',
        summary: 'Acompañamos la transformación digital del sector agroindustrial con nuestras soluciones headless y arquitecturas escalables B2B.',
        content: `
      <h2>Transformando el campo con tecnología</h2>
      <p>La integración de tecnología en la agroindustria ya no es una opción, es una necesidad urgente para mantener la competitividad. En esta edición de Expoagro 2025, estuvimos presentes respaldados por la experiencia de AIDS, demostrando cómo crear ecosistemas digitales robustos para un sector tan dinámico.</p>
      
      <h3>Soluciones Headless para Agronegocios</h3>
      <p>Uno de los temas centrales de nuestras charlas fue la implementación de <strong>E-commerce Headless B2B</strong>. Al separar el frontend del backend, logramos que empresas proveedoras de insumos agropecuarios ofrezcan una experiencia de compra fluida y rápida, conectada directamente a sus ERPs complejos sin comprometer la velocidad ni la UX/UI de la plataforma.</p>
      
      <h3>El futuro es ahora</h3>
      <p>Nos llevamos grandes insights y confirmamos que el sector está ávido de soluciones integrales. Desde automatización de inventarios hasta portales B2B mayoristas, estamos preparados para llevar la innovación digital al corazón productivo del país.</p>
    `,
        imageUrl: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
        category: 'Noticias'
    }
];

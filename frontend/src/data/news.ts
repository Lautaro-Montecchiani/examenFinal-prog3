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
    },
    {
        id: 'news-3',
        slug: 'experiencia-endeavor-mendoza-2025',
        title: 'Estaremos en Experiencia Endeavor Mendoza 2025',
        date: '15 de Mayo, 2025',
        summary: 'El evento para emprendedores más grande de Cuyo nos tendrá como protagonistas hablando sobre el impacto de la IA en escalar negocios B2B.',
        content: `
      <h2>Networking y Tecnología en la región de Cuyo</h2>
      <p>Nos enorgullece anunciar que AIDS será parte de la próxima <strong>Experiencia Endeavor Cuyo</strong>, que se celebrará en la provincia de Mendoza. Este evento reúne a los líderes, fundadores y visionarios más importantes de la región, y no podíamos faltar.</p>
      
      <h3>Agentes de IA para potenciar tu Startup</h3>
      <p>Durante la jornada, nuestro equipo técnico estará brindando mentorías sobre cómo las empresas tradicionales e innovadoras pueden apalancar su crecimiento implementando agentes de software inteligente y automatizaciones. ¡Te esperamos en nuestro stand para conversar sobre el futuro de la automatización en las empresas!</p>
    `,
        imageUrl: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
        category: 'Eventos'
    },
    {
        id: 'news-4',
        slug: 'mendoza-tic-forum-2025',
        title: 'Mendoza TIC Forum: Liderando la adopción Cloud',
        date: '22 de Agosto, 2025',
        summary: 'Acompañamos al Polo TIC de Mendoza en el foro anual debatiendo sobre infraestructura en la nube y arquitecturas Headless de alto rendimiento.',
        content: `
      <h2>Innovación e Infraestructura en Mendoza</h2>
      <p>Mendoza se sigue consolidando como un polo tecnológico clave en Argentina. En esta edición del Mendoza TIC Forum en el Parque Tecnológico, participamos de los paneles principales sobre modernización de arquitecturas legacy en grandes empresas.</p>
      
      <h3>Cloud y Headless Commerce</h3>
      <p>Presentamos casos de éxito locales y nacionales donde la migración de plataformas B2B monolíticas a arquitecturas headless (Next.js + FastAPI) logró reducir drásticamente los costos de servidor y mejoró significativamente las métricas de retención de usuarios. ¡Un paso más para la digitalización federal del país!</p>
    `,
        imageUrl: 'https://images.unsplash.com/photo-1591115765373-5207764f72e7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
        category: 'Conferencias'
    }
];

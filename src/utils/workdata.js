import ieselogo from "../images/history/iese.jpeg";
import fitboologo from "../images/history/fitboo.jpeg";
import geniuzzlogo from "../images/history/geniuzz.jpeg";
import hotelbedslogo from "../images/history/hotelbeds.jpeg";
import lowcostlogo from "../images/history/lowcost.jpeg";
import portbluelogo from "../images/history/portblue.jpeg";
import tripletenlogo from "../images/history/tripleten.jpeg";
import rnalogo from "../images/history/rna.jpeg";
import syncrentalslogo from "../images/history/syncrentals.jpeg";
import roibacklogo from "../images/history/roiback.jpeg";
import logitravellogo from "../images/history/logitravel.jpeg";
import carmensupermarket from "../images/history/CarmenSupermarketPortada-bn-mov.png";
import felipemoreno from "../images/history/cesfelipemoreno_logo.jpeg";
import universidadmalaga from "../images/history/universidad_de_malaga_logo.jpeg";

const workdata = [
  {
    id: 1,
    title: "Publicidad y RRPP",
    text: "Universidad de Málaga",
    datestart: "1998",
    date: "2002",
    category: {
      tag: "formación",
      color: "#495057",
    },
    link: {
      url: "https://www.linkedin.com/school/universidad-de-malaga/",
      text: "Descubre más",
    },
    logo: {
      img: universidadmalaga,
      alt: "Universidad de Málaga",
    },
    description:
      "Recuerdo esta etapa con mucho cariño. Aunque me licencié por la UMA, cursé la mitad de la carrera en la Autónoma de BCN. Muchos momentos para recordar.",
  },
  {
    id: 2,
    title: "Programa de Desarrollo Directivo (PDD)",
    text: "IESE Business School",
    datestart: "2017",
    date: "2017",
    category: {
      tag: "formación",
      color: "#495057",
    },
    link: {
      url: "https://www.linkedin.com/school/iese-business-school/",
      text: "Descubre más",
    },
    logo: {
      img: ieselogo,
      alt: "IESE Business School",
    },
    description:
      "Gracias a este programa directivo fortalecí mi pensamiento estratégico y habilidades para la dirección. Conseguí una visión global 360 a través del método del caso, que aúna el aprendizaje individual, las discusiones de equipo y el diálogo en un pleno interdisciplinar. Es muy enriquecedora la discusión con distintos puntos de vista y experiencias de diferentes sectores, además de formar amistades que perduran.",
  },

  {
    id: 3,
    title: "Head Of Marketing & Communications",
    text: "Roiback",
    datestart: "2022",
    date: "Actualmente",
    category: {
      tag: "trabajo",
      color: "#495057",
    },
    link: {
      url: "https://www.linkedin.com/company/roiback",
      text: "Descubre más",
    },
    logo: {
      img: roibacklogo,
      alt: "Roiback",
    },
    description:
      "Es una galardonada traveltech especializada en la gestión del canal directo para hoteles. Roiback ofrece a más de 2.000 hoteles independientes y cadenas hoteleras de todo el mundo un motor de reservas líder en el mercado, soluciones web enfocadas a la conversión y servicios de gestión integral del marketing online enfocado en la generación de reservas.",
  },
  {
    id: 5,
    title: "Software Engineer",
    text: "Tripleten USA",
    datestart: "2022",
    date: "2023",
    category: {
      tag: "formación",
      color: "#495057",
    },
    link: {
      url: "https://drive.google.com/file/d/10ZG0zTMiiDpMY_0hBbOq4lTSI0UbgSor/edit",
      text: "Descubre más",
    },
    logo: {
      img: tripletenlogo,
      alt: "Tripleten USA",
    },
    description:
      "Tripleten es un bootcamp online a tiempo parcial. He aprendido Desarrollo de Software a través de su plataforma interactiva, con la ayuda tutores expertos, otros miembros de la comunidad y la orientación de estudiantes senior. Ha sido una experiencia alucinante que me permite desarrollar desde cero páginas web como esta.",
  },
  {
    id: 6,
    title: "Global Growth Marketing Manager",
    text: "Hotelbeds",
    datestart: "2018",
    date: "2022",
    category: {
      tag: "trabajo",
      color: "#495057",
    },
    link: {
      url: "https://www.linkedin.com/company/hotelbeds",
      text: "Descubre más",
    },
    logo: {
      img: hotelbedslogo,
      alt: "Hotelbeds",
    },
    description:
      "Como miembro del principal banco de camas B2B del mundo, trabajé en la digitalización y automatización de los procesos con hoteles long-tail con contrato directo, reduciendo costos operativos y optimizando ratios de conversión. También participé en la consolidación de la marca global después del rebranding, lo que involucró la migración de 35k agencias de viajes, 3k clientes API y más de 300k hoteles.",
  },
  {
    id: 7,
    title: "Co-Founder",
    text: "Sync Rentals",
    datestart: "2017",
    date: "2021",
    category: {
      tag: "proyecto paralelo",
      color: "#495057",
    },
    link: {
      url: "https://www.linkedin.com/company/sync-rentals",
      text: "Descubre más",
    },
    logo: {
      img: syncrentalslogo,
      alt: "Sync Rentals",
    },
    description:
      "Era un channel manager para viviendas vacacionales. Permitía a los propietarios mantener un calendario de disponibilidad centralizado que se actualizaba automáticamente en portales compatibles como Airbnb, Booking o Vrbo.",
  },
  {
    id: 8,
    title: "Marketing & E-Commerce Director",
    text: "Rafa Nadal Academy by Movistar",
    datestart: "2016",
    date: "2018",
    category: {
      tag: "trabajo",
      color: "#495057",
    },
    link: {
      url: "https://www.linkedin.com/company/rafanadalacademy/",
      text: "Descubre más",
    },
    logo: {
      img: rnalogo,
      alt: "Rafa Nadal Academy by Movistar",
    },
    description:
      "Formar parte de la RNA fué un sueño hecho realidad. No soy especialmente fan del tenis, pero a nivel profesional y personal es una de las mejores experiencias que he tenido. Como uno de los primeros miembros del equipo tuve la oportunidad de desarrollar la marca, comunicaciones, estrategias de marketing y creación de producto. Gracias a nuestro arduo trabajo, pudimos superar el presupuesto y logramos posicionar todos los servicios que ofrece este espectacular centro deportivo.",
  },
  {
    id: 9,
    title: "Executive Director",
    text: "Geniuzz",
    datestart: "2015",
    date: "2016",
    category: {
      tag: "trabajo",
      color: "#495057",
    },
    link: {
      url: "https://www.linkedin.com/company/geniuzz",
      text: "Descubre más",
    },
    logo: {
      img: geniuzzlogo,
      alt: "Geniuzz",
    },
    description:
      "Participé en el rediseño del modelo de negocio, la estrategia de marketing y ventas para el principal marketplace español para freelancers. Gracias a nuestros esfuerzos, logramos mejorar la posición de la empresa en el mercado, lo que resultó en un aumento del 20% en las ventas. Además, conseguimos con éxito una nueva ronda de financiación.",
  },
  {
    id: 10,
    title: "Head of Marketing & Communications",
    text: "PortBlue Hotels & Resorts",
    datestart: "2014",
    date: "2016",
    category: {
      tag: "trabajo",
      color: "#495057",
    },
    link: {
      url: "https://www.linkedin.com/company/portblue-hotels-&-resorts/",
      text: "Descubre más",
    },
    logo: {
      img: portbluelogo,
      alt: "PortBlue Hotels & Resorts",
    },
    description:
      "Gestioné la creación de marca de esta cadena de hoteles mallorquina. Conseguimos crear una exitosa estrategia de venta directa y posicionamiento.",
  },
  {
    id: 11,
    title: "Co-Founder",
    text: "fitboo",
    datestart: "2012",
    date: "2014",
    category: {
      tag: "trabajo",
      color: "#495057",
    },
    link: {
      url: "https://www.linkedin.com/company/fitboo",
      text: "Descubre más",
    },
    logo: {
      img: fitboologo,
      alt: "fitboo",
    },
    description:
      "Fitboo era como un Booking.com, pero para centros de fitness. Integré la disponibilidad de miles de centros, permitiendo a los usuarios reservar clases grupales en múltiples ubicaciones a su conveniencia. Con este proyecto logré obtener financiación de capital privado y el apoyo de ENISA, el Fondo de Coinversión para Startups de España. Además, fuimos seleccionados para unirnos al programa StartUp Brasil.",
  },
  {
    id: 12,
    title: "Managing Director Southern Europe",
    text: "lowcostholidays",
    datestart: "2011",
    date: "2012",
    category: {
      tag: "trabajo",
      color: "#495057",
    },
    link: {
      url: "https://www.linkedin.com/company/lowcostholidays.com",
      text: "Descubre más",
    },
    logo: {
      img: lowcostlogo,
      alt: "lowcostholidays",
    },
    description:
      "Como Director del mercado español de este operador turístico de viajes con sede en el Reino Unido, fui responsable de liderar la expansión tanto B2B como B2C. En el plazo de un año conseguimos, desde cero, un gran volumen ventas posicionando la marca como uno de los players a tener en cuenta en aquel momento.",
  },
  {
    id: 13,
    title: "Marketing & Communications Director",
    text: "Logitravel",
    datestart: "2008",
    date: "2011",
    category: {
      tag: "trabajo",
      color: "#495057",
    },
    link: {
      url: "https://www.linkedin.com/company/logitravel/",
      text: "Descubre más",
    },
    logo: {
      img: logitravellogo,
      alt: "Logitravel",
    },
    description:
      "Exitosa ejecución de una estrategia de marketing completamente optimizada, generando un aumento significativo de la facturación anual. Logramos posicionarnos como uno de los principales anunciantes de viajes en España, superamos nuestros objetivos, mejoramos el alcance de nuestros canales de marketing y logramos tasas de conversión muy altas para una amplia gama de productos turísticos.",
  },
  {
    id: 3,
    title: "Drummer",
    text: "Carmen Supermarket",
    datestart: "2024",
    date: "Actualmente",
    category: {
      tag: "trabajo",
      color: "#495057",
    },
    link: {
      url: "https://open.spotify.com/artist/4Ms17M4YF5EZfoUPEUCGny?si=eNnehIINTnqMk35ygfjNew",
      text: "Escúchanos en Spotify",
    },
    logo: {
      img: carmensupermarket,
      alt: "Roiback",
    },
    description:
      "Banda de Pop-Rock desde Mallorca. Sonidos guitarreros de los 90 con letras en castellano. Hemos lanzado dos singles en Spotify y estamos programando conciertos en Mallorca.",
  },
  {
    id: 14,
    title: "Professor of Marketing",
    text: "Centro de Educación Superior Felipe Moreno",
    datestart: "2024",
    date: "Actualmente",
    category: {
      tag: "trabajo",
      color: "#495057",
    },
    link: {
      url: "https://etb-baleares.es/",
      text: "Descubre más",
    },
    logo: {
      img: felipemoreno,
      alt: "CES Felipe Moreno",
    },
    description:
      "Imparto dos asignaturas en el grado de Marketing del Centro de Educación Superior Felipe Moreno - Nebrija.",
  },
];

export default workdata;

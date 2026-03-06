export const siteData = {
  title: {
    ua: "МОВЧАННЯ ДАНИХ",
    en: "DATA SILENCE"
  },

  nav: {
    about: { ua: "Про мене", en: "About" },
    contacts: { ua: "Контакти", en: "Contacts" }
  },

  home: {
    intro: {
      ua: `Україна опинилися в ситуації терору не тільки фізичного, а й ідейного.
Тема війни фактично витіснила всі інші з інтелектуальних та творчих практик.
Чим більше спливає часу, тим важче залишатися у її фокусі.
Просто ігнорувати таку катастрофу неможливо, говорити на інші теми — несуттєво.
Цей проєкт є міркуванням про творчість в умовах абсолютного мовчання, чи можемо ми висловити те, що нам не хочеться ні про що говорити, і чи має це цінність як своєрідне свідчення?`,
      en: `Ukraine has found itself in a state of terror — not only physical, but ideological.
The topic of war has effectively supplanted all others in intellectual and creative practice.
As time passes, it becomes increasingly difficult to remain focused on it.
On the one hand, it is impossible to ignore such a catastrophe. On the other, speaking about anything else feels irrelevant.
This project reflects on creativity under conditions of absolute silence:
Can we express the feeling of not wanting to speak and does it have value as a kind of testimony?`
    },
    scrollHint: {
      ua: "Роботи",
      en: "Works"
    },

    supportText: {
      ua: "Проєкт реалізовано за підтримки",
      en: "Project supported by"
    },
    supportLogos: [
      { src: "images/Ribbon_Logo.png", alt: "Ribbon" },
      { src: "images/Jfac_logo.png", alt: "Jam Factory Art Center" }
    ]
  },

  about: {
    portrait: "images/nadja_kelm.jpg",
    text: {
      ua: `Я постійно працюю з даними, роблю візуалізації як для аналітичних матеріалів, так і дата-арт, часом їх вдається поєднати. З 2022 року працюю переважно з даними про війну, як арт-директорка в Texty.org.ua, місця для особистого дата-арту майже не залишилося. Втім, аби  час від часу виринати з гнітючої реальності, я роблю з даних абсолютно позбавлені інформативності цифрові картини: джерелом можуть бути помилки, або дані, які відкинули як такі, що ні про що не говорять, чи довільна інтерпретація даних, без жодного наміру показати ними щось, крім тих патернів, у які вони самі складаються. Мене цікавить природа таких зображень - це не зовсім витвір людини, не дата-арт у класичному розумінні (попри те, що дата-арт передбачає нестандартне візуальне представлення інформації, він вимагає наративності), і не generative art, що використовує написання коду. Це те, як дані виглядають, коли їм не треба про щось нам казати, їх форма ескапізму від наших очікувань. Моя форма ескапізму від того, про що вони мені говорять з лютого 2022 року. Мета проєкту “Мовчання даних” — спробувати осмислити значення такої практики та спадок абстрактного мистецтва, зібравши результати в одному місці і відкривши можливість для діалогу про те, як допомогти собі пережити те, чого не можна уникнути.`,
      en: `I work constantly with data, creating visualizations for analytical materials as well as for data art — sometimes managing to combine the two. Since 2022, I have worked primarily with war-related data in my role as art director at Texty.org.ua, leaving almost no space for personal data art practice. From time to time, in order to step away from the oppressive reality, I create digital images derived from data that are deliberately stripped of informational intent. The source material may consist of errors, discarded or meaningless datasets, or arbitrary reinterpretations of data — with no intention of revealing anything beyond the patterns inherent in their structure. I am interested in the nature of these images. They are not entirely man-made, yet they are not data art in the classical sense. While data art often employs non-standard visual representation, it still presumes narrative. Nor are these works generative art, which relies on authored code as its primary medium. This is what data looks like when it no longer has to tell us anything — a form of escapism from our expectations. A form of escapism for the data itself. And perhaps also for me, from what data has been telling me since February 2022. The Data Silence project seeks to comprehend the meaning of this practice and its connection to the legacy of abstract art. By bringing these works together, the project opens space for dialogue about how we might endure the inevitable, and how we help ourselves survive.`
    }
  },

  contacts: {
    nameLine: "Nadja Kelm, Kyiv, Ukraine.",
    email: "nadja.kelm@gmail.com",
    linkedin: "https://www.linkedin.com/in/nadja-kelm-1922772a1/"
  },

  works: [
    {
      id: "1",
      label: "№1",
      thumb: "images/Thumbnail_№1.jpg",
      images: Array.from({ length: 9 }, (_, i) => `images/works/1/№1_${String(i + 1).padStart(2, "0")}.jpg`)
    },
    {
      id: "2",
      label: "№2",
      thumb: "images/Thumbnail_№2.jpg",
      images: Array.from({ length: 8 }, (_, i) => `images/works/2/№2_${String(i + 2).padStart(2, "0")}.jpg`)
    },
    {
      id: "3",
      label: "№3",
      thumb: "images/Thumbnail_№3.jpg",
      images: Array.from({ length: 6 }, (_, i) => `images/works/3/№3_${String(i + 1).padStart(2, "0")}.jpg`)
    }
  ]
};

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
Просто ігнорувати таку катастрофу неможливо, говорити на інші теми - несуттєво.
Цей проєкт є міркуванням про творчість в умовах абсолютного мовчання, чи можемо ми висловити те, що нам не хочеться ні про що говорити, і чи має це цінність як своєрідне свідчення?`,
      en: `Ukraine found itself in a situation of terror, not only physical but also ideological.
The topic of war has effectively supplanted all others in intellectual and creative practices.
The more time passes, the harder it is to stay focused on it.
It is impossible to simply ignore such a catastrophe, and talking about other topics is irrelevant.
This project is a reflection on creativity in conditions of absolute silence: can we express what we do not want to talk about, and does it have value as a kind of testimony?`
    },
    scrollHint: {
      ua: "Гортайте вниз, щоб\nпобачити роботи",
      en: "Scroll down to\nsee the works"
    }
  },

  about: {
    portrait: "images/nadja_kelm.jpg",
    text: {
      ua: `Я постійно працюю з даними, роблю візуалізації як для аналітичних матеріалів, так і дата-арт, часом їх вдається поєднати. З 2022 року працюю переважно з даними про війну, як арт-директорка в Texty.org.ua, місця для особистого дата-арту майже не залишилося. Втім, аби  час від часу виринати з гнітючої реальності, я роблю з даних абсолютно позбавлені інформативності цифрові картини: джерелом можуть бути помилки, або дані, які відкинули як такі, що ні про що не говорять, чи довільна інтерпретація даних, без жодного наміру показати ними щось, крім тих патернів, у які вони самі складаються. Мене цікавить природа таких зображень - це не зовсім витвір людини, не дата-арт у класичному розумінні (попри те, що дата-арт передбачає нестандартне візуальне представлення інформації, він вимагає наративності), і не generative art, що використовує написання коду. Це те, як дані виглядають, коли їм не треба про щось нам казати, їх форма ескапізму від наших очікувань. Моя форма ескапізму від того, про що вони мені говорять з лютого 2022 року. Мета проєкту “Мовчання даних” — спробувати осмислити значення такої практики та спадок абстрактного мистецтва (що як внутрішня потреба отримало новий поштовх до розвитку у повоєнний час), зібравши її результати в одному місці і відкривши можливість для діалогу про те, як допомогти собі пережити те, чого не можна уникнути.`,
      en: `I constantly work with data, creating visualizations for both analytical materials and data art, sometimes managing to combine the two. Since 2022, I have been working mainly with data about the war as art director at Texty.org.ua, leaving almost no room for personal data art. However, in order to escape from the depressing reality from time to time, I create digital images from data that are completely devoid of information: the source may be errors, or data that has been rejected as meaningless, or arbitrary interpretation of data, with no intention of showing anything other than the patterns in which they themselves are composed. I am interested in the nature of such images — they are not entirely man-made, not data art in the classical sense (despite the fact that data art involves non-standard visual representation of information, it requires narrative), and not generative art, which uses code writing. This is what data looks like when it doesn't have to tell us anything, its form of escapism from our expectations. My form of escapism from what they have been telling me since February 2022. The goal of the Silence of Data project is to try to comprehend the meaning of this practice and the legacy of abstract art (which, as an internal need, received a new impetus for development in the post-war period), gathering its results in one place and opening up the possibility for dialogue about how to help ourselves survive the inevitable.`
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
      images: Array.from({ length: 4 }, (_, i) => `images/works/2/№2_${String(i + 1).padStart(2, "0")}.jpg`)
    },
    {
      id: "3",
      label: "№3",
      thumb: "images/Thumbnail_№3.jpg",
      images: Array.from({ length: 6 }, (_, i) => `images/works/3/№3_${String(i + 1).padStart(2, "0")}.jpg`)
    }
  ]
};

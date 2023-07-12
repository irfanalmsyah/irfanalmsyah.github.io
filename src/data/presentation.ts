type Social = {
  label: string;
  icon: string;
  link: string;
};

type Presentation = {
  mail: string;
  title: string;
  description: string;
  socials: Social[];
};

const presentation: Presentation = {
  mail: "irfanalamsyah2@gmail.com",
  title: "Hi, I'm Irfan 👋",
  description:
    "Hello, I'm Irfan Alamsyah a.k.a *Ipan*. I'm a computer science third-year student in IPB University with a strong focus on *backend development* with proficiency in languages such as *Python* and *Javascript* and experiences in frameworks such as *Django* and *Express.js*. I'm also interested in *Cloud Computing* and *DevOps* with experiences in *Google Cloud Platform* and *Docker*.",
  socials: [
    {
      label: "Github",
      icon: "github",
      link: "https://github.com/irfanalmsyah",
    },
    {
      label: "Linkedin",
      icon: "linkedin",
      link: "https://www.linkedin.com/in/irfan-alamsyah-56566a176",
    },
    {
      label: "Instagram",
      icon: "instagram",
      link: "https://www.instagram.com/_irfanalamsyah",
    },
  ],
};

export default presentation;

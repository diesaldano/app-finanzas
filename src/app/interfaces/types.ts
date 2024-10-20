// Definir interfaces basadas en text.json
interface FooterData {
  yearText: string;
  contact: string;
  about: string;
  terms: string;
  securityText: string;
}

interface HeaderData {
  title: string;
}

interface Step {
  icon: string;
  title: string;
  description: string;
}

interface HowItWorksData {
  title: string;
  steps: Step[];
}

interface AboutUsData {
  title: string;
  startYear: number;
  description1: string;
  description2: string;
  description3: string;
}

interface ContactFormData {
  title: string;
  notice: string;
  fields: {
    selectPlaceholder: string;
    name: string;
    wsp: string;
    residence: string;
    operation: string;
    amount: string;
  };
  residenceOptions: {
    zona_norte: string;
    zona_sur: string;
    zona_oeste: string;
    caba: string;
    interior_bs_as: string;
  };
  operationOptions: {
    buy: string;
    sell: string;
  };
  amountHelp: string;
  warnings: string[];
  buttonText: string;
  captchaText: string;
}

interface TextData {
  header: HeaderData;
  footer: FooterData;
  howItWorks: HowItWorksData;
  aboutUs: AboutUsData;
  contactForm: ContactFormData;
}

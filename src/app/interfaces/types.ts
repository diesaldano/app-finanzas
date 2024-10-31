
export interface FooterData {
  yearText: string;
  contact: string;
  about: string;
  terms: string;
  securityText: string;
}

export interface HeaderData {
  title: string;
}

export interface Step {
  icon?: string;
  title?: string;
  description?: string;
}

export interface HowItWorksData {
  title: string;
  steps: Step[];
}

export interface AboutUsData {
  title: string;
  startYear: string;
  description1: string;
  description2: string;
  description3: string;
}

export interface ContactFormData {
  title: string;
  notice: string;
  fields: {
    selectPlaceholder: string;
    name: string;
    email: string;
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

export interface TextData {
  header: HeaderData;
  footer: FooterData;
  howItWorks: HowItWorksData;
  aboutUs: AboutUsData;
  contactForm: ContactFormData;
}



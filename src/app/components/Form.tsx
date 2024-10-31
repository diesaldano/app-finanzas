import { Formik, Form, Field, ErrorMessage, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import Spinner from './Spinner';
import Alert from './Alert';
import { useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import { ContactFormData } from '../interfaces/types';
import { motion } from 'framer-motion';

// Definición del tipo de los valores del formulario
type FormValues = {
  nombre: string;
  email: string;
  wsp: string;
  residencia: string;
  operacion: string;
  cantidad: string;
};

const ContactFormSchema = Yup.object().shape({
  nombre: Yup.string().required('El nombre es obligatorio'),
  email: Yup.string().email('Correo inválido').required('El correo es obligatorio'),
  wsp: Yup.string()
    .matches(/^\d+$/, 'Debe contener solo números')
    .required('El número de WhatsApp es obligatorio'),
  residencia: Yup.string().required('La residencia es obligatoria'),
  operacion: Yup.string().required('Seleccione una operación'),
  cantidad: Yup.number()
    .typeError('Debe ser un número')
    .positive('Debe ser un número positivo')
    .required('La cantidad es obligatoria'),
});

export default function ContactForm({ data }: { data: ContactFormData }) {
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({ message: '', type: 'success', visible: false });
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);

  const handleCaptchaChange = (token: string | null) => {
    setCaptchaToken(token);
  };

  const handleSubmit = async (
    values: FormValues,
    { resetForm }: FormikHelpers<FormValues>
  ) => {
    if (!captchaToken) {
      setAlert({ message: 'Por favor, completa el reCAPTCHA', type: 'error', visible: true });
      return;
    }

    setLoading(true);
    setAlert({ message: '', type: 'success', visible: false });

    try {
      const response = await fetch('/api/form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...values, captchaToken }),
      });
      const data = await response.json();

      setLoading(false);

      if (data.success) {
        setAlert({ message: 'Correo enviado exitosamente', type: 'success', visible: true });
        resetForm(); // Limpia el formulario tras el envío exitoso
        setCaptchaToken(null); // Restablece el token de reCAPTCHA
      } else {
        setAlert({ message: 'Error enviando el correo', type: 'error', visible: true });
      }
    } catch (error) {
      console.error(error); 
      setLoading(false);
      setAlert({ message: 'Error en el servidor', type: 'error', visible: true });
    }
  };

  return (
    <section id="contacto" className="container mx-auto my-16 flex justify-center">
      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-lg">
        <h1 className="text-gray text-2xl text-center py-8">Finanzas del Norte</h1>

        <Alert message={alert.message} type={alert.type as 'success' | 'error'} visible={alert.visible} />
        {loading && <Spinner />}

        <Formik<FormValues>
          initialValues={{
            nombre: '',
            email: '',
            wsp: '',
            residencia: '',
            operacion: '',
            cantidad: '',
          }}
          validationSchema={ContactFormSchema}
          onSubmit={handleSubmit}
        >
          {({ values, handleChange }) => (
            <Form>
              <div className="mb-4">
                <label className="block text-lg font-semibold" htmlFor="nombre">{data.fields.name}</label>
                <Field
                  type="text"
                  id="nombre"
                  name="nombre"
                  className="w-full outline-none p-3 border-b border-gray-300 focus:border-primary transition-all focus:shadow-md"
                  value={values.nombre}
                  onChange={handleChange}
                />
                <ErrorMessage name="nombre" component="p" className="text-red-500 text-sm" />
              </div>

              <div className="mb-4">
                <label className="block text-lg font-semibold" htmlFor="email">{data.fields.email}</label>
                <Field
                  type="email"
                  id="email"
                  name="email"
                  className="w-full outline-none p-3 border-b border-gray-300 focus:border-primary transition-all focus:shadow-md"
                  value={values.email}
                  onChange={handleChange}
                />
                <ErrorMessage name="email" component="p" className="text-red-500 text-sm" />
              </div>

              <div className="mb-4">
                <label className="block text-lg font-semibold" htmlFor="wsp">{data.fields.wsp}</label>
                <Field
                  type="tel"
                  id="wsp"
                  name="wsp"
                  className="w-full outline-none p-3 border-b border-gray-300 focus:border-primary transition-all focus:shadow-md"
                  value={values.wsp}
                  onChange={handleChange}
                />
                <ErrorMessage name="wsp" component="p" className="text-red-500 text-sm" />
              </div>

              <div className="mb-4">
                <label className="block text-lg font-semibold" htmlFor="residencia">{data.fields.residence}</label>
                <Field
                  as="select"
                  id="residencia"
                  name="residencia"
                  className="w-full outline-none p-3 border-b border-gray-300 focus:border-primary transition-all focus:shadow-md"
                  value={values.residencia}
                  onChange={handleChange}
                >
                  <option value="">{data.fields.selectPlaceholder}</option>
                  <option value="zona_norte">{data.residenceOptions.zona_norte}</option>
                  <option value="zona_sur">{data.residenceOptions.zona_sur}</option>
                  <option value="zona_oeste">{data.residenceOptions.zona_oeste}</option>
                  <option value="caba">{data.residenceOptions.caba}</option>
                  <option value="interior_bs_as">{data.residenceOptions.interior_bs_as}</option>
                </Field>
                <ErrorMessage name="residencia" component="p" className="text-red-500 text-sm" />
              </div>

              <div className="mb-4">
                <label className="block text-lg font-semibold" htmlFor="operacion">{data.fields.operation}</label>
                <Field
                  as="select"
                  id="operacion"
                  name="operacion"
                  className="w-full outline-none p-3 border-b border-gray-300 focus:border-primary transition-all focus:shadow-md"
                  value={values.operacion}
                  onChange={handleChange}
                >
                  <option value="">{data.fields.selectPlaceholder}</option>
                  <option value="comprar">{data.operationOptions.buy}</option>
                  <option value="vender">{data.operationOptions.sell}</option>
                </Field>
                <ErrorMessage name="operacion" component="p" className="text-red-500 text-sm" />
              </div>

              <div className="mb-4">
                <label className="block text-lg font-semibold" htmlFor="cantidad">{data.fields.amount}</label>
                <Field
                  type="number"
                  id="cantidad"
                  name="cantidad"
                  className="w-full outline-none p-3 border-b border-gray-300 focus:border-primary transition-all focus:shadow-md"
                  value={values.cantidad}
                  onChange={handleChange}
                />
                <ErrorMessage name="cantidad" component="p" className="text-red-500 text-sm" />
                <p className="text-sm text-gray-500">{data.amountHelp}</p>
              </div>

              {/* reCAPTCHA */}
              <div className="my-4 flex justify-center">
                <ReCAPTCHA
                  sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ''}
                  onChange={handleCaptchaChange}
                />
              </div>

              {/* Botón de envío con animación de carga */}
              <motion.button
                type="submit"
                className="bg-primary text-white py-2 px-4 w-full hover:bg-secondary transition rounded shadow relative overflow-hidden"
                disabled={loading}
              >
                <motion.div
                  animate={{ width: loading ? '100%' : '0%' }}
                  transition={{ duration: 2, ease: 'easeInOut' }}
                  className="absolute top-0 left-0 h-full bg-secondary"
                />
                <span className="relative">{loading ? 'Cargando...' : data.buttonText}</span>
              </motion.button>
            </Form>
          )}
        </Formik>
      </div>
    </section>
  );
}

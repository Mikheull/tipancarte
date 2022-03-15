import Layout from '../components/Layout'
import { Formik, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from "axios";
import { Text, Input, Button, useToasts, Select, Textarea } from '@geist-ui/core'

export default function Contact() {
  const { setToast } = useToasts()

  return (
    <Layout title="Contact" actual="contact">
       <div className="py-6 mx-auto max-w-7xl md:px-4 px-10">
        <Text h1 className="font-bitter">Contact</Text>

        <div className="md:w-1/2 w-full">
          <Formik
              initialValues={{ fullname: '', email: '', subject: 'Contact', message: '' }}
              validationSchema={Yup.object({
                fullname: Yup.string().required('Veuillez entrer votre nom complet'),
                  email: Yup.string()
                  .email('L\'adresse email est invalide')
                  .required('Veuillez entrer votre adresse email'),
                  subject: Yup.string(),
                  message: Yup.string(),
              })}
              onSubmit={async (values, { setSubmitting}) => {
                    const { fullname, email, subject, message } = values;

                    setSubmitting(false);
                    setToast({ text: 'Le formulaire à bien été envoyé !', delay: 2000, placement: 'topRight', type: 'success'})
                    await axios.post('/api/emails/contact', { fullname, email, subject, message })
              }}
          >

          {(formik) => (
              <form>
                  <div>
                      <div className="flex w-full gap-4 pb-5">
                          <div className='flex flex-col w-full md:w-full'>
                              <label htmlFor="fullname" className="text-xs sm:text-sm tracking-wide text-cdark font-lato" >
                                  Nom complet *
                              </label>
                              <Input
                                  name="fullname"
                                  id="fullname"
                                  className="text-sm sm:text-base mt-2.5 font-bitter w-full rounded placeholder-gray-400"
                                  width="100%"
                                  required
                                  placeholder="John Doe"
                                  onChange={e => formik.setFieldValue('fullname', e.target.value)}
                              />

                              <div className="text-red-500 text-sm">
                                  <ErrorMessage name="fullname" />
                              </div>
                          </div>
                      </div>

                      <div className="flex w-full gap-4 pb-5">
                          <div className='flex flex-col w-full md:w-full'>
                              <label htmlFor="email" className="text-xs sm:text-sm tracking-wide text-cdark font-lato" >
                                  Email *
                              </label>
                              <Input
                                  name="email"
                                  id="email"
                                  className="text-sm sm:text-base mt-2.5 font-bitter w-full rounded placeholder-gray-400"
                                  width="100%"
                                  required
                                  placeholder="john.doe@gmail.com" 
                                  onChange={e => formik.setFieldValue('email', e.target.value)}
                              />

                              <div className="text-red-500 text-sm">
                                  <ErrorMessage name="email" />
                              </div>
                          </div>
                      </div>

                      <div className="flex w-full gap-4 pb-5">
                          <div className='flex flex-col w-full md:w-full'>
                              <label htmlFor="password" className="text-xs sm:text-sm tracking-wide text-cdark font-lato" >
                                Sujet
                              </label>
                              <Select placeholder="Choisir un sujet" onChange={e => formik.setFieldValue('subject', e)}>
                                <Select.Option value="contact">Contact</Select.Option>
                                <Select.Option value="avis">Avis</Select.Option>
                                <Select.Option value="commande">Commande</Select.Option>
                                <Select.Option value="autre">Autre</Select.Option>
                              </Select>
                          </div>
                      </div>

                      <div className="flex flex-col w-full md:w-full">
                          <div className='flex flex-col'>
                              <label htmlFor="confirmPassword" className="text-xs sm:text-sm tracking-wide text-cdark font-lato" >
                                Message
                              </label>
                              <Textarea 
                                width="100%"
                                resize
                                onChange={e => formik.setFieldValue('message', e.target.value)}
                                placeholder="Votre message" 
                              />
                          </div>
                      </div>
                  </div>

                  <div className='flex justify-between w-full items-center my-6'>
                      {formik.isSubmitting ? 
                          <Button loading auto></Button>
                      : 
                          <Button onClick={formik.handleSubmit}>Envoyer</Button>
                      }
                  </div>
              </form>
          )}
          </Formik>
        </div>
      </div>
    </Layout>
  )
}
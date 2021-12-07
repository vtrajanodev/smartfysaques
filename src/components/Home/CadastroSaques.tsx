import { Formik, Form, Field, FormikHelpers } from 'formik'
import { useEffect, useState } from 'react'
import styles from './cadastroSaques.module.scss'
import { getDatabase, ref, set, push, child, update } from "firebase/database";
import { database } from '../../services/firebase';

interface Saques {
  nome: string;
  login: string;
  valor: number;
  modalidade: string;
  pix: string;
  banco: string;
  cpf: string
}

export const CadastroSaques = () => {

  const [arrayDeSaques, setArrayDeSaques] = useState<Saques[]>([])

  useEffect(() => {
    localStorage.getItem('listaDeSaques')
  }, [])

  const computarSaques = async ({ nome, login, valor, modalidade, pix, banco, cpf }: Saques) => {

    const novoSaque = {
      nome: nome,
      login: login,
      valor: valor,
      modalidade: modalidade,
      pix: pix,
      banco: banco,
      cpf: cpf
    }

    const newPostKey = push(child(ref(database), 'saques')).key;
    const updates: any = {};


    updates['/saques/' + modalidade + '/' + newPostKey] = novoSaque;


    return update(ref(database), updates);
  }

  console.log(arrayDeSaques)
  return (

    <>
      <div className={`container`}>

        <h1>Cadastro de saques</h1>
        <Formik
          initialValues={{
            nome: '',
            login: '',
            valor: 0,
            modalidade: '',
            pix: '',
            banco: '',
            cpf: ''
          }}
          onSubmit={async (
            values: Saques,
            { setSubmitting }: FormikHelpers<Saques>
          ) => {
            await computarSaques(values)
            setArrayDeSaques([...arrayDeSaques, values])
          }}
        >
          {props => (
            <Form className={styles.cadastroContainer}>
              <div>
                <div>
                  <label htmlFor="nome">Nome:</label>
                  <Field id="nome" name="nome" />
                </div>

                <div>
                  <label htmlFor="login">Login:</label>
                  <Field id="login" name="login" />
                </div>

                <div>
                  <label htmlFor="valor">Valor</label>
                  <Field id="valor" name="valor" />
                </div>

                <div>
                  <label htmlFor="modalidade">Modalidade</label>
                  <Field id="modalidade" name="modalidade" />
                </div>

                <div>
                  <label htmlFor="pix">Pix</label>
                  <Field id="pix" name="pix" />
                </div>

                <div>
                  <label htmlFor="banco">Banco</label>
                  <Field id="banco" name="banco" />
                </div>

                <div>
                  <label htmlFor="cpf">CPF:</label>
                  <Field id="cpf" name="cpf" />
                </div>

                <div className={styles.botoes}>
                  <button type="submit">Computar saque</button>
                </div>
              </div>
            </Form>
          )}
        </Formik>

        <div className={styles.cardContainer}>
          {arrayDeSaques.map((saque, index) => (
            <div key={index}>
              <h2>{saque.nome}</h2>
              <small>Sol. {index}</small>
              <p>login: {saque.login}</p>
              <p>Valor: {saque.valor}</p>
              <p>Modalidade: {saque.modalidade}</p>
              <p>Pix: {saque.pix}</p>
              <p>Banco: {saque.banco}</p>
              <p>Cpf: {saque.cpf}</p>
            </div>
          ))}
        </div>

      </div>
    </>
  )
}
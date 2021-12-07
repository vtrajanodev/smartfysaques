import { Formik, Form, Field, FormikHelpers } from 'formik'
import { useEffect, useState } from 'react'
import styles from './cadastroSaques.module.scss'
import { ref, push, child, update, get, onChildAdded, onChildChanged, onChildRemoved, onValue } from "firebase/database";
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

    if (modalidade === 'rendimentos'.toLowerCase() || modalidade === 'rede'.toLowerCase()) {
      updates['/saques/' + newPostKey] = novoSaque;
      return update(ref(database), updates);
    }
  }

  return (
    <>
      <div className={`container`}>

        <h1>Cadastro de saques</h1>
        <Formik
          initialValues={{
            nome: '',
            login: '',
            valor: 0,
            modalidade: 'rendimentos',
            pix: '',
            banco: '',
            cpf: ''
          }}
          onSubmit={async (
            values: Saques,
            { setSubmitting }: FormikHelpers<Saques>
          ) => {
            await computarSaques(values)
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
                  <label htmlFor="modalidade">Modalidade:</label>
                  <Field as="select" name="modalidade" id="modalidade">
                    <option value="rendimentos">Rendimentos</option>
                    <option value="rede">Rede</option>
                  </Field>
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

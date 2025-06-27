import Styles from '../css/Login.module.css'; // CAMINHO CORRIGIDO
import { Link } from 'react-router-dom';

function ForgotPasswordPage() {
    return (
        <div className={Styles.container}>
            <div className={Styles.form_container}>
                <h2 className={Styles.segundo_titulo}>Esqueceu a senha?</h2>
                <p className={Styles.form_description}>
                    Sem problemas! Digite seu e-mail abaixo e enviaremos um link para você criar uma nova senha.
                </p>
                <form className={Styles.form} style={{ width: '100%' }}>
                    <label>
                        <i className="fi fi-rr-envelope icon-modify"></i>
                        <input type="email" name="email" placeholder="Digite seu e-mail" />
                    </label>
                    <button type="button" className={`${Styles.segundo_botao} ${Styles.botao}`}>
                        Enviar link de recuperação
                    </button>
                </form>
                <Link to="/login" className={Styles.back_link}>
                    Voltar para o Login
                </Link>
            </div>
        </div>
    );
}

export default ForgotPasswordPage;
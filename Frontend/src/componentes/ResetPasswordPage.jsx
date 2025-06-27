import Styles from '../css/Login.module.css'; // CAMINHO CORRIGIDO
import { Link } from 'react-router-dom';

function ResetPasswordPage() {
    return (
        <div className={Styles.container}>
            <div className={Styles.form_container}>
                <h2 className={Styles.segundo_titulo}>Crie uma nova senha</h2>
                <p className={Styles.form_description}>
                    Sua nova senha deve ser diferente da senha anterior.
                </p>
                <form className={Styles.form} style={{ width: '100%' }}>
                    <label>
                        <i className="fi fi-sr-lock icon-modify"></i>
                        <input type="password" name="password" placeholder="Digite sua nova senha" />
                    </label>
                    <label>
                        <i className="fi fi-sr-lock icon-modify"></i>
                        <input type="password" name="confirmPassword" placeholder="Confirme a nova senha" />
                    </label>
                    <button type="button" className={`${Styles.segundo_botao} ${Styles.botao}`}>
                        Redefinir Senha
                    </button>
                </form>
                <Link to="/login" className={Styles.back_link}>
                    Voltar para o Login
                </Link>
            </div>
        </div>
    );
}

export default ResetPasswordPage;
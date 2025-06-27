import Styles from '../css/Login.module.css';
import LogoSG from '../assets/img/LogoSG.png';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login() {
    const navigate = useNavigate();

    // Estado para o formulário de CADASTRO
    const [form, setForm] = useState({
        nomeCompleto: '',
        nomeUsuario: '',
        email: '',
        senha: ''
    });

    // Estado SEPARADO para o formulário de LOGIN
    const [loginForm, setLoginForm] = useState({
        email: '',
        senha: ''
    });

    // Handler para atualizar o estado do formulário de CADASTRO
    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    // Handler para atualizar o estado do formulário de LOGIN
    const handleLoginChange = (e) => {
        const { name, value } = e.target;
        setLoginForm((prev) => ({ ...prev, [name]: value }));
    };

    // --- FUNÇÃO DE SUBMISSÃO DO CADASTRO ---
    const handleRegisterSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:8080/api/auth/register", {
                nomeCompleto: form.nomeCompleto,
                nomeUsuario: form.nomeUsuario,
                email: form.email,
                senha: form.senha
            });
            alert("Cadastro realizado com sucesso! Por favor, faça o login.");
            setModo("signup");
        } catch (error) {
            const errorMessage = error.response?.data || error.message;
            console.error("Erro no cadastro:", errorMessage);
            alert("Erro ao cadastrar: " + errorMessage);
        }
    };

    // --- FUNÇÃO DE SUBMISSÃO DO LOGIN (NOME CORRIGIDO) ---
    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:8080/api/auth/login", {
                email: loginForm.email,
                senha: loginForm.senha // Usando 'senha' para consistência
            });

            const token = response.data.token;
            if (token) {
                localStorage.setItem("userToken", token);
                alert("Login bem-sucedido!");
                navigate("/dashboard"); // Navega para uma página de dashboard, por exemplo
            }
        } catch (error) {
            const errorMessage = error.response?.data || "Verifique suas credenciais.";
            console.error("Erro no login:", errorMessage);
            alert("Erro no login: " + errorMessage);
        }
    };

    //-------------- LÓGICA DA ANIMAÇÃO --------------
    const [modo, setModo] = useState("");
    const [classeAtual, setClasseAtual] = useState("");
    useEffect(() => {
        if (modo === "signin") {
            setClasseAtual(Styles.cadastra);
        }
        if (modo === "signup") {
            setClasseAtual(Styles.loga);
        }
    }, [modo]);

    return (
        <div className={`${Styles.container} ${classeAtual}`}>
            {/*-------------------------- PRIMEIRO ESTADO (CADASTRO) --------------------------*/}
            <div className={`${Styles.content} ${Styles.primeiro_content}`}>
                <div className={Styles.primeira_coluna}>
                    <figure className={Styles.logo_login}>
                        <img src={LogoSG} alt="Logo STEM Grils" />
                    </figure>
                    <h2 className={`${Styles.primeiro_titulo} ${Styles.titulo}`}>Prazer em conhecê-lo!</h2>
                    <p className={`${Styles.descricao} ${Styles.meio}`}>Crie seu perfil para participar de comunidades conosco</p>
                    <div className={Styles.botao_texto}>
                        <p className={Styles.descricao}>Já tem uma conta?</p>
                        <button className={`${Styles.primeiro_botao} ${Styles.botao}`} onClick={() => setModo("signup")}>Entrar</button>
                    </div>
                </div>
                <div className={Styles.segunda_coluna}>
                    <h2 className={`${Styles.segundo_titulo} ${Styles.titulo}`}>Crie sua conta</h2>
                    <div className={Styles.social_media}>
                        <a href="#"><i className="fi fi-brands-google"></i></a>
                        <a href="#"><i className="fi fi-brands-instagram"></i></a>
                        <a href="#"><i className="fi fi-brands-github"></i></a>
                    </div>
                    <form className={Styles.form} onSubmit={handleRegisterSubmit}>
                        <label>
                            <i className="far fa-user icon-modify"></i>
                            <input type="text" name="nomeCompleto" placeholder="Digite seu nome completo" value={form.nomeCompleto} onChange={handleChange} required />
                        </label>
                        <label>
                            <i className="fi fi-br-at icon-modify"></i>
                            <input type="text" name="nomeUsuario" placeholder="Digite o nome de usuário" value={form.nomeUsuario} onChange={handleChange} required />
                        </label>
                        <label>
                            <i className="fi fi-rr-envelope icon-modify"></i>
                            <input type="email" name="email" placeholder="Digite seu Email" value={form.email} onChange={handleChange} required />
                        </label>
                        <label>
                            <i className="fi fi-sr-lock icon-modify"></i>
                            <input type="password" name="senha" placeholder="Digite sua senha" value={form.senha} onChange={handleChange} required />
                        </label>
                        <div className={Styles.terms_container}>
                            <input className={Styles.input_terms} type="checkbox" name="terms" id="terms" required />
                            <label className={Styles.label_terms} htmlFor="terms">
                                Li e aceito os <a href="#" target="_blank"> Termos de Uso</a>
                            </label>
                        </div>
                        <button type="submit" className={`${Styles.segundo_botao} ${Styles.botao}`}>Cadastrar-se</button>
                    </form>
                </div>
            </div>

            {/*-------------------------- SEGUNDO ESTADO (LOGIN) --------------------------*/}
            <div className={`${Styles.content} ${Styles.segundo_content}`}>
                <div className={Styles.primeira_coluna}>
                    <figure className={Styles.logo_login}>
                        <img src={LogoSG} alt="Logo STEM Grils" />
                    </figure>
                    <h2 className={`${Styles.primeiro_titulo} ${Styles.titulo}`}>Bem-vindo de volta!</h2>
                    <p className={`${Styles.descricao} ${Styles.meio}`}>Conecte-se para continuar explorando</p>
                    <div className={Styles.botao_texto}>
                        <p className={Styles.descricao}>Ainda não tem uma conta?</p>
                        <button className={`${Styles.primeiro_botao} ${Styles.botao}`} onClick={() => setModo("signin")}>Cadastrar</button>
                    </div>
                </div>
                <div className={Styles.segunda_coluna}>
                    <h2 className={`${Styles.segundo_titulo} ${Styles.titulo}`}>Entrar na sua conta</h2>
                    <div className={Styles.social_media}>
                        <a href="#"><i className="fi fi-brands-google"></i></a>
                        <a href="#"><i className="fi fi-brands-instagram"></i></a>
                        <a href="#"><i className="fi fi-brands-github"></i></a>
                    </div>
                    <form className={Styles.form} onSubmit={handleLoginSubmit}>
                        <label>
                            <i className="far fa-user icon-modify"></i>
                            <input type="email" name="email" placeholder="Digite seu email" value={loginForm.email} onChange={handleLoginChange} required />
                        </label>
                        <label>
                            <i className="fi fi-sr-lock icon-modify"></i>
                            <input type="password" name="senha" placeholder="Digite sua senha" value={loginForm.senha} onChange={handleLoginChange} required />
                        </label>
                        <Link to="/esqueci-a-senha" className={Styles.password}>Esqueceu a senha?</Link>
                        <button type="submit" className={`${Styles.segundo_botao} ${Styles.botao}`}>Entrar</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login;
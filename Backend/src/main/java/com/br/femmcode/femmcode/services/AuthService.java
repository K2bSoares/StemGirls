package com.br.femmcode.femmcode.services;

import com.br.femmcode.femmcode.dtos.SignUpRequest;
import com.br.femmcode.femmcode.models.UsuarioModel;
import com.br.femmcode.femmcode.repositories.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
public class AuthService implements UserDetailsService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public UsuarioModel registerUser(SignUpRequest signUpRequest) {
        if (usuarioRepository.existsByEmail(signUpRequest.email())) {
            throw new RuntimeException("Erro: E-mail já está em uso!");
        }
        UsuarioModel newUser = new UsuarioModel();
        newUser.setNomeCompleto(signUpRequest.nomeCompleto());
        newUser.setNomeUsuario(signUpRequest.nomeUsuario());
        newUser.setEmail(signUpRequest.email());
        newUser.setSenha(passwordEncoder.encode(signUpRequest.senha()));
        return usuarioRepository.save(newUser);
    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        // --- LOG DE DEBUG ADICIONADO ---
        System.out.println("\n--- [DEBUG] AuthService (loadUserByUsername): Buscando usuário ---");
        System.out.println("Spring Security pediu para buscar o usuário com e-mail: " + email);
        // --- FIM DO LOG ---

        UsuarioModel user = usuarioRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("Usuário não encontrado com o e-mail: " + email));

        // --- LOG DE DEBUG ADICIONADO ---
        System.out.println("Usuário encontrado no banco de dados: " + user.getEmail());
        System.out.println("Hash da senha no banco: " + user.getSenha());
        System.out.println("----------------------------------------------------------------\n");
        // --- FIM DO LOG ---

        return new User(user.getEmail(), user.getSenha(), new ArrayList<>());
    }
}
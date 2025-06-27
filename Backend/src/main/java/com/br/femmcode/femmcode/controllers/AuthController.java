package com.br.femmcode.femmcode.controllers;

import com.br.femmcode.femmcode.config.JwtUtils;
import com.br.femmcode.femmcode.dtos.JwtResponse;
import com.br.femmcode.femmcode.dtos.LoginRequest;
import com.br.femmcode.femmcode.dtos.SignUpRequest;
import com.br.femmcode.femmcode.services.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:5173")
public class AuthController {

    @Autowired
    private AuthService authService;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtUtils jwtUtils;

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody SignUpRequest signUpRequest) {
        try {
            authService.registerUser(signUpRequest);
            return ResponseEntity.ok("Usuário registrado com sucesso!");
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        // --- LOG DE DEBUG ADICIONADO ---
        System.out.println("\n--- [DEBUG] AuthController: Recebendo tentativa de login ---");
        System.out.println("E-mail recebido do Frontend: " + loginRequest.email());
        System.out.println("Senha recebida do Frontend: " + loginRequest.senha());
        System.out.println("----------------------------------------------------------\n");
        // --- FIM DO LOG ---

        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(loginRequest.email(), loginRequest.senha())
            );

            SecurityContextHolder.getContext().setAuthentication(authentication);
            String jwt = jwtUtils.generateJwtToken(authentication);

            return ResponseEntity.ok(new JwtResponse(jwt));

        } catch (Exception e) {
            System.err.println("!!! [DEBUG] Erro de autenticação: " + e.getMessage());
            return ResponseEntity.status(401).body("Erro: E-mail ou senha inválidos.");
        }
    }
}
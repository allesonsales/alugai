import { Component } from '@angular/core';
import { BotaoLoginComponent } from '../../components/botao-login/botao-login.component';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UsuarioService } from '../../services/usuario/usuario.service';
import { ModalComponent } from '../../components/modal/modal.component';

@Component({
  selector: 'app-login',
  imports: [
    FormsModule,
    CommonModule,
    BotaoLoginComponent,
    ModalComponent,
    RouterLink,
    RouterModule,
  ],
  standalone: true,
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  constructor(
    private router: Router,
    private usuarioService: UsuarioService,
  ) {}

  email: string = '';
  senha: string = '';
  logado: boolean = false;

  mensagemModal: string = '';
  tituloModal: string = '';
  mostrarModal: boolean = false;

  loading: boolean = false;

  logar(form: NgForm) {
    this.loading = true;
    sessionStorage.removeItem('notificacoesExibidas');

    const camposObrigatorios = [
      { nome: 'email', msg: 'Digite um e-mail válido!' },
      { nome: 'senha', msg: 'Digite sua senha' },
    ];

    for (let campo of camposObrigatorios) {
      if (form.controls[campo.nome].invalid) {
        this.tituloModal = 'Erro:';
        this.mensagemModal = campo.msg;
        this.mostrarModal = true;
        return;
      }
    }

    const dados = {
      email: this.email,
      senha: this.senha,
    };

    this.usuarioService.logarUsuario(dados).subscribe({
      next: (res: any) => {
        localStorage.setItem('usuario', JSON.stringify(res.user));
        this.tituloModal = 'Bem-vindo:';
        this.mensagemModal = res.message;
        this.mostrarModal = true;
        this.logado = true;
        this.loading = false;
      },
      error: (err) => {
        this.tituloModal = 'Erro:';
        this.mensagemModal = err.error.message;
        this.mostrarModal = true;
        this.loading = false;
      },
    });
  }

  logarTeste() {
    this.loading = true;
    sessionStorage.removeItem('notificacoesExibidas');
    const dados = {
      email: 'allesonsales@gmail.com',
      senha: '123',
    };

    this.usuarioService.logarUsuario(dados).subscribe({
      next: (res: any) => {
        localStorage.setItem('usuario', JSON.stringify(res.user));
        this.tituloModal = 'Bem-vindo:';
        this.mensagemModal = res.message;
        this.mostrarModal = true;
        this.logado = true;
        this.loading = false;
      },
      error: (err) => {
        this.tituloModal = 'Erro:';
        this.mensagemModal = err.error.message;
        this.mostrarModal = true;
        this.loading = false;
      },
    });
  }

  fecharModal() {
    if (this.logado) {
      this.mostrarModal = false;
      this.router.navigate(['/dashboard']);
    } else {
      this.mostrarModal = false;
    }
  }

  fecharPorTempo() {
    if (this.logado) {
      setTimeout(() => {
        this.mostrarModal = false;
        this.router.navigate(['/dashboard']);
      }, 2000);
    }
  }
}

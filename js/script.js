$(document).ready(function () {
  // Função para aplicar máscara de telefone no input.
  function aplicarMascaraTelefone(input) {
    let valor = $(input).val().replace(/\D/g, '');
    valor = valor.replace(/^(\d{2})(\d)/, "($1) $2");
    valor = valor.replace(/(\d)(\d{4})$/, "$1-$2");
    $(input).val(valor);
  }


  function validarNomeSobrenome(input) {
    // Atualiza a expressão regular para incluir ponto (.) e hífen (-) nos caracteres permitidos
    const regex = /^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÊÍÏÓÔÕÖÚÇÑ .'-]+$/;

    // Mantém a expressão regular para verificar a repetição de caracteres
    const regexRepeticao = /(.)\1{2,}/;

    // Verifica a presença de letras quando há ponto ou hífen
    const regexLetrasComEspeciais = /.*[A-Za-z].*/;

    // Obtém o valor do input
    const valor = $(input).val().trim();

    // Verifica o comprimento do nome
    const comprimentoValido = valor.length >= 2 && valor.length <= 25;

    // Verifica se o nome contém caracteres permitidos
    const caracteresValidos = regex.test(valor);

    // Verifica por repetição excessiva de caracteres
    const repeticaoExcessiva = regexRepeticao.test(valor);

    // Verifica a condição de letras com especiais
    const condicaoLetrasComEspeciais = regexLetrasComEspeciais.test(valor) || (!valor.includes('.') && !valor.includes('-'));

    // Lista de palavras inapropriadas para exemplo
    const palavrasInapropriadas = ["inapropriado", "ofensivo"];
    
    // Verifica se o nome contém alguma palavra inapropriada
    const contemPalavraInapropriada = palavrasInapropriadas.some(palavra => valor.toLowerCase().includes(palavra));
    
    // Condição para verificar se o valor é válido
    if (!comprimentoValido || !caracteresValidos || contemPalavraInapropriada || repeticaoExcessiva || !condicaoLetrasComEspeciais) {
      $(input).addClass("is-invalid").removeClass("is-valid");
      return false;
    } else {
      $(input).removeClass("is-invalid").addClass("is-valid");
      return true;
    }
}


  // Função para validar o e-mail.
  function validarEmail(input) {
    // Esta regex é mais estrita e alinha-se melhor com as regras RFC 5322, mas ainda não cobre todos os casos, como caracteres internacionais.
    const re = /^(?:(?:[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*)|(?:"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])"))@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z]{2,})$/;
    
    const email = $(input).val();
    
    // Verifica a regex e o comprimento máximo de 254 caracteres.
    if (!re.test(email) || email.length > 254) {
      $(input).addClass("is-invalid").removeClass("is-valid");
      return false;
    } else {
      $(input).removeClass("is-invalid").addClass("is-valid");
      return true;
    }
  }
  

  // Função para validar o formato do telefone.
  function validarTelefone(input) {
    const re = /^\(\d{2}\)\s\d{4,5}-\d{4}$/;
    aplicarMascaraTelefone(input);
    if (!re.test($(input).val())) {
      $(input).addClass("is-invalid").removeClass("is-valid");
      return false;
    } else {
      $(input).removeClass("is-invalid").addClass("is-valid");
      return true;
    }
  }

  // Função para garantir que a observação não seja deixada em branco.
  function validarObservacao(input) {
    if ($(input).val().trim() === "") {
      $(input).addClass("is-invalid").removeClass("is-valid");
      return false;
    } else {
      $(input).removeClass("is-invalid").addClass("is-valid");
      return true;
    }
  }

  // Eventos de validação nos campos.
  $("#inputNome, #inputSobrenome").blur(function() {
    validarNomeSobrenome(this);
  });

  $("#inputEmail").blur(function() {
    validarEmail(this);
  });

  $("#inputTelefone").blur(function() {
    validarTelefone(this);
  }).on('input', function() {
    aplicarMascaraTelefone(this);
  });

  $("#inputObservacao").blur(function() {
    validarObservacao(this);
  });

  // Função para limpar todos os campos do formulário.
  function limparFormulario() {
    $("#formulario")[0].reset();
    $(".form-control").removeClass("is-invalid is-valid");
  }

  // Evento para o botão cancelar.
  $("#btnCancelar").click(function() {
    limparFormulario();
  });

  // Evento do botão salvar para validar todos os campos antes de prosseguir.
  $("#btnSalvar").click(function() {
    const validNome = validarNomeSobrenome("#inputNome");
    const validSobrenome = validarNomeSobrenome("#inputSobrenome");
    const validEmail = validarEmail("#inputEmail");
    const validTelefone = validarTelefone("#inputTelefone");
    const validObservacao = validarObservacao("#inputObservacao");

    if (validNome && validSobrenome && validEmail && validTelefone && validObservacao) {
      $("#alertaSucesso").removeClass("d-none");
      limparFormulario();

      setTimeout(function() {
        $("#alertaSucesso").addClass("d-none");
      }, 3000);
    } else {
      $("#alertaErro").removeClass("d-none");
      setTimeout(function() {
        $("#alertaErro").addClass("d-none");
      }, 3000);
    }
  });

});

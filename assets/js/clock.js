function clock() {
    //variaveis
    const date = new Date();
    const diaSemana = date.getDay();
    let diaSemanaTexto;
    const dia = date.getDate();
    const mes = date.getMonth();
    let mesTexto;
    const ano = date.getFullYear();
    const hora = date.getHours();
    const minutos = date.getMinutes();
    const segundos = date.getSeconds();
    let amPm;
    const cardData = document.querySelector("#card-hora");
  
    //Dia da semana
    switch (diaSemana) {
      case 0:
        diaSemanaTexto = "Domingo";
        break;
      case 1:
        diaSemanaTexto = "Segunda-feira";
        break;
      case 2:
        diaSemanaTexto = "Terça-feira";
        break;
      case 3:
        diaSemanaTexto = "Quarta-feira";
        break;
      case 4:
        diaSemanaTexto = "Quinta-feira";
        break;
      case 5:
        diaSemanaTexto = "Sexta-feira";
        break;
      case 6:
        diaSemanaTexto = "Sábado";
        break;
    }
    //Mês
    switch (mes) {
      case 0:
        mesTexto = "Janeiro";
        break;
      case 1:
        mesTexto = "Fevereiro";
        break;
      case 2:
        mesTexto = "Março";
        break;
      case 3:
        mesTexto = "Abril";
        break;
      case 4:
        mesTexto = "Maio";
        break;
      case 5:
        mesTexto = "Junho";
        break;
      case 6:
        mesTexto = "Julho";
        break;
      case 7:
        mesTexto = "Agosto";
        break;
      case 8:
        mesTexto = "Setembro";
        break;
      case 9:
        mesTexto = "Outubro";
        break;
      case 10:
        mesTexto = "Novembro";
        break;
      case 11:
        mesTexto = "Dezembro";
        break;
    }
    //Am / PM
    if (hora >= 0 && hora <= 5) {
      document.querySelector("#am-pm").innerHTML = `AM`;
      cardData.classList.remove("dia");
      cardData.classList.add("noite");
      document.querySelector(".lua-hidden").style.display = "flex";
      document.querySelector(".sol-hidden").style.display = "none";
    } else if (hora >= 6 && hora <= 11) {
      document.querySelector("#am-pm").innerHTML = `AM`;
      cardData.classList.remove("noite");
      cardData.classList.add("dia");
      document.querySelector(".sol-hidden").style.display = "flex";
      document.querySelector(".lua-hidden").style.display = "none";
    } else if (hora >= 13 && hora <= 17) {
      document.querySelector("#am-pm").innerHTML = `PM`;
      cardData.classList.remove("noite");
      cardData.classList.add("dia");
      document.querySelector(".sol-hidden").style.display = "flex";
      document.querySelector(".lua-hidden").style.display = "none";
    } else if (hora >= 18 && hora <= 23) {
      document.querySelector("#am-pm").innerHTML = `PM`;
      cardData.classList.remove("dia");
      cardData.classList.add("noite");
      document.querySelector(".lua-hidden").style.display = "flex";
      document.querySelector(".sol-hidden").style.display = "none";
    }
  
    document.querySelector(
      "#show-date"
    ).innerHTML = `${diaSemanaTexto}, ${dia} de ${mesTexto}, ${ano}`;
    document.querySelector("#show-hour").innerHTML = `${hora
      .toString()
      .padStart(2, "0")}:${minutos.toString().padStart(2, "0")}`;
    document.querySelector("#segundos").innerHTML = `:${segundos
      .toString()
      .padStart(2, "0")}`;
  
    setInterval(clock, 1000);
  }
  
  clock();
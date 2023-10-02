const url = 'https://docs.google.com/spreadsheets/d/11PHJkAn8b6-MdE3aFYTIwgItMIamNWUr3TEiBAAds9g/export?format=csv';

const main = document.querySelector('main');

async function inventario() {
    const data = await fetch(url);
    const text = await data.text();
    const csvtext = await csv().fromString(text);
    main.innerHTML = '<h2 class="titulo">Biblioteca Popular do Capão</h2> <input id="searchbar" type="text" name="search" placeholder="Procure por Autor ou Obra">';
    const showMe = await csvtext.forEach(function(row) {
        main.innerHTML += "<div class='entrada'><p class='corpo' id=" + row.Link + "> "+ row.Registro + ". " + row.Título + " [" + row.Autor + "] " + "</p> <p class='disponivel'> Disponibilidade: " + row.Disponibilidade + "</p></div>";       
        }
    );
    const seletor = document.querySelectorAll(".corpo");
    let imgSrc;
    // get images src onclick
    seletor.forEach((img) => {
      img.addEventListener("click", (e) => {
        imgSrc = e.target.id;
        //run modal function
        imgModal(imgSrc);
       });
    });
    //creating the modal
    let imgModal = (src) => {
      const modal = document.createElement("div");
    modal.setAttribute("class", "modal");
    //add the modal to the main section or the parent element
    document.querySelector("main").append(modal);
    //adding image to modal
    const newImage = document.createElement("img");
    newImage.setAttribute("src", src);
    //creating the close button
    const closeBtn = document.createElement("i");
    closeBtn.setAttribute("class", "fas fa-times closeBtn");
    //close function
    closeBtn.onclick = () => {
        modal.remove();
    };
    modal.append(newImage, closeBtn);
    };
    // Searchbar Code
    const bar = document.getElementById("searchbar");
    bar.addEventListener("keyup", function() {
      let input = bar.value
      input = input.toLowerCase();
      let entrada = document.getElementsByClassName('entrada');
      let corpo = document.getElementsByClassName('corpo');
      for (i = 0; i < corpo.length; i++) { 
        if (!corpo[i].innerHTML.toLowerCase().includes(input)) {
            entrada[i].style.display="none";
        }
        else {
            entrada[i].style.display="inline";          
        }
    }})
    return showMe;
}

main.innerHTML = inventario();
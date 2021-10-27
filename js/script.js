window.onload = function(){
    var menu = document.getElementById("Menu");
    var menuCategory = document.getElementById("exampleCategory");

    fetch('MenuData.json').then(response => {
        return response.json();
      }).then(data => {
        // Work with JSON data here
            Object.keys(data).forEach(key => {

                var Clone = menuCategory.cloneNode(true);
                    Clone.id = "";
                    Clone.firstElementChild.innerHTML = key;
                    Clone.getElementsByClassName("rowPersonalized")[0].id = key;
                menu.appendChild(Clone);

                console.log(key);

                data[key].forEach(element => {
                    appendChildtoParent(document.getElementById(key), element);
                    console.log("\t" + element.name + " | "  + element.price);
                });
            });
      }).catch(err => {
        alert("La pagina web debe de estar corriendo en un servidor (internet o local) para su correcto funcionamiento (CORS no permite fetch en archivos abiertos, solo en servidores)");
      });
}

function appendChildtoParent(Parent, element) {
    var ExampleCard = document.getElementById("examplecard");

    var Clone = ExampleCard.cloneNode(true);
        Clone.id = "";
    var Card = Clone.firstElementChild;
        Card.getElementsByTagName('img')[0].src = "img/"+ Parent.id +" - "+ element.name +".jpg";
    var Card_Body = Card.getElementsByTagName('div')[0];
        Card_Body.getElementsByClassName('card-title')[0].innerHTML = element.name;
        Card_Body.getElementsByClassName('card-text')[0].innerHTML = element.description;
        Card_Body.getElementsByClassName('price')[0].innerHTML = element.price;

    Parent.appendChild(Clone);
}
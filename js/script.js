var JSONdata;

window.onload = function(){
    var menu = document.getElementById("Menu");
    var menuCategory = document.getElementById("exampleCategory");

    fetch('MenuData.json').then(response => {
        return response.json();
      }).then(data => {
          JSONdata = data;
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
                    if(element.discount != null){
                        document.getElementById("NoPromo").innerHTML = "";
                        appendChildtoParent(document.getElementById(key), element, document.getElementById("Promociones"));
                    }
                });
            });
      }).catch(err => {
        alert("La pagina web debe de estar corriendo en un servidor (internet o local) para su correcto funcionamiento (CORS no permite fetch en archivos abiertos, solo en servidores)");
      });
}

function showsearcher(){
    document.getElementById("searcher").classList.remove("hidden");
    document.getElementById("inputsearch").value = "";
    document.getElementById("searcherMenu").innerHTML = "";
    document.getElementById("inputsearch").focus();
}

function hidesearcher(){
    document.getElementById("searcher").classList.add("hidden");
}

function searcher(text){
    document.getElementById("searcherMenu").innerHTML = "";
    Object.keys(JSONdata).forEach(key => {
        JSONdata[key].forEach(element => {
            if(element.name.toLowerCase().includes(text.toLowerCase()) && text != ""){
                appendChildtoParent(document.getElementById(key), element, document.getElementById("searcherMenu"));
            }
        });
    });
}

function appendChildtoParent(Parent, element, promo = false) {
    var ExampleCard = document.getElementById("examplecard");

    var Clone = ExampleCard.cloneNode(true);
        Clone.id = "";
    var Card = Clone.firstElementChild;
        Card.getElementsByTagName('img')[0].src = "img/"+ Parent.id +" - "+ element.name +".jpg";
    var Card_Body = Card.getElementsByTagName('div')[0];
        Card_Body.getElementsByClassName('card-title')[0].innerHTML = element.name;
        Card_Body.getElementsByClassName('card-text')[0].innerHTML = element.description;
        if(element.discount != null)
            Card_Body.getElementsByClassName('price')[0].innerHTML = "$<del>" + element.price + "</del> " + (parseFloat(element.price - element.discount)).toFixed(2);
        else
            Card_Body.getElementsByClassName('price')[0].innerHTML = "$" + parseFloat(element.price).toFixed(2);
        if(promo != false)
            Parent = promo;

    Parent.appendChild(Clone);
}
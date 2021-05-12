const apiKey = "549a7bb64cmsh22a289e69814bbcp1e7974jsnc74d4dcbd570";

const endpointPosicionesLigaEspaña = "standings?season=2020&league=140";
const endpointPosicionesLigaInglaterra = "";
const endpointPosicionesLigaAlemania = "";
const endpointPosicionesLigaItalia = "";
const endpointPosicionesLigaFrancia = "";

const equiposPrimeraDivisionEspania = new Array();
const equiposPrimeraDivisionInglaterra = new Array();
const equiposPrimeraDivisionAlemania = new Array();
const equiposPrimeraDivisionItalia = new Array();
const equiposPrimeraDivisionFrancia = new Array();

function callApi(endPoint) {

    const data = null;

    const xhr = new XMLHttpRequest();
    //xhr.withCredentials = true;

    return new Promise((resolve, reject) => {
    
    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === this.DONE) {
            resolve(this.responseText);
        }
    });

    xhr.open("GET", "https://api-football-beta.p.rapidapi.com/"+endPoint);
    xhr.setRequestHeader("x-rapidapi-key", apiKey);
    xhr.setRequestHeader("x-rapidapi-host", "api-football-beta.p.rapidapi.com");

    xhr.send(data);

    });

}


function cleanTable() {

    var bodyTable = document.getElementById("bodyTable");
    var headTable = document.getElementById("headTable");

    while(bodyTable.firstChild) {
        bodyTable.removeChild(bodyTable.firstChild);
    }

    while(headTable.firstChild) {
        headTable.removeChild(headTable.firstChild);
    }
}

function agregarHeadTable() {

    var headTable = document.getElementById("headTable");

    var thRank = document.createElement("th");
    thRank.scope = "col";
    thRank.innerHTML = "Posicion";
    headTable.appendChild(thRank);

    var thName = document.createElement("th");
    thName.scope = "col";
    thName.innerHTML = "Equipo"
    headTable.appendChild(thName);

    var thPoints = document.createElement("th");
    thPoints.scope = "col";
    thPoints.innerHTML = "Puntos"
    headTable.appendChild(thPoints);

}

function insertarEquipoEnLaTabla(equipo) {

    var bodyTable = document.getElementById("bodyTable");

    var tr = document.createElement("tr");
    tr.classList.add("table-active");
    bodyTable.appendChild(tr);

    var tdRank = document.createElement("td");
    tdRank.classList.add("table-active");
    tr.appendChild(tdRank);
    tdRank.innerHTML = equipo["rank"];

    var tdName = document.createElement("td");
    tdName.classList.add("table-active");
    tr.appendChild(tdName);
    tdName.innerHTML = equipo["team"]["name"];

    var tdPuntos = document.createElement("td");
    tdPuntos.classList.add("table-active");
    tr.appendChild(tdPuntos);
    tdPuntos.innerHTML = equipo["points"];

}


window.onload = () => {
    
    const buttonLaLiga = document.getElementById("LA_LIGA");
    const buttonSerieA = document.getElementById("SERIE_A");
    const buttonBundesliga = document.getElementById("BUNDESLIGA");
    const buttonLeague1 = document.getElementById("LEAGUE_1");
    const buttonPremierLeague = document.getElementById("PREMIER_LEAGUE");



    buttonLaLiga.addEventListener("click",() => {
        callApi(endpointPosicionesLigaEspaña)
            
            .then(response => {

                equiposPrimeraDivisionEspania.push(JSON.parse(response)["response"][0]["league"]["standings"][0]);
                          
                cleanTable();
                agregarHeadTable();

                equiposPrimeraDivisionEspania[0].forEach(equipo => {
                    insertarEquipoEnLaTabla(equipo);
                });

            })
            .catch(error => console.log(error))
    });

    buttonSerieA.addEventListener("click",() => {

    });

    buttonBundesliga.addEventListener("click",() => {

    });

    buttonLeague1.addEventListener("click",() => {

    });

    buttonPremierLeague.addEventListener("click",() => {

    });

}



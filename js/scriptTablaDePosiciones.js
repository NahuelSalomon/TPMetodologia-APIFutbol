const apiKey = "549a7bb64cmsh22a289e69814bbcp1e7974jsnc74d4dcbd570";

const endpointPosicionesLigaEspaña = "standings?season=2020&league=140";
const endpointPosicionesLigaInglaterra = "standings?season=2020&league=39";
const endpointPosicionesLigaAlemania = "standings?season=2020&league=78";
const endpointPosicionesLigaItalia = "standings?season=2020&league=135";
const endpointPosicionesLigaFrancia = "standings?season=2020&league=61";

const equiposPrimeraDivisionEspania = new Array();
const equiposPrimeraDivisionInglaterra = new Array();
const equiposPrimeraDivisionAlemania = new Array();
const equiposPrimeraDivisionItalia = new Array();
const equiposPrimeraDivisionFrancia = new Array();



function callApi(endPoint) {

    return new Promise(function (resolve, reject) {

        var request = new XMLHttpRequest();

        request.open("GET", "https://api-football-beta.p.rapidapi.com/" + endPoint);
        request.setRequestHeader("x-rapidapi-key", apiKey);
        request.setRequestHeader("x-rapidapi-host", "api-football-beta.p.rapidapi.com");

        request.responseType = 'json';

        request.onload = function () {

            if (request.status == 200) {
                resolve(request.response);
            }
            else {
                reject(Error('Json couldn\'t be loaded. Error: ' + request.statusText));
            }
        }

        request.onerror = function () {
            reject(Error('Oops!, there was a network error.'));
        }

        request.send();
    });

}

function callApi2(endPoint) {

    const data = null;

    const xhr = new XMLHttpRequest();
    //xhr.withCredentials = true;

    return new Promise((resolve, reject) => {

        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === this.DONE) {
                resolve(this.responseText);
            }
        });

        xhr.open("GET", "https://api-football-beta.p.rapidapi.com/" + endPoint);
        xhr.setRequestHeader("x-rapidapi-key", apiKey);
        xhr.setRequestHeader("x-rapidapi-host", "api-football-beta.p.rapidapi.com");

        xhr.send(data);

    });

}

function cleanTable() {

    var bodyTable = document.getElementById("bodyTable");
    var headTable = document.getElementById("headTable");

    while (bodyTable.firstChild) {
        bodyTable.removeChild(bodyTable.firstChild);
    }

    while (headTable.firstChild) {
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
    tr.classList.add("tbody-dark");
    bodyTable.appendChild(tr);

    var tdRank = document.createElement("td");
    tdRank.classList.add("tbody-dark");
    tr.appendChild(tdRank);
    tdRank.innerHTML = equipo["rank"];

    var tdName = document.createElement("td");
    tdName.classList.add("tbody-dark");
    tr.appendChild(tdName);
    tdName.innerHTML = `<div class="media align-items-center">
                            <a href="#" class="avatar img mr-3">
                                <img alt="Team logo" src=" ${equipo["team"]["logo"]}">
                            </a>
                            <div class="media-body">
                                <span class="name mb-0 text-sm\">${equipo["team"]["name"]}</span>
                            </div>
                        </div>`;

    var tdPuntos = document.createElement("td");
    tdPuntos.classList.add("tbody-dark");
    tr.appendChild(tdPuntos);
    tdPuntos.innerHTML = equipo["points"];

}


window.onload = () => {

    const buttonLaLiga = document.getElementById("LA_LIGA");
    const buttonSerieA = document.getElementById("SERIE_A");
    const buttonBundesliga = document.getElementById("BUNDESLIGA");
    const buttonLeague1 = document.getElementById("LEAGUE_1");
    const buttonPremierLeague = document.getElementById("PREMIER_LEAGUE");


    buttonLaLiga.addEventListener("click", () => {
        callApi(endpointPosicionesLigaEspaña)

            .then(response => {

                equiposPrimeraDivisionEspania.push(response["response"][0]["league"]["standings"][0]);
                
                cleanTable();
                agregarHeadTable();

                equiposPrimeraDivisionEspania[0].forEach(equipo => {
                    insertarEquipoEnLaTabla(equipo);
                });

            })
        .catch(error => console.log(error))
    });

    buttonSerieA.addEventListener("click", () => {

        callApi(endpointPosicionesLigaItalia)

            .then(response => {

                equiposPrimeraDivisionItalia.push(response["response"][0]["league"]["standings"][0]);

                cleanTable();
                agregarHeadTable();

                equiposPrimeraDivisionItalia[0].forEach(equipo => {
                    insertarEquipoEnLaTabla(equipo);
                });

            })
        .catch(error => console.log(error));
     });

    buttonBundesliga.addEventListener("click", () => {

        callApi(endpointPosicionesLigaAlemania)

            .then(response => {

                equiposPrimeraDivisionAlemania.push(response["response"][0]["league"]["standings"][0]);

                cleanTable();
                agregarHeadTable();

                equiposPrimeraDivisionAlemania[0].forEach(equipo => {
                    insertarEquipoEnLaTabla(equipo);
                });

            })
        .catch(error => console.log(error));
    });

    buttonLeague1.addEventListener("click", () => {

        callApi(endpointPosicionesLigaFrancia)

            .then(response => {

                equiposPrimeraDivisionFrancia.push(response["response"][0]["league"]["standings"][0]);

                cleanTable();
                agregarHeadTable();

                equiposPrimeraDivisionFrancia[0].forEach(equipo => {
                    insertarEquipoEnLaTabla(equipo);
                });

            })
        .catch(error => console.log(error));
    });

    buttonPremierLeague.addEventListener("click", () => {

        callApi(endpointPosicionesLigaInglaterra)

            .then(response => {

                equiposPrimeraDivisionInglaterra.push(response["response"][0]["league"]["standings"][0]);

                cleanTable();
                agregarHeadTable();

                console.log(equiposPrimeraDivisionInglaterra);
                equiposPrimeraDivisionInglaterra[0].forEach(equipo => {
                    insertarEquipoEnLaTabla(equipo);
                });

            })
        .catch(error => console.log(error));
    });


}



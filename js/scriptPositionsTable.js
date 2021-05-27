function cleanTable() {

    var bodyTable = document.getElementById("bodyTable");
    var headTable = document.getElementById("headTable");
    var logoHead = document.getElementById("logo");

    if(document.getElementById("divLogo")) {
        logoHead.removeChild(document.getElementById("divLogo"));
    }

    while (bodyTable.firstChild) {
        bodyTable.removeChild(bodyTable.firstChild);
    }

    while (headTable.firstChild) {
        headTable.removeChild(headTable.firstChild);
    }
}

function addHeadTable(urlImageLeague) {

    var headTable = document.getElementById("headTable");
    var logoHead = document.getElementById("logo");


    var divImageLeague = document.createElement("div");
    divImageLeague.id = "divLogo";
    divImageLeague.classList.add("col-lg-6","col-7");
    logoHead.appendChild(divImageLeague);

    var imageLeague = document.createElement("img");
    imageLeague.src = urlImageLeague;
    divImageLeague.appendChild(imageLeague);
        
    var thRank = document.createElement("th");
    thRank.scope = "col";
    thRank.innerHTML = "Position";
    headTable.appendChild(thRank);

    var thName = document.createElement("th");
    thName.scope = "col";
    thName.innerHTML = "Team"
    headTable.appendChild(thName);

    var thPoints = document.createElement("th");
    thPoints.scope = "col";
    thPoints.innerHTML = "Points"
    headTable.appendChild(thPoints);

}

function insertTeamsIntoTable(team) {

    var bodyTable = document.getElementById("bodyTable");

    var tr = document.createElement("tr");
    tr.classList.add("tbody-dark");
    bodyTable.appendChild(tr);

    var tdRank = document.createElement("td");
    tdRank.classList.add("tbody-dark");
    tr.appendChild(tdRank);
    tdRank.innerHTML = team["rank"];

    var tdName = document.createElement("td");
    tdName.classList.add("tbody-dark");
    tr.appendChild(tdName);
    tdName.innerHTML = `<div class="media align-items-center">
                            <a href="#" class="avatar img mr-3">
                                <img alt="Team logo" src=" ${team["team"]["logo"]}">
                            </a>
                            <div class="media-body">
                                <span class="name mb-0 text-sm\">${team["team"]["name"]}</span>
                            </div>
                        </div>`;

    var tdPuntos = document.createElement("td");
    tdPuntos.classList.add("tbody-dark");
    tr.appendChild(tdPuntos);
    tdPuntos.innerHTML = team["points"];

}

function updatePositionsTable(teams,urlLogo) {
    
    cleanTable();
    addHeadTable(urlLogo);

    teams[0].forEach(team => {
        insertTeamsIntoTable(team);
    });

}

export{cleanTable,addHeadTable,insertTeamsIntoTable,updatePositionsTable};
import {callApi} from "./scpritApi.js";

export function addModalForStadistics(id,urlLogoHome, urlLogoAway) {

        var idModal = "modal"+id;
        var divModal = document.createElement("div");


        var tdLogoHome = document.createElement("td");
        tdLogoHome.innerHTML = `<div class="media align-items-center">
                                    <a href="#" class="avatar img mr-1">
                                        <img alt="Team logo" src=" ${urlLogoHome}">
                                    </a>
                                </div>`;

        var tdLogoAway = document.createElement("td");
        tdLogoAway.innerHTML = `<div class="media align-items-center">
                                    <a href="#" class="avatar img mr-1">
                                        <img alt="Team logo" src=" ${urlLogoAway}">
                                    </a>
                                </div>`;


        divModal.innerHTML = `<div class="modal fade" id="${idModal}" aria-hidden="true" tabindex="-1" aria-labelledby="${idModal}">
                                <div class="modal-dialog">
                                    <div class="modal-content">
                                        <div class="modal-header">
                                        <h5></h5>
                                            <a type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"><i class="fas fa-times"></i></a>
                                        </div>
                                    <div class="modal-body">
                                            <table class="table table-striped" style="text-align:center; color:black;">
                                                <thead style="font-weight: 'bold';">
                                                    <tr>
                                                        <td>
                                                            <div>
                                                                <a href="#" class="avatar img mr-1" style="background-color: white;">
                                                                    <img alt="Team logo" src=" ${urlLogoHome}" style="margin: auto;">
                                                                </a>
                                                            </div>
                                                        </td>
                                                        
                                                        <td></td>

                                                        <td>
                                                            <div>
                                                                <a href="#" class="avatar img mr-1" style="background-color: white;">
                                                                    <img alt="Team logo" src=" ${urlLogoAway}" style="margin: auto;">
                                                                </a>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>HOME</td>
                                                        <td>STADISTIC</td>
                                                        <td>AWAY</td>
                                                    </tr>
                                                </thead>
                                                <tbody class="table table-success" id="bodyTable${id}"></tbody>
                                            </table>    
                                        </div>
                                    </div>
                                </div>
                            </div>`;
        document.body.appendChild(divModal);

}

export function addDataToModal(id) {
    callApi(`fixtures/statistics?fixture=${id}`)
    .then(response => {

        var stadisticsTeam1 = response["response"][0]["statistics"];
        var stadisticsTeam2 = response["response"][1]["statistics"];

        var bodyTable = document.getElementById(`bodyTable${id}`);
        
        var length = getLenghtArray(stadisticsTeam1);

        for(var i = 0; i < length ; i++) {
            
            var trElement = document.createElement("tr"); 
            bodyTable.appendChild(trElement);

            var tdValueHome = document.createElement("td");
            tdValueHome.style.fontWeight = "bold";
            tdValueHome.style.color = "black";
            if(stadisticsTeam1[i]['value']) {
                tdValueHome.innerHTML = stadisticsTeam1[i]['value'];
            } else { tdValueHome.innerHTML = 0; }
        

            var tdTypeStadistic = document.createElement("td");
            tdTypeStadistic.style.color = "white";
            tdTypeStadistic.style.backgroundColor = "#708C76";
            tdTypeStadistic.innerHTML = stadisticsTeam1[i]['type'];


            var tdValueAway = document.createElement("td");
            tdValueAway.style.fontWeight = "bold";
            tdValueAway.style.color = "black";
            if(stadisticsTeam2[i]['value']) {
                tdValueAway.innerHTML = stadisticsTeam2[i]['value'];
            } else { tdValueAway.innerHTML = 0; }

            
            trElement.appendChild(tdValueHome);
            trElement.appendChild(tdTypeStadistic);
            trElement.appendChild(tdValueAway);
        }
        
    }) 
    .catch(error => console.log(error));
}

function getLenghtArray(array) {

    var i = 0;

    array.forEach(element => {
        i++;
    });

    return i;
}





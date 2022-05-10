// HANDLE FORM VALIDATION AND CHALLENGE SECTION DISPLAY

// submit button
const sendBtn = document.querySelector('#submitBtn');
// array of all users
let allUsers = [];

// error notifs
let fillForm = document.querySelector('#fillForm');
let fillNumber = document.querySelector('#fillNumber');

function storeDataLS() {
    // localStorage only accepts strings so we need to represent the object as a string (= serialization)
    var allUsers_serialized = JSON.stringify(allUsers);
    //console.log(allUsers_serialized);

    // store allUsers_serialized in localStorage
    localStorage.setItem("allUsers", allUsers_serialized);
}

sendBtn.onclick = (e) => {
    // prevent page reload on click (to show allow errors notifs and handle events)
    e.preventDefault();

    // get input values
    let givenName = document.querySelector('#givenName').value;
    let givenResultStr = document.querySelector('#givenResult').value;
    let givenResult = Number(givenResultStr.replace(",", "."));

    //console.log(givenName, givenResultStr);


    // FORM VALIDATION
    // check that both fields are filled
    if (givenName !== "" && givenResultStr !== "") {

        // check that both fields are filled and result is an int
        if (givenName !== "" && givenResultStr !== "" && !isNaN(givenResult)) {

            // regex
            // /^[0-9]+$/.test(givenResultStr)

            // HANDLE SECTION DISPLAY UNDER 10 USERS
            if (allUsers.length < 10) {

                // hide form and show well done card
                var irfSection = document.querySelector('#irfSection');
                var wdSection = document.querySelector('#wdSection');

                irfSection.classList.add("hide");
                wdSection.classList.remove("hide");

                // create newUser object to push in allUsers array
                // var givenResult = parseInt(givenResultStr);
                var newUser = {
                    username: givenName,
                    result: givenResult
                };
                //console.log(newUser);

                // add newUser to allUsers array
                allUsers.push(newUser);
                console.log(allUsers);

                // store allUsers + newUser in LS
                storeDataLS();

                // get data from LS
                // to get object data from localStorage, we need to reverse the serialization
                var allUsers_deserial = JSON.parse(localStorage.getItem("allUsers"));


                // put user data on well done card (LOOP)
                var putName = document.querySelector('#putName');
                var putResult = document.querySelector('#putResult');
                for (let i = 0; i < allUsers_deserial.length; i++) {

                    // put values in well done card
                    putName.textContent = allUsers_deserial[i].username;
                    putResult.textContent = allUsers_deserial[i].result;

                }


                // back to challenge page button
                const backBtn = document.querySelector('#backBtn');

                backBtn.onclick = (e) => {

                    // prevent page reload on click
                    e.preventDefault();

                    // hide well done card and show result form
                    irfSection.classList.remove("hide");
                    wdSection.classList.add("hide");

                    // empty form
                    document.getElementById('irf').reset();

                    // if visible, hide precedent error notifs
                    if (!fillForm.classList.contains('hide')) {
                        fillForm.classList.add('hide');
                    }
                    if (!fillNumber.classList.contains('hide')) {
                        fillNumber.classList.add('hide');
                    }

                    // show users badge on form
                    var badgeUsers = document.querySelector('#badgeUsers');
                    badgeUsers.classList.remove('hide');

                    // add current number of users to badge 
                    var currentUsers = document.querySelector('#currentUsers');
                    currentUsers.textContent = allUsers_deserial.length;
                }


            }

            // HANDLE SECTION DISPLAY IF USERS = 10
            if (allUsers.length == 10) {

                // hide challenge section and show end of challenge section
                var challengeSection = document.querySelector('#challengeSection');
                var endChallengeSection = document.querySelector('#endChallengeSection');

                challengeSection.classList.add('hide');
                endChallengeSection.classList.remove('hide');

                // put last contestant data on card
                var lastUserName = document.querySelector('#putNameLast');
                var lastUserResult = document.querySelector('#putResultLast');

                lastUserName.textContent = allUsers_deserial[9].username;
                lastUserResult.textContent = allUsers_deserial[9].result;


                // calculate average result with results from allUsers
                var userResults = [];
                for (let j = 0; j < allUsers_deserial.length; j++) {
                    userResults.push(allUsers_deserial[j].result);
                }
                var sumResults = userResults.reduce(function (total, num) {
                    return total + num;
                });
                var averageResult = sumResults / userResults.length;

                // put average result in badge above results table
                // console.log(averageResult);
                var averageResultBadge = document.querySelector('#averageResultBadge');
                averageResultBadge.textContent = averageResult;


                // highest result in all
                var winner = Math.max.apply(null, userResults);
                //console.log(winner);

                

                // create table rows with style depending on result
                for (let k = 0; k < allUsers_deserial.length; k++) {

                    var pN = allUsers[k].username;
                    var pR = allUsers[k].result;

                    // TODO: function to create table rows

                    // if winner
                    if (pR == winner) {
                        var tableBody = document.querySelector('#tableBody');

                        var playerTR = document.createElement('tr');
                        tableBody.appendChild(playerTR);
                        // yellow background
                        playerTR.classList.add('yellow');

                        var playerRank = document.createElement('th');
                        playerTR.append(playerRank);
                        playerRank.setAttribute("scope", "row");
                        playerRank.classList.add('playerRank');
                        playerRank.textContent = "WINNER 💪";

                        var playerName = document.createElement('th');
                        playerTR.append(playerName);
                        playerName.classList.add('playerName');
                        playerName.textContent = pN;

                        var playerResult = document.createElement('th');
                        playerTR.append(playerResult);
                        playerResult.classList.add('playerResult');
                        playerResult.textContent = pR;
                    }

                    // if = or above average
                    if (pR >= averageResult && pR !== winner) {
                        var tableBody = document.querySelector('#tableBody');

                        var playerTR = document.createElement('tr');
                        tableBody.appendChild(playerTR);
                        // green background
                        playerTR.classList.add('table-success');

                        var playerRank = document.createElement('th');
                        playerTR.append(playerRank);
                        playerRank.setAttribute("scope", "row");
                        playerRank.classList.add('playerRank');
                        playerRank.textContent = "🙂";


                        var playerName = document.createElement('th');
                        playerTR.append(playerName);
                        playerName.classList.add('playerName');
                        playerName.textContent = pN;

                        var playerResult = document.createElement('th');
                        playerTR.append(playerResult);
                        playerResult.classList.add('playerResult');
                        playerResult.textContent = pR;
                    }

                    // if below
                    if (pR < averageResult) {
                        var tableBody = document.querySelector('#tableBody');

                        var playerTR = document.createElement('tr');
                        tableBody.appendChild(playerTR);
                        playerTR.classList.add('table-danger');

                        var playerRank = document.createElement('th');
                        playerTR.append(playerRank);
                        playerRank.setAttribute("scope", "row");
                        playerRank.classList.add('playerRank');
                        playerRank.textContent = "🙁";

                        var playerName = document.createElement('th');
                        playerTR.append(playerName);
                        playerName.classList.add('playerName');
                        playerName.textContent = pN;

                        var playerResult = document.createElement('th');
                        playerTR.append(playerResult);
                        playerResult.classList.add('playerResult');
                        playerResult.textContent = pR;
                    }

                }
                // end of table creation

                // BACK TO START CHALLENGE PAGE = RESTART
                const reloadAllBtn = document.querySelector('#reloadAllBtn');
                reloadAllBtn.onclick = () => {
                    // reload page
                    location.reload();
                    // empty form
                    document.getElementById('irf').reset();

                    // clear localStorage
                    localStorage.clear();
                }

            }
            // CHALLENGE HANDLED

        } else {
            // fields are filled but result is not a number
            fillNumber.classList.remove('hide');
        }

    } else {
        // one or both fields are empty
        //console.log(givenName, givenResultStr);
        fillForm.classList.remove('hide');
    }

}


// TODO: function to create table rows
// function createRow() {
//     var tableBody = document.querySelector('#tableBody');

//     var playerTR = document.createElement('tr');
//     tableBody.appendChild(playerTR);

//     var playerRank = document.createElement('th');
//     playerTR.append(playerRank);
//     playerRank.setAttribute("scope", "row");
//     playerRank.classList.add('playerRank');

//     var playerName = document.createElement('th');
//     playerTR.append(playerName);
//     playerName.classList.add('playerName');


//     var playerResult = document.createElement('th');
//     playerTR.append(playerResult);
//     playerResult.classList.add('playerResult');

// }
// console.log(createRow());
////////// CREATE OBJECT OR ARRAYS TO USE AND PUT DATA IN OBJECT OR ARRAY AFTER CLICK ON SUBMIT BUTTON + FORM VALIDATED
const sendBtn2 = document.querySelector('#submitBtn');


// Create array of all users
let allUsers = [];
console.log(allUsers);


sendBtn2.onclick = (e) => {
    // prevent page reload on click
    e.preventDefault();

    // get result form values
    let givenName = document.querySelector('#givenName').value;
    let givenResultStr = document.querySelector('#givenResult').value;
    let givenResult = parseFloat(givenResultStr);

    // if condition to add only ten users
    // if allUsers.length < 10, create newUser and push to allUsers
    if (allUsers.length < 10) {
        // create user object with result form values
        let newUser = {
            "username": givenName,
            "result": givenResult
        };
        console.log(newUser);

        // add newUser to allUsers array
        allUsers.push(newUser);

        console.log(allUsers);


        // store allUsers in localStorage
        // localStorage only accepts strings so we need to represent the object as a string (= serialization)
        let allUsers_serialized = JSON.stringify(allUsers);
        console.log(allUsers_serialized);

        localStorage.setItem("allUsers", allUsers_serialized);
        console.log(localStorage);

        // to get object data from localStorage, we need to reverse the serialization
        // let allUsers_deserial = JSON.parse(localStorage.getItem("allUsers"));
        // get value from stored object ()
        // console.log(allUsers_deserial[0].result);

        // show current number of contestants on form
        let badgeUsers = document.querySelector('#badgeUsers');
        badgeUsers.classList.toggle('hide');

        // TODO: add current number of users to badge on form
        let currentUsers = document.querySelector('#currentUsers');
        currentUsers.textContent = allUsers_deserial.length;

    }

    // Si allUsers.length == 10, show results
    if (allUsers.length == 10) {

        // hide form and well done card
        let hideChallenge = document.querySelector('#hideChallenge');
        hideChallenge.classList.toggle('hide');

        ////////// END CHALLENGE - GIVE RESULTS //////////

        // Get data from localStorage
        // 1) Calculate average
        // 2) put data in results table
        // 3) show results = winner, above average (green), below average (red)
        // 4) show section share results on twitter

        // get users data from localStorage

        // TODO: put name and result of last contestant in card

        // show challenge over card + results table 
        let endChallenge = document.querySelector('#endChallenge');
        endChallenge.classList.toggle('hide');

        // TODO: put results in table
        // let resultsTable = document.querySelector('#resultsTable');





        // show share result section
        let shareResult = document.querySelector('#shareResult');
        // shareResult.classList.toggle("hide");

    }



}

////////// AFTER END CHALLENGE //////////
// TODO: test method
// back to page button = reload page, empty form, clear localStorage
const reloadAllBtn = document.querySelector('#reloadAll');

reloadAllBtn.onclick = () => {
    // reload page (+ empty form)
    window.location.reload(true);



    // clear localStorage
    //localStorage.clear();
    // console.log(localStorage);

    // hide endChallenge Section, only show empty form
    let endChallenge = document.querySelector('#endChallenge');
    endChallenge.classList.toggle('hide');
}
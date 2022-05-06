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

        // store 1 newUser data in localStorage
        // localStorage only accepts strings so we need to represent the object as a string (= serialization)
        //let newUser_serialized = JSON.stringify(newUser);
        //console.log(newUser_serialized);
        
        //localStorage.setItem("newUser", newUser_serialized);
       // console.log(localStorage);


        // to get object data from localStorage, we need to reverse the serialization
        //let newUser_deserial = JSON.parse(localStorage.getItem("newUser"));
        // get value from stored object
        //console.log(newUser_deserial.result);

        // TODO: store allUsers in localStorage
        let allUsers_serialized = JSON.stringify(allUsers);
        console.log(allUsers_serialized);

        localStorage.setItem("allUsers", allUsers_serialized);
        console.log(localStorage);

        // to get object data from localStorage, we need to reverse the serialization
        let allUsers_deserial = JSON.parse(localStorage.getItem("allUsers"));
        // get value from stored object ()
        console.log(allUsers_deserial[0].result);


    }

    // Si allUsers.length == 10, show results
    if (allUsers.length == 10) {

        // hide form
        let irfSection = document.querySelector('#irfSection');
        irfSection.classList.toggle("hide");

        // show results table
        let resultsTable = document.querySelector('#resultsTable');
        resultsTable.classList.toggle("hide");


        // show share results
        let shareResult = document.querySelector('#shareResult');
        shareResult.classList.toggle("hide");

    }

}
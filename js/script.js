////////// SEND RESULT //////////

// 1) click on send result, get username and result values and put in well done card (with form validation)
// 2) store data in localStorage
// 3) hide result form, show well done card

const sendBtn = document.querySelector('#submitBtn');
// Create array of all users
let allUsers = [];
// console.log(allUsers);

sendBtn.onclick = (e) => {
    // prevent page reload on click
    e.preventDefault();

    // get input values
    let givenName = document.querySelector('#givenName').value;
    let givenResultStr = document.querySelector('#givenResult').value;
    // let givenResult = parseFloat(givenResultStr);
    //console.log(givenName, givenResult);







    // FORM VALIDATION
    // both empty = fill
    // name empty and number ok = fill
    // name empty and number not ok = fill
    // name ok and number not ok = result must be int number
    // number with . or , = result must be int number !!!
    // name ok and number ok = well done
    if (givenName !== "" && givenResultStr !== "") {

        if (givenResultStr !== "" && /^[0-9]+$/.test(givenResultStr)) {


            // CONDITION TO ADD ONLY TEN USERS
            // if allUsers.length < 10, create newUser and push to allUsers
            if (allUsers.length < 10) {

                // HANDLE RESULTS //

                // turn result into a number
                let givenResult = parseFloat(givenResultStr);

                // create user object with result form values
                let newUser = {
                    "username": givenName,
                    "result": givenResult
                };
                console.log(newUser);

                // add newUser to allUsers array
                allUsers.push(newUser);
                console.log(allUsers);

                // localStorage only accepts strings so we need to represent the object as a string (= serialization)
                let allUsers_serialized = JSON.stringify(allUsers);
                console.log(allUsers_serialized);
                // store allUsers_serialized in localStorage
                localStorage.setItem("allUsers", allUsers_serialized);
                console.log(localStorage);

                // to get object data from localStorage, we need to reverse the serialization
                let allUsers_deserial = JSON.parse(localStorage.getItem("allUsers"));
                // get value from stored object ()
                // console.log(allUsers_deserial[0].result);



                // END HANDLE RESULTS //

                // TOGGLE SECTIONS //

                let putName = document.querySelector('#putName');
                let putResult = document.querySelector('#putResult');
                for (let i = 0; i < allUsers_deserial.length; i++) {

                    // put values in well done card
                    putName.textContent = allUsers_deserial[i].username;
                    putResult.textContent = allUsers_deserial[i].result;


                    // show current number of contestants on form
                    let badgeUsers = document.querySelector('#badgeUsers');
                    badgeUsers.classList.toggle('hide');
                    // TODO: add current number of users to badge on form
                    let currentUsers = document.querySelector('#currentUsers');
                    currentUsers.textContent = allUsers_deserial.length;
                }








            }





            // store data with localStorage
            localStorage.setItem('storedName', givenName);
            localStorage.setItem('storedResult', givenResult);

            // hide individual result form section and show well done card
            let irfSection = document.querySelector('#irfSection');
            let wdSection = document.querySelector('#wdSection');

            irfSection.classList.toggle("hide");
            wdSection.classList.toggle("hide");
        } else {
            console.log(givenName, givenResultStr);
            document.querySelector('#fillForm').textContent = "Result should be an integer number!";
        }

    } else {
        console.log(givenName, givenResultStr);
        document.querySelector('#fillForm').textContent = "Fill in your name and result!";
    }
}



////////// BACK TO CHALLENGE PAGE //////////

// 1) on click, empty form
// 2) show current challenge section (below presentation banner) with number of users registered (x/10, using numbers of elements in table or stored data)

const backBtn = document.querySelector('#backBtn');

backBtn.onclick = (e) => {

    // prevent page reload on click
    e.preventDefault();

    // Vider le formulaire
    document.getElementById('irf').reset();

    // hide well done card and show result form
    let irfSection = document.querySelector('#irfSection');
    let wdSection = document.querySelector('#wdSection');

    irfSection.classList.toggle("hide");
    wdSection.classList.toggle("hide");




}


////////// LIMIT REGISTRATION //////////

// 1) Limit challenge to 10 contestants OK
// 2) Hide irf and wd sections after last entry OK
// 3) show card "challenge is over" and table of results
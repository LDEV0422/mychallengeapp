////////// SEND RESULT //////////

// 1) click on send result, get values from username and result and put in well done card (with form validation)
// 2) store data in localStorage
// 3) hide result form, show well done card

const sendBtn = document.querySelector('#submitBtn');


sendBtn.onclick = (e) => {
    // prevent page reload on click
    e.preventDefault();

    // get input values
    let givenName = document.querySelector('#givenName').value;
    let givenResultStr = document.querySelector('#givenResult').value;
    // console.log(givenName, givenResultStr);



    // FORM VALIDATION
    // both empty = fill
    // name empty and number ok = fill
    // name empty and number not ok = fill
    // name ok and number not ok = result must be int number
    // number with . or , = result must be int number !!!
    // name ok and number ok = well done
    if (givenName !== "" && givenResultStr !== "") {

        if (givenResultStr !== "" && /^[0-9]+$/.test(givenResultStr)) {
            let givenResult = parseFloat(givenResultStr);
            // put values in well done card
            let putName = document.querySelector('#putName');
            let putResult = document.querySelector('#putResult');

            putName.textContent = givenName;
            putResult.textContent = givenResult;
            console.log(putName, putResult);

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

// 1) on click, put stored data in hidden table using append method 
// 2) empty form input
// 3) show current challenge section (below presentation banner) with number of users registered (x/10, using numbers of elements in table or stored data)

const backBtn = document.querySelector('#backBtn');

backBtn.onclick = () => {
// put data in table

// Vider le formulaire
document.getElementById("irf").reset();

// show current challenge section (below presentation banner) with number of users registered (x/10, using numbers of elements in table or stored data)
// show form + current number of contestants

}


////////// LIMIT REGISTRATION //////////

// 1) Limit challenge to 10 contestants
// 2) Hide irf and wd sections after last entry
// 3) show card "challenge is over" and table of results

////////// END CHALLENGE - GIVE RESULTS //////////

// Get data from localStorage
// 1) Calculate average
// 2) put data in results table
// 3) show results = winner, above average (green), below average (red)
// 4) show section share results on twitter

let shareResult = document.querySelector('#shareResult');
// shareResult.classList.toggle("hide");



// Defining Prices in Different Currencies
const currencySymbols = {
    "gbp": "£",
    "eur": "€",
    "usd": "$",
};

const courseCode = 'HF-T1-21';

const onetimePayment = {
    "gbp": {
        "regular": 119,
        "sale": 200
    },

    "eur": {
        "regular": 200,
        "sale": 100
    },

    "usd": {
        "regular": 200,
        "sale": 100
    }
};

const payInInstallments = {
    "gbp": {
        "regular": 29.99,
        "sale": 19.99
    },

    "eur": {
        "regular": 39.99,
        "sale": 29.99
    },

    "usd": {
        "regular": 49.99,
        "sale": 39.99
    }
};

const paymentData = {
    type: '',
    curr: ''
};

// const payInstallments = () =>{
//     alert('pay in installments');
// }

// const showErr = (value) => {
//     let err = document.getElementById('error');
//     err.textContent = `Please enter a valid ${value}`;
// }

////////////////////////// Second Screen Validation above /////////////////////////////////////

const formContainer = document.getElementById('pricingContainer');

const payInstallments = () =>{
    alert('Pay in installments selected');
}

const showErr = (value) => {
    let err = document.getElementById('error');
    err.textContent = `Please ${value}`;
}

const handleSubmit = (e) => {

    const userForm = document.getElementById('userDetails');
    const userData = {
        firstname: '',
        lastname: '',
        email: '',
        phone: 0,
        updates: null
    };

    userData.firstname = userForm.elements['firstname'].value;
    userData.lastname = userForm.elements['lastname'].value;
    userData.email = userForm.elements['email'].value;
    userData.phone = userForm.elements['phone'].value;
    userData.updates = userForm.elements['updates'].checked;
    
    if(userData.firstname === ""){
        e.preventDefault();
        showErr('enter a valid firstname');
    }
    else if(userData.lastname === ""){
        e.preventDefault();
        showErr('enter a valid lastname');
    }
    else if(userData.email === ""){
        e.preventDefault();
        showErr('enter a valid email address');
    }
    else if(userData.phone.length < 6 || userData.phone.length > 13){
        e.preventDefault();
        showErr('enter a valid mobile number');
    }
    else if(!userData.updates){
        e.preventDefault();
        showErr('accept enrollment updates');
    }
    else if(paymentData.type === "full"){
        location.href= `https://enrol.albalaghacademy.org/${courseCode}`;
    }
    else if(paymentData.type === "installments"){
        payInstallments();
    }
    
}

const backLink = (e) => {
    e.preventDefault();
    cleanFormContainer(); //clean pricingContainer
    const dataArr = JSON.parse(localStorage.getItem('userCurrData')); //fetch data from browser
    const type = dataArr[0]['type'];
    init(dataArr[0]['curr']);
    document.getElementById(type).checked = true;
}

//Step 8: insert user details form
const userDetailsForm = () => {
    let html = `<form class="userDetails" id="userDetails">
                <p id="error"></p>
                <div class="form-group">
                    <label for="firstname">First Name: </label>
                    <input type="text" name="FirstName" id="firstname" placeholder="First Name">
                </div>
                <div class="form-group">
                    <label for="lastname">Last Name: </label>
                    <input type="text" name="LastName" id="lastname" placeholder="Last Name">
                </div>
                <div class="form-group">
                    <label for="email">Email: </label>
                    <input type="email" name="Email" id="email" placeholder="xyz@exmaple.com">
                </div>
                <div class="form-group">
                    <label for="phone">Mobile Number: </label>
                    <input id="phone" type="tel" name="phone" />
                </div>
                <p class="whatsappUpdates"><input type="checkbox" name="updates" id="updates"/><label for="updates">I would like to receive enrollment updates via whatsapp</label></p>

                <a href="/" class="backLink" id="backLink">Change Payment Plan or Currency</a>
                <button type="submit" class="proceedToPayment" id="proceedToPay">Proceed to Secure Payment</button>
            </form>
            `;

    formContainer.insertAdjacentHTML('beforeend', html);

    //Step 9: Restore values
    document.getElementById('backLink').addEventListener('click', backLink);

    const input = document.getElementById("phone");
    let iti = window.intlTelInput(input, {
    // separateDialCode:true,
    });
    // store the instance variable so we can access it in the console e.g. window.iti.getNumber()
    window.iti = iti;

    secondFormEventListeners();
}

const secondFormEventListeners = () =>{

    document.getElementById('userDetails').addEventListener('submit', handleSubmit);
}



// Step 7: Clean pricing Container to add User Details Form
const cleanFormContainer = () => {
    formContainer.innerHTML = "";
}

//Cleans currency price boxes
const cleanCurrencies = () => {
    document.getElementById('payFullPrice').innerHTML = "";
    document.getElementById('payEmi').innerHTML = "";
}

//Currency form HTML inserted in the Pricing Container
const defaultForm = () => {
    let html = `<form class="checkoutForm" id="checkoutForm">
    <h4 class="currencyType">Select Currency:</h4>
    <input type="radio" name="currency" value="gbp" id="gbp"><label for="gbp">GBP (&#163;)</label>
    <input type="radio" name="currency" value="usd" id="usd"><label for="usd">USD (&#36;)</label>
    <input type="radio" name="currency" value="eur" id="eur"><label for="eur">Euro (&euro;)</label>
    <div class="paymentType">
        <div class="payFull" id="payFull">
            <p><input type="checkbox" name="paymentMethod" value="full" id="full"><label for="full">Pay in full</label></p>
            <div class="priceBox" id="payFullPrice">
                
            </div>
        </div>
        <div class="payininstallments" id="payininstallments">
            <p><input type="checkbox" name="paymentMethod" value="installments" id="installments"><label for="installments">Pay in installments</label></p>
            <div class="priceBox" id="payEmi">

            </div>
        </div>
    </div>
    <button type="submit" class="btn-proceed">Proceed</button>
</form>
    `;

    formContainer.insertAdjacentHTML('beforeend', html);
}

//Step 3: Inserting HTML through DOM Manipulation for PRICES
const getEmi = (curr) => {
    var html = `<p class="regularPrice">${currencySymbols[curr]}<strike><span>${payInInstallments[curr].regular}</span></strike></p>
    <p class="salePrice">${currencySymbols[curr]}<span>${payInInstallments[curr].sale}</span></p>`;

    document.getElementById('payEmi').insertAdjacentHTML('beforeend', html);
}

//Step 3: Inserting HTML through DOM Manipulation for PRICES
const getFullPrice = (curr) => {
    var html = `<p class="regularPrice">${currencySymbols[curr]}<strike><span>${onetimePayment[curr].regular}</span></strike></p>
    <p class="salePrice">${currencySymbols[curr]}<span>${onetimePayment[curr].sale}</span></p>`;

    document.getElementById('payFullPrice').insertAdjacentHTML('beforeend', html);
}

const setupEventListeners = () =>{
    
    //Step 6: PROCEED BUTTON and Store the values in the paymentData object incase to restore from here
    const checkoutForm = (e) =>{

        e.preventDefault();
        let checkedBtn = 0;

        for(let i=0; i< checkPaymentType.length; i++){
            checkPaymentType[i].checked ? checkedBtn++ : checkedBtn;
        }

        if(checkedBtn < 1) {
            alert('please select a payment method');
        }
        else{
            let dataArr = [];
            dataArr.push(paymentData);
            localStorage.setItem('userCurrData', JSON.stringify(dataArr));
            cleanFormContainer();
            userDetailsForm();
        }
    }

    document.getElementById('checkoutForm').addEventListener('submit', checkoutForm);

    //Step 4: Listening change between radio buttons and taking the current value and passing it to the getEmi and getFullPrice after cleaning the innerHTML with cleanCurrenies to insert new html
    document.querySelectorAll('input[name="currency"]').forEach(e => e.addEventListener('change', function() {
        cleanCurrencies();
        getFullPrice(this.value);
        getEmi(this.value);
        paymentData.curr= this.value;
    }));

    //Step 5: Checkbox if one is checked the other one has to false 
    const checkPaymentType = document.querySelectorAll('input[name="paymentMethod"]');
    checkPaymentType.forEach((e) => e.addEventListener('change', function(event){
        event.preventDefault();
        for(let i = 0; i < checkPaymentType.length; i++){
            if(checkPaymentType[i] !== this){
                checkPaymentType[i].checked = false;
                paymentData.type = this.id; //store the payment method
            }
        }
    }));
}

// Step 2: Write a function to run onLOAD and pass in the currency as default and have a reusable function to keep it DRY
const init = (curr = 'gbp') => {
    //i. inserting the default currency form
    defaultForm();

    //ii. set the radio button to default
    document.querySelectorAll('input[name="currency"]').forEach(e => e.id === curr? e.checked = true : e.checked = false);
    
    //iii. keep track of user selected options
    paymentData.curr = curr;

    getFullPrice(curr); //We will reuse this function and not repeat the code as a good practice
    getEmi(curr); //We will reuse this function and not repeat the code as a good practice

    setupEventListeners();
};

// Step 1: Send GBP as the default currency on LOAD
window.addEventListener('load', init());


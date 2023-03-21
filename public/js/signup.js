let spinner = '<i class="fa-solid fa-circle-notch"></i>';
let checked = '<i class="fa-regular fa-circle-check"></i>';
let warning = '<i class="fa-regular fa-circle-xmark"></i>';
let arrowing = '<i class="fa-solid fa-caret-up arrow-icon"></i>';
let spenning = `
    <button id="submitBtn" class="btn btn-success" type="button" disabled>
        <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
        Loading...
    </button>
`
let normalBtn = `
<input type="button" class="btn btn-success" id="submitBtn" value="Sign Up" />
`

let submitBtn = document.querySelector('#submitBtn');
let submitBtnContainer = document.querySelector('#submitBtnContainer');

let usernameInp = document.querySelector('#inp1');
let phoneNumberInp = document.querySelector('#inp2');
let emailInp = document.querySelector('#inp3');
let password1Inp = document.querySelector('#inp4');
let password2Inp = document.querySelector('#inp5');


let icon1 = document.querySelector('#icon1');
let icon2 = document.querySelector('#icon2');
let icon3 = document.querySelector('#icon3');
let icon4 = document.querySelector('#icon4');
let icon5 = document.querySelector('#icon5');

let warns = [
    e=>document.querySelector('#warn1').innerHTML="",
    e=>document.querySelector('#warn2').innerHTML="",
    e=>document.querySelector('#warn3').innerHTML=""
];



function checkInteries(){
    let username = usernameInp.value;
    let phoneNumber = phoneNumberInp.value;
    let email = emailInp.value;
    let password1 = password1Inp.value;
    let password2 = password2Inp.value;

    let isChecked = true;

    if (username.length < 4 || username.length > 20 || !/^[a-zA-Z0-9]+$/.test(username)) {
        isChecked = false;
    }
    phoneNumber = phoneNumber.replace(/\D/g, "");
    if (!/^\d{10}$/.test(phoneNumber)) {
        isChecked =  false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        isChecked =  false;
    } 
    if (password1 !== password2 && password2.length < 8) {
        isChecked =  false;
    }
    if (password1.length < 8) {
        isChecked =  false;
    }
    return isChecked;
}


function preSubmit(){
    if(!checkInteries()){
        submitBtn.classList.toggle('moved');
    }
}
submitBtn.addEventListener("mouseenter",preSubmit);


let k = [
    e=>e.length < 4 || e.length > 20 || !/^[a-zA-Z0-9]+$/.test(e),
    e=>!/^\d{10}$/.test(e),
    e=>!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e),
    e=>e.length < 8,
    e=>e !== password1Inp.value || password1Inp.value.length < 8
]

let filds = [usernameInp,phoneNumberInp,emailInp,password1Inp,password2Inp];
let icons = [icon1,icon2,icon3,icon4,icon5];

for(let i = 0 ;i<=4;i++){
    let ni = i + 1 ;
    filds[i].addEventListener("blur",(e)=>{
        fildeValue = e.target.value ;
        if (k[i](fildeValue)) {
            icons[i].style.color = "red" ;
            filds[i].style.borderColor = "red"
            icons[i].innerHTML = warning ;
        }else{
            icons[i].style.color = "green" ;
            filds[i].style.borderColor = "green"
            icons[i].innerHTML = checked ;
        }
    });
    filds[i].addEventListener("focus",(e)=>{
        icons[i].style.color = "blue" ;
        filds[i].style.borderColor = "blue"
        icons[i].innerHTML = spinner ;
    })
}

submitBtn.addEventListener('click',()=>{
    if(checkInteries()){
    submitBtnContainer.innerHTML = spenning ;
    axios.post('/signUp', {
        userName: usernameInp.value,
        phoneNumber: phoneNumberInp.value,
        email: emailInp.value,
        password: password1Inp.value,
    })
    .then(function (r) {
        let errdata = r.data.errors.errors;
        if(!r.data.error){
            for (const key in errdata) {
                document.querySelector("." + key).innerHTML =arrowing + errdata[key].message;
            }
            submitBtnContainer.innerHTML = normalBtn ;
        }
        else if(r.data.error){
            console.log("user Created")
            warns[0]();
            warns[1]();
            warns[2]();
        }
    })
    }
})

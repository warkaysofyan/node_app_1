let submitBtn = document.querySelector('#submitBtn');
let inp1 = document.querySelector('#inp1');
let inp2 = document.querySelector('#inp2');
let eye = document.querySelector('#eye');
let alertMsg = document.querySelector('#alertMsg');

let passwordVisible = false;

eye.addEventListener('click',(e)=>{
    if(passwordVisible){
        e.target.innerHTML = "visibility";
        passwordVisible = !passwordVisible
        inp2.type = "password"
    }else{
        e.target.innerHTML = "visibility_off";
        passwordVisible = !passwordVisible
        inp2.type = ""
    }
})

submitBtn.addEventListener('click',()=>{
    axios.post('/login', {

        user: inp1.value,
        password: inp2.value,

    }).then((e)=>{
        let data = e.data.data ;
        if (!data.sucsess && data.response === "ERR1"){
            alertMsg.innerHTML = "User not Found";
            alertMsg.style.display = "block";
        }
        else if (!data.sucsess && data.response === "ERR2"){
            alertMsg.innerHTML = "Password not Correct";
            inp2.value = '';
            inp2.focus()
            alertMsg.style.display = "block";
        }else if(data.sucsess){
            location.assign("/")
        }
    }).catch(err=>console.log(err))
})
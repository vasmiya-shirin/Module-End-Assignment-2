const signUpForm = document.getElementById('signupform')
const fullName = document.getElementById('fullname')
const inputEmail = document.getElementById('inputEmail')
const inputPassword = document.getElementById('inputPassword')
const confirmPassword = document.getElementById('confirmPassword')
const agree = document.getElementById('gridCheck1')

const nameError = document.getElementById('name-error')
const emailError = document.getElementById('email-error')
const passwordError = document.getElementById('password-error')
const confirmPasswordError = document.getElementById('confirmpassword-error')
const agreeError = document.getElementById('agree-error')

//validation functions
function validateName() {
    if (fullName.value.trim() === "") {
        nameError.textContent = "Please enter your name properly"
        return false
    }
    else {
        nameError.textContent = ""
        return true
    }
}
function validateEmail() {
    const email = inputEmail.value.trim()
    let regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    if (email === "" || !email.match(regex)) {
        emailError.textContent = "Please enter a valid email address"
        return false
    }
    else {
        emailError.textContent = ""
        return true
    }
}
function validatePassword() {
    const password = inputPassword.value
    if (password === "" || password < 8) {
        passwordError.textContent = "Please enter a password with atleast 8 characters"
        return false
    }
    else {
        passwordError.textContent = ""
        return true
    }
}
function validateConfirmPassword() {
    const confirmpassword = confirmPassword.value
    if (confirmpassword === "") {
        confirmPasswordError.textContent = "Please confirm your password"
        return false
    }
    else if (confirmpassword !== inputPassword.value) {
        confirmPasswordError.textContent = "Password do not match"
        return false
    }
    else {
        confirmPasswordError.textContent = ""
        return true
    }
}
function validateAgree() {
    const agreeCheck = agree.checked
    if (!agreeCheck) {
        agreeError.textContent = "Please Agree to the above condition"
        return false
    }
    else {
        agreeError.textContent = ""
        return true
    }
}

// Real-time event listeners
fullName.addEventListener('input', validateName)
inputEmail.addEventListener('input', validateEmail)
inputPassword.addEventListener('input', () => {
    validatePassword()
    validateConfirmPassword()
})
confirmPassword.addEventListener('input', validateConfirmPassword)
agree.addEventListener('change', validateAgree)

signUpForm.addEventListener('submit', (e) => {
    e.preventDefault()
    //console.log("working")
    const isNameValid = validateName()
    const isEmailValid = validateEmail()
    const isPasswordValid = validatePassword()
    const isConfirmPasswordValid = validateConfirmPassword()
    const isAgreeValid = validateAgree()

    if (isNameValid && isEmailValid && isPasswordValid && isConfirmPasswordValid && isAgreeValid) {
        const userData = {
            name: fullName.value.trim(),
            email: inputEmail.value.trim(),
            password: "*".repeat(inputPassword.value.length),
        }

        //Get existing users from local storage
        let users = JSON.parse(localStorage.getItem('users')) || []
        console.log(users)

        //add new user to the array
        users.push(userData)

        //save the updated array back to the local storage
        localStorage.setItem('users', JSON.stringify(users))
        alert("Form submitted and data saved!")
        signUpForm.reset()
        displayUsers()
    }
})
function displayUsers(){
    const userTable=document.getElementById("userTable")
    let users=JSON.parse(localStorage.getItem('users')) || []

    if(users.length === 0){
        userTable.innerHTML=`<p> No Users </p>`
        return
    }

    let tablehtml=`<table class="table table-success table-striped table-hover">
    <thead>
    <tr>
    <th>#</th>
    <th>Name</th>
    <th>Email</th>
    <th>Password</th>
    <th>Action</th>
    </tr>
    </thead>
    `
    users.forEach((user,i)=>{
        tablehtml=tablehtml+`<tbody>
        <tr>
        <td>${i+1}</td>
        <td>${user.name}</td>
        <td>${user.email}</td>
        <td>${user.password}</td>
        <td><button onclick="deleteUser(${i})">Delete</button></td>
        </tr>
        `
    })
    tablehtml=tablehtml+`</table>`
    userTable.innerHTML=tablehtml
}
function deleteUser(index){
    let users=JSON.parse(localStorage.getItem('users')) || []
    users.splice(index,1)
    localStorage.setItem("users",JSON.stringify(users))
    displayUsers()
}
displayUsers()
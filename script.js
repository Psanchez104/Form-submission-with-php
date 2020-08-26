const form = document.getElementById("form");
const name = document.getElementById("name");
const email = document.getElementById("email");
const username = document.getElementById("username");
const password1 = document.getElementById("password1");
const password2 = document.getElementById("password2");

let formCompleted = false;

const showError = (input, message) => {
  let formControl = input.parentElement;
  //   if (formControl.classList.contains("success" === true))
  //     formControl.classList.remove("success");
  //   formControl.classList.add("error");
  formControl.className = "form-control error";
  formControl.querySelector("small").innerText = message;
};

const showSuccess = input => {
  let formControl = input.parentElement;
  //   if (formControl.classList.contains("error") === true)
  //     formControl.classList.remove("error");
  //   formControl.classList.add("success");
  formControl.className = "form-control success";
};

//Check required fields
const checkRequired = inputArray => {
  inputArray.map(input => {
    if (input.value.trim() === "")
      showError(
        input,
        `${input.id.charAt(0).toUpperCase() + input.id.slice(1)} is required`
      );
    else showSuccess(input);
  });
};

//Validate email
const isValidEmail = email => {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  //   return re.test(String(email).toLowerCase());
  if (re.test(String(email.value.trim()).toLowerCase())) showSuccess(email);
  else showError(email, "Not a valid Email address");
};

//check input length
const checkLenght = (input, min, max) => {
  if (input.value.length < min)
    showError(
      input,
      `${input.id.charAt(0).toUpperCase() +
        input.id.slice(1)} must be at least ${min} charachters long`
    );
  else if (input.value.length > max)
    showError(
      input,
      `${input.id.charAt(0).toUpperCase() +
        input.id.slice(1)} cannot exceed ${max} charachters`
    );
  else showSuccess(input);
};

//Check if passwords match
const checkPasswordsMatch = (p1, p2) => {
  if (p1.value.trim() !== p2.value.trim())
    showError(p2, "Passwords do not match");
  //   else showSuccess(p2);
};

//hasSuccess
const hasSuccess = e => {
  return e.parentElement.classList.contains("success");
};

//check the form for valid inputs
const checkFormSuccess = inputArray => {
  formCompleted = inputArray.every(hasSuccess);
};

form.addEventListener("submit", e => {
  checkRequired([name, email, username, password1, password2]);
  isValidEmail(email);
  checkLenght(username, 3, 15);
  checkLenght(password1, 6, 45);
  checkPasswordsMatch(password1, password2);
  checkFormSuccess([name, email, username, password1, password2]);
  if (formCompleted === false) {
    console.log("false");
    e.preventDefault();
  }
});

/* Light / Dark mode switch */
const toggleSwitch = document.querySelector('input[type="checkbox"]');
const toggleIcon = document.getElementById("toggle-icon");

const darkMode = () => {
  toggleIcon.children[0].textContent = "Dark Mode";
  toggleIcon.children[1].classList.remove("fa-sun");
  toggleIcon.children[1].classList.add("fa-moon");
};

const lightMode = () => {
  toggleIcon.children[0].textContent = "Light Mode";
  toggleIcon.children[1].classList.remove("fa-moon");
  toggleIcon.children[1].classList.add("fa-sun");
};

const switchTheme = event => {
  console.log(event.target.checked);
  if (event.target.checked) {
    document.documentElement.setAttribute("data-theme", "dark");
    localStorage.setItem("theme", "dark");
    darkMode();
  } else {
    document.documentElement.setAttribute("data-theme", "light");
    localStorage.setItem("theme", "light");
    lightMode();
  }
};

toggleSwitch.addEventListener("change", switchTheme);

//Check Local sotrage for theme
const currentTheme = localStorage.getItem("theme");
if (currentTheme) {
  document.documentElement.setAttribute("data-theme", currentTheme);
  if (currentTheme === "dark") {
    toggleSwitch.checked = true;
    darkMode();
  }
}

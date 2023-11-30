const usernameEl = document.querySelector('#username');
const emailEl = document.querySelector('#email');
const passwordEl = document.querySelector('#password');
const confirmPasswordEl = document.querySelector('#confirm-password');

const isRequired = value => value === '' ? false : true;                                    //Regarde si la valeur entree est vide sinon retourne vrai. 

const isBetween = (length, min, max) => length < min || length > max ? false : true;        //Regarde si la longueur figure entre le min et le max definie

const isEmailValid = (email) => {const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
   };                                                                                       //Regarde la validite du email entre par l'usager

const form = document.querySelector('#signup');                                             //Va chercher le form pour les fonctions subcequentes

const isPasswordSecure = (password) => {
    const re = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
    return re.test(password);
   };                                                                                       //Verifie la validite du password, si celui-ci est suffisant ou non

   /*                                                                                       //Pour information seulement. Expression pour la validation de mot de passe
   RegEx de mot de passe Signification                                                      //------ important a savoir pour le futur ------
   Le mot de passe démarre
            (?=.*[az]) Le mot de passe doit contenir au moins un caractère minuscule
            (?=.*[AZ]) Le mot de passe doit contenir au moins un caractère majuscule
            (?=.*[0-9]) Le mot de passe doit contenir au moins un chiffre
            (?=.*[!@#$%^&*]) Le mot de passe doit contenir au moins un caractère spécial.
            (?=.{8,}) Le mot de passe doit comporter huit caractères ou plus
                                                                                            //Fin
    */

const debounce = (fn, delay = 500) => {                                                     //Donne un delai au programme pour afficher les messages d'erreur lors de la saisi de l'usager
    let timeoutId;
    return (...args) => {
    // cancel the previous timer
    if (timeoutId) {
    clearTimeout(timeoutId);
    }
    // setup a new timer
    timeoutId = setTimeout(() => {
    fn.apply(null, args)
    }, delay);
    };
};


const showError = (input, message) => {                                                     //Message lors d'erreur dans le form
    // get the form-field element
    const formField = input.parentElement;
    // add the error class
    formField.classList.remove('success');
    formField.classList.add('error');
    // show the error message
    const error = formField.querySelector('small');
    error.textContent = message;
};

const showSuccess = (input) => {                                                            //Message lors du succes dans le form
    // get the form-field element
    const formField = input.parentElement;
    // remove the error class
    formField.classList.remove('error');
    formField.classList.add('success');
    // hide the error message
    const error = formField.querySelector('small');
    error.textContent = '';
};

const checkUsername = () => {                                                               //Verification du nom d'utilisateur et si il respecte les requis
    let valid = false;
    const min = 3,
    max = 25;
    const username = usernameEl.value.trim();
    if (!isRequired(username)) {
    showError(usernameEl, 'Username cannot be blank.');
    } else if (!isBetween(username.length, min, max)) {
    showError(usernameEl, `Username must be between ${min} and ${max} characters.`)
    } else {
    showSuccess(usernameEl);
    valid = true;
    }
    return valid;
};


const checkEmail = () => {                                                                  //Verification du courriel de l'utilisateur et si il respecte les requis
    let valid = false;
    const email = emailEl.value.trim();
    if (!isRequired(email)) {
    showError(emailEl, 'Email cannot be blank.');
    } else if (!isEmailValid(email)) {
    showError(emailEl, 'Email is not valid.')
    } else {
    showSuccess(emailEl);
    valid = true;
    }
    return valid;
};


const checkPassword = () => {                                                               //Verification du mot de passe de l'utilisateur et si il respecte les requis
    let valid = false;
    const password = passwordEl.value.trim();
    if (!isRequired(password)) {
    showError(passwordEl, 'Password cannot be blank.');
    } else if (!isPasswordSecure(password)) {
    showError(passwordEl, 'Password must has at least 8 characters that include at least 1 lowercase character, 1 uppercase characters, 1 number, and 1 special character in (!@#$%^&*)');
    } else {
    showSuccess(passwordEl);
    valid = true;
    }
    return valid;
};

const checkConfirmPassword = () => {                                                        //Verification de la confirmation du mot de passe et si ils sont les meme lors de la verification
    let valid = false;
    // check confirm password
    const confirmPassword = confirmPasswordEl.value.trim();
    const password = passwordEl.value.trim();
    if (!isRequired(confirmPassword)) {
    showError(confirmPasswordEl, 'Please enter the password again');
    } else if (password !== confirmPassword) {
    showError(confirmPasswordEl, 'Confirm password does not match');
    } else {
    showSuccess(confirmPasswordEl);
    valid = true;
    }
    return valid;
};

form.addEventListener('input', debounce(function (e) {                                      //Fait toute les verification necessaires lors de l'entree de donnees par l'utlisateur dans le formulaire
    switch (e.target.id) {
    case 'username':
    checkUsername();
    break;
    case 'email':
    checkEmail();
    break;
    case 'password':
    checkPassword();
    break;
    case 'confirm-password':
    checkConfirmPassword();
    break;
    }
}));
   


form.addEventListener('submit', function (e) {                                              //Fait toute les verifications necessaire pour la soumission du formulaire lors de la soumission
    // prevent the form from submitting
    e.preventDefault();
    // validate forms
    let isUsernameValid = checkUsername(),                                                  //Verification des donnees entrees 
    isEmailValid = checkEmail(),
    isPasswordValid = checkPassword(),
    isConfirmPasswordValid = checkConfirmPassword();
    let isFormValid = isUsernameValid &&                                                    //Verification du formulaire
    isEmailValid &&
    isPasswordValid &&
    isConfirmPasswordValid;
    // submit to the server if the form is valid
    if (isFormValid) {
    }
});


   
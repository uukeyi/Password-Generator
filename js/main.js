const inputRange = document.querySelector(".configuration__input-length");
const lengthText = document.querySelector(".configuration__length-text span");
const inputPassword = document.querySelector(".password-block__input");
const passwordBlock = document.querySelector(".password-block");
const parametersInputs = document.querySelectorAll(
   ".configuration__password-parameters input"
);
const regeneratePasswordBtn = document.querySelector(
   ".action-block__btn-regenerate"
);
const copyPasswordBtn = document.querySelector('.action-block__btn-copy')
const securityLevelText = document.querySelector(".action-block__title");
window.addEventListener("DOMContentLoaded", () => {
showPassword()
});
const configurationPassword = {
   numbers: ["0123456789"],
   letters: ["ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"],
   symbols: ["@%&?*()!:;"],
};
inputRange.addEventListener("input", (e) => {
   lengthText.textContent = e.target.value;
   const passwordCharacters = getParameters(parametersInputs);
   if (!passwordCharacters.length) {
      inputPassword.value = "Please Select your config";
      securityLevelText.textContent = "";
   } else {
      inputPassword.value = generatePassword(
         +e.target.value,
         passwordCharacters
      );
      securityCheckPassword(inputPassword.value);
   }
});
const showPassword = () => {
   const passwordCharacters = getParameters(parametersInputs);
   inputPassword.value = generatePassword(
      +inputRange.value,
      passwordCharacters
   );
   securityCheckPassword(inputPassword.value);
};
const generatePassword = (lengthPassword, parametersPassword) => {
   const password = [];
   for (let i = 0; i <= lengthPassword; i++) {
      const randomIndex = Math.floor(Math.random() * parametersPassword.length);
      password.push(parametersPassword[randomIndex]);
   }
   return password.join("");
};
const securityCheckPassword = (password) => {
   if (password.length > 19) {
      if (
         (/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(password) &&
            /[a-zA-Z]/.test([password])) ||
         (/[a-zA-Z]/.test([password]) && password.match(/\d+/g)) ||
         /[a-zA-Z]/.test([password]) ||
         (/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(password) &&
            password.match(/\d+/g))
      ) {
         passwordBlock.style.background = "#97cba9";
         securityLevelText.textContent = "Strong";
      }
   }
   if (password.length <= 19) {
      if (
         (/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(password) &&
            /[a-zA-Z]/.test(password)) ||
         /[a-zA-Z]/.test(password) ||
         (/[a-zA-Z]/.test(password) && password.match(/\d+/g)) ||
         (/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(password) &&
            password.match(/\d+/g))
      ) {
         passwordBlock.style.background = "#ff9a3c";
         securityLevelText.textContent = "Medium";
      }
   }

   if (
      /^[0-9]+$/.test(password) ||
      password.length < 12 ||
      /^[^a-zA-Z0-9]+$/.test(password)
   ) {
      passwordBlock.style.background = "#e53935";
      securityLevelText.textContent = "Weak";
   }
};

const getParameters = (parametersInputs) => {
   const filteredConfiguration = [];
   const checkedInputs = Array.from(parametersInputs)
      .filter((parameterInput) => {
         return parameterInput.checked;
      })
      .map((checkedInput) => {
         return checkedInput.dataset.type;
      });
   for (const key in configurationPassword) {
      if (checkedInputs.includes(key)) {
         filteredConfiguration.push(...configurationPassword[key]);
      }
   }
   return filteredConfiguration.join("");
};
regeneratePasswordBtn.addEventListener("click", () => {showPassword()});
copyPasswordBtn.addEventListener('click' , async () => {
   try {
      await navigator.clipboard.writeText(inputPassword.value);
      alert('Successfully coppied')
   } catch (error) {
      alert('Something wen wrong : ' , error )
   }
})
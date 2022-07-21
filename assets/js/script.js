const regexNum = /[^0-9]/g;
const year = document.querySelector(".data-input__form__update__year");
const textArea = document.querySelector(".data-input__form__textarea textarea");
const form = document.querySelector(".data-input__form");
const card = document.querySelectorAll(
  ".home__birthday-list__cards__item__names"
);
let textAreaVal, yearVal;

// event listener added for form
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const validateText = formValidation(textAreaVal, "textarea");
  const validateInp = formValidation(yearVal, "year");
  if (validateText == 1 && validateInp == 1) generateData(textAreaVal, yearVal);
});

// event listener added for textarea
textArea.addEventListener("change", (e) => {
  textAreaVal = e.target.value;
  formValidation(textAreaVal, "textarea");
});

textArea.addEventListener("blur", (e) => {
  textAreaVal = e.target.value;
  formValidation(textAreaVal, "textarea");
});

// event listener added for input
year.addEventListener("change", (e) => {
  yearVal = e.target.value;
  formValidation(yearVal, "year");
});

year.addEventListener("blur", (e) => {
  yearVal = e.target.value;
  formValidation(yearVal, "year");
});

// function for json validation
const jsonValidation = (str) => {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
};

// funtion for form validation
const formValidation = (elem, str) => {
  if (elem.length == 0) displayError("Above field is required", `${str}`);
  else if (str === "textarea") {
    if (!jsonValidation(elem))
      displayError(`Please enter valid JSON`, `${str}`);
    else {
      displaySuccess(`${str}`);
      return 1;
    }
  } else if (str === "year") {
    if (regexNum.test(elem) || elem.length != 4)
      displayError(`Please enter valid year`, `${str}`);
    else {
      displaySuccess(`${str}`);
      return 1;
    }
  }
};

// function for display an error
const displayError = (msg, ele) => {
  const element = document.querySelector(`.${ele}-err`);
  element.classList.remove("hide");
  element.innerHTML = msg;
};

// function for remove error
const displaySuccess = (ele) => {
  const element = document.querySelector(`.${ele}-err`);
  element.classList.add("hide");
  element.innerHTML = "";
};

// function for generated data
const generateData = (json, year) => {
  const days = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
  const data = JSON.parse(json);
  let dayArr = [],
    nameInitial = [],
    jsonData = [];

  data.map((e) => {
    e = e.name;
    nameInitial.push(e.slice(0, 1));
  });

  data.map((e) => {
    e = e.dob;
    let day = new Date(`${year}${e.slice(4)}`).getDay();
    day = days[day];
    dayArr.push(day);
  });

  for (var i = 0; i < data.length; i++) {
    const obj = { initial: nameInitial[i], day: dayArr[i] };
    jsonData.push(obj);
  }

  displayData(jsonData);
};

// function for display data
const displayData = (data) => {
  card.forEach((e) => e.classList.add("clear"));
  let initialList = document.querySelectorAll(".initialList");

  if (initialList.length !== 0) {
    initialList.forEach((e) => e.remove());
  }

  data.map((e) => {
    card.forEach((cardEle) => {
      let prevSib = cardEle.previousElementSibling;
      if (e.day === prevSib.innerHTML.toLocaleLowerCase()) {
        cardEle.classList.remove("clear");
        let content = document.createElement("li");
        content.classList.add("initialList");
        content.innerHTML = e.initial;
        cardEle.appendChild(content);
        console.log(cardEle);
      }
    });
  });
};

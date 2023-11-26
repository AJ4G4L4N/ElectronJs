// THE RENDERER FILE, INCLUDES ALL JS FUNCTIONS
window.addEventListener("load", () => {
  //Event handlers
  //Save button
  const btnSave = document.getElementById("btnSave");
  btnSave.addEventListener("click", btnSaveClick);

  //Get button
  const btnGet = document.getElementById("btnGet");
  btnGet.addEventListener("click", btnGetClick);

  //Callbacks
  window.api.gotBooks(gotBooks);
  window.api.gotBookUpdatedResult(gotBookUpdatedResult);
  window.api.gotDeletedResult(gotDeletedResult);
  btnGetClick();
});

let bookData = {};

// FUNCTION TO RENDER BOOKS DATA TO CLIENT
const gotBooks = (books) => {
  bookData = books;

  console.log("view gotEmployees");

  var empData = books
    .map((book) => {
      var res = `<div class="flex flex-col rounded-lg bg-yellow-400 shadow-lg dark:bg-neutral-700 md:max-w-xl md:flex-row w-full">
        <img class="h-96 w-full rounded-t-lg object-cover md:h-auto md:w-48 md:rounded-none md:rounded-l-lg"
          src="../../assets/icons/card.png" alt="" />
        <div class="flex flex-col justify-between w-full">
  
          <div class="flex flex-col justify-between h-full">
  
            <div class="flex gap-2 justify-end items-center px-2 w-full p-4">
              <img src="../../assets/icons/pen.png"
                class="transition duration-500 shadow ease-in-out transform hover:-translate-y-1 hover:shadow-lg flex justify-end w-8 p-1 rounded-full bg-white text-right cursor-pointer"
                onclick="Edit('${book.id}')" />
  
              <img src="../../assets/icons/delete.png"
                class="transition duration-500 shadow ease-in-out transform hover:-translate-y-1 hover:shadow-lg flex justify-end w-9 p-1 rounded-full bg-white text-right cursor-pointer"
                onclick="Delete('${book.id}')" />
            </div>
  
            <div class="p-8">
              <p class="  text-xs text-white dark:text-neutral-300 ">
                ${book.id}
              </p>
              <h5 class="mb-2 text-xl font-bold text-white dark:text-neutral-50">
                ${book.name}
              </h5>
              <p class="mb-4 text-base text-white dark:text-neutral-200">${book.author}</p>
              <p class="text-s text-white dark:text-neutral-300">
                $ ${book.price}
              </p>
            </div>
          </div>
  
        </div>
  
      </div>`;

      return res;
    })
    .join("");

  var listData = document.getElementById("lBooks");
  listData.innerHTML = empData;
};

// GET BTN FUNCTION
const btnGetClick = (event) => {
  console.log("Get button clicked");
  event.preventDefault();

  window.api.getBooks();
};

// CLEARING THE FORM
const clearForm = () => {
  document.getElementById("book-name").value = "";
  document.getElementById("book-author").value = "";
  document.getElementById("book-price").value = "";
  document.getElementById("empId").value = "";
};

// VALIDATION THE INPUT
const validateInput = (data) => {
  if (!data.name || !data.author || !data.price) return false;
  return true;
};

// SAVE BTN FUNCITON
const btnSaveClick = (event) => {
  console.log("Save button clicked");
  event.preventDefault();

  const name = document.getElementById("book-name").value;
  const author = document.getElementById("book-author").value;
  const price = document.getElementById("book-price").value;
  const empId = document.getElementById("empId").value;

  if (!validateInput({ name, author, price })) {
    alert("Please fill all the data!");
    return;
  }

  console.log(
    `author: ${author}, Name: ${name}, price: ${price}, empId: ${empId}`
  );

  if (empId == "") {
    window.api.saveBook({ name, author, price }).then(() => {
      alert("Record saved");
    });
  } else {
    window.api.updateBook(empId, { name, author, price });
  }

  btnGet.click();
  clearForm();
};

const gotDeletedResult = (result) => {
  if (result) {
    alert("Record deleted");
  }
};

// FUNCTION IMPLEMENTING DELETE
function Delete(empId) {
  console.log(`mainView > Delete : ${empId}`);
  window.api.deleteBook(empId);
  btnGet.click();
}

// FUNCITON IMPLEMENTING EDIT
function Edit(empId) {
  const emp = bookData.find((book) => book.id === empId);

  const inputId = document.getElementById("empId");
  const author = document.getElementById("book-author");
  const price = document.getElementById("book-price");
  const name = document.getElementById("book-name");

  inputId.value = empId;
  name.value = emp.name;
  author.value = emp.author;
  price.value = emp.price;
}

const gotBookUpdatedResult = (result) => {
  if (result) window.api.getBooks();
};

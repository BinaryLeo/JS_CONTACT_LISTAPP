const list = document.getElementById("list");
const dateEl = document.getElementById("date");
let LIST, id;
let data = localStorage.getItem("ContactListApp");
if (data) {
  LIST = JSON.parse(data);
  id = LIST.length;
  loadList(LIST);
} else {
  LIST = [];
  id = 0;
}

//* Show todays date
const options = { weekday: "long", month: "short", day: "numeric" };
const today = new Date();

dateEl.innerHTML = today.toLocaleDateString("en-US", options);

//------------------------------------------------------------------------------------------------
function currentTime() {
  var date = new Date(); /* creating object of Date class */
  var hour = date.getHours();
  var min = date.getMinutes();
  var sec = date.getSeconds();
  var midday = "AM";
  midday = hour >= 12 ? "PM" : "AM"; /* assigning AM/PM */
  hour =
    hour == 0
      ? 12
      : hour > 12
      ? hour - 12
      : hour; /* assigning hour in 12-hour format */
  hour = updateTime(hour);
  min = updateTime(min);
  sec = updateTime(sec);
  document.getElementById("time").innerText =
    hour + " : " + min + " " + midday; /* adding time to the div */
  var t = setTimeout(currentTime, 1000); /* setting timer */
}
function updateTime(k) {
  /* appending 0 before time elements if less than 10 */
  if (k < 10) {
    return "0" + k;
  } else {
    return k;
  }
}
//------------------------------------------------------------------------------------------------
currentTime();
//------------------------------------------------------------------------------------------------

/* setInterval(refreshTime, 1000); */

//* add to do function
function loadList(array) {
  array.forEach((item) => {
    userData(item.id, item.name, item.phone, item.description);
  });
}
function userData(id, name, phone, description) {
  const item = `<li class="card">
<div class="profile">

<div id="text-container">
<p>${id} - ${name}</p>
<p>${phone}</p>
<p>${description}</p>
</div>

<div id="icon-container">
<img src="./img/user.png"></img>
</div>

</div>   
</li>
`;
  const position = "beforeend";
  list.insertAdjacentHTML(position, item);
}
const addContact = (ev) => {
  ev.preventDefault(); // To stop the form submitting
  let contact = {
    id: (id += 1), // User Id
    name: document.getElementById("name").value,
    phone: document.getElementById("phone").value,
    description: document.getElementById("description").value,
  };
  LIST.push(contact);
  localStorage.setItem("ContactListApp", JSON.stringify(LIST)); //Saving to localStorage
  document.forms[0].reset(); // To clear the form for the next entries
  window.location.reload();
};
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("btn").addEventListener("click", addContact);
});

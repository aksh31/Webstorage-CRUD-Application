let cl = console.log;

// CRUD ==> stands for

// Create >> success
// Read >> success
// Update >> success
// Delete >> success

// 

const stdInfo = document.getElementById("stdInfo");
const fname = document.getElementById("fname");
const lname = document.getElementById("lname");
const email = document.getElementById("email");
const contact = document.getElementById("contact");
const stdData = document.getElementById("stdData");
const submitBtn = document.getElementById("submitBtn");
const updateBtn = document.getElementById("updateBtn");

let stdArray = [];

if(localStorage.getItem("stdInfo")){
    //stdArray = JSON.parse(localStorage.getItem("stdInfo"));
    stdArray = getLocalData();
}


/////////////////////////////////////////////////
/////////////// Event Handlers //////////////////
/////////////////////////////////////////////////

// For Create

const stdInfoHandler = (eve) =>{
    eve.preventDefault();
    let obj = {
        getFname : fname.value,
        getLname : lname.value,
        getEmail : email.value,
        getContact : contact.value,
        id : uuidv4(),
    }
    // cl(obj);
    stdArray.push(obj);
    // localStorage.setItem("stdInfo", JSON.stringify(stdArray));
    setLocalData(stdArray);
    stdInfo.reset();
    templatingStdData(stdArray);
}

// For Edit

const onEditHandler = (eve) =>{
    // cl(eve.getAttribute("data-id"));
    updateBtn.classList.remove("d-none");
    submitBtn.classList.add("d-none");
    let getID = eve.getAttribute("data-id");
    // let getID = eve.dataset.id;
    localStorage.setItem("setID", JSON.stringify(getID));
    let getData = getLocalData();
    // let getData = JSON.parse(localStorage.getItem("stdInfo"));
    let getObj = getData.filter(ele =>{
        return ele.id === getID;
    })
    // let getObj = getData.find(ele =>{
    //     return ele.id === getID;
    // })
    // cl(getObj);
    fname.value = getObj[0].getFname;
    lname.value = getObj[0].getLname;
    email.value = getObj[0].getEmail;
    contact.value = getObj[0].getContact;
}

// For Update

const onUpdateHandler = (eve) =>{
    let getID = JSON.parse(localStorage.getItem("setID"));

    let getData = getLocalData();
    // let getData = JSON.parse(localStorage.getItem("stdInfo"));
    // cl(getData);
    getData.forEach(ele =>{
        if(ele.id === getID){
            ele.getFname = fname.value;
            ele.getLname = lname.value;
            ele.getEmail = email.value;
            ele.getContact = contact.value;
        }
    })
    // localStorage.setItem("stdInfo", JSON.stringify(getData));
    setLocalData(getData);
    templatingStdData(getData);
    updateBtn.classList.add("d-none");
    submitBtn.classList.remove("d-none");
    stdInfo.reset();
}

// For Delete

const onDeleteHandler = (eve) =>{
    let text = confirm("Are you sure want to delete this Data ?");
    if(text){
        let getID = eve.getAttribute("data-id"); // 3 no id
        let getData = getLocalData();
        // let getData = JSON.parse(localStorage.getItem("stdInfo"));
        let newData = getData.filter(ele =>{
            return (ele.id !== getID);
        })
        cl(newData); // 1, 2 , 4 objects
        // localStorage.setItem("stdInfo", JSON.stringify(newData));
        setLocalData(newData);
        templatingStdData(newData);
    }
    window.location.reload();
}

/////////////////////////////////////////////////
///////////////    Functions   //////////////////
/////////////////////////////////////////////////

function templatingStdData(arr){
    let result = '';
    arr.forEach((ele, i) => {
        result += `<tr>
                        <td>${i + 1}</td>
                        <td>${ele.getFname}</td>
                        <td>${ele.getLname}</td>
                        <td>${ele.getEmail}</td>
                        <td>${ele.getContact}</td>
                        <td>
                            <button class="btn btn-success" data-id="${ele.id}" onclick="onEditHandler(this)">Edit</button>
                        </td>
                        <td>
                            <button class="btn btn-danger" data-id="${ele.id}" onclick="onDeleteHandler(this)">Delete</button>
                        </td>
                   </tr>`;
    });
    stdData.innerHTML = result;
}
templatingStdData(stdArray);

// =========================

function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
}
// =========================
function getLocalData(){
    return JSON.parse(localStorage.getItem("stdInfo"));
}
// =========================
function setLocalData(arr){
    return localStorage.setItem("stdInfo", JSON.stringify(arr));
}


/////////////////////////////////////////////////
/////////////// Event Listners //////////////////
/////////////////////////////////////////////////

stdInfo.addEventListener("submit", stdInfoHandler);

updateBtn.addEventListener("click", onUpdateHandler);




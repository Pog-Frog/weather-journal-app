/* Global Variables */
const server = "http://http://127.0.0.1:5500"
const baseurl = "https://api.openweathermap.org/data/2.5/weather?zip=";
const api_key = "&appid=9f0d4cf322fd40fb9edbfefe570b3e74";
let d = new Date();
// Create a new date instance dynamically with JS
let newDate = d.getMonth() + "." + d.getDate() + "." + d.getFullYear();
const error = document.getElementById("zip-error");
const projectData = {
    name: "",
    temp: "",
    feelings: "",
    date: newDate
};

function getData() {
    const zipcode = document.getElementById("zip").value;
    const feeling = document.getElementById("feelings").value;
    getWeather(zipcode).then((data) => {
        if (data) {
            console.log(data);
            projectData["name"] = data["name"];
            projectData["temp"] = Math.round(data["main"]["temp"] - 273.15);
            projectData["feelings"] = feeling;
            postData("/add", projectData);
            updatingUI();
        }
    });
}

/* Function calling using event listener */
document.getElementById("generate").addEventListener("click", getData);

/* Function to GET Web API Data*/

const getWeather = async (zip) => {
    try {
        const res = await fetch(baseurl + zip + api_key);
        const data = await res.json();
        if (data.cod != 200) {
            error.innerHTML = data.message;
            error.className = "small";
            setTimeout(() => {
                error.className = "valid-feedback";
                error.innerHTML = "";
            }, 2000);
            error.innerHTML = data.message;
        } else {
            console.log(data);
            return data;
        }
    } catch (error) {
        console.log(error);
    }
};

/* Function to POST data */

const postData = async (url = "", info) => {
    const response = await fetch(url, {
        method: "POST",
        credentials: "same-origin",
        header: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(info),
    });
};

const updatingUI = async () => {
    const request = await fetch("/all");
    try {
        // update new entry values
        const savedData = await request.json();
        document.getElementById("date").innerHTML = projectData.date;
        document.getElementById("city").innerHTML = projectData.name;
        document.getElementById("temp").innerHTML = projectData.temp + "&degc";
        document.getElementById("content").innerHTML = projectData.feelings;
    } catch (error) {
        console.log(error);
    }
};
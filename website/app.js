/* Global Variables */
const baseurl = "https://api.openweathermap.org/data/2.5/weather?zip=";
const api_key = "&appid=9f0d4cf322fd40fb9edbfefe570b3e74";
let d = new Date();
// Create a new date instance dynamically with JS
let newDate = d.getMonth() + "." + d.getDate() + "." + d.getFullYear();
const error = document.getElementById("zip-error");

function getData() {
    const zipcode = document.getElementById("zip").value;
    const feeling = document.getElementById("feelings").value;
    getWeather(zipcode).then((data) => {
        if (data) {
            const {
                main: { temp },
                name: city,
                weather: [{ description }],
            } = data;
            const info = {
                newDate,
                city,
                temp: Math.round(temp),
                description,
                feeling,
            };
            postData("/add", info);
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

const postData = async (url = "", info = {}) => {
    const response = await fetch(url, {
        method: "POST",
        credentials: "same-origin",
        header: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(info),
    });
    try {
        const newData = await response.json();
        console.log("New Data: ", newData);
        return newData;
    } catch (error) {
        console.log(error);
    }
};

const updatingUI = async () => {
    const request = await fetch("/all");
    try {
        // update new entry values
        const savedData = await request.json();
        document.getElementById("date").innerHTML = savedData.newData;
        document.getElementById("city").innerHTML = savedData.city;
        document.getElementById("temp").innerHTML = savedData.temp + "&degc";
        document.getElementById("content").innerHTML = savedData.feelings;
    } catch (error) {
        console.log(error);
    }
};

/* Global Variables */
const baseurl = "https://api.openweathermap.org/data/2.5/weather?zip=";
const api_key = "&appid=9f0d4cf322fd40fb9edbfefe570b3e74";
const server = "https://127.0.0.1:4000";
function getData(){
    const zipcode = document.getElementById("zip").value;
    const feeling = document.getElementById("feelings").value;
    getWeather(zipcode).then((data) => {
        if(data){
            const{
                main: { temp },
                name : city,
                weather : [{ description}],
            } = data;
            const info = {
                newDate,
                city,
                temp : Math.round(temp),
                description,
                feelings,
            };
            postData(server + "/add", info);
            updatingUI();
        }
    });
};
document.getElementById("generate").addEventListener("click", getData);
const getWeather = async(zip)=> {
    try{
        const res= await fetch(baseurl + zip + api_key);
        const data = await res.json();
        return data;
    }
    catch(error){
        console.log(error);
    }
};

const postData  = async(url="", info = {}) => {
    const res = await fetch(url, {
        method : "POST",
        header: {
            "Content-Type" : "application/json",
        },
        body : JSON.stringify(info),
    });
    try{
        const newData = await res.json();
        console.log("New Data: ", newData);
        return newData;
    }
    catch(error){
        console.log(error);
    }
};

const updatingUI = async ()=>{
    const res = await fetch(server, "/all");
    try{
        const savedData = await res.json();
        document.getElementById("date").innerHTML = savedData.newData;
        document.getElementById().innerHTML = savedData.city;
        document.getElementById().innerHTML = savedData.temp + "&degc";
        document.getElementById().innerHTML = savedData.description;
        document.getElementById().innerHTML = savedData.feelings;
    }catch(error){
        console.log(error);
    }
}
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();
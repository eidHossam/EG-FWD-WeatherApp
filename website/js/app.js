// Personal API Key for OpenWeatherMap API
const apiKey = ',&appid=82371e2bdd952a64c6ab8200368ec4e6&units=imperial';

// The URL to retrieve weather information from his API (country : US)
const baseURL = "https://api.openweathermap.org/data/2.5/weather?zip=";

const server = "http://127.0.0.1:8000";

const generateBtn = document.getElementById('generate');

//Start the entire process when the user click the generate button
generateBtn.addEventListener('click' , () => {
    const zip = document.getElementById("zip").value;

    //Making sure our zip code field isn't empty before proceeding
    if(zip)
    {
        //used chained promises to get the data from the api after finishing this i used it to the server endpoint then i update the UI with the new data.
        getDataFromAPI(zip).then( (apiData) => {
            PostData('/all' , apiData);
        }
        ).then( updateUI );
    }else{
        //showing an alert if the zip code field is empty
        alert("Fill The required data!.");
    }
});

const PostData = async(url = '' , data ={}) => {
    const response = await fetch( server + url , {
        method: "POST", 
        credentials: 'same-origin',
        headers: {
            'Content-Type' : 'application/json',
        },

        body: JSON.stringify(data), // body data type must match "Content-Type" header 
    });

    try{
        //getting the response from the server after making the post request
        const newData = await response.json();
        console.log(newData);
        return newData;
    }catch(error)
    {
        console.log(`error: ${error}`); // appropriately handle the error
    }
};

const getDataFromAPI = async (zip) => {
    const response = await fetch(baseURL + zip + apiKey);
    try{
        const data = await response.json();

        //making sure we successfully got our data back from the api before proceeding.
        if(data.cod == 200)
        {
            //making a new object to store the data i want to send back to the server side
            const apiData = {
            city: data.name,
            temp: Math.round(data.main.temp),
            date: data.dt,
            feelings: document.getElementById('feelings').value,
        };
        return apiData;
        }else{
            alert(data.message); //Make an alert if there was an error with getting the data back from the api
        }
         
    }catch(error)
    {
        console.log("error: " + error);
    }
};

const  updateUI = async () => {
    const response = await fetch( server + '/getData'); //fetching our data from the server side
    try{
        const data = await response.json();
        console.log(data);
        
        // Creating a new date instance dynamically with JS
        const d = new Date()
        const newDate = d.toDateString();
        
        document.getElementById('city').textContent = data.city;
        document.getElementById('date').textContent = `Date: ${newDate}`;
        document.getElementById('temp').textContent = `Temp: ${data.temp} ℉`;
        document.getElementById('content').textContent = data.feelings;
        document.querySelector(".entrydiv").style.opacity = 1;
    }catch(error){
        console.log(`error: ${error}`);
    }
}
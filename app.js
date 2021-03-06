window.addEventListener("load" , () => {

    let lat;
    let long;
    
    let temperatureDescription = document.querySelector(".temperature-description");
    let temperatureDegree = document.querySelector(".temperature-degree");
    let timeZone = document.querySelector(".location-timezone");

    if(navigator.geolocation){
       
        
        navigator.geolocation.getCurrentPosition( (position) => {
            long = position.coords.longitude;
            lat = position.coords.latitude;
            console.log(`Latitud: ${lat} - Longitud: ${long}`);
            let proxy = "https://cors-anywhere.herokuapp.com/";
            let url = `${proxy}https://api.darksky.net/forecast/f8767ca1a9c4baca8a580072e3831b54/${lat},${long}`;
            fetch(url)
            .then(response => {return response.json()})
            .then(datos => { 
                const {temperature,summary, icon} = datos.currently;
                temperatureDescription.textContent = summary;
                temperatureDegree.textContent = temperature;
                timeZone.textContent = datos.timezone;
                setIcons(icon, document.querySelector(".icon"));

                    temperatureSection.addEventListener("click", () => {
                        if (temperatureSpan.textContent === "F") {
                            temperatureSpan.textContent = "C";
                            temperatureDegree.textContent = Math.floor(celsius);
                        } else {
                            temperatureSpan.textContent = "F";
                            temperatureDegree.textContent = temperature;
                        }
                    });
                });
        });
   
function setIcons(icon, iconID) {
        const skycons = new Skycons({ color: "white" });
        const currentIcon = icon.replace(/-/g, "_").toUpperCase();
        skycons.play();
        return skycons.set(iconID, Skycons[currentIcon]);
    }
    }else{
        alert("Primoo, activa la geolocalizacion!!!!!!!");
    }

})
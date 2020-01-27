let intervalId;
let clockRunning = false;
let time = 0; // this is sent to user 



$(".btn-primary").click(function () {



    //if correct stop timer
    stop();
    document.location.href = 'score'
    // else just say the answers wrong



})


$(".btn-success").click(function () {


    start();
//grab coded message and display it there 





})








function start() {

    if (!clockRunning) {
        intervalId = setInterval(count, 1000);
        clockRunning = true;
    }
}

function stop() {

    // DONE: Use clearInterval to stop the count here and set the clock to not be running.
    clearInterval(intervalId);
    clockRunning = false;
}

function count() {

    
    time++;

    // DONE: Get the current time, pass that into the timeConverter function,
    //       and save the result in a variable.
    let converted = timeConverter(time);
    console.log(converted);

    // DONE: Use the variable we just created to show the converted time in the "display" div.
    $("#clock").text(converted);
}

function timeConverter(t) {

    let minutes = Math.floor(t / 60);
    let seconds = t - (minutes * 60);

    if (seconds < 10) {
        seconds = "0" + seconds;
    }

    if (minutes === 0) {
        minutes = "00";
    }
    else if (minutes < 10) {
        minutes = "0" + minutes;
    }

    return minutes + ":" + seconds;
}

function getMessages() {
    $.ajax({
        url: "/api/getmessages",
        method: 'GET',
        dataType: 'json'
    }).then(function(response) {
        console.log(response)
        for (let i = 0; i < response.length; i++) {
            encryptedM = response[i].message_encrypt;
            decryptedM = response[i].message_decrypt;
            $("#encoded").append(encryptedM);
        }
    })
}

getMessages();
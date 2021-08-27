function init(){
  var firebaseConfig = {
    apiKey: "AIzaSyCKxljph5n_NJ-irP_QNHnUrxg65cbnmfU",
    authDomain: "fuceechat.firebaseapp.com",
    projectId: "fuceechat",
    storageBucket: "fuceechat.appspot.com",
    messagingSenderId: "345785591919",
    appId: "1:345785591919:web:4b9440153b19c75531c59a",
    measurementId: "G-HXWRDN618M"
  };
  firebase.initializeApp(firebaseConfig);

  ref = firebase.database().ref("messages");

 




   firebase.database().ref("messages").on("child_added",(snapshot)=>{
      var html = '';
      if(snapshot.val().sender == myName){
        html += '<li class="message mine">';
            html += '<p class="text">' +snapshot.val().message + '</p>';
            html += '<span class="date">' + tarihCevir(snapshot.val().time) + '</span>';
            html += '</li>';
      }else{
            html += '<li class="message">';
            html += '<p class="text">' + snapshot.val().message + '</p>';
            html += '<span class="date">' + tarihCevir(snapshot.val().time) + '</span>';
            html += '<span class="sender">' + snapshot.val().sender + '</span>';
            html += '</li>';
         }
      messages.innerHTML += html;
      messages.scroll({behavior:"smooth",top:99999999999999999999999999999999})
   });

}





function sohbeteBasla(){
    myName = nameInput.value;
    if(myName.length > 0){
        console.log(myName);
        login.classList.add("hidden");
        init();
    }
}

function tarihCevir(stamp){
    var dt = new Date(stamp);
    var s = "0" + dt.getHours();
    var d = "0" + dt.getMinutes();
    var format = s.substr(-2) + ":" + d.substr(-2);
    return format;
}

function mesajGonder(){
    var nsg = document.getElementById("myInput").value;
    if(nsg.length > 0){
        ref.push().set({
            sender:myName,
            message:nsg,
            time:firebase.database.ServerValue.TIMESTAMP
        });  
    }
}

var login = document.querySelector(".login");
var nameInput = document.getElementById("myName");
var messages = document.getElementById("messages");
messages.innerHTML = "";
var myName = "";
var ref;








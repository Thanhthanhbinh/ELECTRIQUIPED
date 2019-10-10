var img_list =document.getElementsByClassName('img');
var i=0;
var k=1000;
var expendables=["Television", "Lights", "Computer", "Fan", "Water Heater"];
var saved_items=[{name:'Television',hours:1},{name:'Lights',hours:2}, {name:'Computer',hours:3},{name:'Air Condition',hours:4}, {name:'Water Heater',hours:0}];
var save_txt="";
var ap=[];
var displayName="";
var email="";
var emailVerified=false;
var photoURL="";
var database = firebase.database();
var userId = "";

function writeUserData(_userId, _displayName, _email, _emailVerified,_photoURL) {
    database.ref('users/' + _userId).update({
        displayName: _displayName,
        email: _email,
        photoURL : _photoURL,
        emailVerified : _emailVerified
    });
}
function writeUserApp(_userId,_list,_days) {
    var _data={
        list:_list,
        days:_days
    }
    database.ref('users/' + _userId).update({
        data:_data
    });
}
function updateUI (_userId) {
    database.ref('/users/' + _userId ).once('value').then(function(snapshot) {
        console.log(snapshot);
        console.log(snapshot.val());
        changeUI(snapshot.val().data);
    });
}
function signin() {
    console.log(firebase);
    console.log(firebase.auth);
    var provider = new firebase.auth.GoogleAuthProvider();

    console.log(provider);
    firebase.auth().signInWithPopup(provider).then(function(result) {
        // This gives you a Google Access Token. You can use it to access the Google API.
        var token = result.credential.accessToken;
        // The signed-in user info.
        var user = result.user;
        console.log(user);
        document.getElementById("gog").style.display="none";
        displayName=user.displayName;
        email=user.email;
        emailVerified=user.emailVerified;
        photoURL=user.photoURL;
        document.getElementById("acc_name").innerText=displayName;
        userId = firebase.auth().currentUser.uid;
        updateUI(userId);
        writeUserData(userId, displayName, email, emailVerified,photoURL);
        
        }).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        console.log(error);
        //snack bar error "fail"
        
    });
}
//SETTING LISTS AND ARRAY
function setup() {
    var listA=[];
    var listP=[];
    var listH=[];
    var listN=[];
    var list=[];
    var check=0;
    var four=parseInt(document.getElementById('days_in').value);
    if(four==0) {
        check=1;
    }
    var one=document.getElementsByClassName('appliances');
    for (k=0;k<one.length-1;k++) {
    listA[k]=one[k].options[one[k].selectedIndex].value;
    if(listA[k]=="") {
        check=1;
    }
    }
    var two=document.getElementsByClassName('power');
    for (k=0;k<two.length-1;k++) {
        listP[k]=two[k].value;
        if(listP[k]==0) {
            check=1;
        }
    }
    var three=document.getElementsByClassName('hours');
    for (k=0;k<three.length-1;k++) {
        listH[k]=three[k].value;
        if(listH[k]==0) {
            check=1;
        }
    }    
    var five=document.getElementsByClassName('number');
    for (k=0;k<five.length-1;k++) {
        listN[k]=five[k].value;
        if(listN[k]==0) {
            check=1;
        }
    }
    for (k=0;k<one.length-1;k++) {
        var obj ={
            appliance:listA[k],
            power:listP[k],
            hours:listH[k],
            number:listN[k],
        };
        list.push(obj);
    }
    writeUserApp(userId,list,four);
    window.sessionStorage.setItem("list",JSON.stringify(list));
    window.sessionStorage.setItem("days",JSON.stringify(four));
    if(check==0) {
        window.location.href="output.html";
    } else {
        alert("You missed a few inputs!");
    }

}

//SHOW MONEY

//SHOW WEEKEND OR WEEKDAY
function change_week(a,b,c,d) {
    var one=document.getElementById(a);
    if (one.classList.contains('button_invi')==true) {
        one.classList.remove("button_invi");
        one.classList.add('button_invi_click');
        document.getElementById(c).style.display="flex";
        var two=document.getElementById(b);
        two.classList.add("button_invi");
        two.classList.remove('button_invi_click');
        document.getElementById(d).style.display="none";
    }
}



//SELECTED PERCENTAGE
function changeUI(a) {
    var len= a.list.length;
    console.log(len);
    for (i=0; i<len-1; i++) {
        add();
    }
    var lit=a.list;
    document.getElementById('days_in').value=a.days;

    var one=document.getElementsByClassName('appliances');
    var two=document.getElementsByClassName('power');
    var three=document.getElementsByClassName('hours');
    var five=document.getElementsByClassName('number');


    for (k=0;k<one.length;k++) {
        one[k].value=lit[k].appliance;
        two[k].value=lit[k].power;
        three[k].value=lit[k].hours;
        five[k].value=lit[k].number;
    }
    
}


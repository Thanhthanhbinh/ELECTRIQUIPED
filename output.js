//CALCUALTE
var i=0;
var k=1000;
var expendables=["Television", "Lights", "Computer", "Fan", "Water Heater","Air Condition"];
var saved_items=[{name:'Television',hours:1},{name:'Lights',hours:2}, {name:'Computer',hours:3},{name:'Air Condition',hours:4}, {name:'Water Heater',hours:0}];
var save_txt="";
var ap=[];
var saveK=0.0;
var days=0;
function calculate() {
    var kWh=0.0;
    var money=0;
    var list= JSON.parse(sessionStorage.getItem("list"));
    var days= JSON.parse(sessionStorage.getItem("days"));
    for (k=0;k<list.length; k++) {
        kWh+=list[k].power*list[k].hours*list[k].number*0.001;
    }
    kWh=kWh*days;
    window.sessionStorage.setItem("kWh",JSON.stringify(kWh));
    if (kWh<50 && kWh>0) {//1
        money=kWh*1678;
    } else if (kWh<=100 && kWh>=51){//2
        money=50*1678;
        money+=(kWh-50)*1734;
    } else if (kWh<=200 && kWh>=101){//3
        money=50*1678;
        money+=50*1734;
        money+=(kWh-100)*2014;
    } else if (kWh<=300 && kWh>=201){//4
        money=50*1678;
        money+=50*1734;
        money+=100*2014;
        money+=(kWh-200)*2536;
    } else if (kWh<=400 && kWh>=301) {//5
        money=50*1678;
        money+=50*1734;
        money+=100*2014;
        money+=100*2536;
        money+=(kWh-300)*2834;
    } else if (kWh>=401) {//6
        money=50*1678;
        money+=50*1734;
        money+=100*2014;
        money+=100*2536;
        money+=100*2834;
        money+=(kWh-400)*2927;
    }
    money=Math.round(money);
    window.sessionStorage.setItem("money",JSON.stringify(money));
}

//ADD COMAS
function thousands_separators(num){
    var num_parts = num.toString().split(".");
    num_parts[0] = num_parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return num_parts.join(".");
}

//FIND THE NUMBER OF EXPENDABLE APPLIANCES
function expen() {
    ap=[];
    var m={};
    var one=JSON.parse(sessionStorage.getItem('list'));
    console.log(one);
    for(j=0;j<one.length; j++){//CHECK IN LIST
        for(h=0;h<expendables.length;h++) {//CHECK IN EXPENDIBLES
            if (one[j].appliance==expendables[h]) {
                ap.push(one[j]);
            }
        }
    }

    // for(k=0;k<ap.length;k++){
    //     if(ap[k].hours<ap[k+1].hours){
    //         m=ap[k].hours;
    //         ap[k].hours=ap[k+1].hours;
    //         ap[k+1].hours=m;
    //     }
    // }
}
function sa(a){
    save_txt="";
    var hoursD=0.0;
    var h=0;
    days= JSON.parse(sessionStorage.getItem("days"));
    if(a=== "20%"){
        saveK=JSON.parse(sessionStorage.getItem("kWh"));
        console.log(days);
        saveK=saveK/days;
        saveK=saveK*0.2;
        
    } else if (a==="10%") {
        saveK=JSON.parse(sessionStorage.getItem("kWh"));
        saveK=saveK/days;
        saveK=saveK*0.1;
        console.log(saveK);

    } else if (a==="30%") {
        saveK=JSON.parse(sessionStorage.getItem("kWh"));
        saveK=saveK/days;
        saveK=saveK*0.3;
        console.log(saveK);

    }
    expen();
    save_txt+=" Saved amount: ";
    save_txt+=saveK.toString();
    save_txt+=". "
    console.log(saveK);

    for(j=0; j<ap.length; j++){
        if (ap[j].appliance==saved_items[h].name){
            hoursD=parseInt(ap[j].power)*parseInt(ap[j].hours)-parseInt(ap[j].power)*saved_items[h].hours;
            if (saveK<hoursD) {
                save_txt+=ap[j].appliance;
                save_txt+="'s usage should be decreased to ";
                save_txt+=(hoursD/parseInt(ap[j].power)).toString();
                save_txt+=" minute(s). "
                h=0;
                console.log(ap);
                ap.shift();
            } else if (saveK>hoursD) {
                save_txt+=ap[j].appliance;
                save_txt+="'s usage should be decreased to ";
                save_txt+=(saved_items[h].hours).toString();
                save_txt+=" minute(s). "
                h=0;
                console.log(ap);
                ap.shift();
                saveK=saveK-(parseInt(ap[j].power)*saved_items[h].hours);
            }
        }else {
            h++;
        }
        
    } 
}
function show(a) {
    var one=document.getElementById(a);
    var two=document.getElementsByClassName("saving-plans");
    if (one.style.display=="block") {
        one.style.display="none";
    } else if (one.style.display="none") {
        for (k=0;k<two.length;k++) {
            two[k].style.display='none';
        }
        one.style.display="block";
            }
        }
        function savings() {
            var money= JSON.parse(sessionStorage.getItem("kWh"));
            var two=money;
            two=money*0.8649;
            window.sessionStorage.setItem("carbon",JSON.stringify(two));
            var three=document.getElementById('carbon');
            two=Math.round(two);
            two=thousands_separators(two);
            three.innerHTML=two;
            var one=document.getElementById("number");
            var money= JSON.parse(sessionStorage.getItem("money"));
            money=thousands_separators(money);
            one.innerHTML=money;
        }
        function show_per(a){
            var one=document.getElementById(a+"-text");
            save_txt = sa2(a);
            if (save_txt!="") {
                one.innerHTML=save_txt;
            } else {
                one.innerHTML="You can't decrease your energy any further."
            }
            
        }
    
        var savedItems = {"Television": 1, "Light": 2, "Computer": 3, "Air Condition": 4, "Water Heater": 0};
        var savableItems = ["Television", "Light", "Computer", "Air Condition", "Water Heater"];
        
        function sa2(percent) {
            var needSave = JSON.parse(sessionStorage.getItem("kWh"));
            var days = JSON.parse(sessionStorage.getItem("days"));
            needSave = needSave/days*1000;
            needSave *= (percent==="10%" ? 0.1 : (percent==="5%" ? 0.05 : 0.03));
        
            // TODO update this line
            aps = JSON.parse(sessionStorage.getItem("list"));
            aps = aps.filter(function(ap) {
                return savableItems.includes(ap.appliance);
            });
            // TODO check tang, giam dan
            aps = aps.sort(function(a, b){
                // weight function
                var keyA = parseFloat(a.hours),
                    keyB = parseFloat(b.hours);
                // Compare the 2 dates
                if(keyA < keyB) return 1;
                if(keyA > keyB) return -1;
                return 0;
            });
        
            var sent = "";
            var actualSave = 0;
            for (var i=0; i<aps.length; i++) {
                var minTime = savedItems[aps[i].appliance];
                if (needSave-actualSave > parseInt(aps[i].power)*(parseFloat(aps[i].hours)-minTime)*parseInt(aps[i].number)) {
                    sent += "Reducing " + (parseFloat(aps[i].hours)-minTime).toString() + " using hour(s) of " + parseInt(aps[i].number).toString() + " " + aps[i].appliance + "(s). ";
                    actualSave += parseInt(aps[i].power)*(parseFloat(aps[i].hours)-minTime)*parseInt(aps[i].number);
                } else {
                    var saveTimes = Math.ceil((needSave-actualSave)/(parseInt(aps[i].power)*parseInt(aps[i].number)));
                    sent += "Reducing " + saveTimes.toString() + " using hour(s) of " + parseInt(aps[i].number).toString() + " " + aps[i].appliance + "(s). ";
                    actualSave += parseInt(aps[i].power)*saveTimes*parseInt(aps[i].number);
                    break;
                }
            }
        
            var actualSaveSent = "You can save " + (actualSave/1000).toString() + " kWhs by: ";
            var displayText = (sent ==="" ||  actualSave < needSave ? "" : actualSaveSent + sent);

            return displayText;
        }
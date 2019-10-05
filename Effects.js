var img_list =document.getElementsByClassName('img');
var i=0;
var k=1000;
var expendables=["Television", "Lights", "Computer", "Fan", "Water Heater"];
var saved_items=[{name:'Television',hours:3},{name:'Lights',hours:3}, {name:'Computer',hours:3},{name:'Fan',hours:3}, {name:'Water Heater',hours:3}];
var save_txt="";
var ap=[];
//CHANGE COLOR OF A INTO COLOR B
function change_Colorr(a,b) {
    var ele=document.getElementById(a);
    ele.style.color=b;
}
//SOMETHING THAT IS USED TO ALERT
function click() {
    var aa=document.getElementById('a').parentNode.nodeName;
    alert(aa);
    alert('ran');
}
//CAUROSEL MOVING LEFT
function next() {
    if (i<img_list.length-1) {
        var one=img_list[i];
        var two=img_list[i+1];
        one.style.display="none";
        two.style.display="block";
        i++;
    } else {
        var one=img_list[i];
        one.style.display="none";
        i=0;
        var two=img_list[i];
        two.style.display="block";
    }
}
//CAUROSEL MOVING RIGHT
function prev() {
    if (i>0) {
        var one=img_list[i];
        var two=img_list[i-1];
        one.style.display="none";
        two.style.display="block";
        i--;
    } else if (i==0) {
        var one=img_list[i];
        one.style.display="none";
        i=img_list.length-1;
        var two=img_list[i];
        two.style.display="block";
    }
}
//ADDING MORE APPLIANCES
function add() {
    var four=document.getElementById('inputt').innerHTML;
    var three=document.getElementById('form');
    three.innerHTML+=four;
    var one=document.getElementsByClassName('plush');
    var two=document.getElementsByClassName('minus');
    //one.parentNode.removeChild(one);
    //two.parentNode.removeChild(two);
    one[one.length-3].style.display='none';
    two[two.length-3].style.display='none';
    var one=document.getElementsByClassName('plush');
    var two=document.getElementsByClassName('minus');
}
//REMOVING MORE APPLIANCES
function delet() {
    var one=document.getElementsByClassName("list_form");
    if (one.length>2){
        var two=one[one.length-2];
        two.parentNode.removeChild(two);
        var three=document.getElementsByClassName('plush');
        var four=document.getElementsByClassName('minus');
        three[three.length-2].style.display='block';
        four[four.length-2].style.display='block';
    }
}
//SHOWING NUMBER OF APPLIANCES
function number() {
    var one=document.getElementById('number-appliances');
    var two=document.getElementsByClassName("list_form");
    one.innerHTML= two.length-1;
    if( two.length-1>1) {
        one.innerHTML+=' APPLIANCES';
    } else {
        one.innerHTML+=' APPLIANCE';
    }
} 
//SHOW SAVING PLANS
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
//SETTING LISTS AND ARRAY
function setup() {
    var listA=[];
    var listP=[];
    var listH=[];
    var list=[];
    var four=document.getElementById('days_in').value;
    var one=document.getElementsByClassName('appliances');
    for (k=0;k<one.length-1;k++) {
    listA[k]=one[k].options[one[k].selectedIndex].value;
    }
    var two=document.getElementsByClassName('power');
    for (k=0;k<two.length-1;k++) {
        listP[k]=two[k].value;
    }
    var three=document.getElementsByClassName('hours');
    for (k=0;k<three.length-1;k++) {
        listH[k]=three[k].value;
    }    
    for (k=0;k<one.length-1;k++) {
        var obj ={
            appliance:listA[k],
            power:listP[k],
            hours:listH[k],
        };
        list.push(obj);
    }
    window.sessionStorage.setItem("list",JSON.stringify(list));
    window.sessionStorage.setItem("days",JSON.stringify(four));
}
//CALCULATING MONEY
function calculate() {
    var kWh=0.0;
    var money=0;
    var month= new Date;
    var list= JSON.parse(sessionStorage.getItem("list"));
    var days= JSON.parse(sessionStorage.getItem("days"));
    for (k=0;k<list.length; k++) {
        kWh+=list[k].power*list[k].hours;
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
//SHOW MONEY
function savings() {
    var money= JSON.parse(sessionStorage.getItem("kWh"));
    var two=money;
    two=money*0.815400000;
    window.sessionStorage.setItem("carbon",JSON.stringify(two));
    var three=document.getElementById('carbon');
    two=Math.round(two);
    two=thousands_separators(two);
    three.innerHTML=two;
    var one=document.getElementById("number");
    money=thousands_separators(money);
    one.innerHTML=money;
}
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
//SET THE SAVINGS
//10% DEL
function mon10(a){
    var a=JSON.parse(sessionStorage.getItem("money"));
    a=a*0.01;
    alert(a);

}
//20% DEL
function mon20(a){
    var a=JSON.parse(sessionStorage.getItem("money"));
    a=a*0.02;
    alert(a);

}
//30% DEL
function mon30(a){
    var a=JSON.parse(sessionStorage.getItem("money"));
    a=a*0.03;
    alert(a);

}
//FIND THE NUMBER OF EXPENDABLE APPLIANCES
function expen() {
    ap=[];
    var one=JSON.parse(sessionStorage.getItem('list'));
    for(j=0;j<one.length; j++){//CHECK IN LIST
        for(h=0;h<expendables.length;h++) {//CHECK IN EXPENDIBLES
            if (one[j].appliance==expendables[h]) {
                ap.push(one[j].appliance);
            }
        }
    }
}
//CALCUALTE
function sa(a){
    var one=0.0;
    save_txt="";
    var days= JSON.parse(sessionStorage.getItem("days"));
    if(a=="20%"){
        var one=JSON.parse(sessionStorage.getItem("kWh"));
        one=one/days;
        one=one*0.02;
    } else if (a=="10%") {
        var one=JSON.parse(sessionStorage.getItem("kWh"));
        one=one/days;
        one=one*0.01;

    } else if (a=="30%") {
        var one=JSON.parse(sessionStorage.getItem("kWh"));
        one=one/days;

        one=one*0.03;

    }
    expen();
    one=one/ap.length;
    var two=JSON.parse(sessionStorage.getItem('list'));
    for (j=0; j<ap.length; j++) {//CHECK THE ORIGINAL LENGTH
        for(k=0; k<two.length; k++) {//CHECK THE LIST OF EXPENDABLES
            if(two[k].appliance==ap[j]) {//SAME APPLIANCE
                for(h=0; h<saved_items.length; h++) {//CHECK THE LISTS OF MINIMUM USAGE
                    if(saved_items[h].name==ap[j]) {//SAME APPLIACES
                        if(one<two[k].power*two[k].hours && two[k].hours-(one/two[k].power)>saved_items[h].hours) {
                                //IF THE INTENDENT NUMBER OF HOURS IS SMALLER THAN WHAT IS ABOUT THE BE DELETED
                                //IF THE INTENDENT NUMBER OF HOURS IS LARGER THAN THE MINIMUN POWER DELETED
                                var three=two[k].hours-(one/two[k].power);//HOURS LEFT AFTER REDUCTION
                                save_txt+=JSON.stringify(ap[k]);
                                save_txt+=" usage can be decreased to ";
                                save_txt+=JSON.stringify(three);
                                save_txt+= " hour(s)";
                        } else if (two[k].hours-(one/two[k].power)<saved_items[h].hours && two[k].hours-(one/two[k].power)>0) {
                            var three=two[k].hours-(one/two[k].power);//HOURS LEFT AFTER REDUCTION
                            save_txt+=JSON.stringify(ap[h]);
                            save_txt+=" usage can be decreased to ";
                            save_txt+=JSON.stringify(three);
                            save_txt+= " hour(s), however, it may not be sufficient for your use. ";
                        } else if (two[k].hours-(one/two[k].power)<0 &&two[k].hours-(one/two[k].power==0)) {
                            save_txt+="";
                        }
                    
                        }
                    }
                }
                }
            }
        }

//SELECTED PERCENTAGE
function show_per(a){
        sa(a);
        var one=document.getElementById(a+"-text");
        if (save_txt!="") {
            one.innerHTML=save_txt;
        } else {
            one.innerHTML="You can't decrease your energy any further."
        }
        
}


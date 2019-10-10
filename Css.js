var img_list =document.getElementsByClassName('img');
var i=0;
var k=1000;
var expendables=["Television", "Lights", "Computer", "Fan", "Water Heater"];
var saved_items=[{name:'Television',hours:1},{name:'Lights',hours:2}, {name:'Computer',hours:3},{name:'Air Condition',hours:4}, {name:'Water Heater',hours:0}];
var save_txt="";
var ap=[];
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
    var three=document.getElementById('form');
    var four=document.getElementsByClassName('inputt');
    var five=four[four.length-1].cloneNode(true);
    three.appendChild(five);
    var one=document.getElementsByClassName("inputt");
    one[one.length-2].style.display="block";
    // var four=document.getElementsByClassName('minus');
    // four[four.length-2].style.display='none';

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
        if (one.length!=2){
            four[four.length-2].style.display='none';
        }
    }
}
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


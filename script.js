console.log('works');

function sendMail(params){
  alert("Your email has been sent. Thank You");

  var tempParam = {
       from_name: document.getElementById("Personname").value,
       to_name: "kushal",
       message: document.getElementById("msg").value,
       theirEmail: document.getElementById("Emails").value,
       phone: document.getElementById("PhoneNum").value,
       subject: document.getElementById("subj").value,
  };
 

  emailjs.send('service_6yid0ao', 'template_9t7dq8r', tempParam)
 
  //emailjs.send(serviceID, templateID, templateParams, userID);
  //ids are listed below for phone, email
  //phone = PhoneNum
  //email = Emails
  //subject = subj
}

//linking the git1 to github files page 
function git1(){
  window.open('https://github.com/mr7888/FPGA-game-using-ps2-keyboard-and-joystick'); 
}

//linking demo 1 to the youtube video 
function demo1(){
  window.open('https://youtu.be/ZjYfLIouJn0'); 
}

//links to hospital project with java
function git2(){
  window.open('https://github.com/mr7888/Hospital-Record-Keeping-program-Java/find/main'); 
}

//links to simon game with mips 32
function git3(){
  window.open('https://github.com/mr7888/Simon-Game-MIPS-32-/find/main'); 
}

function git4(){ //add the arduino code to git, demo on youtube 
  window.open('https://github.com/KushalKharell/Arduino-self-driving-car-'); 
}

//links to pdf version of resume 
function pdfResume(){
  res = "ActualResume.pdf"
  window.open('https://drive.google.com/file/d/1I_4Lxi2ufrEFQcD6s0EE-cZXmHtnlx-I/view?usp=sharing'); 
}

function demo2(){
  window.open('https://drive.google.com/file/d/1FKk8YS_75CzmjMPBWzyD2zW7-q7o0JPo/view?usp=sharing'); 
}
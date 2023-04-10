var completeListOfStudents;
document.getElementById('retryArea').style.display="none";

function login() {
  const dept_id=document.getElementById('dept_id').value;
  const password=document.getElementById('password').value;
  const url=`https://fram-backend.onrender.com/login?dept_id=${dept_id}&password=${password}`;
  
  document.getElementById('loginArea').style.display="none";
  document.getElementById('loadingArea').style.display="block";

  axios.get(url).then(
    (response_one)=>{
      if(response_one.data.status=="200")
      {
        const url2=`https://fram-backend.onrender.com/fetch_student?dept_id=${dept_id}`;
        axios.get(url2).then(
          (response_two)=>{
            completeListOfStudents=response_two.data.data;
            document.getElementById('loadingArea').style.display="none";
            document.getElementById('container').style.display="none";
            document.getElementById('fileUploadArea').style.display="flex";
            // document.getElementById('success-msg').style.display="none";
           document.getElementById('retryArea').style.display="none"; 
          }
        )
      }
      else
      {
        document.getElementById('loadingArea').style.display="none";
        document.getElementById('wrongPasswordArea').style.display="block";

      }
    }
  )
}


// if password entered wrong then go back to login page

const backButton = document.getElementById("back-btn");
const dept = document.getElementById("loginArea");
const wrongPasswordArea = document.getElementById("wrongPasswordArea");

backButton.addEventListener('click',function(){
   if(wrongPasswordArea.style.display=="block"){
      dept.style.display="block";
      wrongPasswordArea.style.display="none";
  }
})

// after entering class details marking attendance



function submit(){
  const listOfStudentsFromImage=document.getElementById('attendancelist').innerHTML.split(",");
  
  var present = "";
  var students="";

  //for students who are present
  for(var i=0;i<listOfStudentsFromImage.length;i++){
    if(completeListOfStudents.indexOf(listOfStudentsFromImage[i])!=-1){
      present = present+"Y,";
      students=students+listOfStudentsFromImage[i]+",";
    }
  }

  //for students who are absent
  for(var i=0;i<completeListOfStudents.length;i++){
    if(listOfStudentsFromImage.indexOf(completeListOfStudents[i])==-1){
      present = present+"N,";
      students = students+completeListOfStudents[i]+","
    }
  }
  
  present = present.substring(0,present.length-1);
  students = students.substring(0,students.length-1);
  var date = document.getElementById('class-date').value;
  var clsName = document.getElementById('class-name').value;
  
  const url = `https://fram-backend.onrender.com/allot_attendance?present=${present}&students=${students}&class_name=${clsName}&date=${date}`;
  axios.post(url).then(res=>{
      if(res.status===200){
        console.log("success");
        document.getElementById('formArea').style.display="none";
        // document.getElementsByTagName('.fa-beat').style.display="block";
        document.getElementById('success-msg').textContent="Attendance marked";
      }
      else{
        document.getElementById('retryArea').style.display="block";
        document.getElementById('success-msg').style.display="none";
        document.getElementById('fileUploadArea').style.display="none";

      }
  })
  console.log(listOfStudentsFromImage);
  console.log(completeListOfStudents);
}

// if api calling failed then retry button functionality

const retry= document.getElementById('retry');
retry.addEventListener('click',function(){
    document.getElementById('fileUploadArea').style.display="flex";
    document.getElementById('retryArea').style.display="none";
  
}) 
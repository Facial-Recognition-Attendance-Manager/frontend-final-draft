var completeListOfStudents;
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



const backButton = document.getElementById("back-btn");
const dept = document.getElementById("loginArea");
const wrongPasswordArea = document.getElementById("wrongPasswordArea");

backButton.addEventListener('click',function(){
   if(wrongPasswordArea.style.display=="block"){
      dept.style.display="block";
      wrongPasswordArea.style.display="none";
  }
})

function submit(){
  const listOfStudentsFromImage=document.getElementById('attendancelist').innerHTML.split(",");
  console.log(listOfStudentsFromImage);
  console.log(completeListOfStudents);
}
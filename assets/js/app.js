const uploadBtn = document.getElementById("upload-btn");
const fileInput = document.getElementById("file-input");
const imgPreview = document.getElementById("img-preview");
uploadBtn.addEventListener("click", () => {
  fileInput.click();
});
fileInput.addEventListener("change", () => {
  const file = fileInput.files[0];
  const reader = new FileReader();

  reader.addEventListener("load", () => {
    imgPreview.src = reader.result;
    imgPreview.style.display = "block";
  });

  reader.readAsDataURL(file);
});

function login() {
  const dept_id=document.getElementById('dept_id').value;
  const password=document.getElementById('password').value;
  const url=`https://fram-backend.onrender.com/login?dept_id=${dept_id}&password=${password}`;
  
  document.getElementById('loginArea').style.display="none";
  document.getElementById('loadingArea').style.display="block";

  axios.get(url).then(
    (response_one)=>{
      console.log(response_one.data);
      if(response_one.data.status=="200")
      {
        document.getElementById('loadingArea').style.display="none";
        document.getElementById('container').style.display="none";
        document.getElementById('fileUploadArea').style.display="flex";
      }
      else
      {
        document.getElementById('loadingArea').style.display="none";
        document.getElementById('wrongPasswordArea').style.display="block";
      }
    }
  )
}
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

const icon = '<i class="fa-solid fa-caret-right icon "></i>';

for(let i = 1 ; i<=2 ; i++){

  document.getElementById("inp"+i).addEventListener("focus", () => {
    document.getElementById("lInp"+i).classList.add("lable");
    let A = document.getElementById("lInp"+i).innerHTML;
    let subStr = icon;
    document.getElementById("lInp"+i).innerHTML = !A.includes(subStr)
      ? icon + "" + A
      : A;
  });

  document.getElementById("inp"+i).addEventListener("blur", (e) => {
    e.target.value === "" &&
      document.getElementById("lInp"+i).classList.remove("lable");
    let A = document.getElementById("lInp"+i).innerHTML;
    let subStr = icon;

    if (A.includes(subStr) && e.target.value === "") {
      X = A.split(subStr);
      document.getElementById("lInp"+i).innerHTML = X[1];
    }
  });

}
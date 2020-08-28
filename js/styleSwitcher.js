let links = document.querySelectorAll(".alternate_style"),
  totalLinks = links.length,
  iconSetting = document.querySelector(".toggle_style_switcher"),
  bgBody = document.querySelectorAll(".body_bg"),
  totalBgBody = bgBody.length;
// console.log(links);
function setActiveStyle(colors) {
  for (let i = 0; i < totalLinks; i++) {
    // console.log(links[i].getAttribute("title"))
    if (colors === links[i].getAttribute("title")) {
      links[i].removeAttribute("disabled");
    } else {
      links[i].setAttribute("disabled", "true");
    }
  }
}
// background body


for(let i = 0; i < totalBgBody; i++){
  bgBody[i].addEventListener("change",function(){
    console.log(this);
    if(this.value === "dark"){
      // document.body.classList.add("dark");
      document.body.className = "dark";
    }else{
      document.body.classList.remove("dark");
    }
  })
}

iconSetting.addEventListener("click",() => {
    document.querySelector(".style_switcher").classList.toggle("open");
});

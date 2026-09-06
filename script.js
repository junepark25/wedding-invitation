const opening=document.getElementById("opening");
document.getElementById("openInvitation").addEventListener("click",()=>opening.classList.add("hidden"));
document.getElementById("openingX").addEventListener("click",()=>opening.classList.add("hidden"));

const panel=document.getElementById("menuPanel");
document.getElementById("menuButton").addEventListener("click",()=>{panel.classList.add("open");panel.setAttribute("aria-hidden","false")});
document.getElementById("menuX").addEventListener("click",closeMenu);
panel.querySelectorAll("a").forEach(a=>a.addEventListener("click",closeMenu));
function closeMenu(){panel.classList.remove("open");panel.setAttribute("aria-hidden","true")}

document.getElementById("rsvpForm").addEventListener("submit",(e)=>{
  e.preventDefault();
  document.getElementById("formNote").textContent="템플릿 단계이므로 아직 전송되지 않습니다. 추후 RSVP 저장 기능을 연결합니다.";
});

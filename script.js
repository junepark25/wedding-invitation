const opening=document.getElementById('opening');
document.getElementById('openInvitation').onclick=()=>opening.classList.add('hidden');
document.getElementById('openingClose').onclick=()=>opening.classList.add('hidden');

const menu=document.getElementById('menuLayer');
document.getElementById('menuButton').onclick=()=>menu.classList.add('open');
document.getElementById('menuClose').onclick=closeMenu;
menu.querySelectorAll('a').forEach(a=>a.onclick=closeMenu);
function closeMenu(){menu.classList.remove('open')}

const box=document.getElementById('lightbox'), boxImg=document.getElementById('lightboxImage');
document.querySelectorAll('.gallery-item').forEach(btn=>btn.onclick=()=>{
  boxImg.src=btn.dataset.full; box.classList.add('open');
});
document.getElementById('lightboxClose').onclick=()=>box.classList.remove('open');
box.onclick=e=>{if(e.target===box)box.classList.remove('open')};

document.getElementById('rsvpForm').onsubmit=e=>{
  e.preventDefault();
  document.getElementById('formNote').textContent='현재는 디자인 템플릿 단계라 아직 전송되지 않습니다.';
};
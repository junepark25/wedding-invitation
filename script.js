
const opening = document.getElementById('opening');
document.getElementById('openInvitation').addEventListener('click',()=>opening.classList.add('hidden'));
document.getElementById('openingClose').addEventListener('click',()=>opening.classList.add('hidden'));

const menu = document.getElementById('menuLayer');
document.getElementById('menuButton').addEventListener('click',()=>{
  menu.classList.add('open'); menu.setAttribute('aria-hidden','false');
});
document.getElementById('menuClose').addEventListener('click',closeMenu);
menu.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeMenu));
function closeMenu(){menu.classList.remove('open');menu.setAttribute('aria-hidden','true');}

document.querySelectorAll('[data-slider]').forEach(slider=>{
  const slides=[...slider.querySelectorAll('.slide')];
  let index=0;
  const current=slider.querySelector('.current');
  const total=slider.querySelector('.total');
  total.textContent=slides.length;
  function show(i){
    index=(i+slides.length)%slides.length;
    slides.forEach((s,n)=>s.classList.toggle('active',n===index));
    current.textContent=index+1;
  }
  slider.querySelector('.slider-prev').addEventListener('click',()=>show(index-1));
  slider.querySelector('.slider-next').addEventListener('click',()=>show(index+1));
});

document.getElementById('rsvpForm').addEventListener('submit',e=>{
  e.preventDefault();
  document.getElementById('formNote').textContent='현재는 템플릿 단계라 전송되지 않습니다. 추후 저장 기능을 연결합니다.';
});

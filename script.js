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



// V10 Account copy
(function(){
  const toast=document.getElementById('copyToast');
  document.querySelectorAll('.account-copy').forEach(btn=>{
    btn.addEventListener('click',async()=>{
      const account=btn.dataset.account||'';
      const bank=btn.dataset.bank||'';
      const holder=btn.dataset.holder||'';
      if(account.includes('입력해 주세요')){
        if(toast) toast.textContent=`${holder} 계좌번호를 index.html에 입력해 주세요.`;
        return;
      }
      try{
        await navigator.clipboard.writeText(account);
      }catch(e){
        const ta=document.createElement('textarea');
        ta.value=account; document.body.appendChild(ta); ta.select();
        document.execCommand('copy'); ta.remove();
      }
      if(toast) toast.textContent=`${holder} ${bank} 계좌번호가 복사되었습니다.`;
    });
  });
})();


// =========================================================
// V10.4 Flip countdown — Korea wedding 2026-10-10 11:30 KST
// =========================================================
(function(){
  const target = new Date('2026-10-10T11:30:00+09:00').getTime();

  const units = {
    days: {
      top: document.getElementById('cd-days-top'),
      bottom: document.getElementById('cd-days-bottom'),
      card: document.querySelector('.flip-card[data-unit="days"]')
    },
    hours: {
      top: document.getElementById('cd-hours-top'),
      bottom: document.getElementById('cd-hours-bottom'),
      card: document.querySelector('.flip-card[data-unit="hours"]')
    },
    minutes: {
      top: document.getElementById('cd-minutes-top'),
      bottom: document.getElementById('cd-minutes-bottom'),
      card: document.querySelector('.flip-card[data-unit="minutes"]')
    },
    seconds: {
      top: document.getElementById('cd-seconds-top'),
      bottom: document.getElementById('cd-seconds-bottom'),
      card: document.querySelector('.flip-card[data-unit="seconds"]')
    }
  };

  if(!units.days.top) return;

  const previous = {};
  const pad = n => String(n).padStart(2,'0');

  function setUnit(name, value){
    const u = units[name];
    if(!u || !u.top || !u.bottom) return;
    if(previous[name] !== value){
      u.card.classList.remove('flipping');
      void u.card.offsetWidth;
      u.card.classList.add('flipping');
      u.top.textContent = value;
      u.bottom.textContent = value;
      previous[name] = value;
    }
  }

  function tick(){
    let diff = target - Date.now();
    if(diff <= 0){
      setUnit('days','00');
      setUnit('hours','00');
      setUnit('minutes','00');
      setUnit('seconds','00');
      return;
    }
    const days = Math.floor(diff / 86400000); diff %= 86400000;
    const hours = Math.floor(diff / 3600000); diff %= 3600000;
    const minutes = Math.floor(diff / 60000); diff %= 60000;
    const seconds = Math.floor(diff / 1000);

    setUnit('days', String(days));
    setUnit('hours', pad(hours));
    setUnit('minutes', pad(minutes));
    setUnit('seconds', pad(seconds));
  }

  tick();
  setInterval(tick,1000);
})();

// =========================================================
// V10.4 Guestbook — local browser storage
// Static GitHub Pages has no shared database.
// =========================================================
(function(){
  const form = document.getElementById('messageForm');
  const list = document.getElementById('messageList');
  const nameInput = document.getElementById('messageName');
  const textInput = document.getElementById('messageText');
  if(!form || !list || !nameInput || !textInput) return;

  const KEY = 'wedding_guestbook_v1';

  function escapeHtml(str){
    return str.replace(/[&<>"']/g, ch => ({
      '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'
    })[ch]);
  }

  function loadMessages(){
    try{
      return JSON.parse(localStorage.getItem(KEY) || '[]');
    }catch(e){
      return [];
    }
  }

  function saveMessages(messages){
    localStorage.setItem(KEY, JSON.stringify(messages));
  }

  function render(){
    const messages = loadMessages();
    if(!messages.length){
      list.innerHTML = '<p class="message-empty">아직 축하 메시지가 없습니다.</p>';
      return;
    }
    list.innerHTML = messages.slice().reverse().map(item => `
      <article class="message-card">
        <div class="message-card-head">
          <span class="message-card-name">${escapeHtml(item.name)}</span>
          <span class="message-card-date">${escapeHtml(item.date)}</span>
        </div>
        <p class="message-card-text">${escapeHtml(item.text)}</p>
      </article>
    `).join('');
  }

  form.addEventListener('submit', e => {
    e.preventDefault();
    const name = nameInput.value.trim();
    const text = textInput.value.trim();
    if(!name || !text) return;

    const now = new Date();
    const date = now.toLocaleDateString('ko-KR', {
      year:'numeric', month:'2-digit', day:'2-digit'
    });

    const messages = loadMessages();
    messages.push({name, text, date});
    saveMessages(messages);

    form.reset();
    render();
  });

  render();
})();

(() => {
 'use strict';
 const toggle=document.querySelector('.menu-toggle'),nav=document.querySelector('#navigation');
 function menu(open){toggle.setAttribute('aria-expanded',String(open));nav.classList.toggle('open',open);}
 toggle.addEventListener('click',()=>menu(toggle.getAttribute('aria-expanded')!=='true'));
 nav.addEventListener('click',event=>{if(event.target.closest('a'))menu(false)});
 document.addEventListener('keydown',event=>{if(event.key==='Escape'){const open=toggle.getAttribute('aria-expanded')==='true';menu(false);if(open)toggle.focus()}});
 const tabs=[...document.querySelectorAll('.screen-tabs [role=tab]')],panel=document.querySelector('#screen-panel'),image=document.querySelector('#screen-image'),caption=document.querySelector('#screen-caption');
 function select(tab){tabs.forEach(item=>{item.setAttribute('aria-selected',String(item===tab));item.tabIndex=item===tab?0:-1});panel.setAttribute('aria-labelledby',tab.id);image.src='assets/'+tab.dataset.image;image.alt=tab.dataset.alt;caption.textContent=tab.dataset.caption;}
 tabs.forEach((tab,index)=>{tab.addEventListener('click',()=>select(tab));tab.addEventListener('keydown',event=>{let next;if(event.key==='ArrowRight')next=(index+1)%tabs.length;else if(event.key==='ArrowLeft')next=(index+tabs.length-1)%tabs.length;else if(event.key==='Home')next=0;else if(event.key==='End')next=tabs.length-1;else return;event.preventDefault();tabs[next].focus();select(tabs[next])})});
})();

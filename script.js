const gallery=document.querySelector('.hover-gallery');
const projects=document.querySelectorAll('.project');
const media={
 orange:[['IMG_6828%20%281%29.jpg','img'],['IMG_9281.jpg','img'],['IMG_9718.jpg','img']],
 grass:[['Spritt_e.jpg','img']],
 moss:[['Untitled%20design%20%282%29.mp4','video']],
 money:[['Screenshot%202026-08-20%20at%2018.53.21.png','img'],['Screenshot%202026-08-20%20at%2018.53.28.png','img']]
};
function showProject(key){
 if(!gallery)return;
 gallery.innerHTML='';
 (media[key]||[]).forEach((item,i)=>{
   const el=item[1]==='video'?document.createElement('video'):document.createElement('img');
   el.className='floating-media';
   el.src=item[0];
   el.style.left=(46+i*13)+'%';
   el.style.top=(15+i*19)+'%';
   el.style.setProperty('--r',`${i%2?-3:3}deg`);
   if(item[1]==='video'){el.autoplay=true;el.muted=true;el.loop=true;el.playsInline=true;el.classList.add('v')}
   gallery.appendChild(el);
 });
}
projects.forEach(p=>{
 p.addEventListener('mouseenter',()=>{projects.forEach(x=>x.classList.remove('active'));p.classList.add('active');showProject(p.dataset.project)});
});
showProject('orange');

const entry=document.querySelector('.entry');
const cursorText=document.querySelector('.entry-cursor-text');
if(entry&&cursorText&&window.matchMedia('(pointer:fine)').matches){
 entry.addEventListener('pointermove',e=>{cursorText.style.display='block';cursorText.style.left=(e.clientX+16)+'px';cursorText.style.top=(e.clientY+16)+'px'});
 entry.addEventListener('pointerleave',()=>cursorText.style.display='none');
}

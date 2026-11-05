/* TLL-figur: vis stillbilde, animer én gang per nettleserøkt når GIF finnes. */
(()=>{
 const reduced=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
 const still='/assets/tll-figur-stillbilde.webp';
 const animated='/assets/TLL-figur-uten-ring.gif';
 document.querySelectorAll('[data-tll-figur]').forEach((el,index)=>{
  const media=el.querySelector('.tll-figur__media');if(!media)return;
  const img=new Image();img.alt='Jarle i TLL-jakke på lager';img.width=104;img.height=104;img.decoding='async';img.loading='lazy';
  img.onload=()=>{media.replaceChildren(img);if(reduced)return;
   let played=false;try{played=sessionStorage.getItem('tll-figur-played')==='1'}catch(e){}
   if(played||index>0)return;
   const anim=new Image();anim.alt=img.alt;anim.width=104;anim.height=104;anim.decoding='async';
   anim.onload=()=>{media.replaceChildren(anim);try{sessionStorage.setItem('tll-figur-played','1')}catch(e){}
    window.setTimeout(()=>{if(media.contains(anim))media.replaceChildren(img)},1800);
   };anim.src=animated;
  };img.onerror=()=>{};img.src=still;
 });
})();

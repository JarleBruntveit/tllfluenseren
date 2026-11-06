/* TLL-figur: GIF kan brukes også når eget WebP-stillbilde mangler. */
(()=>{
 const animated='/assets/TLL-figur-uten-ring.gif';
 const still='/assets/tll-figur-stillbilde.webp';
 const reduced=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
 document.querySelectorAll('[data-tll-figur]').forEach((el,index)=>{
  const media=el.querySelector('.tll-figur__media');if(!media)return;
  const fallback=()=>{
   const source=new Image();source.alt='TLLfluenseren i lageromgivelser';source.width=104;source.height=104;
   source.onload=()=>{
    const canvas=document.createElement('canvas');canvas.width=104;canvas.height=104;
    canvas.setAttribute('role','img');canvas.setAttribute('aria-label',source.alt);
    const ctx=canvas.getContext('2d');if(ctx){ctx.drawImage(source,0,0,104,104);media.replaceChildren(canvas)}
    if(reduced)return;
    let played=false;try{played=sessionStorage.getItem('tll-figur-played')==='1'}catch(e){}
    if(played||index!==0)return;
    const motion=new Image();motion.alt=source.alt;motion.width=104;motion.height=104;
    motion.onload=()=>{media.replaceChildren(motion);try{sessionStorage.setItem('tll-figur-played','1')}catch(e){};
     window.setTimeout(()=>{if(media.contains(motion))media.replaceChildren(canvas)},1800);
    };motion.src=animated+'?play=1';
   };source.src=animated;
  };
  const poster=new Image();poster.alt='TLLfluenseren i lageromgivelser';poster.width=104;poster.height=104;
  poster.onload=()=>{media.replaceChildren(poster);if(reduced)return;
   let played=false;try{played=sessionStorage.getItem('tll-figur-played')==='1'}catch(e){}
   if(played||index!==0)return;
   const motion=new Image();motion.alt=poster.alt;motion.width=104;motion.height=104;
   motion.onload=()=>{media.replaceChildren(motion);try{sessionStorage.setItem('tll-figur-played','1')}catch(e){};
    window.setTimeout(()=>{if(media.contains(motion))media.replaceChildren(poster)},1800);
   };motion.src=animated;
  };poster.onerror=fallback;poster.src=still;
 });
})();

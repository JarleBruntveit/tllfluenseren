// Cloudflare Worker backend for TLL-assistenten.
// Secrets: OPENAI_API_KEY; optional ALLOWED_ORIGIN (default https://tllfluenseren.no).
const MAX_LENGTH=700;
export default {
 async fetch(request,env) {
  const origin=env.ALLOWED_ORIGIN||"https://tllfluenseren.no";
  const headers={"Access-Control-Allow-Origin":origin,"Access-Control-Allow-Methods":"POST, OPTIONS","Access-Control-Allow-Headers":"Content-Type","Content-Type":"application/json; charset=utf-8","Vary":"Origin","Cache-Control":"no-store"};
  if(request.method==="OPTIONS")return new Response(null,{status:204,headers});
  if(new URL(request.url).pathname!=="/api/chat"||request.method!=="POST")return new Response(JSON.stringify({error:"Not found"}),{status:404,headers});
  if(request.headers.get("Origin")!==origin)return new Response(JSON.stringify({error:"Origin not allowed"}),{status:403,headers});
  if(!env.OPENAI_API_KEY)return new Response(JSON.stringify({error:"API is not configured"}),{status:503,headers});
  try {
   const body=await request.json(), question=body.question,topic=body.topic,level=body.level;
   if(typeof question!=="string"||!question.trim()||question.length>MAX_LENGTH||!["truck","lager","transport","hms"].includes(topic)||!["enkel","vanlig","avansert"].includes(level))return new Response(JSON.stringify({error:"Ugyldig spørsmål"}),{status:400,headers});
   const instruction="Du er TLL-assistenten for VG2 Transport, logistikk og løfteoperasjoner. Svar på norsk bokmål. Bruk et praktisk og støttende språk. Tilpass nivået: "+level+". Tema: "+topic+". Still gjerne ett kontrollspørsmål. Ikke finn på kildehenvisninger eller påstå å ha lest nettsider. Ikke be om elevnavn eller sensitive opplysninger. For risikofylt truckkjøring: understrek gjeldende opplæring, sikkerhetsrutiner og instruktørens ansvar. Ikke gi vurderinger eller karakterer.";
   const response=await fetch("https://api.openai.com/v1/responses",{method:"POST",headers:{"Authorization":"Bearer "+env.OPENAI_API_KEY,"Content-Type":"application/json"},body:JSON.stringify({model:env.OPENAI_MODEL||"gpt-4.1-mini",instructions:instruction,input:question,max_output_tokens:450,store:false})});
   if(!response.ok)return new Response(JSON.stringify({error:"KI-tjenesten er midlertidig utilgjengelig"}),{status:502,headers});
   const data=await response.json();
   const answer=(data.output||[]).flatMap(o=>o.content||[]).filter(c=>c.type==="output_text").map(c=>c.text).join("\n").trim();
   return new Response(JSON.stringify({answer:answer||"Jeg fikk ikke laget et svar. Prøv igjen."}),{headers});
  } catch {return new Response(JSON.stringify({error:"Kunne ikke behandle forespørselen"}),{status:400,headers});}
 }
};

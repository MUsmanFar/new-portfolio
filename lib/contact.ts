export type ContactDetails={name:string;email:string;growth_call:string;timeline:string;message:string};
// Web3Forms access keys are public browser form identifiers, not private API secrets.
export async function submitContact(details:ContactDetails, request:typeof fetch=fetch){
 const response=await request('https://api.web3forms.com/submit',{
  method:'POST',headers:{'Content-Type':'application/json',Accept:'application/json'},
  signal:AbortSignal.timeout(20000),
  body:JSON.stringify({...details,access_key:'ee364713-6bed-4680-9d13-beaebe42c587',subject:'New portfolio project enquiry',from_name:'Usman Farooqi Portfolio',botcheck:false})
 });
 const result=await response.json();
 if(!response.ok||result.success!==true)throw new Error('Your message could not be sent. Please try again, or email me directly.');
}

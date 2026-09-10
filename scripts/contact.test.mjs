import test from 'node:test';
import assert from 'node:assert/strict';
import {submitContact} from '../lib/contact.ts';
const details={name:'Test Visitor',email:'test@example.com',growth_call:'Build a new website',timeline:'Within 1–3 months',message:'A test enquiry that is never transmitted.'};
test('sends approved fields and only accepts confirmed success',async()=>{let calls=0;await submitContact(details,async(url,options)=>{calls++;assert.equal(url,'https://api.web3forms.com/submit');assert.equal(options.method,'POST');const body=JSON.parse(options.body);for(const key of Object.keys(details))assert.equal(body[key],details[key]);assert.equal(body.botcheck,false);assert.ok(body.access_key);return new Response(JSON.stringify({success:true}),{status:200})});assert.equal(calls,1)});
test('rejects provider failures even with HTTP 200',async()=>{await assert.rejects(submitContact(details,async()=>new Response(JSON.stringify({success:false}),{status:200})))});
test('rejects HTTP errors and malformed responses',async()=>{await assert.rejects(submitContact(details,async()=>new Response(JSON.stringify({success:true}),{status:429})));await assert.rejects(submitContact(details,async()=>new Response('invalid')))});
test('does not convert network failure into success',async()=>{await assert.rejects(submitContact(details,async()=>{throw new TypeError('Network unavailable')}))});

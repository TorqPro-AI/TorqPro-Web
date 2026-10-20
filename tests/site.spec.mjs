import { test, expect } from '@playwright/test';
import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { resolve, extname } from 'node:path';
let server;
const types={'.html':'text/html; charset=utf-8','.png':'image/png','.js':'application/javascript'};
test.beforeAll(async()=>{server=createServer(async(req,res)=>{try{const path=decodeURIComponent(new URL(req.url,'http://127.0.0.1').pathname);const safe=path==='/'?'index.html':path.replace(/^\/+/, '');if(safe.includes('..'))throw Error('Invalid path');const data=await readFile(resolve(process.cwd(),safe));res.writeHead(200,{'Content-Type':types[extname(safe)]||'application/octet-stream'});res.end(data)}catch(e){res.writeHead(404);res.end('Not found')}});await new Promise(ok=>server.listen(43891,'127.0.0.1',ok))});
test.afterAll(async()=>{if(server)await new Promise(ok=>server.close(ok))});
for(const width of [390,768,1280,1440]){
 test('landing and engineering layout at '+width,async({page})=>{await page.setViewportSize({width,height:850});await page.goto('http://127.0.0.1:43891/index.html');await expect(page.locator('h1')).toBeVisible();expect(await page.evaluate(()=>document.documentElement.scrollWidth)).toBeLessThanOrEqual(width+1);await page.goto('http://127.0.0.1:43891/engineering.html');await expect(page.locator('#plot')).toBeVisible();expect(await page.evaluate(()=>document.documentElement.scrollWidth)).toBeLessThanOrEqual(width+1)});
}
test('language, controls, chart and stepper',async({page})=>{await page.goto('http://127.0.0.1:43891/engineering.html');await page.getByRole('button',{name:'TR',exact:true}).click();await expect(page.locator('h1')).toContainText('Mühendislik netliği');await page.locator('#torque').evaluate(el=>{el.value='100';el.dispatchEvent(new Event('input',{bubbles:true}))});await page.locator('#factor').evaluate(el=>{el.value='0.15';el.dispatchEvent(new Event('input',{bubbles:true}))});await expect(page.locator('#metric-preload')).toHaveText('55.6 kN');await page.locator('[data-stage="2"]').click();await expect(page.locator('#stage-description')).toContainText('basma kuvveti');await page.getByRole('button',{name:'EN',exact:true}).click();await expect(page.locator('#stage-description')).toContainText('compression');});
test('existing screenshots load',async({page})=>{await page.goto('http://127.0.0.1:43891/index.html');for(const name of ['torqpro-dashboard.png','torque-recommendation.png','vdi2230-analysis.png']){const img=page.locator('img[src="./'+name+'"]');await img.scrollIntoViewIfNeeded();await expect.poll(()=>img.evaluate(el=>el.complete&&el.naturalWidth>0)).toBe(true)}});


test('homepage navigation to engineering and language persistence', async ({page})=>{
 await page.setViewportSize({width:390,height:844});
 await page.goto('http://127.0.0.1:43891/index.html');
 await page.locator('.menu-toggle').click();
 await expect(page.locator('.nav-links')).toHaveClass(/open/);
 await page.locator('.nav-links [href="./engineering.html"]').click();
 await expect(page).toHaveURL(/engineering\.html$/);
 await page.getByRole('button',{name:'TR',exact:true}).click();
 await page.goto('http://127.0.0.1:43891/index.html');
 await expect(page.locator('h1')).toContainText('Kritik cıvatalı bağlantılar');
});
test('plot stays within SVG for supported inputs',async({page})=>{
 await page.goto('http://127.0.0.1:43891/engineering.html');
 for(const [t,k] of [[10,.12],[150,.12],[150,.30],[60,.20]]){
  await page.locator('#torque').evaluate((el,v)=>{el.value=String(v);el.dispatchEvent(new Event('input',{bubbles:true}))},t);
  await page.locator('#factor').evaluate((el,v)=>{el.value=String(v);el.dispatchEvent(new Event('input',{bubbles:true}))},k);
  const point=await page.locator('#point').evaluate(el=>({x:Number(el.getAttribute('cx')),y:Number(el.getAttribute('cy'))}));
  expect(point.x).toBeGreaterThanOrEqual(65);
  expect(point.x).toBeLessThanOrEqual(815);
  expect(point.y).toBeGreaterThanOrEqual(40);
  expect(point.y).toBeLessThanOrEqual(304);
 }
});

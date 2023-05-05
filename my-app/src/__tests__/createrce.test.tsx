import 'jest-puppeteer';
import payloads from './payloadsrce.json';
import fs from 'fs';

describe('Blog post rce test', () => {
  let payloadArray : string[][] = [];
  let results : {}[] = [];


    for(let index = 0; index < payloads.length; index++){
      try{
        if(payloadArray.length === 500){
          break;
        }
        let payloadJson = JSON.parse(payloads[index]);
        payloadArray.push([payloadJson.payload, payloadJson.category]);
      }catch(exception){
        console.info("Invalid json payload");
      }
    }
  
  

  it.each(payloadArray)('Testing with payload %s from category %s', async (payload: string, category: string) => {
      await page.goto('http://localhost:3000/create');
      await page.click('.form_input__email');
      await page.type('input[type=email]',"dattu046@gmail.com");
      await page.click('.form_input__textbox');
      await page.type('textarea', payload);
      await page.click('[aria-label="Save post"]'); 
      let textEle = undefined;
      try{ 
        textEle = await page.waitForSelector('.error-text',{timeout: 500});
      }catch(exception){
        textEle = undefined;
      }
      let text = undefined
      if(textEle !== undefined){
        text = await textEle!.evaluate(el => el.textContent);
      }
      results.push({payload: payload, category: category, result: text});
      expect(text).not.toBe('Malicious Input');
  });

  // it('does something', async ()=>{
  //   await page.goto('http://localhost:3000/create');
  //       await page.click('.form_input__email');
  //       await page.type('input[type=email]',"dattu046@gmail.com");
  //       await page.click('.form_input__textbox');
  //       await page.type('textarea', '@*');
  //       await page.click('[aria-label="Save post"]'); 
  //       let textEle = undefined;
  //       try{ 
  //         textEle = await page.waitForSelector('.error-text',{timeout: 500});
  //       }catch(exception){
  //         textEle = undefined;
  //       }
  //       let text = undefined;
  //       if(textEle !== undefined){
  //           text = await textEle!.evaluate(el => el.textContent);
  //       }
  //       expect(text).not.toBe('Malicious Input');
  // });

 
  afterAll(()=>{
    console.info("writing results");
    console.info(results);
     fs.writeFileSync(`../results/resultsrce.json`, JSON.stringify(results));
  })
    
  

});
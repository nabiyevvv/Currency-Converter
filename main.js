const select = document.querySelectorAll("select");
const input = document.querySelectorAll("input");
const span = document.querySelectorAll("span")
let html;

currency();
async function currency() {
  const res = await fetch(
    "https://api.exchangerate.host/latest?base=USD&symbols"
  );

  const data = await res.json();
  const arrayKeys = Object.keys(data.rates);
  

  arrayKeys.map((item) => {
    return (html += `<option value=${item}>${item}</option>`);
  });

  for (let i = 0; i < select.length; i++) {
    select[i].innerHTML = html;
  };
  input[0].addEventListener("input",()=>{
    input[1].value = (input[0].value*data.rates[select[1].value]/data.rates[select[0].value]).toFixed(2);
    
  })
  input[1].addEventListener("input",()=>{
    input[0].value = (input[1].value*data.rates[select[0].value]/data.rates[select[1].value]).toFixed(2);
  })
 
  for(let i=0;i<select.length;i++){
    select[i].addEventListener("change",()=>{
        span[0].innerText = `1 ${select[0].value +" = "+ (data.rates[select[1].value]/data.rates[select[0].value]).toFixed(2) +" "+ select[1].value }`
        span[1].innerText = `1 ${select[1].value +" = "+ (data.rates[select[0].value]/data.rates[select[1].value]).toFixed(2) +" "+ select[0].value}`
        input[1].value = (input[0].value*data.rates[select[1].value]/data.rates[select[0].value]).toFixed(2);
        console.log(input[1].value.split(""))

      }
      )
  }
}

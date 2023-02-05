const svgPathParent2 = document.getElementById("svg-path2");
const card2 = document.getElementById("card2");
const dataPath3 = [19, 28, 32, 93, 23, 24, 31, 45, 56, 66, 77, 97,103 , 131, 185, 225, 150, 125, 295, 299, 195, 262, 199];
let dateGrp2 = [];

function dailySupply(array, frequency, lineCount){
  const svgElement = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  const svgPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
  const days = array.length
  const maxVal = Math.max(...array);
  const widthSvg = days * frequency;
  const heightSvg = maxVal + 30
  const graphLine = maxVal / (lineCount - 1);
 

  svgElement.setAttributeNS(null, "width", widthSvg)
  svgElement.setAttributeNS(null, "height", heightSvg)

   //g tags for grouping other tags
   const gElCircle = document.createElementNS("http://www.w3.org/2000/svg", "g")
   gElCircle.id = "graph-points";

   const gElLine = document.createElementNS("http://www.w3.org/2000/svg", "g")
   gElLine.id = "graph-lines";

   const gElText = document.createElementNS("http://www.w3.org/2000/svg", "g")
   gElText.id = "graph-texts";

   // baseline
  let pathString = "M" + widthSvg + " "+ heightSvg + " L" + 0 + " " + widthSvg;

  console.log("days: ", days)
 let datesObj =  setDates(days);
 console.log("datesObj: ", datesObj)
 addDates(datesObj);


  for (let d = 0; d < days; d++) {
  
    const yValue = heightSvg - dataPath3[d], xValue = d * frequency;
    const newString = " L" + xValue + " " + yValue;
          pathString += newString;

          const circleEl = document.createElementNS("http://www.w3.org/2000/svg", "circle");

          circleEl.setAttributeNS(null, "cx", xValue);
          circleEl.setAttributeNS(null, "cy", yValue);
          circleEl.setAttributeNS(null, "r", "8");
          circleEl.addEventListener("mouseover", (e) => {card2.style = `top:${yValue}px; left:${xValue - 75}px; display: block;`;
          // generate date
          const date_ = new Date(Date.now() - ((days - d) * (24 * 60 * 60 * 1000))).toJSON().split("T")[0];
           
          card2.innerHTML = `Price: ${dataPath3[d]} <br>Date: ${date_}`;});
          gElCircle.appendChild(circleEl);
        }


    const ends = heightSvg - dataPath3[days - 1];
    pathString += " L" + widthSvg + " " + ends;
    pathString += " Z";
    svgPath.setAttributeNS(null, "d", pathString);   
    
    //lines and texts
  for(let l = 0; l <  lineCount; l++){
    const lineEl = document.createElementNS("http://www.w3.org/2000/svg", "line");
    const textEl = document.createElementNS("http://www.w3.org/2000/svg", "text");
    const yPosition = (heightSvg - (l * graphLine)).toFixed(2)
   
    lineEl.setAttributeNS(null, "x1" , "0" )
    lineEl.setAttributeNS(null, "y1" , yPosition )
    lineEl.setAttributeNS(null, "x2" , widthSvg )
    lineEl.setAttributeNS(null, "y2" , yPosition)
   gElLine.appendChild(lineEl);

   const txt = (l * graphLine).toFixed(0);
   textEl.setAttributeNS(null, "dx", "-20")
   textEl.setAttributeNS(null, "x", widthSvg)
   textEl.setAttributeNS(null, "y", yPosition - 5)
   textEl.textContent = txt
   gElText.appendChild(textEl);
  }

  svgElement.appendChild(gElCircle);
  svgElement.appendChild(gElLine);
  svgElement.appendChild(gElText);
  svgElement.appendChild(svgPath);

    // base parent or graph container
    svgPathParent2.appendChild(svgElement);
}

function setDates(days){
    for(let d = 0; d <  days; d++){
        const dateItem = new Date(Date.now() - ((days - d) * (24 * 60 * 60 * 1000))).toJSON().split("T")[0];
       // dateItem.substring(5);  
       
           //Date Group
           dateGrp2.push(dateItem);       
    }

   return   dateGrp2 = formatDate(dateGrp2);

}

function formatDate(dateGrp2){
    let formatedGrp = [];
  for(let i = 0; i < dateGrp2.length; i++){
    let date = dateGrp2[i].substring(6).replace(/-/g, '/');
     formatedGrp.push(date)
  }

  return formatedGrp

}

function addDates(dateGrp2){
   const gElDates = document.querySelector("#date-row2");
    dateGrp2.forEach(element => {
        console.log("ForEach: ", element)
        let div = document.createElement('div');
        div.className = 'date-item';
        let text = document.createTextNode(element);
        div.appendChild(text);
        gElDates.append(div);

        
    });
}

dailySupply(dataPath3, 29, 4);
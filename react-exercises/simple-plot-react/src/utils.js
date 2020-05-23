export const generateLineGraphData = ()=> {
  // This function creates data that doesn't look entirely random
  const data = []
  for (let x = 0; x <= 30; x++) {
    const random = Math.random();
    const temp = data.length > 0 ? data[data.length-1].y : 50;
    const y = random >= .45 ? temp + Math.floor(random * 20) : temp - Math.floor(random * 20);
    data.push({x,y})
  }
  return data;
}

export const generateBarGraphData = (type)=> {
  // This function creates data that doesn't look entirely random
  // const data = [{"name":"E","value":0.12702},{"name":"T","value":0.09056},{"name":"A","value":0.08167},{"name":"O","value":0.07507},{"name":"I","value":0.06966},{"name":"N","value":0.06749},{"name":"S","value":0.06327},{"name":"H","value":0.06094},{"name":"R","value":0.05987},{"name":"D","value":0.04253},{"name":"L","value":0.04025},{"name":"C","value":0.02782},{"name":"U","value":0.02758},{"name":"M","value":0.02406},{"name":"W","value":0.0236},{"name":"F","value":0.02288},{"name":"G","value":0.02015},{"name":"Y","value":0.01974},{"name":"P","value":0.01929},{"name":"B","value":0.01492},{"name":"V","value":0.00978},{"name":"K","value":0.00772},{"name":"J","value":0.00153},{"name":"X","value":0.0015},{"name":"Q","value":0.00095},{"name":"Z","value":0.00074}]

 const sample1 =[{"name":"30","value":20},{"name":"40","value":40},{"name":"50","value":50},{"name":"60","value":90}]
 const sample2 =[{"name":"10","value":10},{"name":"20","value":20},{"name":"30","value":30},{"name":"40","value":40}]

 return type ? sample1 : sample2
  
}
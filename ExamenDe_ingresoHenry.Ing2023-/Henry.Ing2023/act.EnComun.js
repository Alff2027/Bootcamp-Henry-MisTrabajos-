function actividadesEnComun(persona1, persona2){
    let res = []
     for (let actividad of persona1) {
       if (persona2.includes(actividad)) {
        res.push(actividad)  
      }
      
     }
   
          return res 
  }
  
  
  let persona1 =['leer', 'comer', 'pasear', 'dormir', 'jugar'];
  let persona2 = ['comer', 'dormir', 'futbol'];
  
  console.log(actividadesEnComun(persona1,persona2));
  
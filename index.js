const fs = require('fs');
const { parse } = require('csv-parse');

const results = [];

function habitablePlanet(planet){
    return  planet['koi_disposition'] === 'CONFIRMED'
            && (planet['koi_insol'] > 0.36 && planet['koi_insol'] < 1.11)
            && planet['koi_prad'] < 1.6;
}

fs.createReadStream('./kepler_data.csv')
.pipe(parse({
    comment:"#",
    columns:true
}))
.on('data',(data)=>{

    if(habitablePlanet(data)){
        results.push(data);
    }
    
})
.on('error',(error)=>{
    console.log(error);
})
.on('end',()=>{
    console.log(`We found ${results.length} habitable planets!`);
    console.log('They are: ');
    for(let i=0;i<results.length;i++){
        console.log(results[i]['kepler_name']);
    }
});
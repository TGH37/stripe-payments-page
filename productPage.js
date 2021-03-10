const fs = require('fs');

exports.getData = async (filepath) => {
  try {
    const data = await fs.readFileSync(filepath, 'utf8',(err, data) => {
      if(err) throw err;
      else return data;
    })
    const parsedData = await JSON.parse(data);
    return parsedData;
    
  } catch (err) {
    console.log(`Error reading file: ${filepath} from disk: ${err}`);
  }
}

exports.helpers = {
  formatBasketItems: (input) => {
    return parseInt(input) + 1
  }
}
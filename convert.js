const fs = require('fs');
const {dialog} = require('electron').remote; 

const mjml = require('mjml');
const stripBom = require('strip-bom');

function processFile () {
  let mjmlInput = document.getElementById('mjmlInput');
  let inputFile = mjmlInput.files[0];

  if (inputFile) {
    let filePath = inputFile.path;

    fs.readFile(filePath, 'utf-8', (err, fileData) => {
      if (err) {
        alert('An error ocurred reading the file:\n' + err.message, 'Error Reading ' + inputFile.name);
      } else {
        convertMJML(fileData);
      }
    });
  } else {
    alert('Please specify a file.', 'Error');
  }
}

function convertMJML (fileData) {
  let mjmlData = stripBom(fileData);

  let conversionObject = mjml.mjml2html(mjmlData);

  if (conversionObject.errors.length > 0) {
    let errorMessages = conversionObject.errors.map((error) => {
      return error.formattedMessage;
    });

    alert(errorMessages.join('\n'), 'Conversion Errors');
  } else {
    let htmlOutput = conversionObject.html;

    saveOutput(htmlOutput);
  }
}

function saveOutput (output) {
  let saveOptions = {
    title: 'Save HTML',
    buttonLabel: 'Save',
    filters: [
      { name: 'HTML File', extensions: ['html'] }
    ]
  };

  dialog.showSaveDialog(saveOptions, (fileName) => {
    if (fileName === undefined) {
      return;
    } else {
      try {
        fs.writeFileSync(fileName, output, 'utf8');
        alert('Saved to ' + fileName);
      } catch (error) {
        // alert("An error ocurred creating the file: \n"+ error.message);
        console.log(error);
      }
    }
  });
}

// var process = mjml.mjml2html('<mjml><mj-body><mj-container><mj-section><mj-column><mj-image width="100" src="/assets/img/logo-small.png"></mj-image><mj-divider border-color="#F45E43"></mj-divider><mj-text font-size="20px" color="#F45E43" font-family="helvetica">Hello World</mj-text></mj-column></mj-section></mj-container></mj-body></mjml>');

// if (process.errors.length > 0) {
//   console.log(process.errors);
// } else {
//   console.log(process.html);
// }

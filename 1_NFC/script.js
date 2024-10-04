// Start NFC scanning and log the serial number of the NFC tag
let ndef;

async function onreading({ serialNumber }) {
  // Log the serial number of the NFC tag
  console.log("NFC Tag Serial Number:", serialNumber);
}

const button = document.getElementById("button");

button.onclick = async () => {
  try {
    // Start NFC scanning and prompt user if needed.
    ndef = new NDEFReader();
    await ndef.scan();
    console.log("Scan started successfully.");
    
    // Start listening to NFC tags
    ndef.onreading = onreading;
  } catch (error) {
    console.log("Error: " + error);
  }
};

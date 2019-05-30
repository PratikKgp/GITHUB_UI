import React from "react";
import logo from "./logo.svg";
import "./App.css";
const N3 = require("n3");

function App() {
  {
  const parser = new N3.Parser();

  parser.parse(
    `PREFIX c: <http://example.org/cartoons#>
   c:Tom a c:Cat.
   c:Jerry a c:Mouse;
           c:smarterThan c:Tom.`,
    (error, quad, prefixes) => {
      if (quad) return console.log(quad);
      else return console.log("# That's all, folks!", prefixes);
    }
  );
}
return null;
}

ReactDOM.render(
  {App()}
)

export default App;

function App() {
  {
    parser.parse(files, (error, quad, prefixes) => {
      if (quad) console.log(quad);
      else console.log("# That's all, folks!", prefixes);
    });
  }
  return null;
}


const N3 = require("n3");
const parser = new N3.Parser();
rdfStream = fs.createReadStream(
  "/Users/pratikdesai/Downloads/Building1_Floor1_aligned.ttl"
);
parser.parse(rdfStream, console.log);

function App() {
  {
    parser.parse(selectedFile, (error, quad, prefixes) => {
      if (quad) console.log(quad);
      else console.log("# That's all, folks!", prefixes);
    });
  }
  return null;
}
import * as React from "react";
import Manifest from "manifest";
React.createElement("button", {
  onClick: () => {
    Manifest["index.js"]();
    Manifest["[name]"]();
  },
});

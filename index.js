import * as React from "react";
import Manifest from "manifest";

React.createElement("button", {
  onClick: () => {
    Manifest["hi"]();
    Manifest["[name]"]();
  },
});

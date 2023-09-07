import { configT } from "src/types";
import { syncthing } from "../src/syncthing";

const options: configT = {
  apiKey: "Fumn9ume4NczkVnTgsagjmtbVpAnDizT",
};

const st = new syncthing(options);

function logThis(res, err) {
  if (err) console.error(err);
  else console.log(res);
}

st.system.ping(logThis);
st.system.ping().then(console.log);

st.system.getDebug(logThis);
st.system.getDebug().then(console.log);

st.system.setDebug([], ["api"], logThis);
st.system.setDebug([], ["api"]).then(console.log);

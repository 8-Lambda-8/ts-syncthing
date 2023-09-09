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

st.system.getDiscovery(logThis);
st.system.getDiscovery().then(console.log);

st.system.setDiscovery("XXXXXXX-JOAXZRU-JLATGU6-S664HNW-CYWMIQV-SI4DBBV-VLVUYC7-QDL6HAW","test",logThis,);
st.system.setDiscovery("XXXXXXX-JOAXZRU-JLATGU6-S664HNW-CYWMIQV-SI4DBBV-VLVUYC7-QDL6HAW","tcp://10.0.0.69:420",).then(console.log);

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


st.system.clearError(logThis);
st.system.setError("MyTest Error", logThis);
st.system.getError(logThis);

st.system.log(logThis);
st.system.log_txt(logThis);

st.system.pause(
  "XXXXX-GH3FCHQ-TYZFXU5-O2YUYAQ-4NX5Z7O-TA42QY7-2XVO2JP-TM6HGQY",
  logThis,
);

st.system.resume(
  "XXXXXXX-GH3FCHQ-TYZFXU5-O2YUYAQ-4NX5Z7O-TA42QY7-2XVO2JP-TM6HGQY",
  logThis,
);

st.system.restart(logThis);
st.system.shutdown(logThis);

st.system.status(logThis)

st.system.upgradeCheck(logThis)
st.system.upgradeDo(logThis)

st.system.version

st.config.getConfig(logThis);

st.db.completion({}, logThis);
st.db.completion(
  { device: "XXXXXXX-JOAXZRU-JLATGU6-S664HNW-CYWMIQV-SI4DBBV-VLVUYC7-QDL6HAW" },
  logThis,
);
st.db.completion({ folder: "XXXXX-kvyer" });

st.noauth.health(logThis);

st.stats.device(logThis);
st.stats.folder(logThis);

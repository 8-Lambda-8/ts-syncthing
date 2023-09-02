import { syncthing, config } from "../src/syncthing";

const options: config = {
  apiKey: "Fumn9ume4NczkVnTgsagjmtbVpAnDizT",
};

const st = new syncthing(options);

console.log("ping ");
st.system.ping((res, err) => {
  if (err) return;
  console.log(res);
});
st.system.restart((res, err) => {
  if (err) return;
  console.log(res);
});

import { subapp } from "gigamono-api-frontend";

const extension = () => {
  const extAPI = subapp.extensionAPI("gigamono-frontend");

  extAPI.keyboardShortcut("select").register((keys) => {
    console.log(keys, "pressed!");
  });
};

export default extension;

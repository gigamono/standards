import { subapp } from "gigamono-api-frontend";

const extension = () => {
  const extAPI = subapp.from("gigamono.frontend").extensionAPI;

  extAPI.keyboardShortcut("select").register((keys) => {
    console.log(keys, "pressed!");
  });
};

export default extension;

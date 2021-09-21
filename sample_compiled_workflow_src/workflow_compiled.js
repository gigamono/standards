// Each script has capabilities it is allowed to have.
// Database is always already connected.
// Helpers - ORM, parsing, compilation, etc.

import { http, db, fs, memcache, introspect, subapp } from "gigamono-api-backend";

function sample() {
  const requestBody = http.request().body();

  const fetchedFile = fs.open("fs://samples/sample.txt").read();

  const volumeFile = fs.open("mnt://samples/sample.txt").read();

  const cachedUser = memcache.get("users.currentUser");

  const permissions = introspect.permissions();

  const currentUser = db.from("users").by(cachedUser.Id);

  subapp.register("mnt://subapps/sample_subapp_src", "gigamono.sample_subapp")

  return {
    statusCode: 200,
    body: `
      ${requestBody}
      ${fetchedFile}
      ${permissions}
      ${currentUser}
      ${cachedFile}
      ${cachedUser}
    `,
  };
}

export default sample;

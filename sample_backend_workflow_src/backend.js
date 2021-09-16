// Each script has capabilities it is allowed to have.
// Database is always already connected.
// Helpers - ORM, parsing, compilation, etc.

import { http, db, fs, memcache, introspect, subapp } from "gigamono-api-backend";

function sample() {
  const requestBody = http.request().body();

  const fetchedFile = fs.open("fs://samples/sample.txt").read();

  const cachedFile = fs.open("vol://samples/sample.txt").read();

  const cachedUser = memcache.get("users.currentUser");

  const permissions = introspect.permissions();

  const currentUser = db.from("users").by(cachedUser.Id);

  const deck = subapp.canvasSource("fs://frontends/deck/", "svelte");

  deck.build("fs://dist/deck");

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

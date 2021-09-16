// Each script has capabilities it is allowed to have.
// Database is always already connected.
// Helpers - ORM, parsing, etc.

import { http, db, fs, cache, introspect, subapp, extension } from "system";

function sample() {
  const requestBody = http.request().body();

  const fileContent = fs.open("fs://my-workspace/sample.txt").read();

  const permissions = introspect.permissions();

  const currentUserId = introspect.currentUser().id;

  const currentUser = db.connect().model?.users.getById(currentUserId);

  return {
    response: `${requestBody} ${fileContent} ${permissions} ${currentUser}`
  };
}

function subapp() {
   
}

export default sample;

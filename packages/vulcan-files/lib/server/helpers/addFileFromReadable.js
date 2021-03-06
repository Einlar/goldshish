import util from "util";
const streamToBuffer = (readable) =>
  new Promise((resolve, reject) => {
    const chunks = [];
    readable.on("error", (err) => reject(err));
    readable.on("end", () => {
      const buffer = Buffer.concat(chunks);
      resolve(buffer);
    });
    readable.on("data", (chunk) => {
      chunks.push(chunk);
    });
  });

export default async function addFileFromReadable(
  FSCollection,
  file,
  fileDocument
) {
  const readable = file.createReadStream();
  // For custom collections that support addFileFromReadable
  if (!!FSCollection.addFileFromReadable) {
    return await FSCollection.addFileFromReadable(readable, file, fileDocument);
  } else if (!!FSCollection.addFileFromBuffer) {
    const data = await streamToBuffer(readable); // We have to get the whole file, no way to stream to FS
    return await FSCollection.addFileFromBuffer(data, file, fileDocument);
  } else {
    // Legacy code for actual Meteor Files FSCollection, can't work with stream directly so we need to create a buffer in-memory
    // (for big files we could store on disk but that won't work well)
    //console.log("I'm in the else part")
    const data = await streamToBuffer(readable); // We have to get the whole file, no way to stream to FS
    console.log("data", data)
    console.log("file", file)
    console.log("fileDocument", fileDocument)//fileDocument contains the form's data, so the version for each file can be extracted from here
    //Make a button "load new version"
    return new Promise((resolve, reject) =>
      FSCollection.write(data, {fileName: file.filename, type: file.mimetype, userId: file.userId, meta: {display: true, versionNumber: 1}}, (err, res) => { //(data, file, (err, res))
        if (err) {
          reject(err);
        } else {
          resolve(res);
        }
      })
    );

    // const write = util.promisify(FSCollection.write);
    // return await write(data, file);
  }
}

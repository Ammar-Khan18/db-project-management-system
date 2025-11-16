import oracledb from "oracledb";

// Optional but good practice
oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;

export async function getConnection() {
  return await oracledb.getConnection({
    user: "SYSTEM",          // your Oracle username
    password: "yourPassword",
    connectString: "localhost/XEPDB1", 
    // or: localhost/XE  (depends on your installation)
  });
}

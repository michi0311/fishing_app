/**
 * hashTools.js
 * 
 * Create and check password hashes using the nice and platform-independent bcryptjs.
 */

const bcrypt = require("bcryptjs");

/**
 * Generate a bcrypt hash from a given password 
 * @param {*} password
 * @returns hash
 */
module.exports.createHash = async password => {
  let salt = await bcrypt.genSalt(8);
  let hash = await bcrypt.hash(password, salt);
  return hash;  
};

/**
 * Compares password against existing hash.
 * 
 * @param {*} password 
 * @param {*} hash 
 * 
 * @returns true: password and hash match, false: otherwise
 */
module.exports.compareHash = async (password, hash) => {
    return bcrypt.compare(password, hash);  
}

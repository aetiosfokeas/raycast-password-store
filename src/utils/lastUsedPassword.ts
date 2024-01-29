import os from 'os';
import fsPromises from 'fs/promises';

const LAST_USED_PASSWORD=`${os.homedir()}/.password-store-last-used`;

export const getLastUsedPassword = async () => {
  // Check for last used password
  const lastUsedPasswordFile = await fsPromises.readFile(LAST_USED_PASSWORD, 'utf8');

  // If the file exists, get all the info from the file
  if (lastUsedPasswordFile) {
    const lastUsedPasswordOj = lastUsedPasswordFile.split('\n');
    const lastUsedPassword = lastUsedPasswordOj[0];
    const lastUsedPasswordOption = lastUsedPasswordOj[1];
    const lastUsedPasswordTime = lastUsedPasswordOj[2];
    const currentTimestamp = new Date().getTime();

    // Calculate the difference in seconds between the last time it was used, and now
    const diffSeconds = (currentTimestamp - parseInt(lastUsedPasswordTime))/ 1000;

    // If the password was used within the last two minutes, return it
    if (diffSeconds < 120) {
      return { lastUsedPassword, lastUsedPasswordOption };
    }
  }

  return { lastUsedPassword: null, lastUsedPasswordOption: null };
}

export const updateLastUsedPassword = async (password: string, selectedOption: string) => {
  const currentTimestamp = new Date().getTime();
  await fsPromises.writeFile(LAST_USED_PASSWORD, `${password}\n${selectedOption}\n${currentTimestamp}`);
}

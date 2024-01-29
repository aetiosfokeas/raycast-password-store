import {
  List,
  Action,
  ActionPanel,
  Icon,
  closeMainWindow,
  Clipboard,
} from '@raycast/api';
import { usePromise } from '@raycast/utils';
import { exec as _exec } from 'node:child_process';

import { promisify } from 'node:util';
import { glob as _glob } from 'glob';
import os from 'os';
import { URL } from 'url';
import { getOptionIcon, getPasswordIcon } from './utils/icons';
import { getLastUsedPassword, updateLastUsedPassword } from './utils/lastUsedPassword';

const exec = promisify(_exec);
const glob = promisify(_glob);

const OATHTOOL_PATH='/opt/homebrew/bin/oathtool';
const PASSWORDS_PATH=`${os.homedir()}/.password-store/`;

export default function Command() {
  const { isLoading, data } = usePromise(async () => {
    const passwords = [];
    const { lastUsedPassword, lastUsedPasswordOption } = await getLastUsedPassword();

    // If the lastUsedPassword exists, add it as the first option in the list
    if (lastUsedPassword) passwords.push({ value: lastUsedPassword, lastUsedPasswordOption })

    // Get all password files
    const files = await glob(`${PASSWORDS_PATH}**/*.gpg`);
    for (const file of files) {
      const password = file.replace(PASSWORDS_PATH, '').replace('.gpg', '');
      // Check if current passowrd was added at the top of the list as the last used password.
      if (password !== lastUsedPassword) passwords.push({ value: password, lastUsedPasswordOption: '' });
    }

    return passwords;
  });

  return (
    <List isLoading={isLoading}>
      { data?.map((password: { value: string, lastUsedPasswordOption: string }) => (
        <List.Item
          icon={getPasswordIcon(password.value)}
          title={password.value}
          key={password.value}
          actions={
            <ActionPanel>
              <Action.Push title="Decrypt" target={
                <PasswordOptions 
                  selectedPassword={password.value}
                  lastUsedPasswordOption={password.lastUsedPasswordOption}
                />
              }/>
            </ActionPanel>
          }
        />
      ))}
    </List>
  );
}

function PasswordOptions(props: { selectedPassword: string, lastUsedPasswordOption: string }) {
  const { selectedPassword, lastUsedPasswordOption } = props;

  const { isLoading, data } = usePromise(async () => {
    // Get the decrypted contents of the fileThis is a test
    const { stdout } = await exec(`gpg -d ${PASSWORDS_PATH}${selectedPassword}.gpg`);

    const options = [];
    const passwordOptions = stdout.split('\n');

    // Get the password value (first line of the decrypted file)
    const passwordValue = passwordOptions.shift();

    if (passwordValue) options.push({ title: 'Password', value: passwordValue });

    for (const option of passwordOptions) {
      if (option) {
        const elements = option.split(': ');
        if (elements.length === 2) {
          options.push({ title: elements[0], value: elements[1] });
        } else if (option.startsWith('otpauth://')) {
          const parsedUrl = new URL(option);
          const otpSecret = parsedUrl.searchParams.get('secret');
          const { stdout } = await exec(`${OATHTOOL_PATH} -b --totp '${otpSecret}'`);

          const otpValue = stdout.replace(/\r?\n|\r/g, '');

          // Push OTP option as the second option
          const otpPosition = lastUsedPasswordOption === 'Password' ? 0 : 1;
          options.splice(otpPosition, 0, { title: 'OTP', value: otpValue });
        }
      }
    }

    return options;
  });

  return (
    <List isLoading={isLoading}>
      { data?.map((option: { title: string, value: string }) => (
        <List.Item
          icon={getOptionIcon(option.title)} 
          title={option.title}
          key={option.title}
          actions={
            <ActionPanel>
              <Action
                title="Autofill"
                icon={Icon.Keyboard}
                onAction={async () => await action(selectedPassword, option, 'paste')} 
              />
              <Action
                title="Copy to clipboard"
                icon={Icon.CopyClipboard}
                onAction={async () => await action(selectedPassword, option, 'copy')} 
              />
            </ActionPanel>
          }
        />
      ))}
    </List>
  );
}

async function action(
  selectedPassword: string,
  option: { title: string, value: string },
  action: 'copy' | 'paste'
) {
  // Update the last used file
  await updateLastUsedPassword(selectedPassword, option.title);

  await Clipboard[action](option.value);
  await closeMainWindow({ clearRootSearch: true });
}

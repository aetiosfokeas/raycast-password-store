# Password Store

Raycast Extension for copying/pasting credentials from your password store (aka [pass](https://passwordstore.org))

### List all the available passwords
By default, this extension looks in the `~/.password-store` directory for any files ending in `.gpg` and lists them.
![List Passwords](./assets/pass-list.png)
After a password has been used, it will apear as the first entry on the list for the next **2 minutes** to make it easier to access.
![List Passwords](./assets/pass-list-order.png)

### See the contents of a password
* First line of evey file contains the password
* If a file contains an OTP URI (line starting with `otpauth://`) a new OTP entry will be added to the options.
* For the remaining lines, if they follow the `Key: Value` format, a new entry will be added to the options using the `Key` as a title, and the `Value` as the value.
![Password Details](./assets/pass-details.png)
If the last used field was the 'Password' field, the OTP is added as the first option to make it easier to access.
![List Passwords](./assets/pass-details-order.png)

### Select an action
The default behaviour when you select an option is to 'paste' the value. The secondary option (Ctrl+Enter) is to copy the value to your clipboard.
![Password Actions](./assets/pass-actions.png)

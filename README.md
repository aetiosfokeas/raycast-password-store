# Password Store

Raycast Extension for copying/pasting credentials from your password store (aka [pass](https://passwordstore.org))

### List View
The first view of this extension show all the password files (all the files ending in `.gpg` located in the `~/.password-store` directory)
![List Passwords](./assets/pass-list.png)
If a password has already been used within the last **2 minutes** it will be displayed as the first option (regardless of the alphabetical order) to make it easier to access (ex. You just used the email for your Steam account, most probably you will also need your password right after that).
![List Passwords](./assets/pass-list-order.png)

---

### Password Content View
After a password has been selected, the details view is show.
The details view will contain the following options:
  * Password: The first line of the decrypted file
  * OTP: If the file contains an OTP URI (line starting with `otpauth://`) and the [pass-otp](https://github.com/tadfisher/pass-otp) extension is installed.
  * For the remaining lines, if they follow the `Key: Value` format, a new entry will be added to the options using the `Key` as a title, and the `Value` as the value.

ex. password file:
```
this-is-a-password

url: https://example.com
email: user@email.com
user: user
otpauth://totp/totp-secret?secret=SECRET-OTP-CODE
Recovery codes: 000-000 000-000 000-000 000-000
```
![Password Details](./assets/pass-details.png)

If the last used options was the 'Password', the OTP options will be added as the **first option** to make it easier to access (ex. You just used the password for your Steam account. If an OTP field exists, most probably you will need your OTP right after that).
![List Passwords](./assets/pass-details-order.png)

---

### Select an action
The default behaviour when you select an option (by pressing the `Enter` key) is to 'paste' the value. The secondary option (using the `Cmd+Enter`) is to copy the value to your clipboard.
![Password Actions](./assets/pass-actions.png)

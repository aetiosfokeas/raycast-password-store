/// <reference types="@raycast/api">

/* 🚧 🚧 🚧
 * This file is auto-generated from the extension's manifest.
 * Do not modify manually. Instead, update the `package.json` file.
 * 🚧 🚧 🚧 */

/* eslint-disable @typescript-eslint/ban-types */

type ExtensionPreferences = {
  /** Password Store Location - The full path to your password store */
  "PASSWORDS_PATH": string,
  /** GPG decryption password - Your password for your GPG key */
  "GPG_KEY": string
}

/** Preferences accessible in all the extension's commands */
declare type Preferences = ExtensionPreferences

declare namespace Preferences {
  /** Preferences accessible in the `pass` command */
  export type Pass = ExtensionPreferences & {}
}

declare namespace Arguments {
  /** Arguments passed to the `pass` command */
  export type Pass = {}
}



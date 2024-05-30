import { Icon } from "@raycast/api";

export const getPasswordIcon = (text: string) => {
  if (text.startsWith('Cards/')) {
    return Icon.CreditCard;
  } else if (text.startsWith('Dev/')) {
    return Icon.Terminal;
  } else if (text.startsWith('Mails/')) {
    return Icon.Envelope;
  } else if (text.startsWith('Finance/')) {
    return Icon.Coins;
  } else if (text.startsWith('Games/')) {
    return Icon.GameController;
  } else if (text.startsWith('Social/')) {
    return Icon.TwoPeople;
  } else if (text.startsWith('Personal/')) {
    return Icon.Person;
  } else if (text.startsWith('SSH/')) {
    return Icon.Terminal;
  } else if (text.startsWith('Shops/')) {
    return Icon.Gift;
  } else if (text.startsWith('Security/')) {
    return Icon.Fingerprint;
  } else {
    return Icon.Lock;
  }
}

export const getOptionIcon = (text: string) => {
  if (text === 'Password') {
    return Icon.Key;
  } else if (text === 'OTP') {
    return Icon.Hourglass;
  } else if (text === 'email') {
    return Icon.Envelope;
  } else if (text === 'username') {
    return Icon.Person;
  } else if (text === 'user') {
    return Icon.Person;
  } else if (text === 'url') {
    return Icon.Link;
  } else if (text === 'Number') {
    return Icon.CreditCard;
  } else if (text === 'Cardholder Name') {
    return Icon.Person;
  } else if (text === 'Expiration') {
    return Icon.Calendar;
  } else if (text === 'Security Code') {
    return Icon.Code;
  } else if (text === 'Brand') {
    return Icon.CreditCard;
  } else {
    return Icon.Circle;
  }
}

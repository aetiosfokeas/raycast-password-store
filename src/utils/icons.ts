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
  switch (text) {
    case 'Password':
      return Icon.Key;
    case 'OTP':
      return Icon.Hourglass;
    case 'email':
      return Icon.Envelope;
    case 'user':
      return Icon.Person;
    case 'url':
      return Icon.Link;
    case 'Number':
      return Icon.CreditCard;
    case 'Cardholder Name':
      return Icon.Person;
    case 'Expiration':
      return Icon.Calendar;
    case 'Security Code':
      return Icon.Code;
    case 'Brand':
      return Icon.CreditCard;
    default:
      return Icon.Circle;
  }
}

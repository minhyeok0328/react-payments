import { CARD_DATA } from '../../../../constants';

export default function useSetCardTheme(cardNumber: string) {
  return CARD_DATA.find((item) => item.key === cardNumber);
}

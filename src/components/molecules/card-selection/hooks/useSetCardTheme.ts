import { CARD_DATA } from '../../../../constants';

export default function useSetCardTheme(cardNumber: string) {
  return CARD_DATA.flat().find((item) => item.key === cardNumber);
}

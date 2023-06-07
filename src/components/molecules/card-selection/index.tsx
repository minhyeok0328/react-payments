import { memo, useCallback } from 'react';
import { ICard } from '../../../domain/types';
import { ModalItem } from '../../atoms';
import { CARD_DATA } from '../../../constants';

export interface ICardSelection {
  onChange: (data: ICard) => void;
}

function CardSelection({ onChange }: ICardSelection) {
  const handleClick = useCallback((cardCompany: ICard) => {
    onChange(cardCompany);
  }, []);

  return (
    <>
      {CARD_DATA.flat().map((cardItem) => (
        <div className="flex-center" key={crypto.randomUUID()}>
          <ModalItem
            key={cardItem.cardCompany}
            dotColor={cardItem.color}
            title={cardItem.cardCompany}
            item={cardItem}
            onClick={handleClick}
          />
        </div>
      ))}
    </>
  );
}

export default memo(CardSelection);

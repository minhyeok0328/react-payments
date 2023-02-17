import { CardBox, Modal } from '../components';
import { useState } from 'react';
import { useCard } from '../hooks';
import { Filter } from '../domain';
import SelectCard from '../components/SelectCard';

import {
  CardHolderContainer,
  CardNumberContainer,
  CardPasswordContainer,
  ExpiredDateContainer,
  SecurityCodeContainer
} from '../container/RegisterCard';

const { onlyNumber, onlyString } = Filter;

export interface FormProps {
  filter?: (value: string) => string;
}

export default function RegisterCard() {
  const [openCardPopup, setOpenCardPopup] = useState(false);
  const { cardState, setCardState } = useCard({
    cardCompany: '',
    cardNumber: '',
    userName: '',
    expiredDate: '',
    type: 'small',
  });

  return (
    <div className="app">
      <h2 className="page-title">&lt; 카드 추가</h2>
      <CardBox {...cardState} />
      <CardNumberContainer filter={onlyNumber}/>
      <ExpiredDateContainer filter={onlyNumber}/>
      <CardHolderContainer filter={onlyString}/>
      <SecurityCodeContainer filter={onlyNumber}/>
      <CardPasswordContainer filter={onlyNumber}/>

      <div className="button-box">
        <span className="button-text">다음</span>
      </div>
      <Modal open={openCardPopup}>
        <SelectCard/>
      </Modal>
    </div>
  );
}
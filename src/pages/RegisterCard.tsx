import { Button, Card, PageTitle } from '../components/atoms';
import { CardSelection, Modal } from '../components/molecules';
import { useCallback, useEffect, useState } from 'react';
import { CardHolder, CardNumber, CardPassword, ExpiredDate, SecurityCode } from '../components/organisms/register-card';
import { cardRepository } from '../repositories';
import { useNavigate } from 'react-router-dom';
import { useCardDispatch, useCardState } from '../provider/card/hooks';
import { invalidCard } from '../domain/validator';
import { VALIDATE_MESSAGE } from '../constants';
import { useCardRegister } from './hooks';
import useSetCardTheme from '../components/molecules/card-selection/hooks/useSetCardTheme';
import { ICardDTO } from '../domain/types';

export default function RegisterCard() {
  const { findCard, cardList } = useCardRegister();
  const cardState = useCardState();
  const cardDispatch = useCardDispatch();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  const moveCardList = () => navigate('/');
  const handleClickOutside = () => {
    setShowModal(false);
  };
  const handleCardCompany = useCallback((company: ICardDTO) => {
    cardDispatch({ type: 'SET_CARD', payload: company });
  }, []);
  const saveCardData = () => {
    const invalidMessage = invalidCard(cardState);

    if (invalidMessage) {
      alert(invalidMessage);
      return;
    }

    const findDuplicateCard = findCard(cardState.cardNumber);

    if (findDuplicateCard) {
      alert(VALIDATE_MESSAGE.DUPLICATE_CARD);
      return;
    }

    const newCardList = [
      ...cardList,
      { ...cardState }
    ];

    cardRepository.setItem(newCardList);
    navigate(`/register-complete?card=${cardState.cardNumber}`);
  };

  useEffect(() => {
    const { cardNumber, cardCompany } = cardState;
    const cardTheme = useSetCardTheme(cardNumber);

    if (!cardNumber?.length) {
      setShowModal(true);
      return;
    }

    if (cardTheme && !cardCompany) {
      handleCardCompany(cardTheme);
      return;
    }
  }, [cardState]);

  useEffect(() => {
    cardDispatch({ type: 'RESET_CARD', payload: {} });
  }, [history]);

  return (
    <div className="app">
      <PageTitle title="&lt; 카드 추가" onClick={moveCardList}/>
      <Card {...cardState} />
      <CardNumber/>
      <ExpiredDate/>
      <CardHolder/>
      <SecurityCode/>
      <CardPassword/>
      <Button onClick={saveCardData}>다음</Button>
      {showModal && (
        <Modal onClickOutside={handleClickOutside}>
          <CardSelection onChange={handleCardCompany}/>
        </Modal>
      )}
    </div>
  );
}

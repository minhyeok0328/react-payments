import { useFocusRef, useRefs } from '../../../hooks';
import { Input } from '../../atoms';
import { InputContainer } from '../../molecules';
import { memo, useCallback, useState } from 'react';
import { isInvalidMonth, isPreviousDate } from '../../../domain/validator';
import { onlyNumber } from '../../../utils/keyInterceptor';
import { useCardDispatch } from '../../../provider/card/hooks';

const MAX_LENGTH = 2;
const VALIDATE_ERROR = {
  MONTH: '월은 1~12 까지만 입력 가능합니다.',
  PREV_DATE: '현재 날짜보다 이전 날짜는 입력할 수 없습니다.'
};

function ExpiredDate() {
  const cardDispatch = useCardDispatch();
  const [errorMessage, setErrorMessage] = useState('');
  const [expiredDateRef, getExpiredDateRefs] = useRefs<HTMLInputElement>(2);

  const handleChange = useCallback(() => {
    const expiredDate = getExpiredDateRefs().map((item) => item.value);
    const [month, year] = expiredDate;

    cardDispatch({
      type: 'SET_CARD',
      payload: { expiredDate: expiredDate.join('') }
    });

    if (isInvalidMonth(month)) {
      setErrorMessage(VALIDATE_ERROR.MONTH);
      return;
    }

    setErrorMessage(isPreviousDate(year, month) ? VALIDATE_ERROR.PREV_DATE : '');
  }, []);

  return (
    <InputContainer title="만료일" className="w-50" errorMessage={errorMessage}>
      <Input
        ref={expiredDateRef[0]}
        placeholder="MM"
        nextFocus={useFocusRef(expiredDateRef[1])}
        maxLength={MAX_LENGTH}
        onChange={handleChange}
        onKeyDown={onlyNumber}
      />
      /
      <Input
        ref={expiredDateRef[1]}
        placeholder="YY"
        maxLength={MAX_LENGTH}
        onChange={handleChange}
        onKeyDown={onlyNumber}
      />
    </InputContainer>
  );
}

export default memo(ExpiredDate);

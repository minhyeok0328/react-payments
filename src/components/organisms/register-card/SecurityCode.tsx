import { Input } from '../../atoms';
import { InputContainer } from '../../molecules';
import { memo, useCallback, useRef, useState } from 'react';
import { onlyNumber } from '../../../utils/keyInterceptor';
import { useCardDispatch } from '../../../provider/card/hooks';
import { isSecurityCode } from '../../../domain/validator';

const MAX_LENGTH = 3;
const VALIDATE_ERROR = '보안코드를 올바르게 입력 해 주세요.';

function SecurityCode() {
  const cardDispatch = useCardDispatch();
  const [errorMessage, setErrorMessage] = useState('');
  const securityCodeRef = useRef<HTMLInputElement>(null);

  const handleChange = useCallback(() => {
    const cardSecurityCode = securityCodeRef.current.value;

    cardDispatch({
      type: 'SET_CARD',
      payload: { cardSecurityCode: Number(cardSecurityCode) }
    });
    setErrorMessage(!isSecurityCode(cardSecurityCode) ? VALIDATE_ERROR : '');
  }, []);

  return (
    <InputContainer title="보안코드(CVC/CVV)" className="w-25" errorMessage={errorMessage}>
      <Input
        type="password"
        maxLength={MAX_LENGTH}
        ref={securityCodeRef}
        onChange={handleChange}
        onKeyDown={onlyNumber}
      />
    </InputContainer>
  );
}

export default memo(SecurityCode);

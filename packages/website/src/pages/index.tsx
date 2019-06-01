import React, { useState, useCallback } from 'react';
import { css } from 'linaria';
import { styled } from 'linaria/react';
import { characterize } from '@narucode/characterizer';

export default () => {
    const [code, setCode] = useState(initialCode);
    const onchange = useCallback<React.ChangeEventHandler<HTMLTextAreaElement>>(e => setCode(e.target.value), []);
    const characters = Array.from(characterize(code));
    return <div className={css`
        display: flex;
    `}>
        <Column>
            <textarea value={code} onChange={onchange} className={css`
                margin: 0;
                padding: 0;
                width: 100%;
                height: 100%;
            `}/>
        </Column>
        <Column>
            <div>{characters.map((char, index) => <p key={index}>{ JSON.stringify(char) }</p>)}</div>
        </Column>
    </div>;
};

const Column = styled.div`
    flex: 1 0 0;
`;

const initialCode = `
oldint := use naru core 0 (int)
hours := new type oldint
main := fn {
    delay := hours(4)
    #"#(delay)시간동안 기다리는 중" println()
}
`;

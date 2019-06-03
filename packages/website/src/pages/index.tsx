import React, { memo, useState, useCallback, useRef, useEffect } from 'react';
import { css, cx } from 'linaria';
import { styled } from 'linaria/react';
import { characterize } from '@narucode/characterizer';
import { FixedSizeList as List } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';

import { useMonaco, isOnSelection, Selection } from '../monaco';
import { getColor } from '../color';
import LoadingIndicator from '../components/LoadingIndicator';

export default () => {
    const [code, setCode] = useState(initialCode);
    const onChangeHandler = useCallback((code: string) => setCode(code), []);
    const { MonacoEditor, props: monacoEditorProps, selection } = useMonaco();
    return <div className={css`
        display: flex;
        flex: 1;
    `}>
        <Column className={css`
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 50px;
        `}>
            {MonacoEditor ? <MonacoEditor
                value={code}
                onChange={onChangeHandler}
                {...monacoEditorProps}
            /> : <LoadingIndicator/>}
        </Column>
        <Column>
            <CharacterizerView code={code} selection={selection}/>
        </Column>
    </div>;
};

interface CharacterizerViewProps {
    code: string;
    selection: Selection | null;
}
const CharacterizerView: React.FC<CharacterizerViewProps> = ({ code, selection }) => {
    const characters = Array.from(characterize(code));
    const listRef = useRef(null as any as List);
    for (const pos of ['start', 'end'] as const) {
        useEffect(() => {
            if (!selection) return;
            if (!listRef.current) return;
            const list = listRef.current;
            list.scrollToItem(selection[pos].offset);
        }, [selection && selection[pos].offset]);
    }
    const CodeChar = useCallback(memo(({ index, style }: { index: number, style: React.CSSProperties }) => {
        const codeCharacter = characters[index];
        return <div style={style} className={cx(
            css`
                display: flex;
                align-items: center;
                padding-left: 10px;
            `,
            selection && isOnSelection(index, selection) && css`
                color: ${getColor('foreground', 2)};
                background-color: ${getColor('background', 2)};
            `,
        )}>
            <div className={css`
                width: 50px;
                text-align: center;
            `}>{codeCharacter.char}</div>
            <div className={css`
                width: 100px;
            `}>U+{codeCharacter.codePoint.toString(16).padStart(4, '0')}</div>
            <div className={css``}>{codeCharacter.type}</div>
        </div>;
    }), [characters]);
    return <AutoSizer>
        {({ width, height }) => <List
            ref={listRef}
            width={width}
            height={height}
            itemCount={characters.length}
            itemSize={30}
            className={css`
                border-left: 1px solid ${getColor('foreground')};
            `}>
            {CodeChar}
        </List>}
    </AutoSizer>;
};

const Column = styled.div`
    position: relative;
    flex: 1 0 0;
    color: ${getColor('foreground')};
    background-color: ${getColor('background')};
`;

const initialCode = `
oldint := use naru core 0 (int)
hours := new type oldint
main := fn {
    delay := hours(4)
    #"#(delay)시간동안 기다리는 중" println()
}
`.trimLeft();

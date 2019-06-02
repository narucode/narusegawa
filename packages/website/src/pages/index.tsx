import React, { memo, useState, useCallback, useRef, useEffect } from 'react';
import { css, cx } from 'linaria';
import { styled } from 'linaria/react';
import { characterize } from '@narucode/characterizer';
import { FixedSizeList as List } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';

import { useMonaco, isOnSelection, Selection } from '../monaco';
import { getColor } from '../color';

export default () => {
    const [code, setCode] = useState(initialCode);
    const onChangeHandler = useCallback((code: string) => setCode(code), []);
    const { MonacoEditor, props: monacoEditorProps, selection } = useMonaco();
    return <div className={css`
        display: flex;
        flex: 1;
    `}>
        <Column>
            {MonacoEditor && <MonacoEditor
                value={code}
                onChange={onChangeHandler}
                {...monacoEditorProps}
            />}
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
    useEffect(() => {
        if (!selection) return;
        if (!listRef.current) return;
        const list = listRef.current;
        list.scrollToItem(selection.start.offset);
    }, [selection]);
    const CodeChar = useCallback(memo(({ index, style }: { index: number, style: React.CSSProperties }) => {
        return <div style={style} className={cx(
            css`
                display: flex;
                padding-left: 10px;
            `,
            selection && isOnSelection(index, selection) && css`
                color: ${getColor('foreground', 2)};
                background-color: ${getColor('background', 2)};
            `,
        )}>{ JSON.stringify(characters[index]) }</div>;
    }), [characters]);
    return <AutoSizer>
        {({ width, height }) => <List
            ref={listRef}
            width={width}
            height={height}
            itemCount={characters.length}
            itemSize={30}
            className={css`
                color: ${getColor('foreground')};
                background-color: ${getColor('background')};
                border-left: 1px solid ${getColor('foreground')};
            `}>
            {CodeChar}
        </List>}
    </AutoSizer>;
};

const Column = styled.div`
    position: relative;
    flex: 1 0 0;
`;

const initialCode = `
oldint := use naru core 0 (int)
hours := new type oldint
main := fn {
    delay := hours(4)
    #"#(delay)시간동안 기다리는 중" println()
}
`.trimLeft();

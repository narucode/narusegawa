import React from 'react';
import { css } from 'linaria';

interface Props {
    children?: React.ReactNode;
}
export default ({ children }: Props) => {
    return <>
        {children}
    </>;
};

css`
    :global(*) {
        box-sizing: border-box;
    }
    :global(:root), :global(body) {
        margin: 0;
        width: 100%;
        height: 100%;
    }
    :global(#___gatsby) {
        width: 100%;
        height: 100%;
        > div {
            display: flex;
            width: 100%;
            height: 100%;
        }
    }
`;

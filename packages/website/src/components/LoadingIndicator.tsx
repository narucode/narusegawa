import React, { memo } from 'react';
import { css, cx } from 'linaria';

export interface LoadingIndicatorProps {
    className?: string;
    style?: React.CSSProperties;
    lineCap?: React.SVGAttributes<SVGCircleElement>['strokeLinecap'];
}
const LoadingIndicator: React.FC<LoadingIndicatorProps> = memo(({
    className,
    style,
    lineCap,
}) => <svg
    className={cx(css`
        display: inline-block;
        width: 1em;
        height: 1em;
        overflow: hidden;
        animation: rotate 2s linear infinite;
        @keyframes rotate {
            100% {
                transform: rotate(360deg);
            }
        }
    `, className)}
    style={style}
    viewBox="0 0 50 50">
    <circle
        className={css`
            stroke: currentColor;
            animation: dash 1.5s ease-in-out infinite;
            @keyframes dash {
                0% {
                    stroke-dasharray: 1, 95;
                    stroke-dashoffset: 0;
                }
                50% {
                    stroke-dasharray: 85, 95;
                    stroke-dashoffset: -25;
                }
                100% {
                    stroke-dasharray: 85, 95;
                    stroke-dashoffset: -90;
                }
            }
        `}
        cx={25}
        cy={25}
        r={15}
        fill="none"
        strokeWidth={5}
        strokeLinecap={lineCap}
    />
</svg>);

export default LoadingIndicator;

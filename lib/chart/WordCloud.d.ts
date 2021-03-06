import React from 'react';
import { Word } from 'd3-cloud';
import { PlainObject, DeriveEncoding } from 'encodable';
import { SupersetThemeProps } from '@superset-ui/core';
export declare const ROTATION: {
    flat: () => number;
    random: () => number;
    square: () => number;
};
export declare type RotationType = keyof typeof ROTATION;
export declare type WordCloudEncoding = DeriveEncoding<WordCloudEncodingConfig>;
declare type WordCloudEncodingConfig = {
    color: ['Color', string];
    fontFamily: ['Category', string];
    fontSize: ['Numeric', number];
    fontWeight: ['Category', string | number];
    text: ['Text', string];
};
/**
 * These props should be stored when saving the chart.
 */
export interface WordCloudVisualProps {
    encoding?: Partial<WordCloudEncoding>;
    rotation?: RotationType;
}
export interface WordCloudProps extends WordCloudVisualProps {
    data: PlainObject[];
    height: number;
    width: number;
}
export interface WordCloudState {
    words: Word[];
}
declare const defaultProps: Required<WordCloudVisualProps>;
declare type FullWordCloudProps = WordCloudProps & typeof defaultProps & SupersetThemeProps;
declare class WordCloud extends React.PureComponent<FullWordCloudProps, WordCloudState> {
    static defaultProps: Required<WordCloudVisualProps>;
    isComponentMounted: boolean;
    wordCloudEncoderFactory: {
        channelTypes: import("encodable").DeriveChannelTypes<WordCloudEncodingConfig>;
        /**
         * These props should be stored when saving the chart.
         */
        create: (encoding?: Partial<DeriveEncoding<WordCloudEncodingConfig>> | undefined) => import("encodable").Encoder<WordCloudEncodingConfig>;
        createSelector: () => import("reselect").OutputSelector<Partial<DeriveEncoding<WordCloudEncodingConfig>>, import("encodable").Encoder<WordCloudEncodingConfig>, (res: Partial<DeriveEncoding<WordCloudEncodingConfig>>) => import("encodable").Encoder<WordCloudEncodingConfig>>;
        DEFAULT_ENCODING: DeriveEncoding<WordCloudEncodingConfig>;
    };
    createEncoder: import("reselect").OutputSelector<Partial<DeriveEncoding<WordCloudEncodingConfig>>, import("encodable").Encoder<WordCloudEncodingConfig>, (res: Partial<DeriveEncoding<WordCloudEncodingConfig>>) => import("encodable").Encoder<WordCloudEncodingConfig>>;
    constructor(props: FullWordCloudProps);
    componentDidMount(): void;
    componentDidUpdate(prevProps: WordCloudProps): void;
    componentWillUnmount(): void;
    setWords(words: Word[]): void;
    update(): void;
    render(): JSX.Element;
}
declare const _default: React.SFC<import("emotion-theming/types/helper").AddOptionalTo<Pick<WordCloudProps & Required<WordCloudVisualProps> & SupersetThemeProps & React.RefAttributes<WordCloud>, "data" | "height" | "width" | "theme" | "ref" | "key"> & Partial<Pick<WordCloudProps & Required<WordCloudVisualProps> & SupersetThemeProps & React.RefAttributes<WordCloud>, "encoding" | "rotation">> & Partial<Pick<Required<WordCloudVisualProps>, never>>, "theme">>;
export default _default;
//# sourceMappingURL=WordCloud.d.ts.map
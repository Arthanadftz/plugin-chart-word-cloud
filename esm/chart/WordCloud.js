import _pt from "prop-types";
import React from 'react';
import cloudLayout from 'd3-cloud';
import { createEncoderFactory } from 'encodable';
import { withTheme, seedRandom } from '@superset-ui/core';
export const ROTATION = {
  flat: () => 0,
  // this calculates a random rotation between -90 and 90 degrees.
  random: () => Math.floor(seedRandom() * 6 - 3) * 30,
  square: () => Math.floor(seedRandom() * 2) * 90
};
const defaultProps = {
  encoding: {},
  rotation: 'flat'
};

class WordCloud extends React.PureComponent {
  // Cannot name it isMounted because of conflict
  // with React's component function name
  constructor(props) {
    super(props);
    this.isComponentMounted = false;
    this.wordCloudEncoderFactory = createEncoderFactory({
      channelTypes: {
        color: 'Color',
        fontFamily: 'Category',
        fontSize: 'Numeric',
        fontWeight: 'Category',
        text: 'Text'
      },
      defaultEncoding: {
        color: {
          value: 'black'
        },
        fontFamily: {
          value: this.props.theme.typography.families.sansSerif
        },
        fontSize: {
          value: 20
        },
        fontWeight: {
          value: 'bold'
        },
        text: {
          value: ''
        }
      }
    });
    this.createEncoder = this.wordCloudEncoderFactory.createSelector();
    this.state = {
      words: []
    };
    this.setWords = this.setWords.bind(this);
  }

  componentDidMount() {
    this.isComponentMounted = true;
    this.update();
  }

  componentDidUpdate(prevProps) {
    const {
      data,
      encoding,
      width,
      height,
      rotation
    } = this.props;

    if (prevProps.data !== data || prevProps.encoding !== encoding || prevProps.width !== width || prevProps.height !== height || prevProps.rotation !== rotation) {
      this.update();
    }
  }

  componentWillUnmount() {
    this.isComponentMounted = false;
  }

  setWords(words) {
    if (this.isComponentMounted) {
      this.setState({
        words
      });
    }
  }

  update() {
    const {
      data,
      width,
      height,
      rotation,
      encoding
    } = this.props;
    const encoder = this.createEncoder(encoding);
    encoder.setDomainFromDataset(data);
    cloudLayout().size([width, height]) // clone the data because cloudLayout mutates input
    .words(data.map(d => ({ ...d
    }))).padding(5).rotate(ROTATION[rotation] || ROTATION.flat).text(d => encoder.channels.text.getValueFromDatum(d)).font(d => encoder.channels.fontFamily.encodeDatum(d, this.props.theme.typography.families.sansSerif)).fontWeight(d => encoder.channels.fontWeight.encodeDatum(d, 'normal')).fontSize(d => encoder.channels.fontSize.encodeDatum(d, 0)).on('end', this.setWords).start();
  }

  render() {
    const {
      width,
      height,
      encoding
    } = this.props;
    const {
      words
    } = this.state;
    const encoder = this.createEncoder(encoding);
    encoder.channels.color.setDomainFromDataset(words);
    return /*#__PURE__*/React.createElement("svg", {
      width: width,
      height: height
    }, /*#__PURE__*/React.createElement("g", {
      transform: `translate(${width / 2},${height / 2})`
    }, words.map(w => /*#__PURE__*/React.createElement("text", {
      key: w.text,
      fontSize: `${w.size}px`,
      fontWeight: w.weight,
      fontFamily: w.font,
      fill: encoder.channels.color.encodeDatum(w, ''),
      textAnchor: "middle",
      transform: `translate(${w.x}, ${w.y}) rotate(${w.rotate})`
    }, w.text))));
  }

}

WordCloud.propTypes = {
  rotation: _pt.any,
  data: _pt.array.isRequired,
  height: _pt.number.isRequired,
  width: _pt.number.isRequired
};
WordCloud.defaultProps = defaultProps;
export default withTheme(WordCloud);
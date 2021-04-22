"use strict";

exports.__esModule = true;
exports.default = exports.ROTATION = void 0;

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireDefault(require("react"));

var _d3Cloud = _interopRequireDefault(require("d3-cloud"));

var _encodable = require("encodable");

var _core = require("@superset-ui/core");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const ROTATION = {
  flat: () => 0,
  // this calculates a random rotation between -90 and 90 degrees.
  random: () => Math.floor((0, _core.seedRandom)() * 6 - 3) * 30,
  square: () => Math.floor((0, _core.seedRandom)() * 2) * 90
};
exports.ROTATION = ROTATION;
const defaultProps = {
  encoding: {},
  rotation: 'flat'
};

class WordCloud extends _react.default.PureComponent {
  // Cannot name it isMounted because of conflict
  // with React's component function name
  constructor(props) {
    super(props);
    this.isComponentMounted = false;
    this.wordCloudEncoderFactory = (0, _encodable.createEncoderFactory)({
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
    (0, _d3Cloud.default)().size([width, height]) // clone the data because cloudLayout mutates input
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
    return /*#__PURE__*/_react.default.createElement("svg", {
      width: width,
      height: height
    }, /*#__PURE__*/_react.default.createElement("g", {
      transform: `translate(${width / 2},${height / 2})`
    }, words.map(w => /*#__PURE__*/_react.default.createElement("text", {
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
  rotation: _propTypes.default.any,
  data: _propTypes.default.array.isRequired,
  height: _propTypes.default.number.isRequired,
  width: _propTypes.default.number.isRequired
};
WordCloud.defaultProps = defaultProps;

var _default = (0, _core.withTheme)(WordCloud);

exports.default = _default;
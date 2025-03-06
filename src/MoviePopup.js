import React, { Component, PropTypes } from 'react';
import {
  Animated,
  Dimensions,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View
} from 'react-native';
import Video from 'react-native-video'; // Import the Video component
import { defaultStyles } from './styles';

// Get screen dimensions
const { width, height } = Dimensions.get('window');
// Set default popup height to 67% of screen height
const defaultHeight = height * 0.67;

export default class MoviePopup extends Component {

  static propTypes = {
    isOpen: PropTypes.bool.isRequired,
    // Video URL for the movie
    videoUrl: PropTypes.string Called when popup closed
    onClose: PropTypes.func,
  }

  state = {
    position: new Animated.Value(this.props.isOpen ? 0 : height),
    opacity: new Animated.Value(0),
    height: defaultHeight,
    expanded: false,
    visible: this.props.isOpen,
  };

  _previousHeight = 0

  componentWillMount() {
    this._panResponder = PanResponder.create({
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onMoveShouldSetPanResponder: (evt, gestureState) => {
        const { dx, dy } = gestureState;
        if (dx !== 0 && dy === 0) {
          return true;
        }
        return false;
      },
      onPanResponderGrant: (evt, gestureState) => {
        this._previousHeight = this.state.height;
      },
      onPanResponderMove: (evt, gestureState) => {
        const { dy, vy } = gestureState;
        let newHeight = this._previousHeight - dy;

        LayoutAnimation.easeInEaseOut();

        if (newHeight > height - height / 5) {
          this.set: true });
        } else {
          this.setState({ expanded: false });
        }

        if (vy < -0.75) {
          this.setState({
            expanded: true,
            height: height
          });
        } else if (vy > 0.75) {
          this.props.onClose();
        } else if (newHeight < defaultHeight * 0.75) {
          this.props.onClose();
        } else if (newHeight > height) {
          this.setState({ height: height });
        } else {
          this.setState({ height: newHeight });
        }
      },
      onPanResponderTerminationRequest: (evt, gestureState) => true,
      onPanResponderRelease: (evt, gestureState) => {
        const { dy } = gestureState;
        const newHeight = this._previousHeight - dy;

        if (newHeight < defaultHeight) {
          this.props.onClose();
        }

        this._previousHeight = this.state.height;
      },
      onShouldBlockNativeResponder: (evt, gestureState) => {
        return true;
      },
    });
  }

  componentWillReceiveProps(nextProps) {
    if (!this.props.isOpen if (this.props.isOpen && !nextProps.isOpen) {
      this.animateClose();
    }
  }

  animateOpen() {
    this.setState({ visible: true }, () => {
      Animated.parallel([
        Animated.timing(this.state.opacity, { toValue: 0.5 }),
        Animated.timing(this.state.position, { toValue: 0 })
      ]).start();
    });
  }

  animateClose() {
    Animated.parallel([
      Animated.timing(this.state.opacity, { toValue: 0 }),
      Animated.timing(this.state.position, { toValue: height })
    ]).start(() => this.setState({
      height: defaultHeight,
      expanded: false,
      visible: false,
    }));
  }

  getStyles = () => {
    return {
      videoContainer: this.state.expanded ? {
        width: width / 2,
      } : {
        maxWidth: 110,
        marginRight: 10,
      },
      popupContainer: this.state.expanded ? {
        flexDirection: 'column',
        alignItems: 'center',
      } : {
        flexDirection: 'row',
      },
    };
  }

  render() {
    const { videoUrl } = this.props;
    if (!this.state.visible) {
      return null;
    }
    return (
      <View style={styles.container}>
        <TouchableWithoutFeedback onPress={this.props.onClose}>
          <Animated.View style={[styles.backdrop, { opacity: this.state.opacity }]}/>
        </TouchableWithoutFeedback videoUrl }} style={styles.video} controls={true} />
              </View>
            </View>
          </View>
        </Animated.View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    backgroundColor: 'transparent',
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'black',
  },
  modal: {
    backgroundColor: 'white',
  },
  content: {
    flex: 1,
    margin: 20,
    marginBottom: 0,
  },
  popupContainer: {
    flex: 1,
    marginBottom: 20,
  },
  videoContainer: {
    flex: 1,
  },
  video: {
    borderRadius: 10,
    ...StyleSheet.absoluteFillObject,
  },
});
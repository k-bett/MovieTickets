import React, { Component, PropTypes } from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import Video from 'react-native-video'; // Import the Video component
import { defaultStyles } from './styles';

const { width, height } = Dimensions.get('window');
const cols = 3, rows = 3;

export default class MoviePoster extends Component {
  static propTypes = {
    movie: PropTypes.object.isRequired,
    onOpen: PropTypes.func.isRequired,
  }

  render() {
    const { movie, movie: { title, genre, videoUrl }, onOpen } = this.props;
    return (
      <TouchableOpacity style={styles.container} onPress={() => onOpen(movie)}>
        <View style={styles.videoContainer}>
          <Video
            source={{ uri: videoUrl }}
            style={styles.video}
            controls={true} // Add controls for the video
          />
        </View>
        <Text style={styles.title} numberOfLines={1}>{title}</Text>
        <Text style={styles.genre} numberOfLines={1}>{genre}</Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginLeft: 10,
    marginBottom: 10,
    height: (height - 20 - 20) / rows - 10,
    width: (width - 10) / cols - 10,
  },
  videoContainer: {
    flex: 1,
  },
  video: {
    borderRadius: 10,
    ...StyleSheet.absoluteFillObject,
  },
  title: {
    ...defaultStyles.text,
    fontSize: 14,
    marginTop: 4,
  },
  genre: {
    ...defaultStyles.text,
    color: '#BBBBBB',
    fontSize: 12,
    lineHeight: 14,
  },
});
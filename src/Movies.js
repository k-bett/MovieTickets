import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  ActivityIndicator,
  RefreshControl,
  ScrollView,
  StyleSheet,
  View
} from 'react-native';
import MoviePoster from './MoviePoster';
import MoviePopup from './MoviePopup';

@connect(
  state => ({
    movies: state.movies,
    loading: state.loading,
  }),
  dispatch => ({
    refresh: () => dispatch({type: 'GET_MOVIE_DATA'}),
  }),
)
export default class Movies extends Component {

  state = {
    popupIsOpen: false,
    currentVideo: null,  // Add currentVideo state
  }

  openMovie = (movie) => {
    this.setState({
      popupIsOpen: true,
      currentVideo: movie.videoUrl,  // Set the current video URL
    });
  }

  closeMovie = () => {
    this.setState({
      popupIsOpen: false,
      currentVideo: null,  // Reset the current video URL
    });
  }

  render() {
    const { movies, loading, refresh } = this.props;
    return (
      <View style={styles.container}>
        {movies
          ? <ScrollView
              contentContainerStyle={styles.scrollContent}
              >
              {movies.map((movie, index) => <MoviePoster
                movie={movie}
                onOpen={this.openMovie}
                key={index}
              />)}
            </ScrollView>
          : <ActivityIndicator
              animating={loading}
              style={styles.loader}
              size="large"
            />
        }
        <MoviePopup
          videoUrl={this.state.currentVideo}  // Pass the current video URL
          isOpen={this.state.popupIsOpen}
          onClose={this.closeMovie}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
  },
  loader: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollContent: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});
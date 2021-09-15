import {
  ActivityIndicator,
  Dimensions,
  Image,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';

import Colors from '../theme/Colors';
import Icon from 'react-native-vector-icons/Ionicons';
import PlayButton from '../components/PlayButton';
import StarRating from 'react-native-star-rating';
import Video from '../components/Video';
import dateFormat from 'dateformat';
import {getMovie} from '../services/services';

const placeholderImage = require('../../assets/images/placeholder.png');
const {height, width} = Dimensions.get('screen');

const Detail = ({route, navigation}) => {
  const movieId = route.params.movieId;

  const [movieDetail, setMovieDetail] = useState();
  const [loaded, setLoaded] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    getMovie(movieId).then(movieData => {
      setMovieDetail(movieData);
      setLoaded(true);
    });
  }, [movieId]);

  const videoShown = () => {
    setModalVisible(!modalVisible);
  };

  return (
    <React.Fragment>
      {loaded && (
        <View>
          <ScrollView>
            <View style={{position: 'relative'}}>
              <Image
                resizeMode="contain"
                style={styles.image}
                source={
                  movieDetail.poster_path
                    ? {
                        uri:
                          'https://image.tmdb.org/t/p/w500' +
                          movieDetail.poster_path,
                      }
                    : placeholderImage
                }
              />
              <TouchableOpacity
                onPress={() => {
                  navigation.goBack();
                }}
                style={styles.button}>
                <Icon name={'chevron-back'} size={40} color={Colors.white} />
              </TouchableOpacity>
            </View>
            <View style={styles.container}>
              <View style={styles.playButton}>
                <PlayButton handlePress={videoShown} />
              </View>
              <Text style={styles.movieTitle}>{movieDetail.title}</Text>
              {movieDetail.genres && (
                <View style={styles.genresContainer}>
                  {movieDetail.genres.map(genre => {
                    return (
                      <Text style={styles.genre} key={genre.id}>
                        {genre.name}
                      </Text>
                    );
                  })}
                </View>
              )}
              <StarRating
                disabled={true}
                maxStars={5}
                starSize={30}
                rating={movieDetail.vote_average / 2}
                fullStarColor={'gold'}
              />
              <Text style={styles.overview}>{movieDetail.overview}</Text>

              <Text style={styles.release}>
                {'Release date: ' +
                  dateFormat(movieDetail.release_date, 'mmmm dS, yyyy')}
              </Text>
            </View>
          </ScrollView>
          <Modal
            supportedOrientations={['portrait', 'landscape']}
            animationType="slide"
            visible={modalVisible}>
            <View style={styles.videoModal}>
              <Video onClose={videoShown} />
            </View>
          </Modal>
        </View>
      )}
      {!loaded && <ActivityIndicator size="large" />}
    </React.Fragment>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    height: height / 2,
    backgroundColor: Colors.black,
  },
  movieTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 10,
  },
  genresContainer: {
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'center',
    width: width - 10,
    flexWrap: 'wrap',
    marginTop: 20,
    marginBottom: 20,
    // borderWidth: 1,
  },
  genre: {
    marginRight: 10,
    fontWeight: 'bold',
  },
  overview: {
    padding: 15,
  },
  release: {
    fontWeight: 'bold',
    paddingBottom: 50,
  },
  playButton: {
    position: 'absolute',
    top: -25,
    right: 20,
  },
  videoModal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
});

export default Detail;

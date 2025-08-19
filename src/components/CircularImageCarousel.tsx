import React, { useRef, useState, useEffect } from 'react';
import { View, Image, Animated, Dimensions, StyleSheet } from 'react-native';
import MaskedView from '@react-native-masked-view/masked-view';

const { width, height } = Dimensions.get('window');
const circleMaxRadius = Math.sqrt(width * width + height * height) / 2;

const CircularImageCarousel = ({ images, interval = 3000 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [transitioning, setTransitioning] = useState(false);
  const revealRadius = useRef(new Animated.Value(0)).current;
  const [nextIndex, setNextIndex] = useState(null);

  useEffect(() => {
    const timer = setInterval(() => {
      if (!transitioning) {
        const newIndex = (currentIndex + 1) % images.length;
        setNextIndex(newIndex);
        setTransitioning(true);
        revealRadius.setValue(0);

        Animated.timing(revealRadius, {
          toValue: circleMaxRadius,
          duration: 4000,
          useNativeDriver: false,
        }).start(() => {
          setCurrentIndex(newIndex);
          setTransitioning(false);
          setNextIndex(null);
        });
      }
    }, interval);

    return () => clearInterval(timer);
  }, [currentIndex, images, interval, transitioning, revealRadius]);

  const maskElement = (
    <View style={styles.centered}>
      <Animated.View
        style={{
          width: revealRadius.interpolate({
            inputRange: [0, circleMaxRadius],
            outputRange: [0, circleMaxRadius * 2],
          }),
          height: revealRadius.interpolate({
            inputRange: [0, circleMaxRadius],
            outputRange: [0, circleMaxRadius * 2],
          }),
          borderRadius: revealRadius,
          backgroundColor: 'black',
        }}
      />
    </View>
  );

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: images[currentIndex] }}
        style={styles.image}
        resizeMode="cover"
      />
      {transitioning && nextIndex !== null && (
        <MaskedView
          style={styles.absoluteFill}
          maskElement={maskElement}
        >
          <Image
            source={{ uri: images[nextIndex] }}
            style={styles.image}
            resizeMode="cover"
          />
        </MaskedView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width,
    height: 300,
    justifyContent: 'center',
    alignItems: 'center'
  },
  image: {
    width,
    height: 300,
    position: 'absolute'
  },
  absoluteFill: {
    ...StyleSheet.absoluteFillObject
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default CircularImageCarousel ;

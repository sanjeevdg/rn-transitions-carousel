import React, { useState, useRef, useEffect } from 'react';
import { View, Image, Dimensions, Animated, StyleSheet } from 'react-native';

const { width, height } = Dimensions.get('window');
const NUM_BLINDS = 10;

export default function VenetianBlindsCarousel({ images }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [transitioning, setTransitioning] = useState(false);
  const [nextIndex, setNextIndex] = useState(1);

  const anim = useRef(Array.from({ length: NUM_BLINDS }, () => new Animated.Value(0))).current;
  const timerRef = useRef();

  useEffect(() => {
    timerRef.current = setInterval(() => {
      if (!transitioning) {
        startTransition();
      }
    }, 3000);

    return () => clearInterval(timerRef.current);
  }, [currentIndex, transitioning]);

  const startTransition = () => {
    setTransitioning(true);
    const ni = (currentIndex + 1) % images.length;
    setNextIndex(ni);
    anim.forEach(val => val.setValue(0));
    const animations = anim.map((val, i) =>
      Animated.timing(val, {
        toValue: 1,
        duration: 700,
        delay: i * 120,
        useNativeDriver: false,
      })
    );
    Animated.stagger(100, animations).start(() => {
      setCurrentIndex(ni);
      setTransitioning(false);
    });
  };

  const renderBlinds = () => {
    if (!transitioning) return null;
    const blindWidth = width / NUM_BLINDS;
    return Array.from({ length: NUM_BLINDS }).map((_, i) => {
      const left = i * blindWidth;
      return (
        <Animated.View
          key={i}
          style={{
            position: 'absolute',
            top: 0,
            left,
            width: blindWidth,
            height,
            overflow: 'hidden',
            opacity: anim[i],
          }}
        >
          <Image
            source={{ uri: images[nextIndex] }}
            style={{ width, height, position: 'absolute', left: -left, top: 0 }}
            resizeMode="cover"
          />
        </Animated.View>
      );
    });
  };

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: images[currentIndex] }}
        style={styles.fullImage}
        resizeMode="cover"
      />
      {renderBlinds()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width,
    height,
    backgroundColor: '#222',
  },
  fullImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
});

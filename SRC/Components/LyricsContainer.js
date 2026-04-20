import { StyleSheet, View, ScrollView, Text } from 'react-native'
import React, { useEffect, useState, useRef } from 'react'
import CustomText from './CustomText'
import { windowWidth } from '../Utillity/utils'
import { moderateScale, scale, verticalScale } from 'react-native-size-matters'
import Color from '../Assets/Utilities/Color'
import { useProgress } from 'react-native-track-player'

const LyricsContainer = ({ lyrics, loading, error }) => {
  const { position } = useProgress(250);
  const [parsedLyrics, setParsedLyrics] = useState([]);
  const scrollViewRef = useRef(null);

  useEffect(() => {
    if (!lyrics) return;

    // Parse LRC format or plain text
    const lines = typeof lyrics === 'string' ? lyrics.split('\n') : lyrics;
    const parsed = [];
    const regex = /\[(\d{2}):(\d{2}(?:\.\d{2,3})?)\](.*)/;
    const syllableRegex = /<(\d{2}):(\d{2}(?:\.\d{2,3})?)>([^<]*)/g;

    lines.forEach(line => {
      const match = typeof line === 'string' ? line.match(regex) : null;
      if (match) {
        const minutes = parseInt(match[1], 10);
        const seconds = parseFloat(match[2]);
        const time = minutes * 60 + seconds;
        let text = match[3].trim();

        // Detect syllable timing where possible
        let syllables = [];
        let cleanText = "";

        if (text.includes('<') && text.includes('>')) {
          let sylMatch;
          while ((sylMatch = syllableRegex.exec(text)) !== null) {
            const sm = parseInt(sylMatch[1], 10);
            const ss = parseFloat(sylMatch[2]);
            syllables.push({ time: (sm * 60) + ss, text: sylMatch[3] });
            cleanText += sylMatch[3];
          }
        }

        if (syllables.length === 0) {
          cleanText = text;
          syllables = null; // No syllable data
        }

        parsed.push({ time, text: cleanText || '♪', syllables });
      } else {
        // Fallback for plain text lyrics
        const text = typeof line === 'string' ? line.trim() : line;
        if (text) parsed.push({ time: -1, text, syllables: null });
      }
    });

    // Adjust for pauses, beats, and instrumental gaps
    const finalParsed = [];
    parsed.forEach((line, i) => {
      finalParsed.push(line);
      const nextLine = parsed[i + 1];

      if (nextLine && nextLine.time !== -1 && line.time !== -1) {
        if (nextLine.time - line.time > 12) {
          finalParsed.push({
            time: line.time + 4,
            text: '• • • ♪ • • •',
            syllables: null
          });
        }
      }
    });

    setParsedLyrics(finalParsed);
  }, [lyrics]);

  // Find current active lyric
  // Shift lyrics slightly earlier (Negative offset triggers earlier display, e.g. 0.3s)
  const LATENCY_OFFSET = -0.30;
  let activeIndex = -1;
  const currentPos = position - LATENCY_OFFSET;
  for (let i = 0; i < parsedLyrics.length; i++) {
    if (parsedLyrics[i].time !== -1 && currentPos >= parsedLyrics[i].time) {
      activeIndex = i;
    } else if (parsedLyrics[i].time !== -1 && currentPos < parsedLyrics[i].time) {
      break;
    }
  }

  // Scroll to active lyric
  useEffect(() => {
    if (activeIndex !== -1 && scrollViewRef.current && parsedLyrics.length > 0) {
      let scrollOffset = (activeIndex * verticalScale(30)) - verticalScale(60);
      if (scrollOffset < 0) scrollOffset = 0;
      scrollViewRef.current.scrollTo({ y: scrollOffset, animated: true });
    }
  }, [activeIndex]);

  return (
    <View style={styles.container}>
      <CustomText
        isBold={true}
        children={loading ? "Loading Lyrics..." : error ? "Error Loading Lyrics" : "Show Lyrics"}
        style={styles.heading}
      />
      <ScrollView
        ref={scrollViewRef}
        contentContainerStyle={styles.textContainer}
        showsVerticalScrollIndicator={false}
        style={{ height: verticalScale(200) }}
      >
        {parsedLyrics.length > 0 ? (
          parsedLyrics?.map((item, index) => {
            const isActive = index === activeIndex;
            return (
              <CustomText
                key={index}
                isBold={isActive}
                style={[
                  styles.text,
                  {
                    color: isActive ? Color.green : Color.lightGrey,
                    fontSize: isActive ? moderateScale(15, 0.2) : moderateScale(11, 0.2),
                    lineHeight: verticalScale(22)
                  }
                ]}
              >
                {item.syllables && isActive ? (
                  item.syllables.map((syl, i) => {
                    const isSylActive = currentPos >= syl.time;
                    return (
                      <Text key={i} style={{ color: isSylActive ? Color.white : Color.mediumGray }}>
                        {syl.text}
                      </Text>
                    );
                  })
                ) : (
                  item.text
                )}
              </CustomText>
            );
          })
        ) : (
          <CustomText style={styles.text}>No lyrics to display.</CustomText>
        )}
      </ScrollView>
    </View>
  )
}

export default LyricsContainer

const styles = StyleSheet.create({
  container: {
    backgroundColor: Color.black,
    width: windowWidth * 0.8,
    alignSelf: "center",
    gap: verticalScale(10),
    marginTop: verticalScale(20),
    borderRadius: moderateScale(12, 0.2),
    paddingVertical: verticalScale(20),
    paddingHorizontal: scale(10),

  },

  heading: {
    fontSize: moderateScale(15, 0.2),
    color: Color.white
  },
  textContainer: {
    alignItems: "center",
    gap: verticalScale(10),
    paddingVertical: verticalScale(10)
  },
  text: {
    fontSize: moderateScale(12, 0.2),
    color: Color.mediumGray

  }
})
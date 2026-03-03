import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import Colors from '@/constants/Colors';
import { Fonts, TextStyles } from '@/constants/Typography';

export default function AboutScreen() {
  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.titleSection}>
          <Text style={styles.title}>About Us</Text>
        </View>

        <View style={styles.starSection}>
          <Image 
            source={require('../assets/images/Sign-up Page/star.png')}
            style={styles.star}
          />
        </View>

        <View style={styles.textSection}>
          <Text style={styles.paragraph}>
            Dear Neighbor,
          </Text>
          <Text style={styles.paragraph}>
            At The Neighbor, our founding principle is that the world is one big nursery of grown babies. It all started because we, Skander and Paul, kept noticing the same thing over and over again. When entering the corner shop, speaking to the waiter, joking in the office hour, there was always this moment where, with the right question, it was as though someone cracked open completely.
          </Text>
        </View>

        <View style={styles.imagesSection}>
          <View style={styles.imageContainer}>
            <Image 
              source={require('../assets/images/Image Assets/6. About/baby-ska.png')}
              style={styles.babyImage}
            />
            <Text style={styles.imageName}>Ska</Text>
          </View>
          <View style={styles.imageContainer}>
            <Image 
              source={require('../assets/images/Image Assets/6. About/baby-paul.png')}
              style={styles.babyImage}
            />
            <Text style={styles.imageName}>Paul</Text>
          </View>
        </View>

        <View style={styles.textSection}>
          <Text style={styles.paragraph}>
            When revealed, the person would shrink down into a child-like version of themselves, and conversation would begin flowing like a river. We noticed that this came out most clearly when people spoke of something that they loved. Whether the two closing notes of the Rachmaninoff Sonata or their new dog, it always evoked the same energy. In the current of their words, they forget everything about the image of themselves they are trying to project, and we begin to clearly see the treasure of their being. The conversation takes on a new, immersive, living rhythm. All of a sudden, the room feels like grown, fully-dressed babies speaking to one another!
          </Text>
          <Text style={styles.paragraph}>
            These experiences were so visceral and exciting to us. People who appeared very closed-off and solemn would all of a sudden feel like sophisticated babies wearing the finest diapers. It felt like we could, for a brief instant, return to the kids playground and immerse ourselves in the story of another kid, giving it the justice it deserves, experiencing it as if it were our own. 
          </Text>
          <Text style={styles.paragraph}>
            Could it be that we were all babies? After years of research, we reached a peer-reviewed conclusion that this was empirically, irrefutably the case… The person living next door, down the street, across town, has something different to say about their human experience. Our editorial compass thus aims to bottle up this truth, vulnerability and unique reality of being a human. The Neighbor creates a growing archive of such playground stories.
          </Text>
          <Text style={styles.closing}>
            Please enjoy,{'\n'}
            Ska & Paul
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },

  scrollView: {
    flex: 1,
  },

  scrollContent: {
    paddingBottom: 60,
  },

  titleSection: {
    width: '100%',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
    alignItems: 'center',
  },

  title: {
    fontFamily: Fonts.title,
    fontSize: 37,
    letterSpacing: -0.03 * 37,
    lineHeight: 37 * 1.1,
    color: Colors.text,
  },

  starSection: {
    width: '100%',
    paddingVertical: 15,
    alignItems: 'center',
  },

  star: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
  },

  textSection: {
    width: '100%',
    paddingHorizontal: 30,
  },

  paragraph: {
    fontFamily: Fonts.body,
    fontSize: 17,
    lineHeight: 26,
    color: Colors.text,
    marginBottom: 18,
  },

  closing: {
    fontFamily: Fonts.body,
    fontSize: 17,
    lineHeight: 26,
    color: Colors.text,
    marginTop: 10,
  },

  imagesSection: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingVertical: 30,
    paddingHorizontal: 30,
    gap: 30,
  },

  imageContainer: {
    alignItems: 'center',
  },

  babyImage: {
    width: 140,
    height: 140,
    resizeMode: 'contain',
  },

  imageName: {
    fontFamily: Fonts.body,
    fontSize: 17,
    fontWeight: '500',
    color: Colors.text,
    marginTop: 8,
    textAlign: 'center',
  },
});

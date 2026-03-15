import * as Font from 'expo-font';
import { useState, useEffect } from 'react';

export function useFontAssets() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    Font.loadAsync({
      'Bricolage Grotesque': require('../../assets/fonts/BricolageGrotesque-Regular.ttf'),
      'Bricolage Grotesque Bold': require('../../assets/fonts/BricolageGrotesque-ExtraBold.ttf'),
    }).then(() => setLoaded(true));
  }, []);

  return loaded;
}

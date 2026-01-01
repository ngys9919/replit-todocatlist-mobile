// Ensure real timers are used for React Native Testing Library
jest.useRealTimers();

jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock')
);

jest.mock('expo-haptics', () => ({
  impactAsync: jest.fn(),
  ImpactFeedbackStyle: {
    Light: 'light',
    Medium: 'medium',
    Heavy: 'heavy',
  },
}));

jest.mock('react-native-worklets', () => ({
  scheduleOnRN: jest.fn((fn, ...args) => fn?.(...args)),
  scheduleOnJS: jest.fn((fn, ...args) => fn?.(...args)),
  scheduleOnUI: jest.fn((fn, ...args) => fn?.(...args)),
}));

jest.mock('react-native-gesture-handler', () => {
  const View = require('react-native').View;
  return {
    Swipeable: View,
    DrawerLayout: View,
    State: {},
    ScrollView: View,
    Slider: View,
    Switch: View,
    TextInput: View,
    ToolbarAndroid: View,
    ViewPagerAndroid: View,
    DrawerLayoutAndroid: View,
    WebView: View,
    NativeViewGestureHandler: View,
    TapGestureHandler: View,
    FlingGestureHandler: View,
    ForceTouchGestureHandler: View,
    LongPressGestureHandler: View,
    PanGestureHandler: View,
    PinchGestureHandler: View,
    RotationGestureHandler: View,
    RawButton: View,
    BaseButton: View,
    RectButton: View,
    BorderlessButton: View,
    FlatList: View,
    gestureHandlerRootHOC: (Component) => Component,
    Directions: {},
    GestureHandlerRootView: View,
    Gesture: {
      Tap: () => ({ onEnd: () => ({}) }),
      Pan: () => ({ onUpdate: () => ({}) }),
    },
    GestureDetector: ({ children }) => children,
  };
});

jest.mock('react-native-reanimated', () => {
  const actualRN = jest.requireActual('react-native');
  
  const mockReanimated = {
    call: jest.fn(),
    createAnimatedComponent: (component) => component,
    addWhitelistedNativeProps: jest.fn(),
    addWhitelistedUIProps: jest.fn(),
    Value: jest.fn(),
    event: jest.fn(),
    add: jest.fn(),
    eq: jest.fn(),
    set: jest.fn(),
    cond: jest.fn(),
    interpolate: jest.fn(),
    View: actualRN.View,
    Text: actualRN.Text,
    Image: actualRN.Image,
    ScrollView: actualRN.ScrollView,
    useAnimatedStyle: () => ({}),
    useSharedValue: (initial) => ({ value: initial }),
    useDerivedValue: (fn) => ({ value: fn() }),
    withTiming: (val) => val,
    withSpring: (val) => val,
    withDelay: (_, val) => val,
    withSequence: (...vals) => vals[0],
    runOnJS: (fn) => fn,
    runOnUI: (fn) => fn,
    FadeIn: { duration: () => ({ delay: () => ({}) }) },
    FadeOut: { duration: () => ({ delay: () => ({}) }) },
    SlideInDown: { duration: () => ({ delay: () => ({}) }) },
    SlideOutDown: { duration: () => ({ delay: () => ({}) }) },
    Layout: { duration: () => ({}) },
    Easing: {
      ease: jest.fn(),
      linear: jest.fn(),
      bezier: () => jest.fn(),
    },
  };
  
  mockReanimated.default = mockReanimated;
  return mockReanimated;
});

jest.mock('@react-navigation/native', () => {
  const actualNav = jest.requireActual('@react-navigation/native');
  return {
    ...actualNav,
    useNavigation: () => ({
      navigate: jest.fn(),
      replace: jest.fn(),
      goBack: jest.fn(),
    }),
  };
});

jest.mock('@react-navigation/elements', () => ({
  useHeaderHeight: () => 100,
  HeaderButton: ({ children }: { children: React.ReactNode }) => children,
}));

jest.mock('react-native-safe-area-context', () => {
  const insets = { top: 44, bottom: 34, left: 0, right: 0 };
  return {
    useSafeAreaInsets: () => insets,
    SafeAreaProvider: ({ children }: { children: React.ReactNode }) => children,
  };
});

jest.mock('expo-glass-effect', () => ({
  isLiquidGlassAvailable: () => false,
  GlassView: ({ children }: { children: React.ReactNode }) => children,
}));

global.console = {
  ...console,
  error: jest.fn(),
  warn: jest.fn(),
};

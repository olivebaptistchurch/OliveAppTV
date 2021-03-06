// const darkBlue = '#173a64';
// const blue = '#005F86';
const lightBlue = '#71c5e8';
// const darkGray = '#545859';
const transparent = '#00000066';
const lightGray = '#d0d3d4';
// const darkGreen = '#6a7866';
// const lightGreen = '#a2b390';
const defaultFontFamily = 'Helvetica';

const theme = {
  tabBar: {
    style: {},
    options: {
      activeTintColor: '#FFFFFF',
      inactiveTintColor: lightGray,
      pressOpacity: 0.7,
      style: {
        position: 'absolute',
        width: 350,
        marginTop: 50,
        left: 800,
        backgroundColor: transparent,
        borderRadius: 50,
      },
      indicatorStyle: {
        height: 0,
        backgroundColor: lightBlue,
      },
      tabStyle: {
        height: 70,
      },
      labelStyle: {
        fontSize: 30,
        fontWeight: 'bold',
        fontFamily: defaultFontFamily,
        textTransform: 'capitalize',
      },
    },
  },
};

export default theme;

const UPDATES_PER_SECOND = 30;
const UPDATE_DELTA = 1000 / UPDATES_PER_SECOND;

const HOME_SCENE = 0;
const LEVEL_SELECT_SCENE = 1;
const MAIN_SCENE = 2;
const BUILDER_SCENE = 3;

const DIRECTION_UP = 0;
const DIRECTION_RIGHT = 1;
const DIRECTION_DOWN = 2;
const DIRECTION_LEFT = 3;

const INPUT_TRIGGER_DISTANCE = 10;

const ENTITY_ACCELERATION = 0.005;
const ENTITY_MAX_SPEED = 0.015;

const ENTITY_STROKE_WIDTH = 0.0625;
const MOVING_BLOCK_CORNER_RADIUS = 0.2

const LEVEL_STRINGS = [
    "bbbbbbbb     bb bbb bb b   bb bbbbbb     bbbbbbbb&p5,5*1,5*3,1*5,3g3,3&d2",
    "bbbbbbbbbbbbbbbbbbbb     bbbb bbb bb   bbb bbbbbbbb bbbbbb    bbbbbbb  bbbbbbbbbb&p0,4*2,2*6,3*7,7g4,6&d2",
    " b  bbbbb        b   bbbb b   bbbb b   bbbb bb        bb b bb b   b bb b   b bbbb&p4,8*8,5*2,0*0,7g7,7&d2",
    "b  b  bb     bb     bbb   bbb     bbbb   b   >   &p0,6*4,0*1,2*1,4g5,4&d2",
    "b   bbbbbbvb b    b b      bbbb    bbb^bb bbb    &p1,0*0,2*3,6*6,4g5,1&d2",
    "b    b    b      >     < &*3,1*1,1*2,1g2,0p0,4&d2",
    "   >   bbb  b bb  v  bb                ^    ^    &p0,0*2,3*5,2*0,4g5,5&d2",
    "bb   bbbbbb   bbbbbb  <   bbbb  bb bbbb  bb bbbb  bb b    >    bbb     bbbbb   bb&p0,6*7,7*5,6*5,2g3,1&d2",
    "       bvbb bb  b  <  bbbbbb    bbbb     bbbbbbbb&p5,0m6,2*0,0*1,2*1,5g5,5&d2",
    "b   b       b    b       &p0,4m1,4*0,1*2,0*4,1g2,4&d2",
    "  b       b   b          &p0,4m4,1*4,0*2,1*0,0g1,2&d2",
    "b   bbbbb  bbbbbb bbbb   bbbb    bbb  ^bbbbbb   b&p5,6m4,4*1,0*2,1*2,4g3,0&d2",
    "bbbbbbbbbbb bbbbbb bb       bb bbbbbb bbbbbbbbbbb&p0,3m2,5m4,1*2,4*3,3*4,2g6,3&d3",
    "bbb    bbb bb     bb bbb bb     bb bbb bb bbb    &p6,6m1,2m1,4*6,3*3,3*0,2g0,4&d2",
    "bbb bbbbb   bbbbb b         bbb b  bbb    bbb bb &p4,1m3,4m3,5m3,6*2,1*6,5*4,3g0,3&d2",
    "      v   > < v ^ >     ^&p1,0m2,0m3,0m4,0*0,4*3,4*2,1g4,1&d0",
    "  > <   b ^ b        bb    b              b     b&m0,5p1,0m6,5*2,5g4,5*0,2*6,0&d2",
    "    b          b     bbbbbb b    b >    <  ^  ^  &p1,4m1,5*6,6m0,2*3,1*0,0g3,4&d2",
    "   <          ^   b      b  bb  b                &*2,4*4,1m0,6p1,6*0,5g3,4&d2",
    "b bbbbbbb   bbbbbbb bbbbbbb        b         b b     bb          b      b^      b&p2,1m1,6m1,7g0,1m1,5*0,7*8,4*3,7&d2"
];

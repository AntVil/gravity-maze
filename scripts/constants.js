const UPDATES_PER_SECOND = 30;
const UPDATE_DELTA = 1000 / UPDATES_PER_SECOND;

const HOME_SCENE = 0;
const LEVEL_SELECT_SCENE = 1;
const MAIN_SCENE = 2;

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
    "bb   bbbbbb   bbbbbb  <   bbbb  bb bbbb  bb bbbb  bb b    >    bbb     bbbbb   bb&p0,6*7,7*5,6*5,2g3,1&d2",
    "       bvbb bb  b  <  bbbbbb    bbbb     bbbbbbbb&p5,0m6,2*0,0*1,2*1,5g5,5&d2"
];

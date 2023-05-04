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

const ENTITY_SPEED = 0.01;

const ENTITY_STROKE_WIDTH = 0.0625;

const LEVEL_STRINGS = [
    "bbbbbbbbbbbbbbbbbbbb     bbbb bbb bb   bbb bbbbbbbb bbbbbb    bbbbbbb  bbbbbbbbbb&p0,4*2,2*6,3*7,7g4,6&d2",
    " b  bbbbb        b   bbbb b   bbbb b   bbbb bb        bb b bb b   b bb b   b bbbb&p4,8*8,5*2,0*0,7g7,7&d2",
    "bb   bbbbbb   bbbbbb  <   bbbb  bb bbbb  bb bbbb  bb b    >    bbb     bbbbb   bb&p0,6*7,7*5,6*5,2g3,1&d2"
];

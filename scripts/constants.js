const UPDATES_PER_SECOND = 30;
const UPDATE_DELTA = 1000 / UPDATES_PER_SECOND;

const VOLUME_MAX = 0.1;

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

const GRID_PADDING = 0.035;
const ENTITY_STROKE_WIDTH = 0.0625;
const MOVING_BLOCK_CORNER_RADIUS = 0.2

const LEVEL_STRINGS = [
    "bbbbbbbb     bb bbb bb b   bb bbbbbb     bbbbbbbb&p5,5*1,5*3,1*5,3g3,3&d2",
    "bbbbbbbbbbbbbbbbbbbb     bbbb bbb bb   bbb bbbbbbbb bbbbbb    bbbbbbb  bbbbbbbbbb&p0,4*2,2*6,3*7,7g4,6&d2",
    " b  bbbbb        b   bbbb b   bbbb b   bbbb bb        bb b bb b   b bb b   b bbbb&p4,8*8,5*2,0*0,7g7,7&d2",
    "    b      b  b     b   b          b    b b      &p0,1g2,5*6,0*4,5*0,3&d2",
    "b  b  bb     bb     bbb   bbb     bbbb   b   >   &p0,6*4,0*1,2*1,4g5,4&d2",
    "b   bbbbbbvb b    b b      bbbb    bbb^bb bbb    &p1,0*0,2*3,6*6,4g5,1&d2",
    "b    b    b      >     < &*3,1*1,1*2,1g2,0p0,4&d2",
    "   >   bbb  b bb  v  bb                ^    ^    &p0,0*2,3*5,2*0,4g5,5&d2",
    "bb   bbbbbb   bbbbbb  <   bbbb  bb bbbb  bb bbbb  bb b    >    bbb     bbbbb   bb&p0,6*7,7*5,6*5,2g3,1&d2",
    " b   b   v  <     >       bb                bb   &p6,0*3,2*2,5*0,6g5,5&d0",
    "       bvbb bb  b  <  bbbbbb    bbbb     bbbbbbbb&p5,0m6,2*0,0*1,2*1,5g5,5&d2",
    "b   b       b    b       &p0,4m1,4*0,1*2,0*4,1g2,4&d2",
    "  b       b   b          &p0,4m4,1*4,0*2,1*0,0g1,2&d2",
    "b   bbbbb  bbbbbb bbbb   bbbb    bbb  ^bbbbbb   b&p5,6m4,4*1,0*2,1*2,4g3,0&d2",
    "bb      bbbbb  b      bbb bb b              b    &p2,0m3,0m4,0*6,4*6,2*1,6g0,1&d2",
    "bbbbbbbbbbb bbbbbb bb       bb bbbbbb bbbbbbbbbbb&p0,3m2,5m4,1*2,4*3,3*4,2g6,3&d3",
    "bbb    bbb bb     bb bbb bb     bb bbb bb bbb    &p6,6m1,2m1,4*6,3*3,3*0,2g0,4&d2",
    "bbb bbbbb   bbbbb b         bbb b  bbb    bbb bb &p4,1m3,4m3,5m3,6*2,1*6,5*4,3g0,3&d2",
    "      v   > < v ^ >     ^&p1,0m2,0m3,0m4,0*0,4*3,4*2,1g4,1&d0",
    "  > <   b ^ b        bb    b              b     b&m0,5p1,0m6,5*2,5g4,5*0,2*6,0&d2",
    "    b          b     bbbbbb b    b >    <  ^  ^  &p1,4m1,5*6,6m0,2*3,1*0,0g3,4&d2",
    "   <          ^   b      b  bb  b                &*2,4*4,1m0,6p1,6*0,5g3,4&d2",
    "  b   bb                  v       b b     bb b  b      bbb   b    bvbbb b       ^&*8,3p0,6m8,0m0,0*4,7*6,3g7,5&d0",
    "b bbbbbbb   bbbbbbb bbbbbbb        b         b b     bb          b      b^      b&p2,1m1,6m1,7g0,1m1,5*0,7*8,4*3,7&d2",
    "                     > < &*1,3*3,3*2,1p0,0g4,4c4,0,H,H,H,H&d0",
    "          ^              &*2,3*3,3g1,3p4,4*0,0c4,0,H,H,H,H,.,v,v,v,v&d1",
    "              b b  b   ^ &p4,4c2,1,H,H*2,3*1,2g2,2*0,0&d2",
    "                  b      &p1,4*2,3*3,2*0,0g2,2c0,4,h,h,h,h,V,V,V,Vc1,3,V,V,h,h&d2",
    "  bbb                    &p0,4c4,4,V,V,V,H,H,H,H,v,v*3,3*1,2*4,1g2,2&d2",
    "                            b     bbb    bbbbbbbb&p3,2c3,3,H,H,.,h,h*5,5*4,1*2,1g1,4&d2",
    "b bbbbbb      b                   b       b bb   &p6,6*1,6*5,2*2,4g0,3c3,3,H,H&d2",
    "   bbbb    bbb b   bb       bb   b bbb    bbbb   &p0,0c2,3,h,h*4,2*2,4*5,5g1,1&d0",
    "b bbb bb     b   <             b   b     bb     b&p1,0c1,6,h,h,h,h*6,4*5,0*0,2c2,1,h,hg3,3&d0",
    "  bb    b b b     bb      b            b   b     &p1,0*2,1*0,6*3,2g4,1c2,4,H,H&d2",
    "       bbbb   b   b  b   <  bbb         b  <     &p1,0*4,5*2,2*4,1g0,0c1,3,h,hm1,2&d2",
    "b   b  b   b              b b      b   bbbb      &c1,6,Vm1,5p6,6*1,4*0,2*6,0g4,3&d2",
    "bbb      bbb                  bbb   bbbb bbb  >     b   bbbbbb     b           b &g2,5m0,3m8,8c8,7,v,.,V,V,V,V,V,V,V*3,5*5,5*4,4p6,5&d2",
    "bbb    bbbbb             bbb b^bbbbb  b  b   vvb                      bb   b   bb&p6,0m5,0*1,3*5,1*3,7g8,1&d20",
    "   b      b      b       b       >       b       &p6,6c0,6,V,V*5,5*4,2g6,4m1,6*0,0&d2",
    "bb  b  b   b  b     b                    b       &p6,6c0,3,h,h,h*1,5*5,5*3,1g2,5&d2",
    "bbbb    >v bb^< bbbb bbbb&*4,0*3,2*0,4m1,1p2,1g0,1&d2",
    "  b               b  b b b b                     &c0,4,h,h,hc3,0,h,h,hp6,6g6,2*0,5*3,3*5,3&d2",
    "bbb bbb    bb bbb bb bbb  b bb  bb b   bb        &p0,1c3,0,v,vc3,2,v,vc3,4,v,v*4,3*2,5*4,6g6,1&d0",
    "     bbbb    b bbbb      &p0,2t2,2,0,0*4,0*4,4*0,4g1,2&d2",
    "bbbbbbbb     bbbbbbbb                            &p0,6t3,1,3,6*5,1*1,1*6,6g3,3&d2",
    "bbbb   bbbb   bbbb   bbbbbbb   bbbb   bbbb   bbbb&t2,4,4,2p0,6*0,4*4,0*6,2g2,6&d2",
    "bb bbbb bb      bbb  bbb &p0,2d3,2,2,0*0,4*2,1*4,2g4,4&d0",
    "     bbb       bbbb      &p0,4m0,0d2,0,3,4*4,4*4,0*2,2g0,2&d2"
];

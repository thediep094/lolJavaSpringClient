export interface IChampionInformation {
  version: String;
  id: String;
  key: String;
  name: String;
  title: String;
  blurb: String;
  info: {
    attack: Number;
    defense: Number;
    magic: Number;
    difficulty: Number;
  };
  image: {
    full: String;
    sprite: String;
    group: String;
    x: Number;
    y: Number;
    w: Number;
    h: Number;
  };
  tags: String[];
  partype: String;
  stats: {
    hp: Number;
    hpperlevel: Number;
    mp: Number;
    mpperlevel: Number;
    movespeed: Number;
    armor: Number;
    armorperlevel: Number;
    spellblock: Number;
    spellblockperlevel: Number;
    attackrange: Number;
    hpregen: Number;
    hpregenperlevel: Number;
    mpregen: Number;
    mpregenperlevel: Number;
    crit: Number;
    critperlevel: Number;
    attackdamage: Number;
    attackdamageperlevel: Number;
    attackspeedperlevel: Number;
    attackspeed: Number;
  };
}

export interface IChampions {
  data: IChampionInformation[];
  format: String;
  type: String;
  version: String;
}

/* ═══════════════════════════════════════════════════════════════════════════
   SCA FLAVOR WHEEL — 3-tier taxonomy
   ═══════════════════════════════════════════════════════════════════════════ */

export const WHEEL = [
  { cat: 'floral', en: 'FLORAL', ja: 'フローラル', color: '#9994C2', subs: [
    { en: 'Black Tea', ja: '紅茶', leaves: [
      { en: 'Black Tea', ja: '紅茶', match: ['ブラックティー', '紅茶'] },
    ]},
    { en: 'Floral', ja: 'フローラル', leaves: [
      { en: 'Chamomile', ja: 'カモミール', match: ['カモミール'] },
      { en: 'Rose',      ja: 'ローズ',     match: ['ローズ', 'ばら'] },
      { en: 'Jasmine',   ja: 'ジャスミン', match: ['ジャスミン'] },
    ]},
  ]},
  { cat: 'fruity', en: 'FRUITY', ja: 'フルーティ', color: '#8B3344', subs: [
    { en: 'Berry', ja: 'ベリー', leaves: [
      { en: 'Blackberry', ja: 'ブラックベリー', match: ['ブラックベリー'] },
      { en: 'Raspberry',  ja: 'ラズベリー',     match: ['ラズベリー'] },
      { en: 'Blueberry',  ja: 'ブルーベリー',   match: ['ブルーベリー', 'ブラックカラント'] },
      { en: 'Strawberry', ja: 'ストロベリー',   match: ['ストロベリー'] },
      { en: 'Berry',      ja: 'ベリー',         match: ['ベリー'] },
    ]},
    { en: 'Dried Fruit', ja: 'ドライフルーツ', leaves: [
      { en: 'Raisin',     ja: 'レーズン',       match: ['レーズン', 'ドライフルーツ'] },
      { en: 'Prune',      ja: 'プルーン',       match: ['プルーン'] },
    ]},
    { en: 'Other Fruit', ja: 'その他フルーツ', leaves: [
      { en: 'Coconut',    ja: 'ココナッツ',     match: ['ココナッツ'] },
      { en: 'Cherry',     ja: 'チェリー',       match: ['チェリー'] },
      { en: 'Pomegranate',ja: 'ザクロ',         match: ['ザクロ'] },
      { en: 'Pineapple',  ja: 'パイナップル',   match: ['パイナップル', 'トロピカル'] },
      { en: 'Grape',      ja: 'グレープ',       match: ['グレープ'] },
      { en: 'Apple',      ja: 'アップル',       match: ['アップル', 'りんご'] },
      { en: 'Peach',      ja: 'ピーチ',         match: ['ピーチ', '桃'] },
      { en: 'Pear',       ja: 'ペアー',         match: ['ペアー', '梨'] },
    ]},
    { en: 'Citrus', ja: '柑橘', leaves: [
      { en: 'Grapefruit', ja: 'グレープフルーツ', match: ['グレープフルーツ'] },
      { en: 'Orange',     ja: 'オレンジ',         match: ['オレンジ', 'オレンジピール'] },
      { en: 'Lemon',      ja: 'レモン',           match: ['レモン'] },
      { en: 'Lime',       ja: 'ライム',           match: ['ライム'] },
      { en: 'Citrus',     ja: 'シトラス',         match: ['シトラス', 'ベルガモット'] },
    ]},
  ]},
  { cat: 'sour', en: 'SOUR · FERMENT', ja: '酸味・発酵', color: '#A89A36', subs: [
    { en: 'Sour', ja: '酸味', leaves: [
      { en: 'Sour Arom.',  ja: '酸味系',         match: ['酸味'] },
      { en: 'Acetic',      ja: '酢酸',            match: [] },
      { en: 'Butyric',     ja: '酪酸',            match: [] },
      { en: 'Isovaleric',  ja: 'イソ吉草酸',       match: [] },
      { en: 'Citric',      ja: 'クエン酸',         match: ['ジューシー'] },
      { en: 'Malic',       ja: 'リンゴ酸',         match: [] },
    ]},
    { en: 'Alcohol · Ferment', ja: 'アルコール発酵', leaves: [
      { en: 'Winey',       ja: 'ワイン',          match: ['ワイン', 'ワイニー'] },
      { en: 'Whiskey',     ja: 'ウィスキー',      match: ['ラム', 'ウィスキー'] },
      { en: 'Fermented',   ja: '発酵',            match: ['発酵感', '発酵', '乳酸', 'ヨーグルト', '発酵フルーツ'] },
      { en: 'Overripe',    ja: '熟成',            match: [] },
    ]},
  ]},
  { cat: 'green', en: 'GREEN · VEG', ja: 'グリーン', color: '#4A7E6F', subs: [
    { en: 'Olive Oil', ja: 'オリーブ油', leaves: [
      { en: 'Olive Oil',   ja: 'オリーブ油',      match: [] },
    ]},
    { en: 'Raw', ja: '生', leaves: [
      { en: 'Raw',         ja: '生',              match: [] },
    ]},
    { en: 'Green · Veg', ja: '植物', leaves: [
      { en: 'Under-ripe',  ja: '未熟',            match: [] },
      { en: 'Peapod',      ja: '青豆',            match: [] },
      { en: 'Fresh',       ja: 'フレッシュ',      match: ['クリーン', 'フレッシュ'] },
      { en: 'Dark Green',  ja: '濃緑',            match: [] },
      { en: 'Vegetative',  ja: '植物的',          match: [] },
      { en: 'Hay-like',    ja: '干し草',          match: ['ジャングル'] },
      { en: 'Herb-like',   ja: 'ハーブ',          match: ['ハーバル'] },
    ]},
    { en: 'Beany', ja: '豆様', leaves: [
      { en: 'Beany',       ja: '豆様',            match: [] },
    ]},
  ]},
  { cat: 'other', en: 'OTHER', ja: 'その他', color: '#506988', subs: [
    { en: 'Papery · Musty', ja: '紙・カビ', leaves: [
      { en: 'Stale',       ja: '古い',            match: [] },
      { en: 'Cardboard',   ja: '段ボール',        match: [] },
      { en: 'Papery',      ja: '紙',              match: [] },
      { en: 'Woody',       ja: 'ウッディ',         match: ['ウッディ', 'シダー'] },
      { en: 'Moldy',       ja: 'カビ',            match: [] },
      { en: 'Musty',       ja: 'マスティ',         match: [] },
      { en: 'Earthy',      ja: 'アーシー',         match: ['アーシー'] },
      { en: 'Animalic',    ja: 'アニマル',         match: [] },
      { en: 'Meaty',       ja: 'ミーティー',       match: [] },
      { en: 'Phenolic',    ja: 'フェノール',       match: [] },
    ]},
    { en: 'Chemical', ja: 'ケミカル', leaves: [
      { en: 'Bitter',      ja: '苦味',             match: ['苦味強'] },
      { en: 'Salty',       ja: '塩味',             match: [] },
      { en: 'Medicinal',   ja: '薬品',             match: [] },
      { en: 'Petroleum',   ja: '石油',             match: [] },
      { en: 'Skunky',      ja: 'スカンク',         match: [] },
      { en: 'Rubber',      ja: 'ゴム',             match: [] },
    ]},
  ]},
  { cat: 'roasted', en: 'ROASTED', ja: 'ロースト', color: '#33373E', subs: [
    { en: 'Pipe Tobacco', ja: 'パイプタバコ', leaves: [
      { en: 'Pipe Tobacco', ja: 'パイプタバコ', match: ['タバコ'] },
    ]},
    { en: 'Tobacco', ja: 'タバコ葉', leaves: [
      { en: 'Tobacco',     ja: 'タバコ葉',         match: [] },
    ]},
    { en: 'Burnt', ja: 'バーント', leaves: [
      { en: 'Acrid',       ja: '刺激',             match: [] },
      { en: 'Ashy',        ja: '灰',               match: [] },
      { en: 'Smoky',       ja: 'スモーキー',       match: ['スモーキー', 'ボディ強', 'ボディ強め'] },
      { en: 'Brown Roast', ja: '深焙煎',           match: [] },
    ]},
    { en: 'Cereal', ja: '穀物', leaves: [
      { en: 'Grain',       ja: '穀物',             match: [] },
      { en: 'Malt',        ja: 'モルト',           match: [] },
    ]},
  ]},
  { cat: 'spices', en: 'SPICES', ja: 'スパイス', color: '#7E3D44', subs: [
    { en: 'Pungent', ja: '刺激系', leaves: [
      { en: 'Pungent',     ja: '刺激',             match: [] },
    ]},
    { en: 'Pepper', ja: 'ペッパー', leaves: [
      { en: 'Pepper',      ja: 'ペッパー',         match: ['スパイス'] },
    ]},
    { en: 'Brown Spice', ja: 'ブラウンスパイス', leaves: [
      { en: 'Anise',       ja: 'アニス',           match: [] },
      { en: 'Nutmeg',      ja: 'ナツメグ',         match: [] },
      { en: 'Cinnamon',    ja: 'シナモン',         match: ['シナモン'] },
      { en: 'Clove',       ja: 'クローブ',         match: [] },
    ]},
  ]},
  { cat: 'nutty', en: 'NUTTY · COCOA', ja: 'ナッツ・カカオ', color: '#6F6358', subs: [
    { en: 'Nutty', ja: 'ナッツ', leaves: [
      { en: 'Peanut',      ja: 'ピーナッツ',       match: ['ピーナッツ'] },
      { en: 'Hazelnut',    ja: 'ヘーゼル',         match: [] },
      { en: 'Almond',      ja: 'アーモンド',       match: ['ナッツ'] },
    ]},
    { en: 'Cocoa', ja: 'カカオ', leaves: [
      { en: 'Chocolate',   ja: 'チョコレート',     match: ['チョコレート', 'ミルクチョコ'] },
      { en: 'Dark Cocoa',  ja: 'ダークカカオ',     match: ['ダークチョコ'] },
    ]},
  ]},
  { cat: 'sweet', en: 'SWEET', ja: '甘み', color: '#9F9890', subs: [
    { en: 'Brown Sugar', ja: 'ブラウンシュガー', leaves: [
      { en: 'Molasses',    ja: 'モラセス',         match: [] },
      { en: 'Maple',       ja: 'メープル',         match: [] },
      { en: 'Caramelized', ja: 'カラメル',         match: ['キャラメル', 'カラメル', 'バランス'] },
      { en: 'Honey',       ja: 'ハニー',           match: ['ハニー'] },
      { en: 'Brown Sugar', ja: 'ブラウンシュガー', match: ['ブラウンシュガー', 'シロップ感', 'シロップ'] },
    ]},
    { en: 'Vanilla', ja: 'バニラ', leaves: [
      { en: 'Vanilla',     ja: 'バニラ',           match: ['バニラ'] },
      { en: 'Vanillin',    ja: 'バニリン',         match: [] },
    ]},
    { en: 'Sweet', ja: '甘味全般', leaves: [
      { en: 'Overall Sweet', ja: '甘み',           match: ['シルキー', 'クリーミー', 'マイルド'] },
      { en: 'Sweet Arom.',   ja: '甘い香り',       match: [] },
    ]},
  ]},
]

export const CAT_KEYS = WHEEL.map(c => c.cat)

/* ═══════════════════════════════════════════════════════════════════════════
   LAYOUT — angular allocation
   Tier-1 cats get equal share (40°). Within a cat, tier-2 subs are
   sized proportionally to their leaf count. Leaves are equal within a cat.
   ═══════════════════════════════════════════════════════════════════════════ */

function buildLayout(wheel) {
  const cats = []
  let angle = -20  // Floral centered at top
  for (const c of wheel) {
    const start = angle, end = angle + 40
    angle = end
    const totalLeaves = c.subs.reduce((s, sub) => s + sub.leaves.length, 0)
    let subAngle = start
    const subs = []
    for (const sub of c.subs) {
      const subSize = (40 * sub.leaves.length) / totalLeaves
      const sStart = subAngle
      const sEnd = subAngle + subSize
      subAngle = sEnd
      const leafSize = subSize / sub.leaves.length
      let lAngle = sStart
      const leaves = []
      for (const lf of sub.leaves) {
        const lStart = lAngle
        const lEnd = lAngle + leafSize
        const lCenter = (lStart + lEnd) / 2
        lAngle = lEnd
        leaves.push({
          ...lf, start: lStart, end: lEnd, center: lCenter,
          cat: c.cat, catEn: c.en, catColor: c.color,
          subEn: sub.en, subJa: sub.ja,
        })
      }
      subs.push({ ...sub, start: sStart, end: sEnd, center: (sStart + sEnd) / 2, leaves })
    }
    cats.push({ ...c, start, end, center: (start + end) / 2, subs })
  }
  return cats
}
export const LAYOUT = buildLayout(WHEEL)
export const ALL_LEAVES = LAYOUT.flatMap(c => c.subs.flatMap(s => s.leaves))

// Lookup table: Japanese note → leaf
export const NOTE_TO_LEAF = {}
for (const lf of ALL_LEAVES) {
  for (const m of lf.match || []) NOTE_TO_LEAF[m] = lf
}

/* ═══════════════════════════════════════════════════════════════════════════
   ORIGINS — with geographic coordinates + ISO 3166-1 numeric codes
   ISO codes used to match against TopoJSON country IDs
   ═══════════════════════════════════════════════════════════════════════════ */

export const ORIGINS = {
  // East Africa
  'エチオピア':           { region: 'East Africa', lat:  9.0, lng:  40.0, floral: 4.2, fruity: 4.0, sour: 2.8, green: 1.6, other: 0.6, roasted: 0.8, spices: 1.2, nutty: 1.4, sweet: 2.6, notes: ['ジャスミン', 'ベリー', 'ベルガモット'] },
  'ケニア':               { region: 'East Africa', lat:  0.0, lng:  38.0, floral: 1.8, fruity: 4.4, sour: 4.0, green: 2.2, other: 0.5, roasted: 0.9, spices: 1.8, nutty: 1.6, sweet: 2.6, notes: ['ブラックカラント', 'グレープフルーツ'] },
  'タンザニア':           { region: 'East Africa', lat: -6.0, lng:  35.0, floral: 2.2, fruity: 3.4, sour: 3.4, green: 1.8, other: 0.6, roasted: 1.0, spices: 1.4, nutty: 1.8, sweet: 2.4, notes: ['シトラス', 'ベリー'] },
  'ルワンダ':             { region: 'East Africa', lat: -2.0, lng:  30.0, floral: 2.6, fruity: 3.6, sour: 3.2, green: 1.6, other: 0.5, roasted: 1.0, spices: 1.4, nutty: 1.8, sweet: 2.6, notes: ['オレンジ', 'カラメル'] },
  'ブルンジ':             { region: 'East Africa', lat: -3.5, lng:  30.0, floral: 2.4, fruity: 3.4, sour: 3.0, green: 1.6, other: 0.5, roasted: 1.0, spices: 1.4, nutty: 1.8, sweet: 2.6, notes: ['ベリー', 'ブラウンシュガー'] },
  'ウガンダ':             { region: 'East Africa', lat:  1.0, lng:  32.0, floral: 1.4, fruity: 2.4, sour: 2.0, green: 2.0, other: 0.8, roasted: 1.8, spices: 1.4, nutty: 2.2, sweet: 2.4, notes: ['ダークチョコ', 'ウッディ'] },
  'イエメン':             { region: 'Arabian',     lat: 15.0, lng:  48.0, floral: 2.8, fruity: 3.6, sour: 2.6, green: 1.4, other: 1.2, roasted: 1.6, spices: 2.4, nutty: 1.8, sweet: 2.8, notes: ['ワイニー', 'スパイス', 'ドライフルーツ'] },
  // Central America
  'コスタリカ':           { region: 'Central Am.', lat: 10.0, lng: -84.0, floral: 2.0, fruity: 3.0, sour: 2.8, green: 1.4, other: 0.6, roasted: 1.2, spices: 1.4, nutty: 2.6, sweet: 3.2, notes: ['ハニー', 'シトラス'] },
  'グアテマラ':           { region: 'Central Am.', lat: 15.5, lng: -90.0, floral: 1.8, fruity: 2.6, sour: 2.4, green: 1.4, other: 0.6, roasted: 1.6, spices: 2.2, nutty: 2.6, sweet: 3.0, notes: ['チョコレート', 'スパイス'] },
  'ホンジュラス':         { region: 'Central Am.', lat: 14.5, lng: -86.5, floral: 1.6, fruity: 2.4, sour: 2.4, green: 1.4, other: 0.6, roasted: 1.4, spices: 1.6, nutty: 2.8, sweet: 3.0, notes: ['キャラメル', 'ナッツ'] },
  'ニカラグア':           { region: 'Central Am.', lat: 12.5, lng: -85.0, floral: 1.8, fruity: 2.6, sour: 2.4, green: 1.4, other: 0.6, roasted: 1.4, spices: 1.6, nutty: 2.8, sweet: 3.2, notes: ['チョコレート', 'バニラ'] },
  'エルサルバドル':       { region: 'Central Am.', lat: 13.7, lng: -89.0, floral: 2.0, fruity: 2.8, sour: 2.6, green: 1.4, other: 0.6, roasted: 1.4, spices: 1.6, nutty: 2.6, sweet: 3.0, notes: ['シトラス', 'チョコレート'] },
  'パナマ':               { region: 'Central Am.', lat:  9.0, lng: -80.0, floral: 3.2, fruity: 3.6, sour: 2.6, green: 1.4, other: 0.6, roasted: 1.0, spices: 1.4, nutty: 2.0, sweet: 2.8, notes: ['ジャスミン', 'ピーチ'] },
  'メキシコ':             { region: 'Central Am.', lat: 19.0, lng: -99.0, floral: 1.6, fruity: 2.4, sour: 2.2, green: 1.4, other: 0.6, roasted: 1.6, spices: 1.6, nutty: 2.6, sweet: 2.8, notes: ['ナッツ', 'チョコレート'] },
  // South America
  'コロンビア':           { region: 'South Am.',   lat:  4.0, lng: -73.0, floral: 1.8, fruity: 2.8, sour: 2.6, green: 1.4, other: 0.6, roasted: 1.4, spices: 1.4, nutty: 2.6, sweet: 3.4, notes: ['キャラメル', 'ミルクチョコ'] },
  'ブラジル':             { region: 'South Am.',   lat:-10.0, lng: -55.0, floral: 1.0, fruity: 2.2, sour: 1.8, green: 1.2, other: 0.6, roasted: 1.8, spices: 1.4, nutty: 3.4, sweet: 3.4, notes: ['ナッツ', 'ピーナッツ'] },
  'ペルー':               { region: 'South Am.',   lat:-10.0, lng: -76.0, floral: 1.6, fruity: 2.4, sour: 2.0, green: 1.4, other: 0.6, roasted: 1.4, spices: 1.4, nutty: 2.8, sweet: 3.0, notes: ['チョコレート'] },
  'ボリビア':             { region: 'South Am.',   lat:-16.0, lng: -68.0, floral: 1.8, fruity: 2.6, sour: 2.2, green: 1.4, other: 0.6, roasted: 1.4, spices: 1.4, nutty: 2.6, sweet: 2.8, notes: ['シトラス', 'バニラ'] },
  'エクアドル':           { region: 'South Am.',   lat: -2.0, lng: -78.0, floral: 1.8, fruity: 2.6, sour: 2.2, green: 1.4, other: 0.6, roasted: 1.4, spices: 1.4, nutty: 2.4, sweet: 2.8, notes: ['チョコレート'] },
  // Caribbean
  'ジャマイカ':           { region: 'Caribbean',   lat: 18.0, lng: -77.0, floral: 2.0, fruity: 2.6, sour: 2.2, green: 1.4, other: 0.8, roasted: 1.4, spices: 1.4, nutty: 2.4, sweet: 2.8, notes: ['ナッツ', 'マイルド'] },
  'ドミニカ共和国':       { region: 'Caribbean',   lat: 19.0, lng: -71.0, floral: 1.6, fruity: 2.2, sour: 2.0, green: 1.4, other: 0.6, roasted: 1.6, spices: 1.4, nutty: 2.6, sweet: 2.6, notes: ['マイルド'] },
  'キューバ':             { region: 'Caribbean',   lat: 21.5, lng: -78.0, floral: 1.4, fruity: 2.0, sour: 1.8, green: 1.4, other: 0.6, roasted: 1.8, spices: 1.6, nutty: 2.6, sweet: 2.6, notes: ['タバコ', 'チョコレート'] },
  'プエルトリコ':         { region: 'Caribbean',   lat: 18.2, lng: -66.5, floral: 1.6, fruity: 2.2, sour: 2.0, green: 1.4, other: 0.6, roasted: 1.4, spices: 1.4, nutty: 2.4, sweet: 2.6, notes: ['ミルクチョコ'] },
  // Asia · Pacific
  'インドネシア':         { region: 'Asia · Pac.', lat: -3.0, lng: 113.0, floral: 1.0, fruity: 2.0, sour: 1.4, green: 2.4, other: 1.6, roasted: 2.2, spices: 2.6, nutty: 2.0, sweet: 2.0, notes: ['アーシー', 'スパイス', 'シダー'] },
  'ベトナム':             { region: 'Asia · Pac.', lat: 16.0, lng: 107.0, floral: 0.8, fruity: 1.6, sour: 1.4, green: 1.6, other: 1.2, roasted: 2.6, spices: 2.0, nutty: 2.4, sweet: 2.4, notes: ['ダークチョコ', 'ボディ強'] },
  'インド':               { region: 'Asia · Pac.', lat: 12.0, lng:  77.0, floral: 1.0, fruity: 1.8, sour: 1.4, green: 1.6, other: 1.2, roasted: 2.2, spices: 2.8, nutty: 2.2, sweet: 2.2, notes: ['スパイス', 'ペッパー'] },
  'パプアニューギニア':   { region: 'Asia · Pac.', lat: -6.0, lng: 146.0, floral: 1.8, fruity: 2.6, sour: 2.2, green: 1.8, other: 1.0, roasted: 1.6, spices: 1.8, nutty: 2.4, sweet: 2.6, notes: ['ジャングル', 'ハーバル'] },
  '東ティモール':         { region: 'Asia · Pac.', lat: -8.5, lng: 126.0, floral: 1.4, fruity: 2.2, sour: 1.8, green: 2.0, other: 1.2, roasted: 2.0, spices: 1.8, nutty: 2.4, sweet: 2.4, notes: ['アーシー'] },
  'タイ':                 { region: 'Asia · Pac.', lat: 15.0, lng: 100.0, floral: 1.4, fruity: 2.4, sour: 1.8, green: 1.6, other: 1.0, roasted: 1.8, spices: 1.6, nutty: 2.4, sweet: 2.6, notes: ['カラメル'] },
  'ハワイ (コナ)':        { region: 'Asia · Pac.', lat: 19.5, lng:-155.5, floral: 2.4, fruity: 2.8, sour: 2.2, green: 1.4, other: 0.6, roasted: 1.4, spices: 1.4, nutty: 2.2, sweet: 2.8, notes: ['シルキー', 'ナッツ'] },
  '台湾':                 { region: 'Asia · Pac.', lat: 23.5, lng: 121.0, floral: 2.6, fruity: 2.8, sour: 2.4, green: 1.6, other: 0.8, roasted: 1.2, spices: 1.4, nutty: 2.0, sweet: 2.4, notes: ['クリーン', 'シトラス'] },
}

/* ISO 3166-1 numeric codes — match against TopoJSON `id` */
export const ORIGIN_ISO = {
  'エチオピア': '231', 'ケニア': '404', 'タンザニア': '834', 'ルワンダ': '646',
  'ブルンジ': '108', 'ウガンダ': '800', 'イエメン': '887',
  'コスタリカ': '188', 'グアテマラ': '320', 'ホンジュラス': '340', 'ニカラグア': '558',
  'エルサルバドル': '222', 'パナマ': '591', 'メキシコ': '484',
  'コロンビア': '170', 'ブラジル': '076', 'ペルー': '604', 'ボリビア': '068', 'エクアドル': '218',
  'ジャマイカ': '388', 'ドミニカ共和国': '214', 'キューバ': '192', 'プエルトリコ': '630',
  'インドネシア': '360', 'ベトナム': '704', 'インド': '356',
  'パプアニューギニア': '598', '東ティモール': '626', 'タイ': '764',
  'ハワイ (コナ)': '840', /* USA */ '台湾': '158',
}
// Reverse: numeric → origin name (handles leading-zero variance)
export const ISO_TO_ORIGIN = {}
for (const [name, iso] of Object.entries(ORIGIN_ISO)) {
  ISO_TO_ORIGIN[iso] = name
  ISO_TO_ORIGIN[String(parseInt(iso, 10))] = name
}

/* Varieties known to be cultivated in each origin (filter the picker) */
export const VARIETIES_BY_ORIGIN = {
  'エチオピア':           ['ヘイルーム (在来種)', 'ティピカ', 'ローリーナ'],
  'ケニア':               ['SL28', 'SL34', 'ルイル11', 'バチアン'],
  'タンザニア':           ['ブルボン', 'ケント', 'ティピカ'],
  'ルワンダ':             ['ブルボン', 'ティピカ'],
  'ブルンジ':             ['ブルボン', 'ティピカ'],
  'ウガンダ':             ['ロブスタ', 'ティピカ', 'SL28'],
  'イエメン':             ['モカ', 'ヘイルーム (在来種)', 'ティピカ'],
  'コスタリカ':           ['カトゥーラ', 'カトゥアイ', 'ティピカ', 'ゲイシャ', 'SL28'],
  'グアテマラ':           ['ブルボン', 'カトゥーラ', 'カトゥアイ', 'ティピカ', 'パカマラ', 'ゲイシャ', 'マラゴジッペ'],
  'ホンジュラス':         ['カトゥーラ', 'カトゥアイ', 'ブルボン', 'ティピカ', 'パカマラ'],
  'ニカラグア':           ['カトゥーラ', 'ブルボン', 'ティピカ', 'カトゥアイ', 'パカマラ', 'マラゴジッペ'],
  'エルサルバドル':       ['ブルボン', 'パカス', 'パカマラ', 'カトゥーラ', 'ティピカ'],
  'パナマ':               ['ゲイシャ', 'ティピカ', 'ブルボン', 'カトゥーラ', 'カトゥアイ', 'パカマラ'],
  'メキシコ':             ['ティピカ', 'ブルボン', 'マラゴジッペ', 'カトゥーラ', 'ムンドノーボ'],
  'コロンビア':           ['カスティージョ', 'コロンビア種', 'カトゥーラ', 'ティピカ', 'ブルボン', 'ゲイシャ'],
  'ブラジル':             ['ブルボン', 'カトゥアイ', 'ムンドノーボ', 'カトゥーラ', 'マラゴジッペ', 'ティピカ'],
  'ペルー':               ['ティピカ', 'カトゥーラ', 'ブルボン', 'カトゥアイ'],
  'ボリビア':             ['ティピカ', 'カトゥーラ', 'カトゥアイ', 'ブルボン'],
  'エクアドル':           ['ティピカ', 'ブルボン', 'カトゥーラ', 'カトゥアイ', 'サーチモール'],
  'ジャマイカ':           ['ティピカ'],
  'ドミニカ共和国':       ['ティピカ', 'カトゥーラ', 'ブルボン'],
  'キューバ':             ['ティピカ', 'ブルボン'],
  'プエルトリコ':         ['ティピカ', 'ブルボン'],
  'インドネシア':         ['スマトラ', 'ジャワ', 'ティピカ', 'カティモール', 'リベリカ', 'ロブスタ', 'エクセルサ'],
  'ベトナム':             ['ロブスタ', 'カティモール', 'カトゥーラ'],
  'インド':               ['ケント', 'S795', 'カティモール', 'ロブスタ'],
  'パプアニューギニア':   ['ティピカ', 'ブルボン'],
  '東ティモール':         ['ティピカ', 'カティモール'],
  'タイ':                 ['ティピカ', 'カトゥアイ', 'カティモール', 'ロブスタ'],
  'ハワイ (コナ)':        ['ティピカ', 'カトゥアイ'],
  '台湾':                 ['ティピカ', 'ゲイシャ', 'SL34', 'ブルボン'],
}

// Peaberry is a bean-shape phenomenon that can occur in any origin → inject everywhere
for (const k of Object.keys(VARIETIES_BY_ORIGIN)) {
  if (!VARIETIES_BY_ORIGIN[k].includes('ピーベリー')) {
    VARIETIES_BY_ORIGIN[k] = [...VARIETIES_BY_ORIGIN[k], 'ピーベリー']
  }
}

/* ═══════════════════════════════════════════════════════════════════════════
   VARIETIES — with lineage + bean-shape descriptor (for icon rendering)
   shape: 'oval'  (typical arabica), 'long'  (geisha/maragogype),
          'round' (robusta), 'asym'  (liberica/excelsa), 'small' (caturra/SL)
   ═══════════════════════════════════════════════════════════════════════════ */

export const VARIETIES = {
  'ティピカ':             { lineage: 'Arabica',  shape: 'oval',  era: 'Heirloom',     floral:  0.2, fruity:  0.0, sour:  0.0, green:  0.0, other:  0.0, roasted:  0.0, spices:  0.0, nutty:  0.2, sweet:  0.3, notes: ['クリーン', 'バランス'], desc: 'クリーンで均整。基準種' },
  'ブルボン':             { lineage: 'Arabica',  shape: 'oval',  era: 'Heirloom',     floral:  0.2, fruity:  0.2, sour:  0.0, green:  0.0, other:  0.0, roasted:  0.0, spices:  0.0, nutty:  0.2, sweet:  0.6, notes: ['シロップ感'], desc: '甘さに優れた古典種' },
  'カトゥーラ':           { lineage: 'Arabica',  shape: 'small', era: 'Mutation',     floral:  0.2, fruity:  0.4, sour:  0.4, green:  0.0, other:  0.0, roasted:  0.0, spices:  0.0, nutty:  0.0, sweet:  0.2, notes: [], desc: 'ブルボン突然変異体' },
  'カトゥアイ':           { lineage: 'Arabica',  shape: 'small', era: 'Cross',        floral:  0.1, fruity:  0.3, sour:  0.3, green:  0.0, other:  0.0, roasted:  0.0, spices:  0.0, nutty:  0.2, sweet:  0.4, notes: [], desc: 'ムンドノーボ×カトゥーラ' },
  'ムンドノーボ':         { lineage: 'Arabica',  shape: 'oval',  era: 'Cross',        floral:  0.0, fruity:  0.2, sour:  0.0, green:  0.0, other:  0.0, roasted:  0.1, spices:  0.0, nutty:  0.6, sweet:  0.5, notes: [], desc: 'スマトラ×ブルボン' },
  'パカス':               { lineage: 'Arabica',  shape: 'small', era: 'Mutation',     floral:  0.2, fruity:  0.3, sour:  0.2, green:  0.0, other:  0.0, roasted:  0.0, spices:  0.0, nutty:  0.2, sweet:  0.4, notes: [], desc: 'ブルボン系の中米選抜' },
  'パカマラ':             { lineage: 'Arabica',  shape: 'long',  era: 'Cross',        floral:  0.5, fruity:  0.6, sour:  0.3, green:  0.0, other:  0.0, roasted:  0.0, spices:  0.0, nutty:  0.0, sweet:  0.4, notes: ['トロピカル'], desc: 'パカス×マラゴジッペ' },
  'マラゴジッペ':         { lineage: 'Arabica',  shape: 'long',  era: 'Mutation',     floral:  0.3, fruity:  0.3, sour:  0.2, green:  0.0, other:  0.0, roasted:  0.0, spices:  0.0, nutty:  0.0, sweet:  0.2, notes: ['エレファント'], desc: '大粒な「エレファント」豆' },
  'ゲイシャ':             { lineage: 'Arabica',  shape: 'long',  era: 'Heirloom',     floral:  1.6, fruity:  0.9, sour:  0.3, green:  0.0, other:  0.0, roasted: -0.4, spices:  0.0, nutty: -0.4, sweet:  0.6, notes: ['ジャスミン', 'ベルガモット', 'ピーチ'], desc: 'エチオピア由来、花香' },
  'SL28':                 { lineage: 'Arabica',  shape: 'oval',  era: 'Selected',     floral:  0.4, fruity:  0.9, sour:  0.8, green:  0.0, other:  0.0, roasted:  0.0, spices:  0.2, nutty:  0.0, sweet:  0.4, notes: ['ジューシー', 'ブラックカラント'], desc: 'ケニア選抜 (Scott Lab)' },
  'SL34':                 { lineage: 'Arabica',  shape: 'oval',  era: 'Selected',     floral:  0.3, fruity:  0.7, sour:  0.6, green:  0.0, other:  0.0, roasted:  0.0, spices:  0.2, nutty:  0.0, sweet:  0.4, notes: ['ジューシー'], desc: 'ケニア選抜 (Scott Lab)' },
  'ルイル11':             { lineage: 'Arabica',  shape: 'small', era: 'Hybrid',       floral:  0.2, fruity:  0.4, sour:  0.4, green:  0.0, other:  0.0, roasted:  0.0, spices:  0.2, nutty:  0.2, sweet:  0.3, notes: [], desc: 'ケニア病害抵抗種' },
  'バチアン':             { lineage: 'Arabica',  shape: 'small', era: 'Hybrid',       floral:  0.2, fruity:  0.4, sour:  0.4, green:  0.0, other:  0.0, roasted:  0.0, spices:  0.2, nutty:  0.2, sweet:  0.3, notes: [], desc: '次世代ケニア選抜' },
  'ケント':               { lineage: 'Arabica',  shape: 'oval',  era: 'Selected',     floral:  0.2, fruity:  0.3, sour:  0.2, green:  0.0, other:  0.0, roasted:  0.0, spices:  0.0, nutty:  0.4, sweet:  0.3, notes: [], desc: 'インド選抜種' },
  'S795':                 { lineage: 'Arabica',  shape: 'oval',  era: 'Hybrid',       floral:  0.1, fruity:  0.2, sour:  0.2, green:  0.2, other:  0.0, roasted:  0.0, spices:  0.4, nutty:  0.4, sweet:  0.2, notes: [], desc: 'インド/インドネシア' },
  'ヘイルーム (在来種)':  { lineage: 'Arabica',  shape: 'oval',  era: 'Heirloom',     floral:  0.8, fruity:  0.6, sour:  0.3, green:  0.0, other:  0.0, roasted:  0.0, spices:  0.0, nutty:  0.0, sweet:  0.3, notes: ['複雑'], desc: 'エチオピア野生種' },
  'モカ':                 { lineage: 'Arabica',  shape: 'small', era: 'Heirloom',     floral:  0.4, fruity:  0.6, sour:  0.0, green:  0.0, other:  0.0, roasted:  0.2, spices:  0.4, nutty:  0.3, sweet:  0.4, notes: ['ワイン', 'スパイス'], desc: 'イエメン古典' },
  'スマトラ':             { lineage: 'Arabica',  shape: 'oval',  era: 'Heirloom',     floral:  0.0, fruity:  0.2, sour: -0.2, green:  0.4, other:  0.4, roasted:  0.4, spices:  0.6, nutty:  0.3, sweet:  0.2, notes: ['アーシー'], desc: 'インドネシア古典' },
  'ジャワ':               { lineage: 'Arabica',  shape: 'oval',  era: 'Heirloom',     floral:  0.2, fruity:  0.3, sour:  0.2, green:  0.2, other:  0.2, roasted:  0.3, spices:  0.4, nutty:  0.3, sweet:  0.3, notes: ['スパイス'], desc: 'インドネシア古典' },
  'カティモール':         { lineage: 'Hybrid',   shape: 'small', era: 'Hybrid',       floral: -0.2, fruity: -0.1, sour:  0.0, green:  0.2, other:  0.2, roasted:  0.2, spices:  0.2, nutty:  0.0, sweet: -0.1, notes: ['ボディ強'], desc: 'カトゥーラ×Híbrido de Timor' },
  'サーチモール':         { lineage: 'Hybrid',   shape: 'small', era: 'Hybrid',       floral: -0.1, fruity:  0.0, sour:  0.0, green:  0.2, other:  0.2, roasted:  0.2, spices:  0.2, nutty:  0.0, sweet:  0.0, notes: [], desc: 'ヴィラサルチ×Timor' },
  'カスティージョ':       { lineage: 'Hybrid',   shape: 'small', era: 'Hybrid',       floral:  0.0, fruity:  0.2, sour:  0.2, green:  0.0, other:  0.0, roasted:  0.1, spices:  0.1, nutty:  0.2, sweet:  0.2, notes: [], desc: 'コロンビア改良種' },
  'コロンビア種':         { lineage: 'Hybrid',   shape: 'small', era: 'Hybrid',       floral:  0.0, fruity:  0.2, sour:  0.2, green:  0.0, other:  0.0, roasted:  0.1, spices:  0.1, nutty:  0.2, sweet:  0.2, notes: [], desc: 'コロンビア国家育成' },
  'ロブスタ':             { lineage: 'Robusta',  shape: 'round', era: 'Species',      floral: -0.8, fruity: -0.6, sour: -0.5, green:  0.6, other:  0.8, roasted:  1.4, spices:  0.6, nutty:  0.4, sweet: -0.5, notes: ['苦味強', 'ウッディ'], desc: 'C. canephora — 高苦味' },
  'リベリカ':             { lineage: 'Liberica', shape: 'asym',  era: 'Species',      floral:  0.4, fruity:  0.6, sour:  0.0, green:  0.4, other:  0.6, roasted:  0.6, spices:  0.8, nutty:  0.2, sweet:  0.2, notes: ['スモーキー', 'ジャックフルーツ'], desc: 'C. liberica — 大粒・特異' },
  'エクセルサ':           { lineage: 'Liberica', shape: 'asym',  era: 'Species',      floral:  0.2, fruity:  0.6, sour:  0.4, green:  0.4, other:  0.4, roasted:  0.4, spices:  0.6, nutty:  0.0, sweet:  0.2, notes: ['ダークフルーツ'], desc: 'リベリカ変種' },
  'ローリーナ':           { lineage: 'Arabica',  shape: 'small', era: 'Heirloom',     floral:  0.4, fruity:  0.4, sour:  0.0, green:  0.0, other:  0.0, roasted:  0.0, spices:  0.0, nutty:  0.0, sweet:  0.6, notes: ['低カフェイン'], desc: '低カフェイン古典' },
  'ピーベリー':           { lineage: 'Arabica',  shape: 'round', era: 'Mutation',     floral:  0.2, fruity:  0.3, sour:  0.2, green:  0.0, other:  0.0, roasted: -0.1, spices:  0.1, nutty:  0.2, sweet:  0.3, notes: ['濃縮', 'クリーン'], desc: '丸豆の形状変異 (片豆) — 風味が凝縮し均一に火が入る' },
}

/* ═══════════════════════════════════════════════════════════════════════════
   PROCESSES — with icon glyph + tagline
   icon: 'washed' | 'natural' | 'honey' | 'pulped' | 'wet-hulled' | 'anaerobic'
       | 'anaerobic-natural' | 'carbonic' | 'lactic' | 'yeast' | 'monsoon'
       | 'semi-washed'
   ═══════════════════════════════════════════════════════════════════════════ */

export const PROCESSES = {
  'ウォッシュド':                 { icon: 'washed',      floral:  0.4, fruity: -0.3, sour:  0.6, green:  0.3, other: -0.2, roasted: -0.1, spices: -0.1, nutty: -0.1, sweet: -0.3, notes: ['クリーン', 'ブライト'], desc: '水で果肉除去・発酵' },
  'ナチュラル':                   { icon: 'natural',     floral:  0.2, fruity:  1.6, sour: -0.2, green: -0.3, other:  0.2, roasted:  0.1, spices:  0.2, nutty: -0.1, sweet:  1.0, notes: ['フルーティ', 'ワイニー'], desc: '果実ごと天日乾燥' },
  'ハニー (ホワイト)':            { icon: 'honey-white', floral:  0.4, fruity:  0.4, sour:  0.4, green:  0.0, other:  0.0, roasted: -0.1, spices:  0.0, nutty:  0.1, sweet:  0.6, notes: ['クリーン', 'ハニー'], desc: 'ミューシレージ10%残し' },
  'ハニー (イエロー)':            { icon: 'honey-yellow',floral:  0.2, fruity:  0.6, sour:  0.2, green:  0.0, other:  0.0, roasted:  0.0, spices:  0.1, nutty:  0.1, sweet:  0.8, notes: ['ハニー'], desc: 'ミューシレージ50%残し' },
  'ハニー (レッド)':              { icon: 'honey-red',   floral:  0.1, fruity:  0.8, sour:  0.0, green: -0.1, other:  0.1, roasted:  0.0, spices:  0.2, nutty:  0.1, sweet:  1.0, notes: ['ハニー', 'ドライフルーツ'], desc: 'ミューシレージ75%' },
  'ハニー (ブラック)':            { icon: 'honey-black', floral:  0.0, fruity:  1.0, sour: -0.2, green: -0.2, other:  0.2, roasted:  0.1, spices:  0.3, nutty:  0.0, sweet:  1.2, notes: ['ハニー', 'ワイニー'], desc: 'ミューシレージ100%' },
  'パルプドナチュラル':           { icon: 'pulped',      floral:  0.2, fruity:  0.6, sour:  0.2, green: -0.1, other:  0.0, roasted:  0.0, spices:  0.1, nutty:  0.1, sweet:  0.7, notes: ['シロップ感'], desc: 'ブラジル式 半水洗' },
  'セミウォッシュド':             { icon: 'semi-washed', floral:  0.2, fruity:  0.0, sour:  0.3, green:  0.2, other:  0.0, roasted:  0.0, spices:  0.0, nutty:  0.0, sweet:  0.0, notes: [], desc: '簡易水洗' },
  'スマトラ式 (ギリンバサ)':      { icon: 'wet-hulled',  floral: -0.2, fruity: -0.1, sour: -0.4, green:  0.6, other:  0.8, roasted:  0.4, spices:  0.6, nutty:  0.2, sweet: -0.1, notes: ['アーシー', 'ハーバル'], desc: 'インドネシア独特の半乾燥脱穀' },
  'アナエロビック':               { icon: 'anaerobic',   floral:  0.4, fruity:  1.2, sour:  0.8, green: -0.2, other:  0.4, roasted:  0.0, spices:  0.8, nutty:  0.0, sweet:  0.6, notes: ['発酵感', 'シナモン'], desc: '嫌気発酵 (タンク密閉)' },
  'アナエロビック・ナチュラル':   { icon: 'anaerobic-natural', floral:  0.4, fruity:  1.6, sour:  0.6, green: -0.3, other:  0.4, roasted:  0.0, spices:  0.8, nutty:  0.0, sweet:  1.0, notes: ['発酵', 'トロピカル'], desc: '嫌気+天日乾燥' },
  'カーボニックマセレーション':   { icon: 'carbonic',    floral:  0.6, fruity:  1.4, sour:  0.4, green: -0.2, other:  0.3, roasted:  0.0, spices:  0.6, nutty:  0.0, sweet:  0.8, notes: ['ワイン', 'ベリー'], desc: 'CO₂ 充填発酵' },
  'ラクティック発酵':             { icon: 'lactic',      floral:  0.4, fruity:  1.0, sour:  0.8, green: -0.1, other:  0.3, roasted:  0.0, spices:  0.4, nutty:  0.0, sweet:  0.6, notes: ['乳酸', 'ヨーグルト'], desc: '乳酸菌による発酵' },
  '酵母接種':                     { icon: 'yeast',       floral:  0.5, fruity:  1.0, sour:  0.4, green: -0.1, other:  0.4, roasted:  0.0, spices:  0.6, nutty:  0.0, sweet:  0.8, notes: ['発酵フルーツ'], desc: '特定酵母を接種' },
  'モンスーン':                   { icon: 'monsoon',     floral: -0.4, fruity: -0.3, sour: -0.6, green:  0.4, other:  0.6, roasted:  0.6, spices:  0.6, nutty:  0.4, sweet:  0.0, notes: ['マイルド', 'ウッディ'], desc: 'インド独特・季節風熟成' },
}

/* ═══════════════════════════════════════════════════════════════════════════
   ROASTS — 8-stage Japanese scale with timing + temperature
   ═══════════════════════════════════════════════════════════════════════════ */

export const ROASTS = {
  'ライト':       { idx: 1, label: 'LIGHT',     color: '#C6CACE', tempC: 180, mins: '8',     beanColor: '#B5B9BD',
                    desc: '極浅。穀物香、酸が強く出る',
                    mul: { floral: 1.25, fruity: 1.20, sour: 1.35, green: 1.10, other: 0.90, roasted: 0.20, spices: 0.65, nutty: 0.65, sweet: 0.85 } },
  'シナモン':     { idx: 2, label: 'CINNAMON',  color: '#A7ACB1', tempC: 196, mins: '9',     beanColor: '#969A9F',
                    desc: 'シナモン色。明るい酸',
                    mul: { floral: 1.18, fruity: 1.15, sour: 1.25, green: 1.05, other: 0.95, roasted: 0.35, spices: 0.75, nutty: 0.75, sweet: 0.90 } },
  'ミディアム':   { idx: 3, label: 'MEDIUM',    color: '#878B90', tempC: 205, mins: '10',    beanColor: '#76797E',
                    desc: '茶色。バランス',
                    mul: { floral: 1.05, fruity: 1.05, sour: 1.05, green: 0.95, other: 1.00, roasted: 0.55, spices: 0.90, nutty: 0.95, sweet: 1.00 } },
  'ハイ':         { idx: 4, label: 'HIGH',      color: '#6E7177', tempC: 215, mins: '11',    beanColor: '#5F6267',
                    desc: '一番香りが立つ',
                    mul: { floral: 0.90, fruity: 0.95, sour: 0.90, green: 0.80, other: 1.00, roasted: 0.75, spices: 1.00, nutty: 1.10, sweet: 1.05 } },
  'シティ':       { idx: 5, label: 'CITY',      color: '#55585D', tempC: 224, mins: '12',    beanColor: '#494B4F',
                    desc: '苦味と甘味の均衡',
                    mul: { floral: 0.72, fruity: 0.80, sour: 0.72, green: 0.55, other: 1.05, roasted: 1.00, spices: 1.10, nutty: 1.20, sweet: 1.00 } },
  'フルシティ':   { idx: 6, label: 'FULL CITY', color: '#3D3F43', tempC: 232, mins: '13',    beanColor: '#34363A',
                    desc: '2ハゼ始まり。苦味増',
                    mul: { floral: 0.52, fruity: 0.62, sour: 0.52, green: 0.35, other: 1.10, roasted: 1.30, spices: 1.20, nutty: 1.20, sweet: 0.90 } },
  'フレンチ':     { idx: 7, label: 'FRENCH',    color: '#2A2C30', tempC: 240, mins: '14',    beanColor: '#22242A',
                    desc: '油浸出。深い苦味',
                    mul: { floral: 0.30, fruity: 0.40, sour: 0.32, green: 0.22, other: 1.15, roasted: 1.60, spices: 1.30, nutty: 1.00, sweet: 0.70 } },
  'イタリアン':   { idx: 8, label: 'ITALIAN',   color: '#16181B', tempC: 250, mins: '15',    beanColor: '#13151A',
                    desc: '極深。スモーキー',
                    mul: { floral: 0.16, fruity: 0.25, sour: 0.20, green: 0.12, other: 1.20, roasted: 2.00, spices: 1.10, nutty: 0.70, sweet: 0.50 } },
}

export const ROAST_KEYS = Object.keys(ROASTS)

/* ═══════════════════════════════════════════════════════════════════════════
   GRINDS — 6 levels from extra fine (espresso) to extra coarse (cold brew)
   Multiplicative effect on the 9 SCA dimensions: fine → over-extracted /
   bitter / heavy; coarse → bright / clean / less bitter.
   ═══════════════════════════════════════════════════════════════════════════ */

export const GRINDS = {
  '極細':   { idx: 1, label: 'EXTRA FINE',  method: 'Espresso',  cells: 8,
              desc: '極細挽き — 高圧抽出。苦味と濃度が際立つ',
              mul: { floral: 0.70, fruity: 0.75, sour: 0.70, green: 0.70, other: 1.18, roasted: 1.30, spices: 1.15, nutty: 1.10, sweet: 0.82 } },
  '細挽き': { idx: 2, label: 'FINE',         method: 'Moka',      cells: 6,
              desc: '細挽き — モカポット蒸気圧抽出',
              mul: { floral: 0.85, fruity: 0.88, sour: 0.85, green: 0.85, other: 1.10, roasted: 1.15, spices: 1.08, nutty: 1.05, sweet: 0.92 } },
  '中細':   { idx: 3, label: 'MEDIUM-FINE', method: 'V60',       cells: 5,
              desc: '中細挽き — V60・エアロプレス',
              mul: { floral: 0.95, fruity: 0.96, sour: 0.95, green: 0.95, other: 1.03, roasted: 1.05, spices: 1.02, nutty: 1.02, sweet: 0.98 } },
  '中挽き': { idx: 4, label: 'MEDIUM',       method: 'Drip',      cells: 4,
              desc: '中挽き — ペーパードリップ・標準のバランス',
              mul: { floral: 1.00, fruity: 1.00, sour: 1.00, green: 1.00, other: 1.00, roasted: 1.00, spices: 1.00, nutty: 1.00, sweet: 1.00 } },
  '粗挽き': { idx: 5, label: 'COARSE',       method: 'French',    cells: 3,
              desc: '粗挽き — フレンチプレス・パーコレーター',
              mul: { floral: 1.10, fruity: 1.12, sour: 1.18, green: 1.05, other: 0.94, roasted: 0.85, spices: 0.96, nutty: 0.96, sweet: 1.05 } },
  '極粗':   { idx: 6, label: 'EXTRA COARSE', method: 'Cold Brew', cells: 2,
              desc: '極粗挽き — コールドブリュー・カッピング',
              mul: { floral: 1.25, fruity: 1.28, sour: 1.32, green: 1.10, other: 0.88, roasted: 0.70, spices: 0.85, nutty: 0.92, sweet: 1.12 } },
}
export const GRIND_KEYS = Object.keys(GRINDS)

/* ─── Estimator ─────────────────────────────────────────── */
const clamp = (v, lo = 0, hi = 5) => Math.max(lo, Math.min(hi, v))

export function estimateFlavor({ origin, variety, process, roast, grind }) {
  if (!origin || !variety || !process || !roast) return null
  const o = ORIGINS[origin], v = VARIETIES[variety], p = PROCESSES[process], r = ROASTS[roast]
  const g = grind ? GRINDS[grind] : null
  const profile = {}
  for (const k of CAT_KEYS) {
    const additive = (o[k] ?? 0) + (v[k] ?? 0) + (p[k] ?? 0)
    const rmul = r.mul[k] ?? 1
    const gmul = g?.mul?.[k] ?? 1
    profile[k] = +clamp(additive * rmul * gmul).toFixed(2)
  }
  const notes = Array.from(new Set([
    ...(o.notes || []), ...(v.notes || []), ...(p.notes || []),
  ])).slice(0, 6)
  const dominant = CAT_KEYS.reduce((a, b) => (profile[a] >= profile[b] ? a : b), 'sweet')
  return { ...profile, notes, dominant }
}

/* Partial estimator — works with any subset of the 4 parameters.
   Missing parameters contribute 0 (additive) or 1 (multiplicative).
   Used for live preview while filling out the wizard. */
export function estimatePartialFlavor({ origin, variety, process, roast, grind }) {
  const filled = [origin, variety, process, roast, grind].filter(Boolean).length
  if (filled === 0) return null
  const o = origin ? ORIGINS[origin] : null
  const v = variety ? VARIETIES[variety] : null
  const p = process ? PROCESSES[process] : null
  const r = roast ? ROASTS[roast] : null
  const g = grind ? GRINDS[grind] : null
  const profile = {}
  for (const k of CAT_KEYS) {
    const additive = (o?.[k] || 0) + (v?.[k] || 0) + (p?.[k] || 0)
    const rmul = r?.mul?.[k] ?? 1
    const gmul = g?.mul?.[k] ?? 1
    profile[k] = +clamp(additive * rmul * gmul).toFixed(2)
  }
  const notes = Array.from(new Set([
    ...(o?.notes || []), ...(v?.notes || []), ...(p?.notes || []),
  ])).slice(0, 6)
  const dominant = CAT_KEYS.reduce((a, b) => (profile[a] >= profile[b] ? a : b), 'sweet')
  return { ...profile, notes, dominant, complete: filled === 5 }
}

/* ═══════════════════════════════════════════════════════════════════════════
   PRICE MODEL — estimated retail JPY per cup
   price = origin_base × variety_mul × process_mul
   (roast multiplier is negligible at retail and kept as 1.0)
   ═══════════════════════════════════════════════════════════════════════════ */

const ORIGIN_PRICE_JPY = {
  'エチオピア': 700,        'ケニア': 800,            'タンザニア': 600,
  'ルワンダ': 600,          'ブルンジ': 550,          'ウガンダ': 400,
  'イエメン': 1500,         'コスタリカ': 750,        'グアテマラ': 650,
  'ホンジュラス': 500,      'ニカラグア': 500,        'エルサルバドル': 600,
  'パナマ': 1200,           'メキシコ': 450,          'コロンビア': 600,
  'ブラジル': 400,          'ペルー': 450,            'ボリビア': 550,
  'エクアドル': 550,        'ジャマイカ': 2500,       'ドミニカ共和国': 500,
  'キューバ': 750,          'プエルトリコ': 1100,     'インドネシア': 600,
  'ベトナム': 350,          'インド': 450,            'パプアニューギニア': 650,
  '東ティモール': 550,      'タイ': 500,              'ハワイ (コナ)': 2000,
  '台湾': 1500,
}

const VARIETY_PRICE_MUL = {
  'ティピカ': 1.00,         'ブルボン': 1.00,         'カトゥーラ': 0.95,
  'カトゥアイ': 0.95,       'ムンドノーボ': 0.90,     'パカス': 1.00,
  'パカマラ': 1.40,         'マラゴジッペ': 1.30,     'ゲイシャ': 3.00,
  'SL28': 1.30,             'SL34': 1.25,             'ルイル11': 0.90,
  'バチアン': 0.90,         'ケント': 1.00,           'S795': 0.95,
  'ヘイルーム (在来種)': 1.20, 'モカ': 1.50,           'スマトラ': 1.00,
  'ジャワ': 1.05,           'カティモール': 0.75,     'サーチモール': 0.75,
  'カスティージョ': 0.85,   'コロンビア種': 0.85,     'ロブスタ': 0.40,
  'リベリカ': 0.70,         'エクセルサ': 0.65,       'ローリーナ': 1.80,
  'ピーベリー': 1.40,
}

const PROCESS_PRICE_MUL = {
  'ウォッシュド': 1.00,             'ナチュラル': 1.10,
  'ハニー (ホワイト)': 1.15,        'ハニー (イエロー)': 1.20,
  'ハニー (レッド)': 1.25,          'ハニー (ブラック)': 1.30,
  'パルプドナチュラル': 1.05,       'セミウォッシュド': 0.95,
  'スマトラ式 (ギリンバサ)': 1.00,
  'アナエロビック': 1.60,           'アナエロビック・ナチュラル': 1.80,
  'カーボニックマセレーション': 1.70,
  'ラクティック発酵': 1.50,         '酵母接種': 1.50,
  'モンスーン': 1.20,
}

function priceFor({ origin, variety, process }) {
  const base = ORIGIN_PRICE_JPY[origin]
  if (!base) return null
  const v = VARIETY_PRICE_MUL[variety] ?? 1
  const p = PROCESS_PRICE_MUL[process] ?? 1
  return Math.round((base * v * p) / 10) * 10  // round to ¥10
}

/* ═══════════════════════════════════════════════════════════════════════════
   Precomputed taste-space — every valid (origin, variety, process, roast)
   combination is built once at module load so we can quickly compute the
   range of possible flavor values given a partial selection.
   ═══════════════════════════════════════════════════════════════════════════ */

const ALL_COMBINATIONS = []
for (const origin of Object.keys(ORIGINS)) {
  const varieties = VARIETIES_BY_ORIGIN[origin] || []
  for (const variety of varieties) {
    if (!VARIETIES[variety]) continue
    for (const process of Object.keys(PROCESSES)) {
      for (const roast of Object.keys(ROASTS)) {
        for (const grind of Object.keys(GRINDS)) {
          const profile = estimateFlavor({ origin, variety, process, roast, grind })
          if (profile) {
            ALL_COMBINATIONS.push({
              origin, variety, process, roast, grind, profile,
              price: priceFor({ origin, variety, process }),
            })
          }
        }
      }
    }
  }
}
export const TOTAL_COMBINATIONS = ALL_COMBINATIONS.length

/* ─── Price helpers ─────────────────────────────────────── */
export function estimatePrice(form) {
  if (!form.origin || !form.variety || !form.process) return null
  return priceFor({ origin: form.origin, variety: form.variety, process: form.process })
}

export function computePriceRange(form) {
  let min = Infinity, max = -Infinity
  for (const combo of ALL_COMBINATIONS) {
    if (form.origin  && combo.origin  !== form.origin)  continue
    if (form.variety && combo.variety !== form.variety) continue
    if (form.process && combo.process !== form.process) continue
    if (form.roast   && combo.roast   !== form.roast)   continue
    if (form.grind   && combo.grind   !== form.grind)   continue
    if (combo.price < min) min = combo.price
    if (combo.price > max) max = combo.price
  }
  return { min: min === Infinity ? 0 : min, max: max === -Infinity ? 0 : max }
}

/**
 * Given a partial form, return the min/max range of each SCA dimension
 * across all valid combinations consistent with the selections.
 * Also returns the count of matching combinations.
 */
export function computeTasteRanges(form) {
  const ranges = {}
  for (const c of WHEEL) ranges[c.cat] = { min: Infinity, max: -Infinity }
  let count = 0

  for (const combo of ALL_COMBINATIONS) {
    if (form.origin  && combo.origin  !== form.origin)  continue
    if (form.variety && combo.variety !== form.variety) continue
    if (form.process && combo.process !== form.process) continue
    if (form.roast   && combo.roast   !== form.roast)   continue
    if (form.grind   && combo.grind   !== form.grind)   continue
    for (const c of WHEEL) {
      const v = combo.profile[c.cat]
      if (v < ranges[c.cat].min) ranges[c.cat].min = v
      if (v > ranges[c.cat].max) ranges[c.cat].max = v
    }
    count++
  }
  // Fallback: no matches
  for (const c of WHEEL) {
    if (ranges[c.cat].min === Infinity) {
      ranges[c.cat].min = 0
      ranges[c.cat].max = 5
    }
  }
  return { ranges, count }
}

/* Compute (angle, radius) for plotting a bean on the wheel.
   Uses circular mean of leaf-matched notes; intensity → radius. */
export function computeBeanPlot(bean) {
  const matches = (bean.notes || []).map(n => NOTE_TO_LEAF[n]).filter(Boolean)
  if (matches.length === 0) {
    const cat = LAYOUT.find(c => c.cat === bean.dominant)
    const ang = (cat?.center ?? 0)
    return { angle: ang, radius: 150 + ((bean[bean.dominant] || 0) / 5) * 100, primaryLeaf: null, fallback: true }
  }
  let sx = 0, sy = 0, totalW = 0, maxI = 0, primaryLeaf = null
  for (const m of matches) {
    const w = Math.max(0.4, bean[m.cat] || 1)
    const rad = (m.center * Math.PI) / 180
    sx += Math.cos(rad) * w
    sy += Math.sin(rad) * w
    totalW += w
    if ((bean[m.cat] || 0) > maxI) { maxI = bean[m.cat]; primaryLeaf = m }
  }
  const meanAngle = (Math.atan2(sy / totalW, sx / totalW) * 180 / Math.PI + 360) % 360
  // small deterministic jitter so coincident beans don't fully overlap
  const id = bean.id || ''
  let h = 0
  for (let i = 0; i < id.length; i++) h = (h * 31 + id.charCodeAt(i)) | 0
  const j = ((Math.abs(h) % 1000) / 1000 - 0.5) * 6  // ±3°
  const radius = 152 + (maxI / 5) * 100 + (((h >> 5) % 16) - 8)  // ±8px
  return { angle: meanAngle + j, radius, primaryLeaf, fallback: false }
}

/* ═══════════════════════════════════════════════════════════════════════════
   Taste descriptors — used to build a human-readable summary
   ═══════════════════════════════════════════════════════════════════════════ */

const CHAR_PHRASES = {
  floral:  { adj: '華やかに香り立つ',      verb: '香る',           tone: 'aromatic' },
  fruity:  { adj: '明るくジューシーな',    verb: '弾ける',         tone: 'bright'   },
  sour:    { adj: '鋭い酸味の通る',        verb: 'きらめく',       tone: 'lively'   },
  green:   { adj: 'ハーバルでクリーンな',  verb: '青く香る',       tone: 'fresh'    },
  other:   { adj: '土と森を感じる',        verb: '潜む',           tone: 'earthy'   },
  roasted: { adj: '深く重厚な',            verb: '支える',         tone: 'roasty'   },
  spices:  { adj: 'スパイシーで複雑な',    verb: '張り詰める',     tone: 'spiced'   },
  nutty:   { adj: 'ナッツとカカオの',      verb: '溶ける',         tone: 'nutty'    },
  sweet:   { adj: '甘くシロップ感のある',  verb: '包む',           tone: 'sweet'    },
}

/* ═══════════════════════════════════════════════════════════════════════════
   Contribution explainer — describes how a single parameter affects the profile
   ═══════════════════════════════════════════════════════════════════════════ */

export const PARAM_LABELS = {
  origin:  { en: 'ORIGIN',  jp: '産地' },
  variety: { en: 'VARIETY', jp: '品種' },
  process: { en: 'PROCESS', jp: '精製' },
  roast:   { en: 'ROAST',   jp: '焙煎' },
  grind:   { en: 'GRIND',   jp: '挽き目' },
}

const REGION_JA = {
  'East Africa': '東アフリカ',
  'Arabian':     'アラビア半島',
  'Central Am.': '中米',
  'South Am.':   '南米',
  'Caribbean':   'カリブ海',
  'Asia · Pac.': 'アジア・太平洋',
}
const LINEAGE_JA = {
  'Arabica':  'アラビカ系',
  'Hybrid':   'ハイブリッド系',
  'Robusta':  'ロブスタ系',
  'Liberica': 'リベリカ系',
}

const joinCats = (arr) => {
  // Joins category names with '・' as JSX-friendly segments (colored & bold).
  const out = []
  arr.forEach((e, i) => {
    if (i > 0) out.push({ text: '・' })
    out.push({ text: e.ja, color: e.color, bold: true })
  })
  return out
}

/**
 * Returns an array of segments that, when concatenated, form a natural
 * one-line description of how this parameter shapes the flavor.
 * Each segment: { text, color?, bold?, italic? }
 */
export function describeContribution(paramType, value) {
  if (!value) return null
  const t = (text, opts = {}) => ({ text, ...opts })

  if (paramType === 'origin') {
    const o = ORIGINS[value]
    if (!o) return null
    const region = REGION_JA[o.region] || o.region
    const sorted = WHEEL.map(c => ({ ...c, v: o[c.cat] || 0 }))
                       .sort((a, b) => b.v - a.v)
    const primary = sorted[0]
    const secondary = sorted[1].v > 1.6 ? sorted[1] : null
    const segs = [
      t(value, { bold: true, color: '#0A0A0A' }),
      t('は、'),
      t(primary.ja, { color: primary.color, bold: true }),
    ]
    if (secondary) {
      segs.push(t('を主軸に'))
      segs.push(t(secondary.ja, { color: secondary.color, bold: true }))
      segs.push(t(`が重なる${region}の産地。`))
    } else {
      segs.push(t(`が際立つ${region}の産地。`))
    }
    if (o.notes?.length) {
      segs.push(t(o.notes.slice(0, 3).join('、'), { italic: true }))
      segs.push(t('を感じることが多い。'))
    }
    return segs
  }

  if (paramType === 'variety') {
    const v = VARIETIES[value]
    if (!v) return null
    const lineage = LINEAGE_JA[v.lineage] || v.lineage
    const sorted = WHEEL.map(c => ({ ...c, val: v[c.cat] || 0 }))
                       .filter(e => Math.abs(e.val) > 0.3)
                       .sort((a, b) => Math.abs(b.val) - Math.abs(a.val))
                       .slice(0, 3)
    const enhances = sorted.filter(e => e.val > 0)
    const reduces  = sorted.filter(e => e.val < 0)
    const segs = [
      t(value, { bold: true, color: '#0A0A0A' }),
      t('は、'),
    ]
    if (enhances.length === 0 && reduces.length === 0) {
      segs.push(t(`どの軸にも大きく振らない、バランス型の${lineage}品種。`))
    } else {
      if (enhances.length) {
        joinCats(enhances).forEach(s => segs.push(s))
        segs.push(t(reduces.length ? 'を引き上げ、' : 'を引き上げる'))
      }
      if (reduces.length) {
        joinCats(reduces).forEach(s => segs.push(s))
        segs.push(t('を抑える'))
      }
      segs.push(t(`${lineage}の品種。`))
    }
    if (v.desc) segs.push(t(v.desc + '。'))
    return segs
  }

  if (paramType === 'process') {
    const p = PROCESSES[value]
    if (!p) return null
    const sorted = WHEEL.map(c => ({ ...c, val: p[c.cat] || 0 }))
                       .filter(e => Math.abs(e.val) > 0.3)
                       .sort((a, b) => Math.abs(b.val) - Math.abs(a.val))
                       .slice(0, 3)
    const enhances = sorted.filter(e => e.val > 0)
    const reduces  = sorted.filter(e => e.val < 0)
    const segs = [
      t(value, { bold: true, color: '#0A0A0A' }),
      t('は、'),
    ]
    if (enhances.length === 0 && reduces.length === 0) {
      segs.push(t('プロファイルを大きく変えない、穏やかな精製方法。'))
    } else {
      if (enhances.length) {
        joinCats(enhances).forEach(s => segs.push(s))
        segs.push(t(reduces.length ? 'を強め、' : 'を強める'))
      }
      if (reduces.length) {
        joinCats(reduces).forEach(s => segs.push(s))
        segs.push(t('を抑える'))
      }
      segs.push(t('精製方法。'))
    }
    if (p.desc) segs.push(t(p.desc + '。'))
    return segs
  }

  if (paramType === 'grind') {
    const g = GRINDS[value]
    if (!g) return null
    const sorted = WHEEL.map(c => ({ ...c, mul: g.mul[c.cat] || 1 }))
                       .filter(e => Math.abs(e.mul - 1) > 0.10)
                       .sort((a, b) => Math.abs(b.mul - 1) - Math.abs(a.mul - 1))
                       .slice(0, 4)
    const amplified = sorted.filter(e => e.mul > 1.05)
    const dampened  = sorted.filter(e => e.mul < 0.95)
    const segs = [
      t(value, { bold: true, color: '#0A0A0A' }),
      t('は、'),
    ]
    if (amplified.length === 0 && dampened.length === 0) {
      segs.push(t(`バランス型の挽き目 (${g.method} 抽出向け)。`))
    } else {
      if (amplified.length) {
        joinCats(amplified).forEach(s => segs.push(s))
        segs.push(t(dampened.length ? 'を引き出し、' : 'を引き出す'))
      }
      if (dampened.length) {
        joinCats(dampened).forEach(s => segs.push(s))
        segs.push(t('を弱める'))
      }
      segs.push(t(`挽き目 (${g.method} 抽出向け)。`))
    }
    if (g.desc) segs.push(t(g.desc + '。'))
    return segs
  }

  if (paramType === 'roast') {
    const r = ROASTS[value]
    if (!r) return null
    const sorted = WHEEL.map(c => ({ ...c, mul: r.mul[c.cat] || 1 }))
                       .filter(e => Math.abs(e.mul - 1) > 0.22)
                       .sort((a, b) => Math.abs(b.mul - 1) - Math.abs(a.mul - 1))
                       .slice(0, 4)
    const amplified = sorted.filter(e => e.mul > 1.1)
    const dampened  = sorted.filter(e => e.mul < 0.9)
    const segs = [
      t(value, { bold: true, color: '#0A0A0A' }),
      t('は、'),
    ]
    if (amplified.length === 0 && dampened.length === 0) {
      segs.push(t(`バランス型の焙煎度 (${r.idx}/8段階)。`))
    } else {
      if (amplified.length) {
        joinCats(amplified).forEach(s => segs.push(s))
        segs.push(t(dampened.length ? 'を強調し、' : 'を強調する'))
      }
      if (dampened.length) {
        joinCats(dampened).forEach(s => segs.push(s))
        segs.push(t('を強く抑える'))
      }
      segs.push(t(`焙煎度 (${r.idx}/8)。`))
    }
    if (r.desc) segs.push(t(r.desc + '。'))
    return segs
  }
  return null
}

/* Returns structured taste data: primary, secondary, leaf, notes — ready for JSX */
export function buildTasteSummary(profile, plotInfo) {
  if (!profile?.dominant) return null
  const sorted = WHEEL
    .map(c => ({ ...c, v: profile[c.cat] || 0, char: CHAR_PHRASES[c.cat] }))
    .sort((a, b) => b.v - a.v)
  const primary   = sorted[0]
  const secondary = sorted[1]?.v > 2.4 ? sorted[1] : null
  const tertiary  = sorted[2]?.v > 2.0 ? sorted[2] : null
  return {
    primary, secondary, tertiary,
    leafJa: plotInfo?.primaryLeaf?.ja || null,
    leafEn: plotInfo?.primaryLeaf?.en || null,
    notes: profile.notes || [],
  }
}

/* ─── Seed library ─────────────────────────────────────── */
export const SEED_BEANS = [
  { id: 's1', name: 'イルガチェフェ G1',  origin: 'エチオピア',   variety: 'ヘイルーム (在来種)',  process: 'ウォッシュド',             roast: 'ライト',     grind: '中細' },
  { id: 's2', name: 'マンデリン リントン', origin: 'インドネシア', variety: 'スマトラ',             process: 'スマトラ式 (ギリンバサ)',  roast: 'フルシティ', grind: '中挽き' },
  { id: 's3', name: 'セラード ブルボン',  origin: 'ブラジル',     variety: 'ブルボン',             process: 'ナチュラル',               roast: 'シティ',     grind: '中挽き' },
  { id: 's4', name: 'コチェレ ゲイシャ',  origin: 'コロンビア',   variety: 'ゲイシャ',             process: 'アナエロビック',           roast: 'シナモン',   grind: '中細' },
  { id: 's5', name: 'ニャマシビ AA',      origin: 'ケニア',       variety: 'SL28',                 process: 'ウォッシュド',             roast: 'ハイ',       grind: '中細' },
].map(b => ({ ...b, ...estimateFlavor(b), price: priceFor(b) }))

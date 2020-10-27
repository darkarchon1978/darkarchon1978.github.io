/* Magyarázat:
name: megnevezés; id: egyedi, 6 számjegyű azonosító; price: ár (csak számjegyek);
mainImage: főoldalon elhelyezendő kép azonosito.jpg filenévvel;
image1: első, termékoldalon elhelyezendő további kép egy termékhez (nem baj, ha nincs vagy nem ugyanannyi, mint máshoz);
numberOfImages: 'X'; X = a képek száma a fő képen KÍVÜL; ha csak egy fő kép van, akkor X=0
motto: tipp, jókívánság, bármi, ami a kártyák alsó, szürke részére megy - nem baj, ha nincs;
description: szöveges leírás a termékről;
materials: felhasznált anyagok - ezt döntsétek el, kell-e vagy beleveszitek a leírásba
 */

let productsArray = [
    {
        name: 'Mandala - horgolt dekoráció',
        id: '148332',
        price: '3000',
        mainImage: '148332.jpg',
        image1: '148332_1.jpg',
        image2: '148332_2.jpg',
        numberOfImages: '2',
        motto: 'Tipp: tedd egyedivé saját díszítéssel!',
        description: '25 cm átmérőjű horgolt dísz, amely falra vagy ablakba akasztva mutat a legjobban. A mandala tovább díszíthető szalagokkal, gyöngyökkel, csipkével, tollal, virággal, levelekkel. Lehet belőle álomfogó, melyet a szobád stílusához igazíthatsz. Fotózáshoz. esküvői dekorációhoz is felhasználható. A fotón látható mandalát fém karikára horgoltam rá.',
        materials: ''
    },
    {
        name: 'Nyulak fatörzsben',
        id: '971487',
        price: '5800',
        mainImage: '971487.jpg',
        image1: '971487_1.jpg',
        image2: '971487_2.jpg',
        image3: '971487_3.jpg',
        numberOfImages: '3',
        motto: 'Legyen vidám napod!',
        description: 'A kis fatörzs házikóban 3 nyuszi lakik és játszani vágyó gazdira várnak. A házikó a Multifelt Factory Nemezgyárból származó 100 % gyapjú filcből készült, ezért erős és tartós az anyaga. A ház virág díszítését pamut horgolócérnával horgoltam. A házikót és a hozzá tartozó alapot kézzel és géppel varrtam. A nyuszikák teste fa, melyet gyapjú filccel vontam be. A házikó teteje, ajtaja kinyitható, ezért a nyuszikák ki be járkálhatnak kis házukból, de be lehet pakolni más apróbb tárgyakat is. Kreativitást fejlesztő játékhoz, meséléshez kiváló eszköz.  Az ár tartalmazza a házikót és 3 db nyuszikát és a kis asztalkájukat. A házikó magassága 15 cm, az ágacskák 23 cm magasra nyúlnak, a ház átmérője 10 cm, a hozzá tartozó kis szőnyeg 23 cm hosszú. A kis nyuszik 8 cm magasak.',
        materials: ''
    },
    {
        name: 'Filc díszek',
        id: '761519',
        price: '2800',
        mainImage: '761519.jpg',
        numberOfImages: '0',
        motto: 'Legyen szép a karácsonyod!',
        description: 'Filcből készült, csipkével, gyönggyel díszített, kézzel varrt díszek, melyeket flízzel tömtem ki. Akasztója: selyemszalag. Akaszthatjuk a karácsonyfára, de lehet ajándék kísérő is. Mérete: 6-7cm + akasztó. Az ár egy szett ára, 5db dísz.',
        materials: ''
    },

    {
        name: 'Maci füzér csipkében',
        id: '202010',
        price: '1800',
        mainImage: '202010.jpg',
        image1: '202010_1.jpg',
        image2: '202010_2.jpg',
        numberOfImages: '2',
        motto: 'Legyen vidám a napod!',
        description: '7 db vidám macika, csipkés szoknyácskában várja, hogy egy gyermekszoba dísze legyen. A macikák 4,5 cm magasak és 104 cm hosszú natúr zsinegen hintáznak.',
        materials: ''
    },
    {
        name: 'Angyalka- tollal, csipkével',
        id: '202011',
        price: '900',
        mainImage: '202011.jpg',
        image1: '202011_1.jpg',
        numberOfImages: '1',
        motto: 'Legyen vidám a napod!',
        description: 'A fából készült kis figurát zsákvászon ruhába öltöztettem, gyönggyel és csipkével díszítettem. Kis tollpihe szárnyakkal angyallá varázsoltam. Az angyalka 6 cm magas.Szívesen lenne az adventi, karácsonyi dekoráció része ez a kis őrző, védő angyal az otthonodban.',
        materials: ''

    },

    {
        name: 'Mandala - horgolt dekoráció',
        id: '202012',
        price: '1800',
        mainImage: '202012.jpg',
        image1: '202012_1.jpg',
        numberOfImages: '1',
        motto: 'Tipp: Tedd egyedivé saját díszítéssel!',
        description: '1 db 11 cm átmérőjű horgolt dísz, amely falra vagy ablakba akasztva mutat a legjobban. A mandala tovább díszíthető szalagokkal, gyöngyökkel, csipkével, tollal, virággal, levelekkel. Lehet belőle álomfogó, melyet a szobád stílusához igazíthatsz.Fotózáshoz, esküvői dekorációhoz is felhasználható.',
        materials: ''
    },
]


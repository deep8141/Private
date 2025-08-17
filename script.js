// Global variables
let currentImageIndex = 0;
let images = [];
let currentMode = 'gallery';
let isAuthenticated = false;

// Pagination variables
let currentPage = 1;
let itemsPerPage = 50;
let totalPages = 1;

// Password configuration - CHANGE THIS TO YOUR DESIRED PASSWORD
const GALLERY_PASSWORD = 'sukhdeep';

// DOM elements
const passwordModal = document.getElementById('passwordModal');
const mainContent = document.getElementById('mainContent');
const passwordInput = document.getElementById('passwordInput');
const submitPassword = document.getElementById('submitPassword');
const passwordError = document.getElementById('passwordError');

const galleryModeBtn = document.getElementById('galleryMode');
const viewModeBtn = document.getElementById('viewMode');
const galleryContainer = document.getElementById('galleryContainer');
const viewContainer = document.getElementById('viewContainer');
const galleryGrid = document.getElementById('galleryGrid');
const viewerImage = document.getElementById('viewerImage');
const imageCounter = document.getElementById('imageCounter');
const imageName = document.getElementById('imageName');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const closeViewer = document.getElementById('closeViewer');
const lightbox = document.getElementById('lightbox');
const lightboxImage = document.getElementById('lightboxImage');
const lightboxCounter = document.getElementById('lightboxCounter');
const lightboxName = document.getElementById('lightboxName');
const closeLightbox = document.getElementById('closeLightbox');

// Pagination DOM elements
const pageInfo = document.getElementById('pageInfo');
const imageCount = document.getElementById('imageCount');
const firstPage = document.getElementById('firstPage');
const prevPage = document.getElementById('prevPage');
const nextPage = document.getElementById('nextPage');
const lastPage = document.getElementById('lastPage');
const pageNumbers = document.getElementById('pageNumbers');
const itemsPerPageSelect = document.getElementById('itemsPerPage');

// Image and video files - AUTO-GENERATED FROM IMAGE FOLDER
const mediaFiles = [
    // Auto-generated from ./image/ folder
    'IMG-20200105-WA0011_1616953189274.jpg',
    'IMG-20231022-WA0017.jpg',
    'IMG-20231022-WA0020.jpg',
    'IMG-20231023-WA0002.jpg',
    'IMG-20231023-WA0003.jpg',
    'IMG-20231029-WA0004.jpg',
    'IMG-20231029-WA0005.jpg',
    'IMG-20231029-WA0006.jpg',
    'IMG-20231029-WA0007.jpg',
    'IMG-20231029-WA0008.jpg',
    'IMG-20231029-WA0009.jpg',
    'IMG-20231127-WA0022.jpg',
    'IMG-20240205-WA0023.jpg',
    'IMG-20240407-WA0009.jpg',
    'IMG-20240413-WA0012.jpg',
    'IMG-20240426-WA0015.jpg',
    'IMG-20240429-WA0002.jpg',
    'IMG-20240429-WA0003.jpg',
    'IMG-20240429-WA0004.jpg',
    'IMG-20240502-WA0017.jpg',
    'IMG-20240511-WA0005.jpg',
    'IMG-20240511-WA0010.jpg',
    'IMG-20240524-WA0009.jpg',
    'IMG-20240804-WA0014.jpeg',
    'IMG-20240919-WA0007.jpg',
    'IMG-20241124-WA0000.jpg',
    'IMG-20241124-WA0001.jpg',
    'IMG-20241124-WA0002.jpg',
    'IMG-20241124-WA0003.jpg',
    'IMG-20241124-WA0004.jpg',
    'IMG-20241229-WA0000.jpg',
    'IMG-20241229-WA0001.jpg',
    'IMG-20250126-WA0008.jpg',
    'IMG-20250126-WA0009.jpg',
    'IMG-20250126-WA0010.jpg',
    'IMG-20250127-WA0004.jpg',
    'IMG_20230105_132404.jpg',
    'IMG_20230105_132416.jpg',
    'IMG_20230105_132441.jpg',
    'IMG_20230105_132451.jpg',
    'IMG_20230314_121644.jpg',
    'IMG_20230314_121647.jpg',
    'IMG_20230909_115235.jpg',
    'IMG_6725.JPG',
    'IMG_6727.JPG',
    'IMG_6728.JPG',
    'IMG_6731.JPG',
    'IMG_6735.JPG',
    'IMG_6736.JPG',
    'IMG_6738.JPG',
    'IMG_6746.JPG',
    'IMG_6747.JPG',
    'IMG_6748.JPG',
    'IMG_6762.JPG',
    'IMG_6763.JPG',
    'IMG_6764.JPG',
    'IMG_6765.JPG',
    'IMG_6766.JPG',
    'IMG_6773.JPG',
    'IMG_6777.JPG',
    'IMG_6778.JPG',
    'IMG_6784.JPG',
    'IMG_6788.JPG',
    'IMG_6789.JPG',
    'IMG_6790.JPG',
    'IMG_6795.JPG',
    'IMG_6798.JPG',
    'IMG_6799.JPG',
    'IMG_6803.JPG',
    'IMG_6804.JPG',
    'MP4_20240205_225001VLOG.mp4',
    'Screenrecorder-2023-10-30-20-50-21-315.mp4',
    'Screenshot_2022-10-09-16-21-05-343_com.snapchat.android.jpg',
    'Screenshot_2023-02-08-17-47-14-186_com.snapchat.android.jpg',
    'Screenshot_2023-10-26-19-55-15-089_com.whatsapp.jpg',
    'Screenshot_2024-05-02-22-58-37-760_com.whatsapp.jpg',
    'Screenshot_2024-05-02-23-00-22-128_com.whatsapp.jpg',
    'Screenshot_2024-12-10-19-31-36-687_com.instagram.android.jpg',
    'Snapchat-1001103293.jpg',
    'Snapchat-1002196766.jpg',
    'Snapchat-1005434110.jpg',
    'Snapchat-1005895525.jpg',
    'Snapchat-1007217662.jpg',
    'Snapchat-100849593.jpg',
    'Snapchat-1010548194.jpg',
    'Snapchat-101152752.jpg',
    'Snapchat-1016053065.jpg',
    'Snapchat-1018084607.jpg',
    'Snapchat-1018234084.mp4',
    'Snapchat-1020735238.jpg',
    'Snapchat-1020750129.jpg',
    'Snapchat-1020957269.jpg',
    'Snapchat-1022764096.jpg',
    'Snapchat-1026631210.jpg',
    'Snapchat-1028602363.jpg',
    'Snapchat-1031246257.jpg',
    'Snapchat-103601989.jpg',
    'Snapchat-1036324061.jpg',
    'Snapchat-1037600082.jpg',
    'Snapchat-1038801656.jpg',
    'Snapchat-1040130274.jpg',
    'Snapchat-1040141182.jpg',
    'Snapchat-1041278436.jpg',
    'Snapchat-1042788337.jpg',
    'Snapchat-1044148041.jpg',
    'Snapchat-1045044841.mp4',
    'Snapchat-104541231.mp4',
    'Snapchat-1045948992.jpg',
    'Snapchat-104754976.jpg',
    'Snapchat-1050347008.jpg',
    'Snapchat-1052517535.jpg',
    'Snapchat-1053048225.jpg',
    'Snapchat-1053426068.jpg',
    'Snapchat-1054086554.jpg',
    'Snapchat-1054214662.mp4',
    'Snapchat-1058465994.jpg',
    'Snapchat-1059887840.jpg',
    'Snapchat-1061261667.mp4',
    'Snapchat-1063425823.jpg',
    'Snapchat-1063675132.jpg',
    'Snapchat-106476515.jpg',
    'Snapchat-1065183680.jpg',
    'Snapchat-1066840757.jpg',
    'Snapchat-1068521978.jpg',
    'Snapchat-1071585749.jpg',
    'Snapchat-1072041096.jpg',
    'Snapchat-1072697260.jpg',
    'Snapchat-1073093488.jpg',
    'Snapchat-1074352821.mp4',
    'Snapchat-1078752903.jpg',
    'Snapchat-1079130123.jpg',
    'Snapchat-1091888746.jpg',
    'Snapchat-1093992284.jpg',
    'Snapchat-1095969025.jpg',
    'Snapchat-1096813364.jpg',
    'Snapchat-109975452.mp4',
    'Snapchat-1099810691.jpg',
    'Snapchat-1100156684.jpg',
    'Snapchat-1100687410.jpg',
    'Snapchat-110559491.jpg',
    'Snapchat-1105890587.mp4',
    'Snapchat-1106754106.jpg',
    'Snapchat-1110305305.jpg',
    'Snapchat-1110622779.jpg',
    'Snapchat-1113884860.jpg',
    'Snapchat-1118601416.jpg',
    'Snapchat-111968803.jpg',
    'Snapchat-1122956203.jpg',
    'Snapchat-1123258478.jpg',
    'Snapchat-1124097876.jpg',
    'Snapchat-1127275732.jpg',
    'Snapchat-1128218785.jpg',
    'Snapchat-1128576838.jpg',
    'Snapchat-11308754.mp4',
    'Snapchat-1131422002.jpg',
    'Snapchat-1131534149.jpg',
    'Snapchat-1135519608.jpg',
    'Snapchat-1136833818.jpg',
    'Snapchat-1139458939.jpg',
    'Snapchat-1141662714.jpg',
    'Snapchat-1142742599.mp4',
    'Snapchat-1145414528.jpg',
    'Snapchat-1146258330.mp4',
    'Snapchat-1148457737.jpg',
    'Snapchat-1148570271.jpg',
    'Snapchat-1149182477.jpg',
    'Snapchat-1155214520.mp4',
    'Snapchat-1157225027.jpg',
    'Snapchat-1157574599.jpg',
    'Snapchat-116339426.mp4',
    'Snapchat-116449495.jpg',
    'Snapchat-1164864089.jpg',
    'Snapchat-1165171926.jpg',
    'Snapchat-1167086162.jpg',
    'Snapchat-1167590866.jpg',
    'Snapchat-1170392737.jpg',
    'Snapchat-1173204505.jpg',
    'Snapchat-1176154344.mp4',
    'Snapchat-1177600024.jpg',
    'Snapchat-117805928.jpg',
    'Snapchat-1179561645.jpg',
    'Snapchat-118147048.jpg',
    'Snapchat-1183805181.jpg',
    'Snapchat-1183881354.mp4',
    'Snapchat-1184531056.jpg',
    'Snapchat-1185377976.jpg',
    'Snapchat-1188645877.jpg',
    'Snapchat-1190368483.jpg',
    'Snapchat-1191919541.jpg',
    'Snapchat-1195040988.jpg',
    'Snapchat-1197035354.jpg',
    'Snapchat-1197418514.jpg',
    'Snapchat-1197547927.jpg',
    'Snapchat-1197700834.jpg',
    'Snapchat-1198436564.jpg',
    'Snapchat-1198773382.jpg',
    'Snapchat-1199583679.jpg',
    'Snapchat-12008731.jpg',
    'Snapchat-1204006560.jpg',
    'Snapchat-1204603987.jpg',
    'Snapchat-1210587516.jpg',
    'Snapchat-1213186673.jpg',
    'Snapchat-1214640074.jpg',
    'Snapchat-1218079970.jpg',
    'Snapchat-121931766.jpg',
    'Snapchat-1219710114.jpg',
    'Snapchat-1220906027.jpg',
    'Snapchat-1225411078.jpg',
    'Snapchat-1228887706.jpg',
    'Snapchat-1228903543.mp4',
    'Snapchat-1233995238.mp4',
    'Snapchat-1234690865.jpg',
    'Snapchat-1238432766.jpg',
    'Snapchat-1238745462.jpg',
    'Snapchat-1240120588.jpg',
    'Snapchat-1240569167.jpg',
    'Snapchat-1249489210.jpg',
    'Snapchat-1252432807.jpg',
    'Snapchat-1252944755.jpg',
    'Snapchat-1255781934.jpg',
    'Snapchat-1255834884.jpg',
    'Snapchat-1255984958.jpg',
    'Snapchat-1258874551.jpg',
    'Snapchat-1260579326.jpg',
    'Snapchat-1262925304.jpg',
    'Snapchat-1280441655.jpg',
    'Snapchat-1281827179.jpg',
    'Snapchat-128278559.jpg',
    'Snapchat-1282881365.jpg',
    'Snapchat-1283641657.jpg',
    'Snapchat-1285266113.jpg',
    'Snapchat-129071432.jpg',
    'Snapchat-1294527808.jpg',
    'Snapchat-1294561859.mp4',
    'Snapchat-1295461025.jpg',
    'Snapchat-130559135.jpg',
    'Snapchat-1309010291.jpg',
    'Snapchat-1309098138.jpg',
    'Snapchat-1310255123.jpg',
    'Snapchat-1318798812.jpg',
    'Snapchat-1320326188.jpg',
    'Snapchat-1326821604.mp4',
    'Snapchat-1327321536.jpg',
    'Snapchat-1328708162.jpg',
    'Snapchat-1328717341.jpg',
    'Snapchat-1329254717.jpg',
    'Snapchat-1331462700.jpg',
    'Snapchat-1333058248.jpg',
    'Snapchat-1336394333.jpg',
    'Snapchat-1337982545.jpg',
    'Snapchat-1338898571.jpg',
    'Snapchat-1340362835.jpg',
    'Snapchat-134478190.jpg',
    'Snapchat-1345365931.jpg',
    'Snapchat-134933722.jpg',
    'Snapchat-1353767744.jpg',
    'Snapchat-135488691.jpg',
    'Snapchat-1356146711.jpg',
    'Snapchat-1361565139.jpg',
    'Snapchat-1364285232.jpg',
    'Snapchat-1364753991.jpg',
    'Snapchat-1365400498.jpg',
    'Snapchat-1368459483.jpg',
    'Snapchat-1368741789.jpg',
    'Snapchat-1368771667.jpg',
    'Snapchat-1371672374.jpg',
    'Snapchat-1373602613.jpg',
    'Snapchat-137426418.jpg',
    'Snapchat-1376887541.jpg',
    'Snapchat-1377787295.mp4',
    'Snapchat-1384669206.jpg',
    'Snapchat-1388474330.mp4',
    'Snapchat-1389780389.mp4',
    'Snapchat-1393713180.jpg',
    'Snapchat-1397313889.jpg',
    'Snapchat-13979555.jpg',
    'Snapchat-1398589446.jpg',
    'Snapchat-1398907641.jpg',
    'Snapchat-1399430314.jpg',
    'Snapchat-1400026073.jpg',
    'Snapchat-1401163354.jpg',
    'Snapchat-1401164010.jpg',
    'Snapchat-1402973093.jpg',
    'Snapchat-1405675186.mp4',
    'Snapchat-1410361024.mp4',
    'Snapchat-1414200992.jpg',
    'Snapchat-1419084673.jpg',
    'Snapchat-1422010509.jpg',
    'Snapchat-1422902939.jpg',
    'Snapchat-1423852133.jpg',
    'Snapchat-1427341637.jpg',
    'Snapchat-1428092657.jpg',
    'Snapchat-1428911224.jpg',
    'Snapchat-1429530436.mp4',
    'Snapchat-1431278451.mp4',
    'Snapchat-1439110450.jpg',
    'Snapchat-1439598503.jpg',
    'Snapchat-1439635415.jpg',
    'Snapchat-1440008823.jpg',
    'Snapchat-1440692979.jpg',
    'Snapchat-1442647412.jpg',
    'Snapchat-1442814563.jpg',
    'Snapchat-1447754085.jpg',
    'Snapchat-1450119674.jpg',
    'Snapchat-1450447839.jpg',
    'Snapchat-1451860826.jpg',
    'Snapchat-1452971994.jpg',
    'Snapchat-1453536368.jpg',
    'Snapchat-1453912516.jpg',
    'Snapchat-1456598602.jpg',
    'Snapchat-1457446640.jpg',
    'Snapchat-1458437122.mp4',
    'Snapchat-1461397591.jpg',
    'Snapchat-1461690905.jpg',
    'Snapchat-1464972865.jpg',
    'Snapchat-1468435977.jpg',
    'Snapchat-1471860886.jpg',
    'Snapchat-1475131684.jpg',
    'Snapchat-1477272032.jpg',
    'Snapchat-1485593236.mp4',
    'Snapchat-1485996919.mp4',
    'Snapchat-1487666116.jpg',
    'Snapchat-1492020744.jpg',
    'Snapchat-1492259532.jpg',
    'Snapchat-1492525167.mp4',
    'Snapchat-1494786952.jpg',
    'Snapchat-149848910.jpg',
    'Snapchat-1500867752.jpg',
    'Snapchat-150530044.jpg',
    'Snapchat-1505582877.jpg',
    'Snapchat-1506710412.jpg',
    'Snapchat-1511612980.jpg',
    'Snapchat-151397675.jpg',
    'Snapchat-1516595944.mp4',
    'Snapchat-1518842514.jpg',
    'Snapchat-1519426024.jpg',
    'Snapchat-1519968878.jpg',
    'Snapchat-1521347073.jpg',
    'Snapchat-152224751.jpg',
    'Snapchat-1522984063.jpg',
    'Snapchat-1524191951.mp4',
    'Snapchat-152620964.jpg',
    'Snapchat-1528461734.jpg',
    'Snapchat-1530912909.jpg',
    'Snapchat-153261076.jpg',
    'Snapchat-1533350243.jpg',
    'Snapchat-1536404268.jpg',
    'Snapchat-1538459169.jpg',
    'Snapchat-1539399296.jpg',
    'Snapchat-1548124959.jpg',
    'Snapchat-1548981610.jpg',
    'Snapchat-155148526.jpg',
    'Snapchat-1554576826.jpg',
    'Snapchat-1557995123.jpg',
    'Snapchat-1558170291.jpg',
    'Snapchat-1559054546.jpg',
    'Snapchat-1563975939.jpg',
    'Snapchat-1567687204.jpg',
    'Snapchat-1568368025.jpg',
    'Snapchat-1568540435.jpg',
    'Snapchat-1570021291.jpg',
    'Snapchat-157063506.jpg',
    'Snapchat-1573007538.jpg',
    'Snapchat-1578657419.mp4',
    'Snapchat-1583198278.jpg',
    'Snapchat-1589851937.jpg',
    'Snapchat-1592084351.jpg',
    'Snapchat-1593068238.jpg',
    'Snapchat-1596965207.jpg',
    'Snapchat-1598990883.mp4',
    'Snapchat-1599792083.jpg',
    'Snapchat-1603922251.jpg',
    'Snapchat-1609116062.mp4',
    'Snapchat-1613148297.jpg',
    'Snapchat-1613718607.jpg',
    'Snapchat-1613813198.mp4',
    'Snapchat-1614742218.jpg',
    'Snapchat-1621356434.jpg',
    'Snapchat-1622902811.jpg',
    'Snapchat-1623603248.jpg',
    'Snapchat-1629044753.jpg',
    'Snapchat-1632546032.jpg',
    'Snapchat-16339543.mp4',
    'Snapchat-1634345053.jpg',
    'Snapchat-163470843.jpg',
    'Snapchat-1639066770.jpg',
    'Snapchat-1640398586.jpg',
    'Snapchat-1641407272.jpg',
    'Snapchat-1644990955.mp4',
    'Snapchat-1646296521.jpg',
    'Snapchat-1651047606.jpg',
    'Snapchat-1651608968.jpg',
    'Snapchat-165983862.jpg',
    'Snapchat-167198493.jpg',
    'Snapchat-1674222688.jpg',
    'Snapchat-1675499252.mp4',
    'Snapchat-1675672955.mp4',
    'Snapchat-1679327136.jpg',
    'Snapchat-1679916650.mp4',
    'Snapchat-1680047622.mp4',
    'Snapchat-1680794643.jpg',
    'Snapchat-1682655307.jpg',
    'Snapchat-1683566556.jpg',
    'Snapchat-1683604408.jpg',
    'Snapchat-1691205681.jpg',
    'Snapchat-1691416966.jpg',
    'Snapchat-1693856608.jpg',
    'Snapchat-1694185952.jpg',
    'Snapchat-1701277089.jpg',
    'Snapchat-1706427858.jpg',
    'Snapchat-1706725978.jpg',
    'Snapchat-1710496044.jpg',
    'Snapchat-1712034176.jpg',
    'Snapchat-1715812304.jpg',
    'Snapchat-1719554068.mp4',
    'Snapchat-1726537402.mp4',
    'Snapchat-1727140419.mp4',
    'Snapchat-1729050642.jpg',
    'Snapchat-1729236568.jpg',
    'Snapchat-1733609048.jpg',
    'Snapchat-1734236339.jpg',
    'Snapchat-1735537702.jpg',
    'Snapchat-1737757615.jpg',
    'Snapchat-1739520488.jpg',
    'Snapchat-174416244.jpg',
    'Snapchat-1744396071.jpg',
    'Snapchat-1746721078.jpg',
    'Snapchat-174877499.mp4',
    'Snapchat-1749009394.jpg',
    'Snapchat-1754725360.jpg',
    'Snapchat-1762597796.jpg',
    'Snapchat-176273669.jpg',
    'Snapchat-1763878569.jpg',
    'Snapchat-1765623303.jpg',
    'Snapchat-1771956331.jpg',
    'Snapchat-177587454.jpg',
    'Snapchat-177673973.jpg',
    'Snapchat-1781320102.jpg',
    'Snapchat-1781603349.jpg',
    'Snapchat-1781964349.jpg',
    'Snapchat-1783629659.jpg',
    'Snapchat-1785783141.jpg',
    'Snapchat-1785851136.jpg',
    'Snapchat-1786046527.jpg',
    'Snapchat-1790486790.jpg',
    'Snapchat-1790583275.jpg',
    'Snapchat-1791105180.jpg',
    'Snapchat-1792768280.mp4',
    'Snapchat-1793475546.jpg',
    'Snapchat-1794822533.jpg',
    'Snapchat-1798987312.jpg',
    'Snapchat-1801092641.jpg',
    'Snapchat-1806703859.mp4',
    'Snapchat-181038060.jpg',
    'Snapchat-1811842364.jpg',
    'Snapchat-181544346.jpg',
    'Snapchat-1816585788.jpg',
    'Snapchat-1818679960.jpg',
    'Snapchat-182138596.jpg',
    'Snapchat-1823157380.mp4',
    'Snapchat-1823825712.jpg',
    'Snapchat-1824142644.jpg',
    'Snapchat-1824577157.jpg',
    'Snapchat-1826587900.jpg',
    'Snapchat-1828961139.jpg',
    'Snapchat-1829624140.mp4',
    'Snapchat-1829817769.jpg',
    'Snapchat-1831715443.mp4',
    'Snapchat-1833636478.jpg',
    'Snapchat-1834726739.jpg',
    'Snapchat-1836927038.mp4',
    'Snapchat-1837162533.jpg',
    'Snapchat-1838517467.jpg',
    'Snapchat-1839308339.mp4',
    'Snapchat-1842715714.mp4',
    'Snapchat-1843976203.jpg',
    'Snapchat-1844917863.jpg',
    'Snapchat-1846096116.jpg',
    'Snapchat-1847606115.jpg',
    'Snapchat-1848489077.jpg',
    'Snapchat-1850197926.mp4',
    'Snapchat-1851335029.jpg',
    'Snapchat-1856008476.jpg',
    'Snapchat-1857875941.jpg',
    'Snapchat-1859226190.jpg',
    'Snapchat-186590670.mp4',
    'Snapchat-1867025606.jpg',
    'Snapchat-1867643718.jpg',
    'Snapchat-1867882255.jpg',
    'Snapchat-1868790409.jpg',
    'Snapchat-186955701.jpg',
    'Snapchat-1869562214.jpg',
    'Snapchat-1869762144.jpg',
    'Snapchat-1870043102.jpg',
    'Snapchat-1870309457.jpg',
    'Snapchat-1874651544.jpg',
    'Snapchat-1879330073.jpg',
    'Snapchat-1884809531.jpg',
    'Snapchat-1885578859.mp4',
    'Snapchat-1886165230.jpg',
    'Snapchat-188742621.jpg',
    'Snapchat-1890258796.jpg',
    'Snapchat-1890304731.jpg',
    'Snapchat-1891206035.jpg',
    'Snapchat-1891444388.jpg',
    'Snapchat-1893338282.jpg',
    'Snapchat-1893845810.jpg',
    'Snapchat-1894483952.jpg',
    'Snapchat-1895474925.jpg',
    'Snapchat-1897493592.jpg',
    'Snapchat-1899255216.jpg',
    'Snapchat-1899480619.jpg',
    'Snapchat-189954323.jpg',
    'Snapchat-1904845795.jpg',
    'Snapchat-190606473.jpg',
    'Snapchat-1908119653.jpg',
    'Snapchat-1916679333.jpg',
    'Snapchat-1920893461.jpg',
    'Snapchat-1921193499.jpg',
    'Snapchat-1931852259.jpg',
    'Snapchat-1933211797.jpg',
    'Snapchat-1934799217.mp4',
    'Snapchat-1936291331.jpg',
    'Snapchat-1939647459.jpg',
    'Snapchat-1940624550.jpg',
    'Snapchat-1945655194.jpg',
    'Snapchat-1947983522.jpg',
    'Snapchat-1951044191.jpg',
    'Snapchat-1953708235.jpg',
    'Snapchat-1955764935.mp4',
    'Snapchat-1958385182.mp4',
    'Snapchat-1958715558.jpg',
    'Snapchat-1958753202.jpg',
    'Snapchat-1960372936.jpg',
    'Snapchat-1970454316.jpg',
    'Snapchat-1970919341.jpg',
    'Snapchat-1971862413.jpg',
    'Snapchat-1976387700.jpg',
    'Snapchat-1977986233.mp4',
    'Snapchat-1979750832.jpg',
    'Snapchat-1981500043.jpg',
    'Snapchat-1981506258.jpg',
    'Snapchat-1981550894.mp4',
    'Snapchat-1985912609.jpg',
    'Snapchat-1985959317.jpg',
    'Snapchat-1987931716.jpg',
    'Snapchat-1990456952.jpg',
    'Snapchat-1995215843.jpg',
    'Snapchat-2000843423.jpg',
    'Snapchat-2001691468.jpg',
    'Snapchat-2003895721.jpg',
    'Snapchat-2004591532.jpg',
    'Snapchat-2005441633.jpg',
    'Snapchat-200602037.jpg',
    'Snapchat-2006039533.jpg',
    'Snapchat-2007358279.jpg',
    'Snapchat-2011295507.jpg',
    'Snapchat-2012778351.jpg',
    'Snapchat-202003747.jpg',
    'Snapchat-2021342965.mp4',
    'Snapchat-2021472299.jpg',
    'Snapchat-2021891343.mp4',
    'Snapchat-2024566142.jpg',
    'Snapchat-2027270998.jpg',
    'Snapchat-2028664260.jpg',
    'Snapchat-2029040437.jpg',
    'Snapchat-2029740246.jpg',
    'Snapchat-2032568274.mp4',
    'Snapchat-2034377225.jpg',
    'Snapchat-2036910862.jpg',
    'Snapchat-2042085370.jpg',
    'Snapchat-2043411642.jpg',
    'Snapchat-2043984066.mp4',
    'Snapchat-2044896124.jpg',
    'Snapchat-2045425000.jpg',
    'Snapchat-2045643078.jpg',
    'Snapchat-2048268636.mp4',
    'Snapchat-2048971894.mp4',
    'Snapchat-2048989015.jpg',
    'Snapchat-2050031234.jpg',
    'Snapchat-205196629.jpg',
    'Snapchat-2052219815.jpg',
    'Snapchat-2053066835.jpg',
    'Snapchat-2054108774.mp4',
    'Snapchat-205498948.jpg',
    'Snapchat-2058336642.jpg',
    'Snapchat-2061601922.jpg',
    'Snapchat-2062047193.jpg',
    'Snapchat-2062913100.jpg',
    'Snapchat-2063036876.mp4',
    'Snapchat-2065463117.jpg',
    'Snapchat-20655511.jpg',
    'Snapchat-2065907356.jpg',
    'Snapchat-2066839235.jpg',
    'Snapchat-2070008630.jpg',
    'Snapchat-2070225422.jpg',
    'Snapchat-2072567557.jpg',
    'Snapchat-2076675457.jpg',
    'Snapchat-2078667092.jpg',
    'Snapchat-207879504.jpg',
    'Snapchat-2085931482.jpg',
    'Snapchat-208616673.jpg',
    'Snapchat-2087988872.jpg',
    'Snapchat-2088807700.jpg',
    'Snapchat-2090533338.jpg',
    'Snapchat-2092748047.jpg',
    'Snapchat-2093797555.jpg',
    'Snapchat-2094404536.jpg',
    'Snapchat-2094405009.jpg',
    'Snapchat-2096157232.jpg',
    'Snapchat-2100050646.jpg',
    'Snapchat-2101270022.jpg',
    'Snapchat-2107324296.jpg',
    'Snapchat-2109525818.jpg',
    'Snapchat-211087259.jpg',
    'Snapchat-2117589907.jpg',
    'Snapchat-2117758920.jpg',
    'Snapchat-2117936967.jpg',
    'Snapchat-2118166630.mp4',
    'Snapchat-2119288521.jpg',
    'Snapchat-2120400488.jpg',
    'Snapchat-212044889.jpg',
    'Snapchat-2122325761.jpg',
    'Snapchat-212382649.jpg',
    'Snapchat-2126549396.jpg',
    'Snapchat-2131158287.jpg',
    'Snapchat-2133515097.jpg',
    'Snapchat-2140045693.jpg',
    'Snapchat-2144595648.jpg',
    'Snapchat-214497579.jpg',
    'Snapchat-215277053.jpg',
    'Snapchat-215743114.jpg',
    'Snapchat-216237235.jpg',
    'Snapchat-216786057.mp4',
    'Snapchat-225333414.jpg',
    'Snapchat-227280267.jpg',
    'Snapchat-229688368.jpg',
    'Snapchat-230601182.jpg',
    'Snapchat-234304150.jpg',
    'Snapchat-237259548.jpg',
    'Snapchat-238181504.jpg',
    'Snapchat-238232649.jpg',
    'Snapchat-23950500.jpg',
    'Snapchat-243189188.jpg',
    'Snapchat-243518845.mp4',
    'Snapchat-245822786.jpg',
    'Snapchat-248774981.jpg',
    'Snapchat-249920037.jpg',
    'Snapchat-249964270.jpg',
    'Snapchat-251162318.jpg',
    'Snapchat-251461698.mp4',
    'Snapchat-251520936.jpg',
    'Snapchat-252881771.mp4',
    'Snapchat-253951389.mp4',
    'Snapchat-255237087.jpg',
    'Snapchat-257294129.jpg',
    'Snapchat-257658814.jpg',
    'Snapchat-258669261.mp4',
    'Snapchat-260182204.jpg',
    'Snapchat-264367517.jpg',
    'Snapchat-267140127.jpg',
    'Snapchat-267931146.jpg',
    'Snapchat-268632367.jpg',
    'Snapchat-269217770.jpg',
    'Snapchat-271509385.mp4',
    'Snapchat-275652811.jpg',
    'Snapchat-276008971.jpg',
    'Snapchat-276695334.jpg',
    'Snapchat-277007089.mp4',
    'Snapchat-279221170.jpg',
    'Snapchat-280634518.jpg',
    'Snapchat-281194601.jpg',
    'Snapchat-285132954.jpg',
    'Snapchat-287121597.jpg',
    'Snapchat-290208064.mp4',
    'Snapchat-292166573.jpg',
    'Snapchat-295002508.jpg',
    'Snapchat-295805058.jpg',
    'Snapchat-296331750.jpg',
    'Snapchat-296633633.jpg',
    'Snapchat-29695678.mp4',
    'Snapchat-297072775.jpg',
    'Snapchat-297514036.jpg',
    'Snapchat-300211437.jpg',
    'Snapchat-301740172.jpg',
    'Snapchat-303521073.jpg',
    'Snapchat-307974401.jpg',
    'Snapchat-310937020.jpg',
    'Snapchat-311864318.jpg',
    'Snapchat-319751933.jpg',
    'Snapchat-324264539.jpg',
    'Snapchat-324442185.mp4',
    'Snapchat-327395436.jpg',
    'Snapchat-328846298.jpg',
    'Snapchat-329325909.jpg',
    'Snapchat-329921389.jpg',
    'Snapchat-341862362.jpg',
    'Snapchat-342165686.mp4',
    'Snapchat-343687885.mp4',
    'Snapchat-347317040.jpg',
    'Snapchat-35431991.mp4',
    'Snapchat-355173174.jpg',
    'Snapchat-355287701.mp4',
    'Snapchat-35582937.jpg',
    'Snapchat-361330845.jpg',
    'Snapchat-361536954.jpg',
    'Snapchat-366226016.jpg',
    'Snapchat-36804969.jpg',
    'Snapchat-368563105.jpg',
    'Snapchat-371522784.jpg',
    'Snapchat-372391112.jpg',
    'Snapchat-372947933.jpg',
    'Snapchat-373515662.jpg',
    'Snapchat-377572515.mp4',
    'Snapchat-379064254.jpg',
    'Snapchat-380500234.jpg',
    'Snapchat-38472800.jpg',
    'Snapchat-396431830.mp4',
    'Snapchat-40135127.jpg',
    'Snapchat-401975945.mp4',
    'Snapchat-402439955.jpg',
    'Snapchat-402702847.jpg',
    'Snapchat-402704823.jpg',
    'Snapchat-403177098.jpg',
    'Snapchat-403464922.jpg',
    'Snapchat-404267970.jpg',
    'Snapchat-40636664.jpg',
    'Snapchat-40838193.jpg',
    'Snapchat-411130553.jpg',
    'Snapchat-418341205.mp4',
    'Snapchat-419150029.jpg',
    'Snapchat-419274735.jpg',
    'Snapchat-419767795.jpg',
    'Snapchat-423917774.jpg',
    'Snapchat-424127633.jpg',
    'Snapchat-424664502.mp4',
    'Snapchat-426964323.jpg',
    'Snapchat-427184476.jpg',
    'Snapchat-431724787.jpg',
    'Snapchat-431773551.jpg',
    'Snapchat-438699803.jpg',
    'Snapchat-441436437.jpg',
    'Snapchat-444200770.jpg',
    'Snapchat-446883524.jpg',
    'Snapchat-447536743.jpg',
    'Snapchat-450922798.mp4',
    'Snapchat-451575925.jpg',
    'Snapchat-453994006.mp4',
    'Snapchat-454352593.jpg',
    'Snapchat-455484437.jpg',
    'Snapchat-455812436.jpg',
    'Snapchat-457638291.jpg',
    'Snapchat-458780126.jpg',
    'Snapchat-459474252.jpg',
    'Snapchat-464474279.jpg',
    'Snapchat-464789485.jpg',
    'Snapchat-464838838.jpg',
    'Snapchat-467185571.jpg',
    'Snapchat-470409405.jpg',
    'Snapchat-476920539.mp4',
    'Snapchat-482996154.jpg',
    'Snapchat-484772444.jpg',
    'Snapchat-485231671.jpg',
    'Snapchat-486731990.jpg',
    'Snapchat-493771311.jpg',
    'Snapchat-495622676.jpg',
    'Snapchat-498198815.mp4',
    'Snapchat-503674075.jpg',
    'Snapchat-507676819.jpg',
    'Snapchat-50885568.jpg',
    'Snapchat-511509363.jpg',
    'Snapchat-512355072.jpg',
    'Snapchat-514655732.jpg',
    'Snapchat-514856873.jpg',
    'Snapchat-516954026.mp4',
    'Snapchat-517249096.jpg',
    'Snapchat-517724446.jpg',
    'Snapchat-518519823.mp4',
    'Snapchat-519334488.jpg',
    'Snapchat-519847566.jpg',
    'Snapchat-52182076.mp4',
    'Snapchat-524465063.jpg',
    'Snapchat-526494988.jpg',
    'Snapchat-533658657.jpg',
    'Snapchat-533680897.jpg',
    'Snapchat-535842011.jpg',
    'Snapchat-537438304.jpg',
    'Snapchat-539498960.jpg',
    'Snapchat-545421534.jpg',
    'Snapchat-549164761.jpg',
    'Snapchat-549257396.jpg',
    'Snapchat-55008868.jpg',
    'Snapchat-553584319.jpg',
    'Snapchat-553619998.jpg',
    'Snapchat-555452993.jpg',
    'Snapchat-556600802.jpg',
    'Snapchat-557144543.jpg',
    'Snapchat-557252232.jpg',
    'Snapchat-55737270.jpg',
    'Snapchat-557732350.jpg',
    'Snapchat-557911938.jpg',
    'Snapchat-558535395.jpg',
    'Snapchat-562156775.jpg',
    'Snapchat-562382172.jpg',
    'Snapchat-568822366.jpg',
    'Snapchat-569367170.jpg',
    'Snapchat-571335845.mp4',
    'Snapchat-574652004.jpg',
    'Snapchat-574960273.jpg',
    'Snapchat-576452562.jpg',
    'Snapchat-576815151.jpg',
    'Snapchat-587622362.jpg',
    'Snapchat-591714193.jpg',
    'Snapchat-595618628.jpg',
    'Snapchat-595803605.jpg',
    'Snapchat-596105936.mp4',
    'Snapchat-596543313.jpg',
    'Snapchat-601885577.jpg',
    'Snapchat-60424747.jpg',
    'Snapchat-608929472.jpg',
    'Snapchat-619526245.jpg',
    'Snapchat-62141565.jpg',
    'Snapchat-622706247.jpg',
    'Snapchat-624288935.mp4',
    'Snapchat-625371923.jpg',
    'Snapchat-629785853.jpg',
    'Snapchat-633649282.jpg',
    'Snapchat-634543709.jpg',
    'Snapchat-634809052.jpg',
    'Snapchat-634907618.jpg',
    'Snapchat-638267581.jpg',
    'Snapchat-639039861.jpg',
    'Snapchat-644620763.jpg',
    'Snapchat-644877193.jpg',
    'Snapchat-645840673.mp4',
    'Snapchat-647807281.jpg',
    'Snapchat-650317713.jpg',
    'Snapchat-650627755.jpg',
    'Snapchat-650941277.jpg',
    'Snapchat-656796569.jpg',
    'Snapchat-657866627.jpg',
    'Snapchat-658545238.jpg',
    'Snapchat-659187987.mp4',
    'Snapchat-665070311.mp4',
    'Snapchat-667535442.mp4',
    'Snapchat-668254367.mp4',
    'Snapchat-674076456.jpg',
    'Snapchat-677055591.jpg',
    'Snapchat-679862279.jpg',
    'Snapchat-681043340.jpg',
    'Snapchat-683518199.jpg',
    'Snapchat-691643493.jpg',
    'Snapchat-693951820.jpg',
    'Snapchat-697084124.jpg',
    'Snapchat-699030490.jpg',
    'Snapchat-700159051.jpg',
    'Snapchat-700506855.jpg',
    'Snapchat-702068156.jpg',
    'Snapchat-702878239.jpg',
    'Snapchat-706018652.jpg',
    'Snapchat-708276734.jpg',
    'Snapchat-709836254.jpg',
    'Snapchat-713293917.jpg',
    'Snapchat-718275774.mp4',
    'Snapchat-720442228.jpg',
    'Snapchat-72255983.jpg',
    'Snapchat-723017858.jpg',
    'Snapchat-727888923.mp4',
    'Snapchat-728561135.jpg',
    'Snapchat-729699752.jpg',
    'Snapchat-730173501.jpg',
    'Snapchat-732881457.jpg',
    'Snapchat-734165633.jpg',
    'Snapchat-735065806.jpg',
    'Snapchat-736591051.jpg',
    'Snapchat-736753463.jpg',
    'Snapchat-738888726.jpg',
    'Snapchat-740655001.mp4',
    'Snapchat-74193017.mp4',
    'Snapchat-747714050.mp4',
    'Snapchat-748218213.jpg',
    'Snapchat-7483019.mp4',
    'Snapchat-751227546.jpg',
    'Snapchat-751345293.jpg',
    'Snapchat-751722598.jpg',
    'Snapchat-751800575.jpg',
    'Snapchat-752916001.jpg',
    'Snapchat-757354753.jpg',
    'Snapchat-761536376.jpg',
    'Snapchat-762847330.jpg',
    'Snapchat-762931159.jpg',
    'Snapchat-764173737.jpg',
    'Snapchat-765605022.jpg',
    'Snapchat-765860870.jpg',
    'Snapchat-767406569.jpg',
    'Snapchat-76763928.mp4',
    'Snapchat-768971804.mp4',
    'Snapchat-770582998.jpg',
    'Snapchat-771465448.jpg',
    'Snapchat-774957636.mp4',
    'Snapchat-776962327.mp4',
    'Snapchat-788234589.mp4',
    'Snapchat-788544746.jpg',
    'Snapchat-789455586.jpg',
    'Snapchat-790760434.jpg',
    'Snapchat-79342603.jpg',
    'Snapchat-793458184.jpg',
    'Snapchat-7954168.jpg',
    'Snapchat-795936616.jpg',
    'Snapchat-797344142.jpg',
    'Snapchat-797736550.jpg',
    'Snapchat-799284746.mp4',
    'Snapchat-799992362.jpg',
    'Snapchat-80199674.jpg',
    'Snapchat-803301306.jpg',
    'Snapchat-803873767.jpg',
    'Snapchat-811309549.jpg',
    'Snapchat-812027778.jpg',
    'Snapchat-814035079.mp4',
    'Snapchat-815182757.jpg',
    'Snapchat-819563102.jpg',
    'Snapchat-823236601.jpg',
    'Snapchat-826989292.jpg',
    'Snapchat-828385814.jpg',
    'Snapchat-831800322.jpg',
    'Snapchat-834707282.jpg',
    'Snapchat-837130960.jpg',
    'Snapchat-838492285.jpg',
    'Snapchat-839689425.jpg',
    'Snapchat-841854490.jpg',
    'Snapchat-843624274.mp4',
    'Snapchat-846435910.jpg',
    'Snapchat-847873626.jpg',
    'Snapchat-852173424.jpg',
    'Snapchat-857444751.jpg',
    'Snapchat-860485243.jpg',
    'Snapchat-862072792.jpg',
    'Snapchat-867008546.jpg',
    'Snapchat-867874814.jpg',
    'Snapchat-872580262.jpg',
    'Snapchat-873956167.jpg',
    'Snapchat-874379324.jpg',
    'Snapchat-880997800.jpg',
    'Snapchat-884931242.jpg',
    'Snapchat-885836364.jpg',
    'Snapchat-889055361.jpg',
    'Snapchat-88908840.jpg',
    'Snapchat-890275710.jpg',
    'Snapchat-892973180.jpg',
    'Snapchat-893395610.jpg',
    'Snapchat-894792787.jpg',
    'Snapchat-895836374.jpg',
    'Snapchat-902390139.jpg',
    'Snapchat-90333892.jpg',
    'Snapchat-904730470.jpg',
    'Snapchat-908202181.mp4',
    'Snapchat-90866956.jpg',
    'Snapchat-908835749.jpg',
    'Snapchat-911453949.jpg',
    'Snapchat-912270234.jpg',
    'Snapchat-912889747.jpg',
    'Snapchat-915914843.jpg',
    'Snapchat-917745679.mp4',
    'Snapchat-919519392.jpg',
    'Snapchat-919621636.jpg',
    'Snapchat-919922383.mp4',
    'Snapchat-920676264.jpg',
    'Snapchat-924439664.jpg',
    'Snapchat-926493526.jpg',
    'Snapchat-928748970.jpg',
    'Snapchat-93027061.jpg',
    'Snapchat-931266755.jpg',
    'Snapchat-93649939.mp4',
    'Snapchat-93989880.jpg',
    'Snapchat-940063429.jpg',
    'Snapchat-943706606.mp4',
    'Snapchat-945376083.jpg',
    'Snapchat-947470608.jpg',
    'Snapchat-947901766.jpg',
    'Snapchat-950986906.jpg',
    'Snapchat-951145065.jpg',
    'Snapchat-952460710.jpg',
    'Snapchat-953453667.mp4',
    'Snapchat-953745176.jpg',
    'Snapchat-959554039.jpg',
    'Snapchat-96288516.jpg',
    'Snapchat-964094341.jpg',
    'Snapchat-964117807.mp4',
    'Snapchat-964642803.jpg',
    'Snapchat-967428652.jpg',
    'Snapchat-968156174.jpg',
    'Snapchat-968623521.jpg',
    'Snapchat-974470146.jpg',
    'Snapchat-979870196.jpg',
    'Snapchat-980184098.jpg',
    'Snapchat-98540001.jpg',
    'Snapchat-990582538.jpg',
    'Snapchat-991222096.jpg',
    'Snapchat-993843581.jpg',
    'Snapchat-993965066.jpg',
    'Snapchat-994502114.jpg',
    'Snapchat-998527511.jpg',
    'VID-20190525-WA0002.mp4',
    'VID-20231023-WA0001.mp4',
    'VID_20430329_163449_168.mp4',
    'VID_24600718_053352_634.mp4',
    'VID_46371006_205147_622.mp4',
    'VID_46390118_191352_398.mp4',
    'VID_89791201_233936_128.mp4',
    'VID_89811116_082136_626.mp4',
    'VID_89990806_081103_652.mp4'
];

// Supported file extensions
const SUPPORTED_EXTENSIONS = {
    images: ['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.webp', '.svg'],
    videos: ['.mp4', '.webm', '.ogg', '.avi', '.mov', '.mkv']
};

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    setupPasswordProtection();
    
    // Only initialize gallery if already authenticated (for page refresh)
    if (isAuthenticated) {
        initializeGallery();
        setupEventListeners();
        loadImages();
    }
});

// Password Protection Functions
function setupPasswordProtection() {
    // Check if user is already authenticated (for page refresh)
    if (sessionStorage.getItem('galleryAuthenticated') === 'true') {
        isAuthenticated = true;
        showGallery();
        return;
    }
    
    // Setup password form event listeners
    submitPassword.addEventListener('click', validatePassword);
    passwordInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            validatePassword();
        }
    });
    
    // Focus on password input
    passwordInput.focus();
}

function validatePassword() {
    const enteredPassword = passwordInput.value.trim();
    
    if (enteredPassword === '') {
        showPasswordError('Please enter a password');
        return;
    }
    
    if (enteredPassword === GALLERY_PASSWORD) {
        // Correct password
        isAuthenticated = true;
        sessionStorage.setItem('galleryAuthenticated', 'true');
        showGallery();
    } else {
        // Wrong password
        showPasswordError('Incorrect password. Please try again.');
        passwordInput.value = '';
        passwordInput.focus();
        
        // Add shake animation
        passwordModal.classList.add('shake');
        setTimeout(() => {
            passwordModal.classList.remove('shake');
        }, 500);
    }
}

function showPasswordError(message) {
    passwordError.textContent = message;
    passwordError.style.display = 'block';
    
    // Clear error after 3 seconds
    setTimeout(() => {
        passwordError.style.display = 'none';
    }, 3000);
}

function showGallery() {
    // Hide password modal
    passwordModal.classList.remove('active');
    
    // Show main content
    mainContent.classList.add('active');
    
    // Initialize gallery
    initializeGallery();
    setupEventListeners();
    loadImages();
}

// Initialize gallery
function initializeGallery() {
    // Create media objects with metadata
    images = mediaFiles.map((filename, index) => {
        const ext = '.' + filename.split('.').pop().toLowerCase();
        const isVideo = SUPPORTED_EXTENSIONS.videos.includes(ext);
        
        return {
            id: index,
            src: `image/${filename}`,
            name: filename.replace(/\.[^/.]+$/, '').replace(/^Snapchat-/, 'Photo ').replace(/^(\w+)-/, '$1 '),
            alt: `${isVideo ? 'Video' : 'Image'} ${index + 1}`,
            type: isVideo ? 'video' : 'image',
            extension: ext
        };
    });
    
    console.log(`🎉 Loaded ${images.length} media files!`);
    console.log(`📊 With ${itemsPerPage} items per page, you'll have ${Math.ceil(images.length / itemsPerPage)} pages`);
    console.log(`📁 First few files:`, images.slice(0, 5).map(f => f.src));
    console.log(`📁 Total files available: ${mediaFiles.length}`);
    
    // Calculate total pages
    calculateTotalPages();
}

// Setup event listeners
function setupEventListeners() {
    // Mode switching
    galleryModeBtn.addEventListener('click', () => switchMode('gallery'));
    viewModeBtn.addEventListener('click', () => switchMode('view'));
    
    // Navigation
    prevBtn.addEventListener('click', showPreviousImage);
    nextBtn.addEventListener('click', showNextImage);
    closeViewer.addEventListener('click', () => switchMode('gallery'));
    
    // Lightbox
    closeLightbox.addEventListener('click', closeLightboxModal);
    
    // Pagination
    firstPage.addEventListener('click', () => goToPage(1));
    prevPage.addEventListener('click', () => goToPage(currentPage - 1));
    nextPage.addEventListener('click', () => goToPage(currentPage + 1));
    lastPage.addEventListener('click', () => goToPage(totalPages));
    itemsPerPageSelect.addEventListener('change', handleItemsPerPageChange);
    
    // Keyboard navigation
    document.addEventListener('keydown', handleKeyboardNavigation);
    
    // Close lightbox on outside click
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightboxModal();
        }
    });
}

// Pagination Functions
function calculateTotalPages() {
    totalPages = Math.ceil(images.length / itemsPerPage);
    if (currentPage > totalPages) {
        currentPage = totalPages || 1;
    }
}

function getCurrentPageImages() {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return images.slice(startIndex, endIndex);
}

function goToPage(page) {
    if (page < 1 || page > totalPages) return;
    
    currentPage = page;
    loadImages();
    updatePagination();
}

function handleItemsPerPageChange() {
    itemsPerPage = parseInt(itemsPerPageSelect.value);
    currentPage = 1; // Reset to first page
    calculateTotalPages();
    loadImages();
    updatePagination();
}

function updatePagination() {
    // Update page info
    pageInfo.textContent = `Page ${currentPage} of ${totalPages}`;
    
    // Update image count
    const startIndex = (currentPage - 1) * itemsPerPage + 1;
    const endIndex = Math.min(currentPage * itemsPerPage, images.length);
    imageCount.textContent = `Showing ${startIndex}-${endIndex} of ${images.length} files`;
    
    // Update navigation buttons
    firstPage.disabled = currentPage === 1;
    prevPage.disabled = currentPage === 1;
    nextPage.disabled = currentPage === totalPages;
    lastPage.disabled = currentPage === totalPages;
    
    // Generate page numbers
    generatePageNumbers();
}

function generatePageNumbers() {
    pageNumbers.innerHTML = '';
    
    if (totalPages <= 7) {
        // Show all page numbers if 7 or fewer pages
        for (let i = 1; i <= totalPages; i++) {
            createPageNumber(i);
        }
    } else {
        // Show smart pagination with ellipsis
        if (currentPage <= 4) {
            // Show first 5 pages + ellipsis + last page
            for (let i = 1; i <= 5; i++) {
                createPageNumber(i);
            }
            createEllipsis();
            createPageNumber(totalPages);
        } else if (currentPage >= totalPages - 3) {
            // Show first page + ellipsis + last 5 pages
            createPageNumber(1);
            createEllipsis();
            for (let i = totalPages - 4; i <= totalPages; i++) {
                createPageNumber(i);
            }
        } else {
            // Show first page + ellipsis + current page ± 1 + ellipsis + last page
            createPageNumber(1);
            createEllipsis();
            for (let i = currentPage - 1; i <= currentPage + 1; i++) {
                createPageNumber(i);
            }
            createEllipsis();
            createPageNumber(totalPages);
        }
    }
}

function createPageNumber(pageNum) {
    const pageBtn = document.createElement('button');
    pageBtn.className = `page-number ${pageNum === currentPage ? 'active' : ''}`;
    pageBtn.textContent = pageNum;
    pageBtn.addEventListener('click', () => goToPage(pageNum));
    pageNumbers.appendChild(pageBtn);
}

function createEllipsis() {
    const ellipsis = document.createElement('span');
    ellipsis.className = 'page-number ellipsis';
    ellipsis.textContent = '...';
    pageNumbers.appendChild(ellipsis);
}

// Load images into gallery
function loadImages() {
    galleryGrid.innerHTML = '';
    
    const currentPageImages = getCurrentPageImages();
    
    currentPageImages.forEach((media, index) => {
        const galleryItem = createGalleryItem(media, index);
        galleryGrid.appendChild(galleryItem);
    });
    
    updatePagination();
}

// Create gallery item (supports both images and videos)
function createGalleryItem(media, index) {
    const item = document.createElement('div');
    item.className = 'gallery-item';
    item.dataset.index = index;
    
    if (media.type === 'video') {
        // Create video thumbnail
        item.innerHTML = `
            <video src="${media.src}" preload="metadata" muted>
                Your browser does not support the video tag.
            </video>
            <div class="video-overlay">
                <i class="fas fa-play-circle"></i>
            </div>
            <div class="gallery-item-info">
                <h3>${media.name}</h3>
                <span class="media-type">Video</span>
            </div>
        `;
        
        // Add video click event
        item.addEventListener('click', () => {
            if (currentMode === 'gallery') {
                openVideoLightbox(media.id);
            }
        });
        
    } else {
        // Create image item
        item.innerHTML = `
            <img src="${media.src}" alt="${media.alt}" loading="lazy">
            <div class="gallery-item-info">
                <h3>${media.name}</h3>
                <span class="media-type">Image</span>
            </div>
        `;
        
        // Add image click event
        item.addEventListener('click', () => {
            if (currentMode === 'gallery') {
                openLightbox(media.id);
            }
        });
    }
    
    return item;
}

// Switch between gallery and view modes
function switchMode(mode) {
    currentMode = mode;
    
    // Update button states
    galleryModeBtn.classList.toggle('active', mode === 'gallery');
    viewModeBtn.classList.toggle('active', mode === 'view');
    
    // Update container visibility
    galleryContainer.classList.toggle('active', mode === 'gallery');
    viewContainer.classList.toggle('active', mode === 'view');
    
    // If switching to view mode, show first image
    if (mode === 'view') {
        currentImageIndex = 0;
        showImage(currentImageIndex);
    }
}

// Show image in view mode
function showImage(index) {
    if (index < 0 || index >= images.length) return;
    
    currentImageIndex = index;
    const media = images[index];
    
    if (media.type === 'video') {
        // Handle video in view mode
        showVideoInViewer(media);
    } else {
        // Handle image in view mode
        showImageInViewer(media);
    }
}

function showImageInViewer(media) {
    // Clear any existing video
    const existingVideo = viewerImage.parentNode.querySelector('video');
    if (existingVideo) {
        existingVideo.remove();
    }
    
    viewerImage.style.display = 'block';
    viewerImage.src = media.src;
    viewerImage.alt = media.alt;
    
    updateViewerInfo(media);
}

function showVideoInViewer(media) {
    // Hide image and show video
    viewerImage.style.display = 'none';
    
    // Remove existing video if any
    const existingVideo = viewerImage.parentNode.querySelector('video');
    if (existingVideo) {
        existingVideo.remove();
    }
    
    // Create video element
    const video = document.createElement('video');
    video.src = media.src;
    video.controls = true;
    video.style.maxWidth = '100%';
    video.style.maxHeight = '70vh';
    video.style.borderRadius = '10px';
    video.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.1)';
    
    viewerImage.parentNode.insertBefore(video, viewerImage);
    
    updateViewerInfo(media);
}

function updateViewerInfo(media) {
    imageCounter.textContent = `${currentImageIndex + 1} / ${images.length}`;
    imageName.textContent = media.name;
    
    // Update navigation button states
    prevBtn.disabled = currentImageIndex === 0;
    nextBtn.disabled = currentImageIndex === images.length - 1;
}

// Show previous image
function showPreviousImage() {
    if (currentImageIndex > 0) {
        // Add animation class
        prevBtn.classList.add('prev');
        nextBtn.classList.remove('next');
        showImage(currentImageIndex - 1);
    }
}

// Show next image
function showNextImage() {
    if (currentImageIndex < images.length - 1) {
        // Add animation class
        nextBtn.classList.add('next');
        prevBtn.classList.remove('prev');
        showImage(currentImageIndex + 1);
    }
}

// Open lightbox for images
function openLightbox(index) {
    currentImageIndex = index;
    const media = images[index];
    
    if (media.type === 'video') {
        openVideoLightbox(index);
        return;
    }
    
    lightboxImage.src = media.src;
    lightboxImage.alt = media.alt;
    lightboxCounter.textContent = `${index + 1} / ${images.length}`;
    lightboxName.textContent = media.name;
    
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Open video lightbox
function openVideoLightbox(index) {
    currentImageIndex = index;
    const media = images[index];
    
    // Clear existing content
    lightboxImage.style.display = 'none';
    const existingVideo = lightbox.querySelector('video');
    if (existingVideo) {
        existingVideo.remove();
    }
    
    // Create video element
    const video = document.createElement('video');
    video.src = media.src;
    video.controls = true;
    video.style.maxWidth = '100%';
    video.style.maxHeight = '100%';
    video.style.borderRadius = '10px';
    
    lightboxImage.parentNode.insertBefore(video, lightboxImage);
    
    lightboxCounter.textContent = `${index + 1} / ${images.length}`;
    lightboxName.textContent = media.name;
    
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Close lightbox
function closeLightboxModal() {
    lightbox.classList.remove('active');
    document.body.style.overflow = 'auto';
    
    // Reset lightbox content
    lightboxImage.style.display = 'block';
    const video = lightbox.querySelector('video');
    if (video) {
        video.remove();
    }
}

// Handle keyboard navigation
function handleKeyboardNavigation(e) {
    if (lightbox.classList.contains('active')) {
        switch(e.key) {
            case 'Escape':
                closeLightboxModal();
                break;
            case 'ArrowLeft':
                if (currentImageIndex > 0) {
                    openLightbox(currentImageIndex - 1);
                }
                break;
            case 'ArrowRight':
                if (currentImageIndex < images.length - 1) {
                    openLightbox(currentImageIndex + 1);
                }
                break;
        }
    } else if (currentMode === 'view') {
        switch(e.key) {
            case 'ArrowLeft':
                showPreviousImage();
                break;
            case 'ArrowRight':
                showNextImage();
                break;
            case 'Escape':
                switchMode('gallery');
                break;
        }
    }
}

// Add touch/swipe support for mobile
let touchStartX = 0;
let touchEndX = 0;

document.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
});

document.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
});

function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartX - touchEndX;
    
    if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
            // Swipe left - next image
            if (currentMode === 'view') {
                showNextImage();
            } else if (lightbox.classList.contains('active')) {
                if (currentImageIndex < images.length - 1) {
                    openLightbox(currentImageIndex + 1);
                }
            }
        } else {
            // Swipe right - previous image
            if (currentMode === 'view') {
                showPreviousImage();
            } else if (lightbox.classList.contains('active')) {
                if (currentImageIndex > 0) {
                    openLightbox(currentImageIndex - 1);
                }
            }
        }
    }
}

// Preload media for better performance
function preloadMedia() {
    images.forEach(media => {
        if (media.type === 'image') {
            const img = new Image();
            img.src = media.src;
            img.onerror = () => console.warn(`Failed to preload image: ${media.name}`);
        } else if (media.type === 'video') {
            const video = document.createElement('video');
            video.src = media.src;
            video.preload = 'metadata';
            video.onerror = () => console.warn(`Failed to preload video: ${media.name}`);
        }
    });
}

// Initialize preloading after gallery is loaded
setTimeout(() => {
    if (isAuthenticated && images.length > 0) {
        preloadMedia();
    }
}, 1000);

// Add shake animation CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
        20%, 40%, 60%, 80% { transform: translateX(5px); }
    }
    
    .shake {
        animation: shake 0.5s ease-in-out;
    }
    
    .video-overlay {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        color: white;
        font-size: 3rem;
        text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.7);
        pointer-events: none;
    }
    
    .media-type {
        font-size: 0.8rem;
        color: #718096;
        font-weight: 500;
    }
`;
document.head.appendChild(style);

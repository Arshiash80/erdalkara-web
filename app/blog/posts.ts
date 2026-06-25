// Sample blog data — placeholder content for previewing the blog design.
// Later this is replaced by Payload CMS (the block shape mirrors rich-text).

export type Block =
  | { type: "h2"; text: string }
  | { type: "p"; text: string }
  | { type: "quote"; text: string }
  | { type: "list"; items: string[] };

export interface Post {
  slug: string;
  title: string;
  excerpt: string;
  cover: string; // path under /public
  date: string; // ISO, for <time> / sorting
  dateLabel: string; // pre-formatted TR label
  readingMinutes: number;
  tag: string;
  author: string;
  body: Block[];
}

export const POSTS: Post[] = [
  {
    slug: "damat-tirasi-rehberi",
    title: "Damat Tıraşı: Düğün Gününe Hazırlık",
    excerpt:
      "Hayatınızın en özel gününde en iyi halinizle görünmek için damat tıraşının ne zaman yapılması gerektiğini ve nelere dikkat edilmesi gerektiğini anlattık.",
    cover: "/assets/interior-2.jpg",
    date: "2026-06-12",
    dateLabel: "12 Haziran 2026",
    readingMinutes: 4,
    tag: "Bakım",
    author: "Erdal Kara",
    body: [
      {
        type: "p",
        text: "Düğün günü, fotoğraflarda ömür boyu kalacak bir gündür. Bu yüzden damat tıraşı sıradan bir bakım değil, özenle planlanması gereken bir hazırlıktır. Doğru zamanlama ve doğru bakım ile o gün kendinizi hem rahat hem de en iyi halinizde hissedersiniz.",
      },
      { type: "h2", text: "Tıraş ne zaman yapılmalı?" },
      {
        type: "p",
        text: "İdeal olan, damat tıraşını düğünden bir gün önce yaptırmaktır. Böylece cilt dinlenir, olası kızarıklıklar geçer ve sakal ile saç en doğal görünümüne kavuşur. Aynı gün yapılan tıraşlarda cilt henüz toparlanmamış olabilir.",
      },
      { type: "h2", text: "Hazırlık sürecinde nelere dikkat edilmeli?" },
      {
        type: "list",
        items: [
          "Düğünden birkaç hafta önce saç ve sakal şeklinize karar verin.",
          "Cilt bakımına erken başlayın; tek seferde mucize beklemeyin.",
          "Tıraştan önce bol su için ve cildinizi nemli tutun.",
          "Kullanılan ürünlere alerjiniz varsa berberinizi önceden bilgilendirin.",
        ],
      },
      {
        type: "quote",
        text: "Bizim için damat tıraşı, bir günün değil; o güne giden tüm hazırlığın işidir.",
      },
      {
        type: "p",
        text: "Erdal Kara Hair Design olarak damat tıraşını, sakin bir ortamda ve acele etmeden tamamlıyoruz. Randevunuzu önceden oluşturarak o gün size özel zaman ayırmamızı sağlayabilirsiniz.",
      },
    ],
  },
  {
    slug: "sakal-bakimi-puf-noktalari",
    title: "Sakal Bakımının Püf Noktaları",
    excerpt:
      "Bakımlı bir sakal, doğru kesim kadar düzenli bakımla da ilgilidir. Evde uygulayabileceğiniz basit alışkanlıkları derledik.",
    cover: "/assets/tools-roll.jpg",
    date: "2026-05-28",
    dateLabel: "28 Mayıs 2026",
    readingMinutes: 3,
    tag: "Sakal",
    author: "Erdal Kara",
    body: [
      {
        type: "p",
        text: "Sakal, yüz hatlarını tamamlayan en önemli detaylardan biridir. Ancak bakımsız bırakıldığında dağınık ve sağlıksız görünebilir. İyi haber şu ki, düzenli birkaç alışkanlık ile sakalınızı her gün bakımlı tutmak mümkün.",
      },
      { type: "h2", text: "Temizlik her şeyin başı" },
      {
        type: "p",
        text: "Sakalı normal sabunla değil, sakala özel şampuanla yıkamak cildi kurutmadan temizler. Haftada birkaç kez yapılan düzenli temizlik, kaşıntı ve pullanmayı önler.",
      },
      { type: "h2", text: "Nem dengesi" },
      {
        type: "list",
        items: [
          "Yıkamadan sonra sakal yağı veya balmı kullanın.",
          "Sakalı kökten uca doğru düzenli tarayın.",
          "Şekil bozulmaya başladığında uç alımını ertelemeyin.",
        ],
      },
      {
        type: "quote",
        text: "Bakımlı sakal, pahalı ürünlerden çok düzenli alışkanlıklarla elde edilir.",
      },
      {
        type: "p",
        text: "Sakal tasarımınızı yüz şeklinize göre belirlemek, evde yaptığınız bakımı çok daha kolay hale getirir. Doğru bir başlangıç için salonumuzda sakal tasarımı hizmetimizden faydalanabilirsiniz.",
      },
    ],
  },
  {
    slug: "sac-ve-cilt-bakimi",
    title: "Saç ve Cilt Bakımı Hakkında Bilmeniz Gerekenler",
    excerpt:
      "Sağlıklı saç ve canlı bir cilt için temel bilgiler. Hangi bakımın ne sıklıkta yapılması gerektiğini sade bir dille anlattık.",
    cover: "/assets/interior-1.jpg",
    date: "2026-05-10",
    dateLabel: "10 Mayıs 2026",
    readingMinutes: 5,
    tag: "Bakım",
    author: "Erdal Kara",
    body: [
      {
        type: "p",
        text: "Saç ve cilt bakımı, sadece görünüm için değil, sağlık için de önemlidir. Mevsim değişiklikleri, stres ve yanlış ürün kullanımı saç ve cildin dengesini bozabilir. Temel birkaç kuralı bilmek, uzun vadede büyük fark yaratır.",
      },
      { type: "h2", text: "Saç bakımında denge" },
      {
        type: "p",
        text: "Saçı her gün sert ürünlerle yıkamak yağ dengesini bozar. Saç tipinize uygun ürün seçmek ve sıcak suyu abartmamak, saç köklerini korur.",
      },
      { type: "h2", text: "Cilt bakımında düzen" },
      {
        type: "p",
        text: "Erkek cildi genellikle daha kalın ve yağlıdır; bu yüzden düzenli temizlik ve nemlendirme önemlidir. Tıraş sonrası kullanılan bakım ürünleri, kızarıklık ve tahrişi azaltır.",
      },
      {
        type: "list",
        items: [
          "Haftada bir derinlemesine temizlik yapın.",
          "Tıraş sonrası mutlaka nemlendirici kullanın.",
          "Güneşe çıkarken cildinizi korumayı ihmal etmeyin.",
        ],
      },
      {
        type: "p",
        text: "Salonumuzda uyguladığımız cilt ve saç bakım hizmetleri, evde sürdürdüğünüz rutini güçlendirmek için tasarlanmıştır.",
      },
    ],
  },
  {
    slug: "cocuk-sac-kesimi",
    title: "Çocuk Saç Kesiminde Dikkat Edilmesi Gerekenler",
    excerpt:
      "Çocuklar için saç kesimi, sabır ve doğru yaklaşımla keyifli bir deneyime dönüşebilir. Ailelere küçük tavsiyeler.",
    cover: "/assets/storefront-1.jpg",
    date: "2026-04-22",
    dateLabel: "22 Nisan 2026",
    readingMinutes: 3,
    tag: "Çocuk",
    author: "Erdal Kara",
    body: [
      {
        type: "p",
        text: "Çocuklar için ilk saç kesimleri hem aileler hem de küçükler için heyecanlı olabilir. Doğru ortam ve sakin bir yaklaşım, bu deneyimi korkutucu olmaktan çıkarıp keyifli bir ana dönüştürür.",
      },
      { type: "h2", text: "Rahat bir ortam" },
      {
        type: "p",
        text: "Çocuğun kendini güvende hissetmesi en önemli noktadır. Acele etmeden, oyun gibi bir atmosferde yapılan kesimler çok daha kolay geçer.",
      },
      {
        type: "list",
        items: [
          "Çocuğunuz yorgun veya açken randevu almayın.",
          "Sevdiği bir oyuncağı yanında getirmesine izin verin.",
          "İlk kesimlerde kısa tutmak, çocuğun alışmasını kolaylaştırır.",
        ],
      },
      {
        type: "p",
        text: "Salonumuzda çocuklara özel sabırlı bir yaklaşımla hizmet veriyoruz; ilk kesim anısını güzel bir hatıraya dönüştürmek bizim için önemli.",
      },
    ],
  },
];

export function getAllPosts(): Post[] {
  return [...POSTS].sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPost(slug: string): Post | undefined {
  return POSTS.find((p) => p.slug === slug);
}

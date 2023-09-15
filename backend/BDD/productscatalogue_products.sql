-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)
--
-- Host: localhost    Database: productscatalogue
-- ------------------------------------------------------
-- Server version	8.1.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products` (
  `id` int NOT NULL AUTO_INCREMENT,
  `category_id` int DEFAULT NULL,
  `type` varchar(255) DEFAULT NULL,
  `brand` varchar(255) DEFAULT NULL,
  `model` varchar(255) DEFAULT NULL,
  `image_source` varchar(255) DEFAULT NULL,
  `image_alt` varchar(255) DEFAULT NULL,
  `price` decimal(10,2) DEFAULT NULL,
  `quantity` int DEFAULT NULL,
  `available` tinyint(1) DEFAULT NULL,
  `description` text,
  `reference_month` varchar(255) DEFAULT NULL,
  `reference_year` varchar(4) DEFAULT NULL,
  `color` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `category_id` (`category_id`),
  CONSTRAINT `products_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=37 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (1,1,'Guitar','Bender','Telemaster M-101','/src/assets/catalogue/products/guitars/bender-telemaster%20m101.jpg','Bender Telemaster M-101',899.00,5,1,'A versatile classic with a modern twist, the M101 boasts rich tones and effortless playability.','July','2019','Blue'),(2,1,'Guitar','Bender','Telemaster M-102','/src/assets/catalogue/products/guitars/bender-telemaster%20m102.jpg','Bender Telemaster M-102',949.00,3,1,'Taking it up a notch, M102 adds enhanced sustain and dynamic response for the discerning player','September','2020','Blue'),(3,1,'Guitar','Gibbons','Lep Saul','/src/assets/catalogue/products/guitars/gibbons-lep%20saul.jpg','Gibbons Lep Saul',1249.00,2,1,'The Lep Saul offers vintage charm with a hint of edge, delivering well-defined tones and impeccable resonance.','September','2020','Red'),(4,1,'Guitar','Gibbons','Melody Faker','/src/assets/catalogue/products/guitars/gibbons-melody%20faker.jpg','Gibbons Melody Faker',1099.00,0,0,'Unconventional and bold, the Melody Faker yields unique soundscapes perfect for experimental musicians.','July','2021','White'),(5,1,'Guitar','Greta','Lucilla','/src/assets/catalogue/products/guitars/greta-lucilla.jpg','Greta Lucilla',2699.00,1,1,'A paragon of elegance, the Lucilla\'s warm, balanced sound complements its exquisite design.','June','2023','Green, Yellow'),(6,1,'Guitar','Schelter','GMK Signature','/src/assets/catalogue/products/guitars/schelter-gmk%20signature.jpg','Schelter GMK Signature',1499.00,0,0,'Unconventional and bold, the Melody Faker yields unique soundscapes perfect for experimental musicians.','July','2021','Purple, Black'),(7,2,'Bass','Bender','Decision J37','/src/assets/catalogue/products/basses/bender%20decision%20j37.jpg','Bender Decision J37',799.00,5,1,'Empowering bassists with versatile tones, J37 offers a sleek design and impeccable playability.','December','2016','Sunburst'),(8,2,'Bass','Ivarez','Blizzard','/src/assets/catalogue/products/basses/ivarez%20blizzard.jpg','Ivarez Blizzard',1249.00,0,0,'Thunderous lows and articulate highs define the Blizzard, while its ergonomic build ensures comfort during every performance.','May','2023','Pink, Blue'),(9,2,'Bass','Kickenbacker','Paul MyCourtney','/src/assets/catalogue/products/basses/kickenbacker%20paul%20mycourtney.jpg','Kickenbacker Paul MyCourtney',1399.00,1,1,'The signature Mycourtney delivers punchy, iconic bass sound that\'s both captivating and sonically rich.','March','2018','Green, Yellow'),(10,2,'Bass','Epiklone','Marcus Thriller','/src/assets/catalogue/products/basses/epiklone-marcus-thriller.jpg','Epiklone Marcus Thriller',2299.00,2,1,'Empowering bassists with versatile tones, J37 offers a sleek design and impeccable playability.The Epiklone Marcus Thriller electric bass guitar delivers a thrilling combination of powerful bass tones and versatile playability, making it the bassist\'s ultimate toolkit for laying down a wide range of groovy rhythms.','October','2020','Red'),(11,2,'Bass','Ivarez','Thunder','/src/assets/catalogue/products/basses/ivarez-thunder.jpg','Ivarez Thunder',1699.00,0,0,'The Ivarez Thunder electric bass guitar electrifies the stage with its thunderous tones and versatile playability, serving as the bassist\'s ultimate toolkit for crafting a diverse range of impactful basslines.','April','2023','Rainbow'),(12,2,'Bass','Ivarez','Hurricane','/src/assets/catalogue/products/basses/ivarez-hurricane.jpg','Ivarez Hurricane',1439.00,2,1,'The Ivarez Hurricane electric bass guitar storms the music scene with its powerful tones and versatile playability, making it the bassist\'s ultimate toolkit for delivering a wide range of impactful and dynamic basslines.','May','2023','Rainbow'),(13,3,'Acoustic guitar','Bender','Arizona','/src/assets/catalogue/products/acoustic/bender-arizona.jpg','Bender Arizona',599.00,5,1,'Embrace the spirit of the Southwest with the Arizona\'s resonant tones and intricate inlays, a tribute to acoustic beauty.','July','2017','Classic wood'),(14,3,'Acoustic guitar','Matakine','Velvet','/src/assets/catalogue/products/acoustic/matakine-velvet.jpg','Matakine Velvet',1349.00,0,0,'EThe Velvet\'s mellow warmth and meticulous craftsmanship create a soothing melody in the hands of any guitarist.','January','2023','Clear wood'),(15,3,'Acoustic guitar','Saylor','Girlstar','/src/assets/catalogue/products/acoustic/saylor%20girlstar.jpg','Saylor Girlstar',899.00,2,1,'Unleash your inner star with Girlstar\'s vibrant sound and artistic details, a harmonious blend of style and melody.','July','2022','Pink'),(16,3,'Acoustic ukulele','Rainbow','UkukukuLele','/src/assets/catalogue/products/acoustic/rainbow-ukukukulele.jpg','Rainbow UkukukuLele',149.00,12,1,'The Rainbow UkukukuLele ukulele harmoniously blends vibrant colors with versatile playability, making it the musician\'s ultimate toolkit for strumming a diverse array of cheerful melodies.','January','2017','Sunburst wood'),(17,3,'Acoustic guitar','Bender','BlackyFolk','/src/assets/catalogue/products/acoustic/bender-blackyfolk.jpg','Bender BlackyFolk',749.00,2,1,'The Bender BlackyFolk acoustic guitar combines a dark, brooding tone with versatile playability, making it the guitarist\'s ultimate toolkit for crafting a wide range of soulful melodies.','August','2023','Black'),(18,3,'Acoustic guitar','Matakine','Nature Revenge','/src/assets/catalogue/products/acoustic/matakine-nature-revenge.jpg','Matakine Nature Revenge',1749.00,5,1,'Embrace the spirit of the Southwest with the Arizona\'s resonant tones and intricate inlays, a tribute to acoustic beauty.','July','2017','Classic wood'),(19,4,'Amp','Leavey','HSR9902','/src/assets/catalogue/products/amps/leavey-hsr9902.jpg','Leavey HSR9902',799.00,3,1,'From clean whispers to roaring thunder, the HSR9902 amp defines versatility with its range of tones and dynamic controls.','July','2021','Brown'),(20,4,'Amp','Marshiall','Headbanger','/src/assets/catalogue/products/amps/marshiall-headbanger.jpg','Marshiall Headbanger',1399.00,0,0,'Unleash a sonic onslaught with the Headbanger\'s fierce distortion, embodying the iconic Marshiall power and punch.','October','2021','Brown, Black'),(21,4,'Amp','Vex','Vortex 222','/src/assets/catalogue/products/amps/vex-vortex222.jpg','Vex Vortex 222',1449.00,1,1,'The Vortex222 amp swirls your sound into a cyclone of effects, delivering an otherworldly experience for experimental musicians.','December','2017','Grey, Black'),(22,4,'Amp','Masta Braggie','Brag\' 469','/src/assets/catalogue/products/amps/masta-braggie-brag-469.jpg','Masta Braggie Brag\' 469',879.00,2,1,'The Masta Braggie Brag\' 469 guitar amplifier delivers a thunderous sound and versatile capabilities, serving as the guitarist\'s ultimate toolkit for creating a wide spectrum of tones.','July','2019','Brown'),(23,4,'Amp','Yellow','HoneyMoon','/src/assets/catalogue/products/amps/yellow-honeymoon.jpg','Yellow HoneyMoon',1229.00,0,0,'The Yellow HoneyMoon guitar amplifier combines a warm, honeyed tone with versatile features, making it the guitarist\'s ultimate toolkit for crafting a wide range of sonic experiences.','July','2023','Yellow'),(24,4,'Amp','Pinkstar','V7','/src/assets/catalogue/products/amps/pinkstar-v7.jpg','Pinkstar V7',429.00,4,1,'The Pinkstar V7 guitar amplifier blends a rich, pink-tinged tone with versatile features, serving as the guitarist\'s ultimate toolkit for sculpting a diverse array of sonic landscapes.','July','2021','Brown'),(25,5,'Synth','Borg','MT20','/src/assets/catalogue/products/synth/borg-mt20.jpg','Borg MT20',4629.00,1,1,'Navigate sonic realms with MT20\'s modular design, offering boundless possibilities for sound sculptors and explorers.','July','2017','Black'),(26,5,'Synth','Romand','Juny 70','/src/assets/catalogue/products/synth/romand-juny70.jpg','Romand Juny 70',1399.00,4,1,'Juny 70 resurrects vintage allure, its analog heart throbbing with nostalgia and modern electronic ingenuity.','May','2019','Black'),(27,5,'Synth','Voog','Uzi 16','/src/assets/catalogue/products/synth/Voog%20Uzi%2016.jpg','Voog Uzi 16',5999.00,0,0,'Uzi16\'s digital prowess unleashes a symphony of futuristic tones, perfect for crafting electronic landscapes and beats.','November','2020','White'),(28,5,'Synth','Masturia','Ivy 1236','/src/assets/catalogue/products/synth/masturia-ivy-1236.jpg','Masturia Ivy 1236',1599.00,1,1,'The Masturia Ivy 1236 synthesizer fuses lush soundscapes with versatile components, making it the musician\'s ultimate toolkit for creating an extensive range of musical textures.','October','2020','Black'),(29,5,'Synth','D\'Angelica','Movoder Disco 73','/src/assets/catalogue/products/synth/d\'angelica-movoder-disco-73.jpg','D\'Angelica Movoder Disco 73',2129.00,3,1,'The D\'Angelica Movoder Disco 73 synthesizer seamlessly combines funky disco vibes with versatile components, becoming the musician\'s ultimate toolkit for crafting a wide spectrum of groovy sounds.','July','2023','Blue'),(30,5,'Synth','LoveNation','Vitto 6','/src/assets/catalogue/products/synth/lovenation-vitto6.jpg','LoveNation Vitto 6',2879.00,0,0,'The LoveNation Vitto 6 synthesizer marries a romantic ambiance with versatile capabilities, serving as the musician\'s ultimate toolkit for conjuring a diverse range of heartfelt melodies.','September','2023','Purple'),(31,6,'Drums','Connor','DevilKit','/src/assets/catalogue/products/drums/connor%20devilkit.jpg','Connor DevilKit',3759.00,2,1,'Unleash rhythmic fury with Devilkit\'s precision and power, designed to ignite stages with its commanding presence.','March','2021','Red'),(32,6,'Drums','Diamond','Manchester','/src/assets/catalogue/products/drums/diamond%20manchester.jpg','Diamond Manchester',3299.00,0,0,'The Manchester kit sparkles with clarity and depth, capturing every drumbeat with a brilliant fusion of tradition and innovation.','October','2021','White'),(33,6,'Drums','Tamaha','DK707','/src/assets/catalogue/products/drums/tamaha%20dk707.jpg','Tamaha DK707',4239.00,1,1,'DK707\'s thunderous resonance and versatile components make it a drummer\'s ultimate toolkit for crafting diverse rhythms.','October','2021','Black'),(34,6,'Drums','Orage Country','TB Signature','/src/assets/catalogue/products/drums/Orage-Country-tb-signature.jpg','Orage Country Trav Blaker Signature',2449.00,0,0,'The Orage Country Trav Blaker Signature battery packs a punch with its thunderous performance and versatile features, making it an essential tool for musicians seeking a wide range of musical possibilities.','June','2022','Pink'),(35,6,'Drums','Connor','Jungle Dynamite','/src/assets/catalogue/products/drums/connor-jungle-dynamite.jpg','Connor Jungle Dynamite',1349.00,3,1,'The Connor Jungle Dynamite battery delivers explosive performance and versatile features, making it the drummer\'s ultimate toolkit for crafting diverse rhythms.','May','2023','Green'),(36,6,'Drums','Tamaha','Iceberg','/src/assets/catalogue/products/drums/tamaha-iceberg.jpg','Tamaha Iceberg',1469.00,2,1,'The Tamaha Iceberg drums offer an ice-cold blend of power and versatility, serving as the ultimate toolkit for drummers to craft a wide range of rhythms.','September','2023','Blue');
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-09-15 12:17:41
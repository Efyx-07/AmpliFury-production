CREATE DATABASE productcatalogue;



CREATE TABLE Categories (
id INT AUTO_INCREMENT PRIMARY KEY,
name VARCHAR(255) NOT NULL,
categoryImageSource VARCHAR(255),
categoryImageAlt VARCHAR(255)
);

INSERT INTO Categories (name, categoryImageSource, categoryImageAlt) VALUES
	('Guitars', '/src/assets/catalogue/category-images/guitars.jpg', 'Guitars'),
    ('Basses', '/src/assets/catalogue/category-images/basses.jpg', 'Basses'),
    ('Acoustic', '/src/assets/catalogue/category-images/acoustic.jpg', 'Acoustic'),
    ('Amps', '/src/assets/catalogue/category-images/amps.jpg', 'Amps'),
    ('Synths', '/src/assets/catalogue/category-images/synths.jpg', 'Synths'),
    ('Drums', '/src/assets/catalogue/category-images/drums.jpg', 'Drums');




CREATE TABLE Products (
	id INT AUTO_INCREMENT PRIMARY KEY,
    category_id INT,
    type VARCHAR(255),
    brand VARCHAR(255),
    model VARCHAR(255),
    image_source VARCHAR(255),
    image_alt VARCHAR(255),
    price DECIMAL(10, 2),
    quantity INT, 
    available BOOLEAN,
    description TEXT,
    reference_month VARCHAR(255),
    reference_year VARCHAR(4),
    color VARCHAR(255),
    FOREIGN KEY (category_id) REFERENCES Categories(id)
);

INSERT INTO Products (category_id, type, brand, model, image_source, image_alt, price, quantity, available, description, reference_month, reference_year, color) VALUES
	(1, 'Guitars', 'Bender', 'Telemaster M-101', '/src/assets/catalogue/products/guitars/bender-telemaster%20m101.jpg', 
    'Bender Telemaster M-101', '899.00', 5, true, 
    'A versatile classic with a modern twist, the M101 boasts rich tones and effortless playability.', 
    'July', '2019', 'Blue'),

    (1, 'Guitars', 'Bender', 'Telemaster M-102', '/src/assets/catalogue/products/guitars/bender-telemaster%20m102.jpg', 
    'Bender Telemaster M-102', '949.00', 3, true, 
    'Taking it up a notch, M102 adds enhanced sustain and dynamic response for the discerning player', 
    'September', '2020', 'Blue'),

    (1, 'Guitars', 'Gibbons', 'Lep Saul', '/src/assets/catalogue/products/guitars/gibbons-lep%20saul.jpg', 
    'Gibbons Lep Saul', '1249.00', 2, true, 
    'The Lep Saul offers vintage charm with a hint of edge, delivering well-defined tones and impeccable resonance.', 
    'September', '2020', 'Red'),

    (1, 'Guitars', 'Gibbons', 'Melody Faker', '/src/assets/catalogue/products/guitars/gibbons-melody%20faker.jpg', 
    'Gibbons Melody Faker', '1099.00', 0, false, 
    'Unconventional and bold, the Melody Faker yields unique soundscapes perfect for experimental musicians.', 
    'July', '2021', 'White'),

    (1, 'Guitars', 'Greta', 'Lucilla', '/src/assets/catalogue/products/guitars/greta-lucilla.jpg', 
    'Greta Lucilla', '2699.00', 1, true, 
    'A paragon of elegance, the Lucilla''s warm, balanced sound complements its exquisite design.', 
    'June', '2023', 'Green, Yellow'),

    (1, 'Guitars', 'Schelter', 'GMK Signature', '/src/assets/catalogue/products/guitars/schelter-gmk%20signature.jpg', 
    'Schelter GMK Signature', '1499.00', 0, false, 
    'Unconventional and bold, the Melody Faker yields unique soundscapes perfect for experimental musicians.', 
    'July', '2021', 'Purple, Black'),
    
    (2, 'Basses', 'Bender', 'Decision J37', '/src/assets/catalogue/products/basses/bender%20decision%20j37.jpg', 
    'Bender Decision J37', '799.00', 5, true, 
    'Empowering bassists with versatile tones, J37 offers a sleek design and impeccable playability.', 
    'December', '2016', 'Sunburst'),

    (2, 'Basses', 'Ivarez', 'Blizzard', '/src/assets/catalogue/products/basses/ivarez%20blizzard.jpg', 
    'Ivarez Blizzard', '1249.00', 0, false, 
    'Thunderous lows and articulate highs define the Blizzard, while its ergonomic build ensures comfort during every performance.', 
    'May', '2023', 'Pink, Blue'),

    (2, 'Basses', 'Kickenbacker', 'Paul MyCourtney', '/src/assets/catalogue/products/basses/kickenbacker%20paul%20mycourtney.jpg', 
    'Kickenbacker Paul MyCourtney', '1399.00', 1, true, 
    'The signature Mycourtney delivers punchy, iconic bass sound that''s both captivating and sonically rich.', 
    'March', '2018', 'Green, Yellow'),

    (2, 'Basses', 'Epiklone', 'Marcus Thriller', '/src/assets/catalogue/products/basses/epiklone-marcus-thriller.jpg', 
    'Epiklone Marcus Thriller', '2299.00', 2, true, 
    'Empowering bassists with versatile tones, J37 offers a sleek design and impeccable playability.The Epiklone Marcus Thriller electric bass guitar delivers a thrilling combination of powerful bass tones and versatile playability, making it the bassist''s ultimate toolkit for laying down a wide range of groovy rhythms.',
    'October', '2020', 'Red'),

    (2, 'Basses', 'Ivarez', 'Thunder', '/src/assets/catalogue/products/basses/ivarez-thunder.jpg', 
    'Ivarez Thunder', '1699.00', 0, false, 
    'The Ivarez Thunder electric bass guitar electrifies the stage with its thunderous tones and versatile playability, serving as the bassist''s ultimate toolkit for crafting a diverse range of impactful basslines.', 
    'April', '2023', 'Rainbow'),

    (2, 'Basses', 'Ivarez', 'Hurricane', '/src/assets/catalogue/products/basses/ivarez-hurricane.jpg', 
    'Ivarez Hurricane', '1439.00', 2, true, 
    'The Ivarez Hurricane electric bass guitar storms the music scene with its powerful tones and versatile playability, making it the bassist''s ultimate toolkit for delivering a wide range of impactful and dynamic basslines.', 
    'May', '2023', 'Rainbow'),
    
    (3, 'Acoustic', 'Bender', 'Arizona', '/src/assets/catalogue/products/acoustic/bender-arizona.jpg', 
    'Bender Arizona', '599.00', 5, true, 
    'Embrace the spirit of the Southwest with the Arizona''s resonant tones and intricate inlays, a tribute to acoustic beauty.', 
    'July', '2017', 'Classic wood'),

    (3, 'Acoustic', 'Matakine', 'Velvet', '/src/assets/catalogue/products/acoustic/matakine-velvet.jpg', 
    'Matakine Velvet', '1349.00', 0, false, 
    'EThe Velvet''s mellow warmth and meticulous craftsmanship create a soothing melody in the hands of any guitarist.', 
    'January', '2023', 'Clear wood'),

    (3, 'Acoustic', 'Saylor', 'Girlstar', '/src/assets/catalogue/products/acoustic/saylor%20girlstar.jpg', 
    'Saylor Girlstar', '899.00', 2, true, 
    'Unleash your inner star with Girlstar''s vibrant sound and artistic details, a harmonious blend of style and melody.', 
    'July', '2022', 'Pink'),

    (3, 'Acoustic', 'Rainbow', 'UkukukuLele', '/src/assets/catalogue/products/acoustic/rainbow-ukukukulele.jpg', 
    'Rainbow UkukukuLele', '149.00', 12, true, 
    'The Rainbow UkukukuLele ukulele harmoniously blends vibrant colors with versatile playability, making it the musician''s ultimate toolkit for strumming a diverse array of cheerful melodies.', 
    'January', '2017', 'Sunburst wood'),

    (3, 'Acoustic', 'Bender', 'BlackyFolk', '/src/assets/catalogue/products/acoustic/bender-blackyfolk.jpg', 
    'Bender BlackyFolk', '749.00', 2, true, 
    'The Bender BlackyFolk acoustic guitar combines a dark, brooding tone with versatile playability, making it the guitarist''s ultimate toolkit for crafting a wide range of soulful melodies.', 
    'August', '2023', 'Black'),

    (3, 'Acoustic', 'Matakine', 'Nature Revenge', '/src/assets/catalogue/products/acoustic/matakine-nature-revenge.jpg', 
    'Matakine Nature Revenge', '1749.00', 5, true, 
    'Embrace the spirit of the Southwest with the Arizona''s resonant tones and intricate inlays, a tribute to acoustic beauty.', 
    'July', '2017', 'Classic wood'),
    
    (4, 'Amps', 'Leavey', 'HSR9902', '/src/assets/catalogue/products/amps/leavey-hsr9902.jpg', 
    'Leavey HSR9902', '799.00', 3, true, 
    'From clean whispers to roaring thunder, the HSR9902 amp defines versatility with its range of tones and dynamic controls.', 
    'July', '2021', 'Brown'),

    (4, 'Amps', 'Marshiall', 'Headbanger', '/src/assets/catalogue/products/amps/marshiall-headbanger.jpg', 
    'Marshiall Headbanger', '1399.00', 0, false, 
    'Unleash a sonic onslaught with the Headbanger''s fierce distortion, embodying the iconic Marshiall power and punch.', 
    'October', '2021', 'Brown, Black'),

    (4, 'Amps', 'Vex', 'Vortex 222', '/src/assets/catalogue/products/amps/vex-vortex222.jpg', 
    'Vex Vortex 222', '1449.00', 1, true, 
    'The Vortex222 amp swirls your sound into a cyclone of effects, delivering an otherworldly experience for experimental musicians.', 
    'December', '2017', 'Grey, Black'),

    (4, 'Amps', 'Masta Braggie', 'Brag'' 469', '/src/assets/catalogue/products/amps/masta-braggie-brag-469.jpg', 
    'Masta Braggie Brag'' 469', '879.00', 2, true, 
    'The Masta Braggie Brag'' 469 guitar amplifier delivers a thunderous sound and versatile capabilities, serving as the guitarist''s ultimate toolkit for creating a wide spectrum of tones.', 
    'July', '2019', 'Brown'),
    
    (4, 'Amps', 'Yellow', 'HoneyMoon', '/src/assets/catalogue/products/amps/yellow-honeymoon.jpg', 
    'Yellow HoneyMoon', '1229.00', 0, false, 
    'The Yellow HoneyMoon guitar amplifier combines a warm, honeyed tone with versatile features, making it the guitarist''s ultimate toolkit for crafting a wide range of sonic experiences.', 
    'July', '2023', 'Yellow'),

    (4, 'Amps', 'Pinkstar', 'V7', '/src/assets/catalogue/products/amps/pinkstar-v7.jpg', 
    'Pinkstar V7', '429.00', 4, true, 
    'The Pinkstar V7 guitar amplifier blends a rich, pink-tinged tone with versatile features, serving as the guitarist''s ultimate toolkit for sculpting a diverse array of sonic landscapes.', 
    'July', '2021', 'Brown'),
    
    (5, 'Synths', 'Borg', 'MT20', '/src/assets/catalogue/products/synth/borg-mt20.jpg', 
    'Borg MT20', '4629.00', 1, true, 
    'Navigate sonic realms with MT20''s modular design, offering boundless possibilities for sound sculptors and explorers.', 
    'July', '2017', 'Black'),

    (5, 'Synths', 'Romand', 'Juny 70', '/src/assets/catalogue/products/synth/romand-juny70.jpg', 
    'Romand Juny 70', '1399.00', 4, true, 
    'Juny 70 resurrects vintage allure, its analog heart throbbing with nostalgia and modern electronic ingenuity.', 
    'May', '2019', 'Black'),

    (5, 'Synths', 'Voog', 'Uzi 16', '/src/assets/catalogue/products/synth/Voog%20Uzi%2016.jpg', 
    'Voog Uzi 16', '5999.00', 0, false, 
    'Uzi16''s digital prowess unleashes a symphony of futuristic tones, perfect for crafting electronic landscapes and beats.', 
    'November', '2020', 'White'),

    (5, 'Synths', 'Masturia', 'Ivy 1236', '/src/assets/catalogue/products/synth/masturia-ivy-1236.jpg', 
    'Masturia Ivy 1236', '1599.00', 1, true, 
    'The Masturia Ivy 1236 synthesizer fuses lush soundscapes with versatile components, making it the musician''s ultimate toolkit for creating an extensive range of musical textures.', 
    'October', '2020', 'Black'),

    (5, 'Synths', 'D''Angelica', 'Movoder Disco 73', '/src/assets/catalogue/products/synth/d''angelica-movoder-disco-73.jpg', 
    'D''Angelica Movoder Disco 73', '2129.00', 3, true, 
    'The D''Angelica Movoder Disco 73 synthesizer seamlessly combines funky disco vibes with versatile components, becoming the musician''s ultimate toolkit for crafting a wide spectrum of groovy sounds.', 
    'July', '2023', 'Blue'),

    (5, 'Synths', 'LoveNation', 'Vitto 6', '/src/assets/catalogue/products/synth/lovenation-vitto6.jpg', 
    'LoveNation Vitto 6', '2879.00', 0, false, 
    'The LoveNation Vitto 6 synthesizer marries a romantic ambiance with versatile capabilities, serving as the musician''s ultimate toolkit for conjuring a diverse range of heartfelt melodies.', 
    'September', '2023', 'Purple'),
    
    (6, 'Drums', 'Connor', 'DevilKit', '/src/assets/catalogue/products/drums/connor%20devilkit.jpg', 
    'Connor DevilKit', '3759.00', 2, true, 
    'Unleash rhythmic fury with Devilkit''s precision and power, designed to ignite stages with its commanding presence.', 
    'March', '2021', 'Red'),

    (6, 'Drums', 'Diamond', 'Manchester', '/src/assets/catalogue/products/drums/diamond%20manchester.jpg', 
    'Diamond Manchester', '3299.00', 0, false, 
    'The Manchester kit sparkles with clarity and depth, capturing every drumbeat with a brilliant fusion of tradition and innovation.', 
    'October', '2021', 'White'),

    (6, 'Drums', 'Tamaha', 'DK707', '/src/assets/catalogue/products/drums/tamaha%20dk707.jpg', 
    'Tamaha DK707', '4239.00', 1, true, 
    'DK707''s thunderous resonance and versatile components make it a drummer''s ultimate toolkit for crafting diverse rhythms.', 
    'October', '2021', 'Black'),

    (6, 'Drums', 'Orage Country', 'TB Signature', '/src/assets/catalogue/products/drums/Orage-Country-tb-signature.jpg', 
    'Orage Country Trav Blaker Signature', '2449.00', 0, false, 
    'The Orage Country Trav Blaker Signature battery packs a punch with its thunderous performance and versatile features, making it an essential tool for musicians seeking a wide range of musical possibilities.', 
    'June', '2022', 'Pink'),

    (6, 'Drums', 'Connor', 'Jungle Dynamite', '/src/assets/catalogue/products/drums/connor-jungle-dynamite.jpg', 
    'Connor Jungle Dynamite', '1349.00', 3, true, 
    'The Connor Jungle Dynamite battery delivers explosive performance and versatile features, making it the drummer''s ultimate toolkit for crafting diverse rhythms.', 
    'May', '2023', 'Green'),

    (6, 'Drums', 'Tamaha', 'Iceberg', '/src/assets/catalogue/products/drums/tamaha-iceberg.jpg', 
    'Tamaha Iceberg', '1469.00', 2, true, 
    'The Tamaha Iceberg drums offer an ice-cold blend of power and versatility, serving as the ultimate toolkit for drummers to craft a wide range of rhythms.', 
    'September', '2023', 'Blue');
 
CREATE USER 'ayd2'@'localhost' IDENTIFIED BY '12345';
GRANT ALL PRIVILEGES ON * . * TO 'ayd2'@'localhost';

CREATE DATABASE `AYD`;

USE `AYD`;

CREATE TABLE `DESTINATION` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `fee` double NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=101 DEF;

INSERT INTO AYD.DESTINATION (name,fee,description) VALUES
	 ('Dole',119.0,'elementum at, egestas a, scelerisque sed, sapien. Nunc pulvinar arcu'),
	 ('Spijkenisse',72.0,'nec, diam. Duis mi enim, condimentum eget, volutpat ornare, facilisis'),
	 ('Athens',120.0,'Praesent interdum ligula eu enim. Etiam imperdiet dictum magna. Ut'),
	 ('Cartago',23.0,'Sed nunc est, mollis non, cursus non, egestas a, dui.'),
	 ('Caxias do Sul',128.0,'Proin sed turpis nec mauris blandit mattis. Cras eget nisi'),
	 ('Tranås',5.0,'lobortis augue scelerisque mollis. Phasellus libero mauris, aliquam eu, accumsan'),
	 ('Hofors',125.0,'a, enim. Suspendisse aliquet, sem ut cursus luctus, ipsum leo'),
	 ('Missoula',93.0,'eget laoreet posuere, enim nisl elementum purus, accumsan interdum libero'),
	 ('Brive-la-Gaillarde',92.0,'nec tempus scelerisque, lorem ipsum sodales purus, in molestie tortor'),
	 ('St. Pölten',40.0,'erat, eget tincidunt dui augue eu tellus. Phasellus elit pede,');
INSERT INTO AYD.DESTINATION (name,fee,description) VALUES
	 ('Hangu',82.0,'pede et risus. Quisque libero lacus, varius et, euismod et,'),
	 ('San Cristóbal de las Casas',56.0,'dolor dapibus gravida. Aliquam tincidunt, nunc ac mattis ornare, lectus'),
	 ('Panjim',43.0,'aptent taciti sociosqu ad litora torquent per conubia nostra, per'),
	 ('Lidköping',114.0,'Praesent eu nulla at sem molestie sodales. Mauris blandit enim'),
	 ('Whyalla',36.0,'turpis. In condimentum. Donec at arcu. Vestibulum ante ipsum primis'),
	 ('Dornbirn',145.0,'malesuada id, erat. Etiam vestibulum massa rutrum magna. Cras convallis'),
	 ('Tejar',56.0,'Fusce aliquet magna a neque. Nullam ut nisi a odio'),
	 ('Kapfenberg',117.0,'nec metus facilisis lorem tristique aliquet. Phasellus fermentum convallis ligula.'),
	 ('Borlänge',122.0,'auctor quis, tristique ac, eleifend vitae, erat. Vivamus nisi. Mauris'),
	 ('Cinco Esquinas',51.0,'nec, mollis vitae, posuere at, velit. Cras lorem lorem, luctus');
INSERT INTO AYD.DESTINATION (name,fee,description) VALUES
	 ('Hermosillo',43.0,'Curabitur ut odio vel est tempor bibendum. Donec felis orci,'),
	 ('Elbląg',86.0,'vitae purus gravida sagittis. Duis gravida. Praesent eu nulla at'),
	 ('Phan Thiết',52.0,'amet risus. Donec egestas. Aliquam nec enim. Nunc ut erat.'),
	 ('Betim',8.0,'sapien. Nunc pulvinar arcu et pede. Nunc sed orci lobortis'),
	 ('Schleswig',134.0,'mauris sapien, cursus in, hendrerit consectetuer, cursus et, magna. Praesent'),
	 ('Vienna',128.0,'mi felis, adipiscing fringilla, porttitor vulputate, posuere vulputate, lacus. Cras'),
	 ('Gia Nghĩa',5.0,'placerat, orci lacus vestibulum lorem, sit amet ultricies sem magna'),
	 ('Gansu',43.0,'vel arcu eu odio tristique pharetra. Quisque ac libero nec'),
	 ('Çeşme',4.0,'pretium et, rutrum non, hendrerit id, ante. Nunc mauris sapien,'),
	 ('Cherepovets',51.0,'diam. Duis mi enim, condimentum eget, volutpat ornare, facilisis eget,');
INSERT INTO AYD.DESTINATION (name,fee,description) VALUES
	 ('San Nicolás',14.0,'luctus lobortis. Class aptent taciti sociosqu ad litora torquent per'),
	 ('Port Augusta',2.0,'lacinia vitae, sodales at, velit. Pellentesque ultricies dignissim lacus. Aliquam'),
	 ('Tlaquepaque',112.0,'et nunc. Quisque ornare tortor at risus. Nunc ac sem'),
	 ('Quảng Ngãi',68.0,'risus quis diam luctus lobortis. Class aptent taciti sociosqu ad'),
	 ('Kapuskasing',0.0,'quam dignissim pharetra. Nam ac nulla. In tincidunt congue turpis.'),
	 ('Linkhout',15.0,'hendrerit. Donec porttitor tellus non magna. Nam ligula elit, pretium'),
	 ('Norfolk',130.0,'nec quam. Curabitur vel lectus. Cum sociis natoque penatibus et'),
	 ('Hạ Long',147.0,'sit amet lorem semper auctor. Mauris vel turpis. Aliquam adipiscing'),
	 ('Gangtok',128.0,'a odio semper cursus. Integer mollis. Integer tincidunt aliquam arcu.'),
	 ('Piedras Negras',143.0,'Nulla aliquet. Proin velit. Sed malesuada augue ut lacus. Nulla');
INSERT INTO AYD.DESTINATION (name,fee,description) VALUES
	 ('Polatlı',63.0,'elit. Curabitur sed tortor. Integer aliquam adipiscing lacus. Ut nec'),
	 ('Jiangsu',48.0,'Vestibulum ante ipsum primis in faucibus orci luctus et ultrices'),
	 ('Palmerston',36.0,'gravida molestie arcu. Sed eu nibh vulputate mauris sagittis placerat.'),
	 ('Sierra Gorda',42.0,'tincidunt vehicula risus. Nulla eget metus eu erat semper rutrum.'),
	 ('Catacaos',101.0,'quis, pede. Praesent eu dui. Cum sociis natoque penatibus et'),
	 ('Kristiansand',112.0,'eget odio. Aliquam vulputate ullamcorper magna. Sed eu eros. Nam'),
	 ('Wanzele',83.0,'dolor. Donec fringilla. Donec feugiat metus sit amet ante. Vivamus'),
	 ('Kędzierzyn-Koźle',67.0,'in consectetuer ipsum nunc id enim. Curabitur massa. Vestibulum accumsan'),
	 ('Höchst',35.0,'metus. Vivamus euismod urna. Nullam lobortis quam a felis ullamcorper'),
	 ('Istanbul',96.0,'nec quam. Curabitur vel lectus. Cum sociis natoque penatibus et');
INSERT INTO AYD.DESTINATION (name,fee,description) VALUES
	 ('Bafra',132.0,'turpis. In condimentum. Donec at arcu. Vestibulum ante ipsum primis'),
	 ('Jayapura',74.0,'condimentum eget, volutpat ornare, facilisis eget, ipsum. Donec sollicitudin adipiscing'),
	 ('Ciudad Apodaca',26.0,'arcu. Vivamus sit amet risus. Donec egestas. Aliquam nec enim.'),
	 ('Huaraz',68.0,'placerat velit. Quisque varius. Nam porttitor scelerisque neque. Nullam nisl.'),
	 ('Liaoning',146.0,'laoreet lectus quis massa. Mauris vestibulum, neque sed dictum eleifend,'),
	 ('Tianjin',67.0,'ante dictum cursus. Nunc mauris elit, dictum eu, eleifend nec,'),
	 ('Poppel',62.0,'dolor sit amet, consectetuer adipiscing elit. Etiam laoreet, libero et'),
	 ('Matlock',126.0,'ultrices. Vivamus rhoncus. Donec est. Nunc ullamcorper, velit in aliquet'),
	 ('Renfrew',17.0,'Phasellus elit pede, malesuada vel, venenatis vel, faucibus id, libero.'),
	 ('Balıkesir',83.0,'quam quis diam. Pellentesque habitant morbi tristique senectus et netus');
INSERT INTO AYD.DESTINATION (name,fee,description) VALUES
	 ('Galway',144.0,'nec, malesuada ut, sem. Nulla interdum. Curabitur dictum. Phasellus in'),
	 ('Dandenong',48.0,'Sed nunc est, mollis non, cursus non, egestas a, dui.'),
	 ('Kano',131.0,'risus a ultricies adipiscing, enim mi tempor lorem, eget mollis'),
	 ('Chuncheon',90.0,'lorem vitae odio sagittis semper. Nam tempor diam dictum sapien.'),
	 ('Hattem',64.0,'nascetur ridiculus mus. Proin vel nisl. Quisque fringilla euismod enim.'),
	 ('Khyber Agency',33.0,'sapien. Nunc pulvinar arcu et pede. Nunc sed orci lobortis'),
	 ('Padang Sidempuan',135.0,'ut ipsum ac mi eleifend egestas. Sed pharetra, felis eget'),
	 ('Orhangazi',136.0,'congue. In scelerisque scelerisque dui. Suspendisse ac metus vitae velit'),
	 ('Gisborne',12.0,'ipsum ac mi eleifend egestas. Sed pharetra, felis eget varius'),
	 ('Vitória da Conquista',4.0,'a, malesuada id, erat. Etiam vestibulum massa rutrum magna. Cras');
INSERT INTO AYD.DESTINATION (name,fee,description) VALUES
	 ('Pekanbaru',139.0,'malesuada ut, sem. Nulla interdum. Curabitur dictum. Phasellus in felis.'),
	 ('Gore',53.0,'et arcu imperdiet ullamcorper. Duis at lacus. Quisque purus sapien,'),
	 ('Morrinsville',97.0,'odio, auctor vitae, aliquet nec, imperdiet nec, leo. Morbi neque'),
	 ('Bhavnagar',112.0,'ipsum dolor sit amet, consectetuer adipiscing elit. Aliquam auctor, velit'),
	 ('Baubau',98.0,'Duis gravida. Praesent eu nulla at sem molestie sodales. Mauris'),
	 ('Coihaique',30.0,'cursus purus. Nullam scelerisque neque sed sem egestas blandit. Nam'),
	 ('San Javier',67.0,'nec, imperdiet nec, leo. Morbi neque tellus, imperdiet non, vestibulum'),
	 ('Le Puy-en-Velay',137.0,'neque. Morbi quis urna. Nunc quis arcu vel quam dignissim'),
	 ('Goslar',93.0,'leo, in lobortis tellus justo sit amet nulla. Donec non'),
	 ('Ararat',88.0,'a, dui. Cras pellentesque. Sed dictum. Proin eget odio. Aliquam');
INSERT INTO AYD.DESTINATION (name,fee,description) VALUES
	 ('Oslo',93.0,'tempor augue ac ipsum. Phasellus vitae mauris sit amet lorem'),
	 ('Beijing',111.0,'enim consequat purus. Maecenas libero est, congue a, aliquet vel,'),
	 ('Manizales',50.0,'nec, diam. Duis mi enim, condimentum eget, volutpat ornare, facilisis'),
	 ('Smolensk',66.0,'dui nec urna suscipit nonummy. Fusce fermentum fermentum arcu. Vestibulum'),
	 ('McCallum',28.0,'iaculis quis, pede. Praesent eu dui. Cum sociis natoque penatibus'),
	 ('Shangla',73.0,'Sed neque. Sed eget lacus. Mauris non dui nec urna'),
	 ('Alta',86.0,'nec, malesuada ut, sem. Nulla interdum. Curabitur dictum. Phasellus in'),
	 ('Cork',85.0,'est. Nunc laoreet lectus quis massa. Mauris vestibulum, neque sed'),
	 ('Mandi Bahauddin',99.0,'ac metus vitae velit egestas lacinia. Sed congue, elit sed'),
	 ('Ollagüe',83.0,'in faucibus orci luctus et ultrices posuere cubilia Curae Donec');
INSERT INTO AYD.DESTINATION (name,fee,description) VALUES
	 ('Słupsk',121.0,'facilisis vitae, orci. Phasellus dapibus quam quis diam. Pellentesque habitant'),
	 ('Devonport',60.0,'sem semper erat, in consectetuer ipsum nunc id enim. Curabitur'),
	 ('Dumai',149.0,'Pellentesque habitant morbi tristique senectus et netus et malesuada fames'),
	 ('Mielec',81.0,'tincidunt adipiscing. Mauris molestie pharetra nibh. Aliquam ornare, libero at'),
	 ('Hastings',147.0,'Suspendisse ac metus vitae velit egestas lacinia. Sed congue, elit'),
	 ('A Coruña',81.0,'luctus aliquet odio. Etiam ligula tortor, dictum eu, placerat eget,'),
	 ('Makassar',73.0,'lacinia vitae, sodales at, velit. Pellentesque ultricies dignissim lacus. Aliquam'),
	 ('Cowdenbeath',4.0,'aliquam, enim nec tempus scelerisque, lorem ipsum sodales purus, in'),
	 ('San Rafael',94.0,'interdum feugiat. Sed nec metus facilisis lorem tristique aliquet. Phasellus'),
	 ('Chimbote',45.0,'sed sem egestas blandit. Nam nulla magna, malesuada vel, convallis');


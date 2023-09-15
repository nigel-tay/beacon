CREATE DATABASE beacon;

USE beacon;

CREATE TABLE beacon_user (
	id				VARCHAR(128) NOT NULL,
    username		VARCHAR(128) NOT NULL,
    email			VARCHAR(128) NOT NULL,
    password		VARCHAR(256) NOT NULL,
    address 		VARCHAR(128),
    lat             VARCHAR(128),
    lng				VARCHAR(128),
    image			VARCHAR(128),
    CONSTRAINT pk_beacon_user_id PRIMARY KEY(id)
);   

CREATE TABLE pet (
	id					VARCHAR(128) NOT NULL,
    owner_id			VARCHAR(128) NOT NULL,
    name 				VARCHAR(128) NOT NULL,
    type				VARCHAR(128) NOT NULL,
    image 				VARCHAR(128) NOT NULL,
    lost 				TINYINT NOT NULL,
    CONSTRAINT pk_pet_id PRIMARY KEY(id),
    CONSTRAINT fk_pet_owner_id FOREIGN KEY(owner_id) REFERENCES beacon_user(id)
);

CREATE TABLE features (
	id 		VARCHAR(128) NOT NULL,
    feature VARCHAR(128) NOT NULL,
    CONSTRAINT pk_feature_id PRIMARY KEY(id)
);

CREATE TABLE pet_features (
	id 			VARCHAR(128) NOT NULL,
    pet_id 		VARCHAR(128) NOT NULL,
    features_id VARCHAR(128) NOT NULL,
    CONSTRAINT pk_pet_features_id PRIMARY KEY (id),
    CONSTRAINT fk_pet_features_pet_id FOREIGN KEY(pet_id) REFERENCES pet(id),
    CONSTRAINT fk_pet_features_features_id FOREIGN KEY(features_id) REFERENCES features(id)
);

CREATE TABLE report (
	id 			VARCHAR(128) NOT NULL,
    pet_id 		VARCHAR(128) NOT NULL,
    lat 		VARCHAR(128) NOT NULL,
    lng 		VARCHAR(128) NOT NULL,
    date_time 	DATE NOT NULL,
    zone 		VARCHAR(128) NOT NULL,
    description VARCHAR(128),
    closed 		TINYINT NOT NULL,
    CONSTRAINT pk_report_id PRIMARY KEY (id),
    CONSTRAINT fk_report_pet_id FOREIGN KEY (pet_id) REFERENCES pet(id)
);

CREATE TABLE sighting (
	id 			VARCHAR(128) NOT NULL,
    user_id 	VARCHAR(128) NOT NULL,
    report_id 	VARCHAR(128) NOT NULL,
    content 	VARCHAR(128) NOT NULL,
    date_time 	DATE NOT NULL,
    image 		VARCHAR(128) NOT NULL,
    deleted 	TINYINT NOT NULL,
    CONSTRAINT pk_sighting_id PRIMARY KEY (id),
    CONSTRAINT fk_sighting_user_id FOREIGN KEY (user_id) REFERENCES beacon_user(id),
    CONSTRAINT fk_sighting_report_id FOREIGN KEY (report_id) REFERENCES report(id)
);
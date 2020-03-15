--
-- PostgreSQL database dump
--

-- Dumped from database version 9.6.12
-- Dumped by pg_dump version 9.6.12

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: exemplar_history; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.exemplar_history (
    id integer NOT NULL,
    description text,
    exemplar_id integer,
    event_type character varying(100),
    event_date timestamp without time zone,
    photo character varying(1000),
    event_number integer
);


ALTER TABLE public.exemplar_history OWNER TO postgres;

--
-- Name: exemplar_history_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.exemplar_history_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.exemplar_history_id_seq OWNER TO postgres;

--
-- Name: exemplar_history_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.exemplar_history_id_seq OWNED BY public.exemplar_history.id;


--
-- Name: exemplars; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.exemplars (
    id integer NOT NULL,
    variety_id integer,
    parent integer,
    is_sport boolean,
    name character varying(1000),
    parent_leaf integer
);


ALTER TABLE public.exemplars OWNER TO postgres;

--
-- Name: exemplars_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.exemplars_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.exemplars_id_seq OWNER TO postgres;

--
-- Name: exemplars_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.exemplars_id_seq OWNED BY public.exemplars.id;


--
-- Name: hybridisators; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.hybridisators (
    id integer NOT NULL,
    name character varying(400),
    description text
);


ALTER TABLE public.hybridisators OWNER TO postgres;

--
-- Name: TABLE hybridisators; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON TABLE public.hybridisators IS 'Persons who made hybridisation';


--
-- Name: hybridisators_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.hybridisators_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.hybridisators_id_seq OWNER TO postgres;

--
-- Name: hybridisators_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.hybridisators_id_seq OWNED BY public.hybridisators.id;


--
-- Name: leaf_history; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.leaf_history (
    id integer NOT NULL,
    leaf_id integer NOT NULL,
    description text,
    event_type character varying(100) NOT NULL,
    event_date timestamp without time zone,
    photo character varying(1000)
);


ALTER TABLE public.leaf_history OWNER TO postgres;

--
-- Name: TABLE leaf_history; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON TABLE public.leaf_history IS 'History of leaves growing';


--
-- Name: leaf_history_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.leaf_history_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.leaf_history_id_seq OWNER TO postgres;

--
-- Name: leaf_history_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.leaf_history_id_seq OWNED BY public.leaf_history.id;


--
-- Name: leaves; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.leaves (
    id integer NOT NULL,
    parent integer,
    variety_id integer
);


ALTER TABLE public.leaves OWNER TO postgres;

--
-- Name: TABLE leaves; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON TABLE public.leaves IS 'Leaves separated from exemplars';


--
-- Name: leaves_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.leaves_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.leaves_id_seq OWNER TO postgres;

--
-- Name: leaves_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.leaves_id_seq OWNED BY public.leaves.id;


--
-- Name: varieties; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.varieties (
    id integer NOT NULL,
    name character varying(400) NOT NULL,
    author integer,
    description text,
    variety_type character varying(100) NOT NULL,
    hybridisation_date timestamp without time zone,
    sport_of integer
);


ALTER TABLE public.varieties OWNER TO postgres;

--
-- Name: TABLE varieties; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON TABLE public.varieties IS 'Varieties of cultivars';


--
-- Name: varieties_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.varieties_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.varieties_id_seq OWNER TO postgres;

--
-- Name: varieties_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.varieties_id_seq OWNED BY public.varieties.id;


--
-- Name: variety_details; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.variety_details (
    id integer NOT NULL,
    photo character varying(300) NOT NULL,
    description text,
    variety_id integer NOT NULL,
    detail_order integer NOT NULL
);


ALTER TABLE public.variety_details OWNER TO postgres;

--
-- Name: TABLE variety_details; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON TABLE public.variety_details IS 'Table for variety''s photo';


--
-- Name: variety_details_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.variety_details_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.variety_details_id_seq OWNER TO postgres;

--
-- Name: variety_details_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.variety_details_id_seq OWNED BY public.variety_details.id;


--
-- Name: exemplar_history id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.exemplar_history ALTER COLUMN id SET DEFAULT nextval('public.exemplar_history_id_seq'::regclass);


--
-- Name: exemplars id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.exemplars ALTER COLUMN id SET DEFAULT nextval('public.exemplars_id_seq'::regclass);


--
-- Name: hybridisators id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.hybridisators ALTER COLUMN id SET DEFAULT nextval('public.hybridisators_id_seq'::regclass);


--
-- Name: leaf_history id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.leaf_history ALTER COLUMN id SET DEFAULT nextval('public.leaf_history_id_seq'::regclass);


--
-- Name: leaves id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.leaves ALTER COLUMN id SET DEFAULT nextval('public.leaves_id_seq'::regclass);


--
-- Name: varieties id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.varieties ALTER COLUMN id SET DEFAULT nextval('public.varieties_id_seq'::regclass);


--
-- Name: variety_details id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.variety_details ALTER COLUMN id SET DEFAULT nextval('public.variety_details_id_seq'::regclass);


--
-- Data for Name: exemplar_history; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.exemplar_history (id, description, exemplar_id, event_type, event_date, photo, event_number) FROM stdin;
1	Leaf separation exemplar description	1	APPEARANCE	\N	\N	\N
2		1	FIRST_BUDS	2019-10-25 00:00:00	exemplars/Н-Радость/Н-Радость03367578-55d2-4445-a87f-dc9b61be286a.jpg	\N
3		1	GROW	2019-11-03 00:00:00	exemplars/Н-Радость/Н-Радостьf8b33f4a-b260-4789-9c42-5fd37d93391f.jpg	\N
4		1	BLOSSOM_START	2019-11-09 00:00:00	exemplars/Н-Радость/Н-Радость62d8aab4-3ee8-4c27-983f-8e06b5afd6c3.jpg	\N
5	Еле видны незначительные вкрапления фэнтези	1	GROW	2019-11-11 00:00:00	exemplars/Н-Радость/Н-Радость62666eea-ac0d-435c-bf13-f7f88fcb114c.jpg	\N
6		1	GROW	2019-11-17 00:00:00	exemplars/Н-Радость/Н-Радость9b7bc209-f910-48b8-8e34-2201e344c6f7.jpg	\N
7		1	GROW	2019-11-28 00:00:00	exemplars/Н-Радость/Н-Радость89493f16-5d56-4e45-9c0e-d2295562b162.jpg	\N
8		1	BLOSSOM_END	2019-12-07 00:00:00	exemplars/Н-Радость/Н-Радостьbb6bc81a-95b9-4786-b21b-2fd02c12e344.jpg	\N
9		1	BLOSSOM_START	2019-01-01 00:00:00	exemplars/Н-Радость/Н-Радостьcfec6ee5-672f-48cf-906d-f894c012b297.JPG	\N
10		1	GROW	2020-01-16 00:00:00	exemplars/Н-Радость/Н-Радостьf0d2aab7-46bd-4f8b-a03f-0cfd6e99501d.JPG	\N
11		1	BLOSSOM_END	2020-02-04 00:00:00	exemplars/Н-Радость/Н-Радость0319ea89-75b7-4e19-8928-d76ff1d38ce8.JPG	\N
13		2	BLOSSOM_START	2020-02-15 00:00:00	exemplars/Н-Радость/Н-Радость1d938fb9-e526-4471-a549-2d46c3a93410.JPG	\N
14	Появился стартер от Ларисы где-то весной 2019г, развивался очень медленно, вероятно уже был поражен либо клещом, либо нематодой.	3	APPEARANCE	\N	\N	\N
15	Невнятно зацвел, не в первый раз, т.к. раньше цвел у хозяйки	3	BLOSSOM_END	2019-09-20 00:00:00	exemplars/Rob's Sarsaparilla/Rob's Sarsaparilla80c7caa0-5712-4632-835c-d06e64f13eaf.jpg	\N
16	Вот так выглядел в октябре, со слегка болезненным желтоватым оттенком.	3	GROW	2019-10-14 00:00:00	exemplars/Rob's Sarsaparilla/Rob's Sarsaparillafe87f142-5bac-4e88-b8ba-bb40793abbd8.jpg	\N
17	Начала выкидывать еще несколько бутонов	3	BLOSSOM_START	2019-10-25 00:00:00	exemplars/Rob's Sarsaparilla/Rob's Sarsaparilla7d72f59e-96da-4004-8a36-d2f9f6abb41e.jpg	\N
18	Цветок немного неправильной формы, легкий венозный рисунок по краям	3	GROW	2019-11-03 00:00:00	exemplars/Rob's Sarsaparilla/Rob's Sarsaparilla37f52194-0ccb-4b4a-9474-cec16d38d657.jpg	\N
19	Цветок в профиль	3	GROW	2019-11-03 00:00:00	exemplars/Rob's Sarsaparilla/Rob's Sarsaparilla54e1a1a7-5d4d-463c-b8ea-a88e426abc49.jpg	\N
20	Вот тут уже видно, что листья становятся желтыми.	3	GROW	2019-11-09 00:00:00	exemplars/Rob's Sarsaparilla/Rob's Sarsaparillaef1003be-6bb3-4188-bdf1-c7ec6149f00f.jpg	\N
21	Цветение практически завершалось	3	BLOSSOM_END	2019-11-17 00:00:00	exemplars/Rob's Sarsaparilla/Rob's Sarsaparillae24c3fad-7aa4-4bc2-b37f-ba7ce3714841.jpg	\N
22	Подарила Ирина детку-стартер.	4	APPEARANCE	\N	\N	\N
39		4	BLOSSOM_END	2019-11-16 00:00:00	exemplars/Н-Снежный Георгин/Н-Снежный Георгин78333c6a-59b2-4b7d-8c06-9d0e60a1094a.jpg	\N
40		4	BLOSSOM_START	2020-01-16 00:00:00	exemplars/Н-Снежный Георгин/Н-Снежный Георгинd09d3d7b-5f0e-4fd8-8943-69e4bd67a161.JPG	\N
41		4	BLOSSOM_END	2020-02-04 00:00:00	exemplars/Н-Снежный Георгин/Н-Снежный Георгин623ef966-7c9d-4429-ba8e-d1a87b550210.JPG	\N
42	Цветет по чуть-чуть практически не переставая	1	GROW	2020-03-03 00:00:00	exemplars/Н-Радость/Н-Радостьbbecd110-b68b-44b9-85dd-91f03a502370.jpg	\N
23		4	GROW	2019-06-28 00:00:00	exemplars/Н-Снежный Георгин/Н-Снежный Георгин8a672b55-1baf-49cc-88bd-1afdd7d697a6.JPG	\N
24	Пасынок	4	GROW	2019-06-28 00:00:00	exemplars/Н-Снежный Георгин/Н-Снежный Георгинad77fe43-55ea-4da4-9766-d0dbf4a19357.JPG	\N
25		4	GROW	2019-07-13 00:00:00	exemplars/Н-Снежный Георгин/Н-Снежный Георгинc152c87f-4186-4dd5-81f9-39650e54e246.jpg	\N
26		4	FIRST_BUDS	2019-08-08 00:00:00	exemplars/Н-Снежный Георгин/Н-Снежный Георгинfeeeea8a-3f1e-47de-a899-0c9f9d835a8f.jpg	\N
27		4	BLOSSOM_START	2019-08-19 00:00:00	exemplars/Н-Снежный Георгин/Н-Снежный Георгин5c8aba74-e704-48c1-8ef4-853042177701.jpg	\N
28		4	GROW	2019-08-19 00:00:00	exemplars/Н-Снежный Георгин/Н-Снежный Георгин81c8915c-8a14-4805-93b0-2fdae8e157c7.jpg	\N
29	Цветок до 3см	4	GROW	2019-08-19 00:00:00	exemplars/Н-Снежный Георгин/Н-Снежный Георгин4a91bab8-ab4b-40d5-8952-167989035b14.jpg	\N
30		4	GROW	2019-09-01 00:00:00	exemplars/Н-Снежный Георгин/Н-Снежный Георгин6af54369-7038-437a-bded-1d92db7876d4.jpg	\N
31		4	GROW	2019-09-08 00:00:00	exemplars/Н-Снежный Георгин/Н-Снежный Георгин28b31027-062b-489d-a440-d475071e029b.jpg	\N
32		4	GROW	2019-09-15 00:00:00	exemplars/Н-Снежный Георгин/Н-Снежный Георгин8f26f98e-5881-4a96-a363-b50a486256a8.jpg	\N
33		4	BLOSSOM_END	2019-10-06 00:00:00	exemplars/Н-Снежный Георгин/Н-Снежный Георгинd92ceafe-a517-494a-8d95-af9be5be05f2.jpg	\N
34	Было 4 пасынка отсаженных, все отдала.	4	GROW	2019-10-25 00:00:00	exemplars/Н-Снежный Георгин/Н-Снежный Георгин28251bc3-e285-4a80-a22b-d1f50b045075.jpg	\N
35		4	BLOSSOM_START	2019-10-25 00:00:00	exemplars/Н-Снежный Георгин/Н-Снежный Георгинa48c220e-c206-410a-a387-08cfddbdc136.jpg	\N
36		4	GROW	2019-11-03 00:00:00	exemplars/Н-Снежный Георгин/Н-Снежный Георгинfa333b83-2398-4ad5-9663-0f1785487a5c.jpg	\N
37		4	GROW	2019-11-09 00:00:00	exemplars/Н-Снежный Георгин/Н-Снежный Георгин370ea92b-2797-4f24-afef-bac2d3c2b766.jpg	\N
38		4	GROW	2019-11-11 00:00:00	exemplars/Н-Снежный Георгин/Н-Снежный Георгинc37d69a0-04b8-43b8-9ea9-3a18e979abc4.jpg	\N
43	На этом экземпляре больше фэнтази, чем на первом снятом с листа.	2	GROW	2020-03-03 00:00:00	exemplars/Н-Радость/Н-Радостьfee6b212-6b4c-4b29-a0a0-6e58e1572c17.jpg	\N
12	Вторая детка с листа, была более слабая и медленно развивалась	2	APPEARANCE	\N	\N	\N
44	Цветет очень обильно, несмотря на сильное поражение клещом.	2	GROW	2020-03-15 00:00:00	exemplars/Н-Радость/Н-Радостьeb5234fc-01ce-4935-878c-ec015a0caca5.jpg	\N
45	Было 4 экземляра, два из них отдала, один посадила в большое подвесное кашпо, другой остался на полочке.	5	APPEARANCE	\N	\N	\N
46	Только недавно материнский лист погиб	5	GROW	2019-06-28 00:00:00	exemplars/Alan’s Fallen Angel/Alan’s Fallen Angel8c5134ec-db9b-46be-bd77-a5d5a2422732.JPG	\N
47		5	GROW	2019-08-08 00:00:00	exemplars/Alan’s Fallen Angel/Alan’s Fallen Angel7b3263f5-d251-4ee6-ba13-41bab1ebf945.jpg	\N
49		5	BLOSSOM_START	2019-08-31 00:00:00	exemplars/Alan’s Fallen Angel/Alan’s Fallen Angel8a52bc24-b89c-42d7-bd0f-1960aebee9c9.jpg	\N
48		5	FIRST_BUDS	2019-08-19 00:00:00	exemplars/Alan’s Fallen Angel/Alan’s Fallen Angel1253dc38-b06d-406b-9ecf-33b5eb4c8118.jpg	\N
50		5	GROW	2019-09-08 00:00:00	exemplars/Alan’s Fallen Angel/Alan’s Fallen Angel15a794cf-86eb-43d8-9a15-ec45fdd40c06.jpg	\N
51		5	GROW	2019-09-08 00:00:00	exemplars/Alan’s Fallen Angel/Alan’s Fallen Angelea2238d6-9132-4cb1-a6b8-23fb566491f8.jpg	\N
52		5	GROW	2019-09-15 00:00:00	exemplars/Alan’s Fallen Angel/Alan’s Fallen Angel92c6a844-c751-45df-8393-cbd93c112b90.jpg	\N
53		5	GROW	2019-09-15 00:00:00	exemplars/Alan’s Fallen Angel/Alan’s Fallen Angel660d0c32-b83c-46ba-9d22-8c0519312a7a.jpg	\N
54		5	GROW	2019-09-20 00:00:00	exemplars/Alan’s Fallen Angel/Alan’s Fallen Angel6e9c00e4-bce4-4602-a085-aeba2cb21f77.jpg	\N
55		5	GROW	2019-09-22 00:00:00	exemplars/Alan’s Fallen Angel/Alan’s Fallen Angelf769059a-cb0a-48c8-bacb-748c9107ca7b.jpg	\N
56		5	GROW	2019-10-06 00:00:00	exemplars/Alan’s Fallen Angel/Alan’s Fallen Angelacd367aa-09f3-4cda-b329-d14185cfc875.jpg	\N
59		6	BLOSSOM_START	2019-10-25 00:00:00	exemplars/Alan’s Fallen Angel/Alan’s Fallen Angel6303c24e-8d61-44e7-a8bd-ef46f9cc996f.jpg	\N
60	Это другой кустик, его я отдала	5	GROW	2019-10-25 00:00:00	exemplars/Alan’s Fallen Angel/Alan’s Fallen Angelcb62ac3b-89fc-4e60-842b-b6bc27d22b0d.jpg	\N
61	Один из этих кустов был пересажен в кашпо подвесное	5	GROW	2019-10-25 00:00:00	exemplars/Alan’s Fallen Angel/Alan’s Fallen Angel8670401b-dc80-402f-9e7c-032ecd2e5882.jpg	\N
62	Один из кустиков, который отдала	5	GROW	2019-11-03 00:00:00	exemplars/Alan’s Fallen Angel/Alan’s Fallen Angel0884c770-0faa-4dcb-8935-3735a2bda2d1.jpg	\N
63		6	GROW	2019-11-03 00:00:00	exemplars/Alan’s Fallen Angel/Alan’s Fallen Angel78bc117c-8a6d-47fa-9b12-960d14443535.jpg	\N
64		5	GROW	2019-11-09 00:00:00	exemplars/Alan’s Fallen Angel/Alan’s Fallen Angel7e841b61-76fe-4f74-a7eb-0e40ba0aa99f.jpg	\N
57	Этот куст был одан	5	BLOSSOM_END	2019-10-18 00:00:00	exemplars/Alan’s Fallen Angel/Alan’s Fallen Angel5c4426c1-9cf5-4bbf-b421-f9468d452872.jpg	\N
65		5	GROW	2019-11-17 00:00:00	exemplars/Alan’s Fallen Angel/Alan’s Fallen Angel2ef537e2-7200-49c2-837d-83db6a965808.jpg	\N
66		6	GROW	2020-03-15 00:00:00	exemplars/Alan’s Fallen Angel/Alan’s Fallen Angelc612a1b1-025e-4130-a8f3-595273da76df.jpg	\N
58	Из всех деток у этой была самая красивая пестролистность	6	APPEARANCE	\N	\N	\N
67	Ирина отдала куст	7	APPEARANCE	\N	\N	\N
68		7	GROW	2019-06-28 00:00:00	exemplars/Alchemy Antique Bells/Alchemy Antique Bellse282a3cd-2ed1-4ace-9c88-2d198a7d9b7b.JPG	\N
69		7	FIRST_BUDS	2019-10-06 00:00:00	exemplars/Alchemy Antique Bells/Alchemy Antique Bells2b691c88-0958-49a4-bed8-2fe4badce85b.jpg	\N
70		7	BLOSSOM_START	2019-10-12 00:00:00	exemplars/Alchemy Antique Bells/Alchemy Antique Bells3e1fdb6f-b62c-40e2-bb73-a20a0167fe6b.jpg	\N
71		7	GROW	2019-10-14 00:00:00	exemplars/Alchemy Antique Bells/Alchemy Antique Bellsb3f163b0-611d-437e-9adc-299dadb7e924.jpg	\N
72		7	GROW	2019-10-20 00:00:00	exemplars/Alchemy Antique Bells/Alchemy Antique Bellsfd77ed60-4e7c-4566-8db2-f6a111f03edc.jpg	\N
73		7	BLOSSOM_END	2019-10-25 00:00:00	exemplars/Alchemy Antique Bells/Alchemy Antique Bells6dbc5637-e372-4f13-a410-1e0a28ae3ecb.jpg	\N
81	Пораже клещом	8	FIRST_BUDS	2019-11-17 00:00:00	exemplars/Alchemy Antique Bells/Alchemy Antique Bells70b5a27c-dfe1-4010-90c6-677881daffbd.jpg	\N
76		7	GROW	2019-11-03 00:00:00	exemplars/Alchemy Antique Bells/Alchemy Antique Bells3333b22a-1f30-4e6f-8983-458e79b8d1b0.jpg	\N
77		7	GROW	2019-11-03 00:00:00	exemplars/Alchemy Antique Bells/Alchemy Antique Bellsc90a2791-2225-4371-891f-ed8eb007cf27.jpg	\N
78		7	GROW	2019-11-03 00:00:00	exemplars/Alchemy Antique Bells/Alchemy Antique Bells1c1e01ff-35fc-4b27-b4c3-90aeb3e050d1.jpg	\N
79		7	GROW	2019-11-03 00:00:00	exemplars/Alchemy Antique Bells/Alchemy Antique Bells080ee16b-6980-4f5f-9290-3bb5417df94b.jpg	\N
75		7	STEAM_SEPARATED	2019-10-25 00:00:00	exemplars/Alchemy Antique Bells/Alchemy Antique Bells731aa387-684c-48cb-82ff-3dc303667717.jpg	\N
74	Отсадила пасынок немного раньше	8	APPEARANCE	2019-10-25 00:00:00	exemplars/Alchemy Antique Bells/Alchemy Antique Bells4b7e6881-9388-4359-8fdb-99c61bb739cb.jpg	\N
80		7	GROW	2019-11-11 00:00:00	exemplars/Alchemy Antique Bells/Alchemy Antique Bells368c2052-45c2-4e85-b4d1-223d3db5953c.jpg	\N
82		7	GROW	2020-01-16 00:00:00	exemplars/Alchemy Antique Bells/Alchemy Antique Bells281df1b1-29d0-4b25-87dc-43749eef887f.JPG	\N
84		9	GROW	2020-01-12 00:00:00	exemplars/Biscayne trail/Biscayne trail14546a75-6570-4e63-8c80-fb257a5240d4.JPG	\N
83	Обменяла у женщины с Михайловской Борщаговки	9	APPEARANCE	2019-12-29 00:00:00	exemplars/Biscayne trail/Biscayne trail main39818ecf-41e5-4479-8328-1c8ada022244.JPG	\N
85		9	GROW	2020-03-03 00:00:00	exemplars/Biscayne trail/Biscayne trail483bcdc7-f6a0-40b0-b7dd-25ebff5a0672.jpg	\N
86		9	GROW	2020-03-15 00:00:00	exemplars/Biscayne trail/Biscayne trail0d1f073f-13dd-4c2c-87a7-aacf20337370.jpg	\N
87	Leaf separation exemplar description	10	APPEARANCE	\N	\N	\N
88		10	BLOSSOM_START	2020-02-19 00:00:00	exemplars/Chanta Lana/Chanta Lana0f72b286-7e0d-4bdf-8db9-619391e4d4dc.jpg	\N
90		10	GROW	2020-03-01 00:00:00	exemplars/Chanta Lana/Chanta Lana272a064c-ef4b-442e-ba3e-4ff2c0322572.jpg	\N
91		10	GROW	2020-03-01 00:00:00	exemplars/Chanta Lana/Chanta Lana87f30286-ebec-4b0b-bedc-7926f1253051.jpg	\N
92		10	GROW	2020-03-01 00:00:00	exemplars/Chanta Lana/Chanta Lana69056379-54ba-4036-b453-646b48d251f0.jpg	\N
89		10	GROW	2020-02-27 00:00:00	exemplars/Chanta Lana/Chanta Lana79e7049d-fc86-4127-91bf-f0c9b1cc35bc.jpg	\N
94		10	GROW	2020-03-03 00:00:00	exemplars/Chanta Lana/Chanta Lana80dfc703-2c11-4bf5-8793-361ad1cb92df.jpg	\N
93		10	GROW	2020-03-03 00:00:00	exemplars/Chanta Lana/Chanta Lana4e91d804-8c04-4759-848b-36d5802ec34b.jpg	\N
95		10	GROW	2020-03-15 00:00:00	exemplars/Chanta Lana/Chanta Lana1cdb05ab-e2af-403e-8970-e84b148a34bd.jpg	\N
96	Leaf separation exemplar description	11	APPEARANCE	\N	\N	\N
97	Leaf separation exemplar description	12	APPEARANCE	\N	\N	\N
98	Выросли 2 экземпляра, один я в последствии отдала	12	GROW	2019-10-25 00:00:00	exemplars/Flashy trail/Flashy trail86802d82-6c47-4364-8010-d5bc45ff8beb.jpg	\N
99		12	BLOSSOM_START	2019-11-09 00:00:00	exemplars/Flashy trail/Flashy traild498e1a6-5f01-43fb-af90-beec8eb65651.jpg	\N
100		12	GROW	2019-11-17 00:00:00	exemplars/Flashy trail/Flashy trail85d65a79-6659-4f46-8546-c8c061b4803d.jpg	\N
101		12	GROW	2019-12-07 00:00:00	exemplars/Flashy trail/Flashy trailda87e81c-02fe-4e4a-ac57-9bfe387b5a92.jpg	\N
102		12	GROW	2019-12-15 00:00:00	exemplars/Flashy trail/Flashy trailc60e196b-a7a3-43df-9007-bea5e0ce08c4.jpg	\N
103		12	GROW	2020-01-01 00:00:00	exemplars/Flashy trail/Flashy traile90c05d2-75c7-4c08-a0fb-ede01c09a024.JPG	\N
104		12	GROW	2020-01-12 00:00:00	exemplars/Flashy trail/Flashy trail3b48ebc3-0634-4da8-9806-7b3df7bc365b.JPG	\N
105		12	GROW	2020-02-19 00:00:00	exemplars/Flashy trail/Flashy traile948f7f3-8598-4636-9675-cd3c0e1f1d52.jpg	\N
106		12	GROW	2020-02-27 00:00:00	exemplars/Flashy trail/Flashy trail0af12173-f7a4-47d3-a25d-1f5f763045b5.jpg	\N
107		12	BLOSSOM_END	2020-03-01 00:00:00	exemplars/Flashy trail/Flashy trailf57a23e7-d0e7-4d49-9ddb-f6ed69968db7.jpg	\N
108	Leaf separation exemplar description	13	APPEARANCE	2019-10-25 00:00:00	\N	\N
110		14	GROW	2019-10-25 00:00:00	exemplars/Irish Flirt/Irish Flirt6cb5dbe3-8ce7-4cb7-9141-67d6b093eb20.jpg	\N
109	Лариса дала стартер	14	APPEARANCE	2019-09-20 00:00:00	exemplars/Irish Flirt/Irish Flirt Ларисинda5a965e-e555-4cd6-8856-9fa2dd2a7bba.jpg	\N
111		14	FIRST_BUDS	2019-11-09 00:00:00	exemplars/Irish Flirt/Irish Flirtfd69f6d3-a870-4966-b39d-546f0f3b4104.jpg	\N
112		14	BLOSSOM_START	2019-11-17 00:00:00	exemplars/Irish Flirt/Irish Flirtabb1fac2-a435-4caa-a67d-3127e8146fff.jpg	\N
113		14	GROW	2019-11-28 00:00:00	exemplars/Irish Flirt/Irish Flirt6000863b-e857-40c8-9732-0a9a25a0fa0e.jpg	\N
114	Детки немного подросли (групповое фото на 4 экземпляра с одного листа)	13	GROW	2019-12-01 00:00:00	exemplars/Irish Flirt/Irish Flirt7a8b09c7-8f88-4c02-85f1-d0594c1cb2d1.jpg	\N
115		14	GROW	2019-12-07 00:00:00	exemplars/Irish Flirt/Irish Flirtc2e78d5f-806f-4588-91ce-f1fcba7019e3.jpg	\N
116		14	GROW	2019-12-14 00:00:00	exemplars/Irish Flirt/Irish Flirt4761a459-f5b5-467a-b288-c27888c28588.jpg	\N
117		14	GROW	2020-02-04 00:00:00	exemplars/Irish Flirt/Irish Flirt062fb6f5-85a7-4c0b-a2a0-55d49ab76189.JPG	\N
118		14	BLOSSOM_END	2020-02-19 00:00:00	exemplars/Irish Flirt/Irish Flirt5c5985c0-a027-41c8-b15c-414515c67d3f.jpg	\N
119		13	FIRST_BUDS	2020-01-18 00:00:00	exemplars/Irish Flirt/Irish Flirt558b3b34-28ce-4b69-98a1-c4d49df188d8.JPG	\N
120		13	BLOSSOM_START	2020-02-04 00:00:00	exemplars/Irish Flirt/Irish Flirt7891ed27-f267-49ec-bc5b-07df7ed7c1d4.JPG	\N
121		13	BLOSSOM_END	2020-02-19 00:00:00	exemplars/Irish Flirt/Irish Flirt29e542af-9527-476c-afb3-317c4aaeab25.jpg	\N
122	Leaf separation exemplar description	15	APPEARANCE	\N	\N	\N
123		15	FIRST_BUDS	2020-03-15 00:00:00	exemplars/Irish Flirt/Irish Flirt075d3eaf-eb1b-4d39-aab1-73ae4ff268f5.jpg	\N
124	Лариса отдала стартер	16	APPEARANCE	\N	\N	\N
125		16	GROW	2019-10-25 00:00:00	exemplars/Н-Ожидание/Н-Ожиданиеa5e5cb2b-73e9-4567-bb1b-ca812036410f.jpg	\N
126		16	BLOSSOM_START	2020-01-25 00:00:00	exemplars/Н-Ожидание/Н-Ожиданиеc4f37e19-96b7-48a8-8e37-3f8f801ed994.JPG	\N
128		16	GROW	2020-02-04 00:00:00	exemplars/Н-Ожидание/Н-Ожиданиеa171409e-445b-46b6-b716-d6bf94aed09c.JPG	\N
127		16	GROW	2020-01-26 00:00:00	exemplars/Н-Ожидание/Н-Ожидание2c8e3813-84f0-4110-9399-31c96761c39e.JPG	\N
129		16	GROW	2020-02-19 00:00:00	exemplars/Н-Ожидание/Н-Ожидание1a7dd48c-ec17-4fa7-b41a-36a1990519ce.jpg	\N
130		16	GROW	2020-03-15 00:00:00	exemplars/Н-Ожидание/Н-Ожиданиеbbae024c-1245-4585-91d1-649ee55f6f30.jpg	\N
132		17	GROW	2019-10-27 00:00:00	exemplars/Kris/Kris42ae74b4-106f-49e0-810d-f8074b975d6b.jpg	\N
131	Ирина отдала детку	17	APPEARANCE	2019-08-03 00:00:00	exemplars/Kris/Kris main8ee2c44a-9db5-41e8-ba42-3a4f86293666.jpg	\N
133		17	BLOSSOM_START	2019-11-09 00:00:00	exemplars/Kris/Kris3e81fb38-1bd5-437f-a053-c0c341c0836c.jpg	\N
134		17	GROW	2019-11-17 00:00:00	exemplars/Kris/Kris43e53d0b-7e02-43ab-a7cc-a47d58e6a350.jpg	\N
135		17	GROW	2019-11-28 00:00:00	exemplars/Kris/Kris4fb0638e-2122-4e49-972b-f26c019d3173.jpg	\N
136		17	BLOSSOM_END	2019-12-07 00:00:00	exemplars/Kris/Krisf0913796-ca68-4555-8555-b011b09196a3.jpg	\N
137	Leaf separation exemplar description	18	APPEARANCE	2019-10-25 00:00:00	\N	\N
138		18	BLOSSOM_START	2020-02-19 00:00:00	exemplars/АВ-Крымская Черешня/АВ-Крымская Черешня3ea7ec8e-f289-4c9f-8c13-12bca6c14a77.jpg	\N
139		18	GROW	2020-03-01 00:00:00	exemplars/АВ-Крымская Черешня/АВ-Крымская Черешня748c0d2d-fb5e-4235-97cb-bc902c86ec4e.jpg	\N
140		18	GROW	2020-03-03 00:00:00	exemplars/АВ-Крымская Черешня/АВ-Крымская Черешняb4817bac-866a-4891-8b41-747bd4a1832e.jpg	\N
141	Leaf separation exemplar description	19	APPEARANCE	2019-10-25 00:00:00	\N	\N
142	Цветок попорчен клещом	19	BLOSSOM_START	2020-02-27 00:00:00	exemplars/АВ-Крымская Черешня/АВ-Крымская Черешня634c47be-4f47-49f3-89b7-dc7fe2c69c20.jpg	\N
143		19	GROW	2020-03-01 00:00:00	exemplars/АВ-Крымская Черешня/АВ-Крымская Черешняff3db18e-4e20-4f3f-ab45-767735ed855e.jpg	\N
144	Лариса отдала стартер	20	APPEARANCE	\N	\N	\N
145		20	GROW	2019-10-14 00:00:00	exemplars/Mac's Voodoo Yoodoo/Mac's Voodoo Yoodooe9e83dd2-8369-493e-9bd7-66469ae631b4.jpg	\N
146		20	GROW	2019-10-25 00:00:00	exemplars/Mac's Voodoo Yoodoo/Mac's Voodoo Yoodoof6ad9257-e2b7-4af1-8a66-5b6bbbcd3eba.jpg	\N
147		20	GROW	2019-11-17 00:00:00	exemplars/Mac's Voodoo Yoodoo/Mac's Voodoo Yoodoo3505ec42-6cfb-4cd4-9d12-b33b28544ada.jpg	\N
149		21	GROW	2019-12-29 00:00:00	exemplars/Свадебный букет/Свадебный букет195093ff-a933-443f-8f13-e12b12ceafa4.jpg	\N
148		21	APPEARANCE	2019-11-12 00:00:00	exemplars/Свадебный букет/Свадебный букет maine1dc7f18-8d2c-4cac-89cb-bfb83ee2e468.jpg	\N
150		21	GROW	2020-01-01 00:00:00	exemplars/Свадебный букет/Свадебный букет8b93f8b8-ea4f-4f32-83c1-87f011acc350.JPG	\N
151		21	GROW	2020-01-12 00:00:00	exemplars/Свадебный букет/Свадебный букетa1478e92-f7b5-47e7-a2ab-fa87d2f10f9d.JPG	\N
152		21	GROW	2020-01-18 00:00:00	exemplars/Свадебный букет/Свадебный букет079187f4-7845-471d-bbed-a76e1e5d8ef0.JPG	\N
153		21	GROW	2020-01-19 00:00:00	exemplars/Свадебный букет/Свадебный букет1ce0ee98-1612-4fa2-82bb-b8cf20d49ddb.JPG	\N
154		21	GROW	2020-01-19 00:00:00	exemplars/Свадебный букет/Свадебный букетcafabd46-3bca-4681-9ae3-bfc9f89cffb9.JPG	\N
155		21	GROW	2020-01-19 00:00:00	exemplars/Свадебный букет/Свадебный букет0a65abec-91cf-4035-bd2b-9e419dccf6af.JPG	\N
156		21	BLOSSOM_END	2020-03-03 00:00:00	exemplars/Свадебный букет/Свадебный букет01f95f24-1bb0-450d-9393-3bcb5db3f69f.jpg	\N
157	Leaf separation exemplar description	22	APPEARANCE	2019-10-14 00:00:00	\N	\N
158		22	GROW	2019-10-25 00:00:00	exemplars/ЛЕ-Голубой Поток/ЛЕ-Голубой Поток38d6872e-13ff-4397-8412-683adcfd9a96.jpg	\N
160		22	GROW	2020-02-04 00:00:00	exemplars/ЛЕ-Голубой Поток/ЛЕ-Голубой Поток4209d23e-cf4b-46d8-9797-3c2aa7c08509.JPG	\N
159		22	BLOSSOM_START	2020-01-16 00:00:00	exemplars/ЛЕ-Голубой Поток/ЛЕ-Голубой Поток63fe1c96-a511-4faf-b49f-3960933b0fee.JPG	\N
161		22	GROW	2020-03-01 00:00:00	exemplars/ЛЕ-Голубой Поток/ЛЕ-Голубой Поток0d466afd-a123-4627-bc89-4252b8cb0727.jpg	\N
162		22	BLOSSOM_END	2020-03-03 00:00:00	exemplars/ЛЕ-Голубой Поток/ЛЕ-Голубой Потокf7560782-83d1-46f8-99ff-8891bc359edf.jpg	\N
\.


--
-- Name: exemplar_history_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.exemplar_history_id_seq', 162, true);


--
-- Data for Name: exemplars; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.exemplars (id, variety_id, parent, is_sport, name, parent_leaf) FROM stdin;
1	3	\N	f	Leaf separation exemplar	1
2	3	\N	f	Leaf separation exemplar	1
3	39	\N	f	Rob's Sarsaparilla main	\N
4	36	\N	f	Н-Снежный Георгин main	\N
5	12	\N	f	Leaf separation exemplar	4
6	12	\N	f	Leaf separation exemplar	4
7	8	\N	f	Alchemy Antique Bells main	\N
8	8	7	f	Steam separation exemplar	\N
9	13	\N	f	Biscayne trail main	\N
10	14	\N	f	Leaf separation exemplar	5
11	14	\N	f	Leaf separation exemplar	5
12	15	\N	f	Leaf separation exemplar	6
13	16	\N	f	Leaf separation exemplar	7
14	16	\N	t	Irish Flirt Ларисин	\N
15	16	\N	f	Leaf separation exemplar	7
16	37	\N	f	Н-Ожидание main	\N
17	18	\N	f	Kris main	\N
18	24	\N	f	Leaf separation exemplar	8
19	24	\N	f	Leaf separation exemplar	8
20	31	\N	f	Mac's Voodoo Yoodoo main	\N
21	11	\N	f	Свадебный букет main	\N
22	4	\N	f	Leaf separation exemplar	10
\.


--
-- Name: exemplars_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.exemplars_id_seq', 22, true);


--
-- Data for Name: hybridisators; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.hybridisators (id, name, description) FROM stdin;
1	Елена Лебецкая	Селекционер из Винницы, Украина.\nОфициальный сайт http://le-fialka.at.ua/
2	Надежда Бердникова	Селекционер из Москвы.\nИнформация о ней: http://www.fialki.ru/%D0%91%D0%B5%D1%80%D0%B4%D0%BD%D0%B8%D0%BA%D0%BE%D0%B2%D0%B0\nОфициальный каталог: http://www.domfialki.ru/forum3/viewtopic.php?f=114&t=1827
3	Фатина Бутене	Селекционер из Вильнюса. Журналист по профессии, выйдя на пенсию, весьма серьезно занялась селекцией сенполий и оставила много прекрасных сортов, часть которых сохранилась в коллекциях до сих пор. \nДостоинством ее сенполий были яркие сочные колеры, продолжительное обильное цветение, крепкие цветоносы. Иногда цветки свисают гроздьями с куста, что придает фиалке особый шарм. \nСенполии создавались сериями. \nВсего Ф. К. Бутене создала более 150 сортов сенполий. \nИнформация о ней (Бутене Фатина Кирьяновна):\nhttp://www.flowersweb.info/gesneriaceae/history/rainbow3.php
5	R. Holtkamp	Питомник промышленных сортов Optimara.\nИстория: http://www.fialki.ru/Optimara\nофициальный вебсайт: https://www.optimara.com/\nГруппа в facebook: https://www.facebook.com/optimara/
6	Olive Ma Robinson	О ней: http://www.fialki.ru/Olive_Robinson\nСелекционер из Тайвани.\nЕе (и мужа Ральфа Робинсона) интернет-магазин: http://www.violetbarn.com/\nСтраничка в facebook: https://www.facebook.com/africanviolets
7	Ralph Robinson	О нем: http://www.fialki.ru/Robinson\nСелекционер из США\nЕго (и жены Оливии Ма Робинсон) интернет-магазин: http://www.violetbarn.com/\nСтраничка в facebook: https://www.facebook.com/africanviolets\n
4	George McDonald	Джордж Макдональд, США (серия Mac's). Он автор миниатюр и полуминиатюр. Большинство его сортов по размерам ближе скорее к стандартам, чем к мини. Как правило, это типичные полумини с крупной (и очень красивой) розеткой, крупными ровными листьями, большими цветами, цветущие суперобильными шапками. Недавно Джордж занялся и гел-листвой и листвой типа “клакамус”.\nГруппа в facebook: https://www.facebook.com/groups/215503188876926/\nО нем: http://www.fialki.ru/McDonald
8	Hortense Pittman	Гортензия Питтман (Hortense Pittman) - выдающийся селекционер сенполий из Техаса. Большинство сортов ее селекции - мини и полумини.\nГортензия Питтман родилась в Техасе. Её увлечение сенполиями началось в 60-х годах с подаренной на день рождения фиалки. \nКроме коллекционирования сенполий Гортензия принимала активное участие в работе Общества любителей сенполий в Аламо и в 70-х стала президентом этого общества. \nВ это же время супруги Питтман создали фирму Hortense's African Violet по выращиванию и продаже сенполий, а с 1978 года они ежегодно принимали участие в выставках AVSA. \nК селекции Гортензию приобщил друг их семьи - известный в то время селекционер Гарольд Утц, и в 1979 году Гортензия зарегистрировала свой первый сорт. \nВ 1993 году Гортензия Питтман была избрана 27-м президентом African Violet Society of America, а в 1995 году стала почетным пожизненным членом AVSA. \nЗа долгие годы своей ра­боты Гортензия Питтман создала множество прекрасных сортов, которые она в разное время выпускала под различными серийными названиями - Hortense's, Happy, Jolly, Teen.\nКак признание заслуг Горензии Питтман, её имя внесено в Галерею Славы AVSA. \nО ней: http://www.fialki.ru/Pittman
9	David Rollins	Канадский селекционер, работают вместе с женой Нэнси.\nСерия Kentucky\n\n
10	David Senk	О нем: http://www.kwetki.ru/spisok/David_Senk.html  http://www.fialki.ru/Senk\nНемного его фиалок: https://saintpauliaancestry.wordpress.com/2014/11/18/david-senk-in-photos/\nCорта селекции Девида Сенка (серия Senk’s, Alchemy). Известный своими фиалками-осами, а также цветками в виде колокольчиков и фиалочками с экзотической формой листьев, турнюрная листва, удлиненной формы лонгифолия. Это очень неординарный селекционер с фантазией и чувством юмора — его фиалки имеют поистине экзотический вид! Его сенполии сразу выделяются на фоне других своей оригинальностью, это и цветы в форме колокольчиков, и цветы-осы, и турнюрная листва, и удлиненная, в общем, на любой вкус. У этого селекционера всего три сорта пишутся без приставки Senk`s: Alchemy Antique Bells (D. Senk); Alchemy Gold (D. Senk); Alchemy Yellow Star (D. Senk).\n
11	Константин Морев	г. Москва\nО нем кратко: https://www.fialkovod.ru/selection/russian/morev/\nСорта: http://domfialki.ru/forum3/viewforum.php?f=58\nИнтервью с ним: http://dimetris.com.ua/site/all/selekcioner_konstantin_morev
12	Alan Murphy	\N
13	Williams S.	\N
14	Holland industry	Промышленные голандские сорта
15	Sydney Sorano	Веб-сайт питомника: http://lyndonlyon.com
16	D.Ferguson	\N
17	Скорнякова Наталья	г. Курск\nофициальный сайт: https://fialkikursk.ru/katalogi/fialki-n-skornyakovoj
18	Тарасов Алексей	Тарасов Алексей Всеволодович (АВ-Фиалковод)\nВебсайт: https://www.fialkovod.ru/fialki/index.php
19	Donald Ness	Умер в сентябре 2002г
20	J.Stokes	\N
\.


--
-- Name: hybridisators_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.hybridisators_id_seq', 20, true);


--
-- Data for Name: leaf_history; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.leaf_history (id, leaf_id, description, event_type, event_date, photo) FROM stdin;
1	1	Получила в результате обмена лист	APPEARANCE	\N	\N
2	1	Второй лист погиб, этот был слабый	FIRST_LEAF	2019-07-13 00:00:00	leaves/Н-Радость/Н-Радостьd63634e2-3fd7-4f80-99cd-22e791f1188a.jpg
3	1	Пестролистным был изначально	GROW	2019-08-08 00:00:00	leaves/Н-Радость/Н-Радость9530ad5a-480c-415a-a45a-fd6a1bbd4962.jpg
4	1	Сначала отсадила одну детку	SEPARATE_FROM_LEAF	\N	\N
5	1	Затем вторую	SEPARATE_FROM_LEAF	\N	\N
6	1	Лист погиб	DISAPPEARANCE	\N	\N
7	2	Дали 2 листа, это один из них.	APPEARANCE	\N	\N
8	2	Несколько деток за жизнь он дал	GROW	2019-10-14 00:00:00	leaves/Н-Яшма/Н-Яшмаfa1f9adb-9369-4d90-9487-d9a24476382b.jpg
9	3	Второй из обменянных листов, дал тоже несколько деток	APPEARANCE	\N	\N
10	4	Было 4 листа, с которых вышло 4 куста по несколько голов.	APPEARANCE	\N	\N
11	4	\N	SEPARATE_FROM_LEAF	\N	\N
12	4	\N	SEPARATE_FROM_LEAF	\N	\N
13	5	Дали 2 листа, выросло 2 куста с них по нескольку голов.	APPEARANCE	\N	\N
14	5	\N	SEPARATE_FROM_LEAF	\N	\N
15	5	\N	SEPARATE_FROM_LEAF	\N	\N
17	6	\N	SEPARATE_FROM_LEAF	\N	\N
16	6	Получила от Ирины 2 листика, выросло 2 куста, один из которых в последствие отдала.	APPEARANCE	2019-06-21 00:00:00	leaves/Flashy trail/nulladb0c222-bcd2-463a-b355-a1c09352ec71.jpg
19	7	\N	GROW	2019-09-20 00:00:00	leaves/Irish Flirt/Irish Flirt2aac6c37-c06a-4803-aeb8-52e422f79e3e.jpg
18	7	Ирина дала 2 листа, прижился один	APPEARANCE	2019-06-12 00:00:00	leaves/Irish Flirt/nulla13eedee-9ef5-46ec-b865-d2afe29b2572.jpg
20	7	\N	SEPARATE_FROM_LEAF	2019-10-25 00:00:00	leaves/Irish Flirt/Irish Flirtbede84fa-520c-4f8d-aa5f-60eccaa4c47e.jpg
21	7	\N	SEPARATE_FROM_LEAF	\N	\N
22	8	Ирина дала лист	APPEARANCE	\N	\N
23	8	\N	GROW	2019-10-08 00:00:00	leaves/АВ-Крымская Черешня/АВ-Крымская Черешняda465b58-fc93-4636-89ee-3492fd166c26.jpg
24	8	Рассадила 4 детки	SEPARATE_FROM_LEAF	2019-10-25 00:00:00	leaves/АВ-Крымская Черешня/АВ-Крымская Черешня510d8fbb-8520-4b54-b285-57e7823a4405.jpg
25	8	\N	SEPARATE_FROM_LEAF	2019-10-25 00:00:00	\N
26	9	Лариса дала лист	APPEARANCE	\N	\N
27	9	\N	GROW	2019-10-12 00:00:00	leaves/Mac's Scorching Sun/Mac's Scorching Sun71d62d7d-5cb1-40f8-9719-62363b028282.jpg
28	9	До этого момента было рассажено 3 детки	GROW	2020-03-01 00:00:00	leaves/Mac's Scorching Sun/Mac's Scorching Sun85ea143f-765a-4cf7-9844-16f7ca2d0e52.jpg
29	10	Лариса давала лист	APPEARANCE	\N	\N
30	10	\N	GROW	2019-10-12 00:00:00	leaves/ЛЕ-Голубой Поток/ЛЕ-Голубой Поток20dcc44e-c4d0-4aa9-a7c0-ea1ab73b8fea.jpg
31	10	\N	SEPARATE_FROM_LEAF	2019-10-14 00:00:00	leaves/ЛЕ-Голубой Поток/ЛЕ-Голубой Потокf3ca8ed2-9602-4b5c-b1d3-5798d101fa61.jpg
\.


--
-- Name: leaf_history_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.leaf_history_id_seq', 31, true);


--
-- Data for Name: leaves; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.leaves (id, parent, variety_id) FROM stdin;
1	\N	3
2	\N	35
3	\N	35
4	\N	12
5	\N	14
6	\N	15
7	\N	16
8	\N	24
9	\N	29
10	\N	4
\.


--
-- Name: leaves_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.leaves_id_seq', 10, true);


--
-- Data for Name: varieties; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.varieties (id, name, author, description, variety_type, hybridisation_date, sport_of) FROM stdin;
1	ЛЕ-Иллюзия	1	Белая с яркими пурпурно-темно-фиолетовыми мазками полумахровая анютка. Пестролистник.	MINIATURE	2019-12-18 00:00:00	\N
2	ЛЕ-Голубой Лютик	1	 Плотные махровые цветы-кочанчики нежно голубово цвета с зелеными краями лепестков. Ровная розетка из темных слегка удлиненных листьев. Полумини.	SEMIMINI	2019-12-18 00:00:00	\N
3	Н-Радость	2	Крупные полумахровые кремовые цветы с зеленоватыми внешними лепестками, переходящими в широкую тающую кайму, и украшенные мелким крапом темно-вишневого фэнтези. Темно-зеленая стеганая листва с бело-розовой окаймляющей пестролистностью. Полуминиатюра.	SEMIMINI	\N	\N
4	ЛЕ-Голубой Поток	1	Крупные махровые чашевидные голубые с зеленой изнанкой цветы. Очень обильное бесконечное цветение. Полумини трейлер. 	SEMIMINI	\N	\N
5	ЛЕ-Кудрявый хмель	1	Обильные махровые чашевидные голубые с зеленой изнанкой-цветы с подвернутыми внутрь лепестками. Очень обильное  бесконечное цветение. Полумини трейлер.	SEMIMINI	\N	\N
6	Lituanika	3	Сильно пасынкующийся длинночерешковый мелколистный стандарт с рыхлой кроной и высоким по сорту стволом, увешанный невероятно прекрасными двухтоновыми цветами уникальной формы на тонких длинных цветоносах. Выращивать предпочтительнее в виде трейлера.	COMPACT_STANDART	\N	\N
7	Ma's Melody Girl	6	Something really different for the collector.  Sdbl. coral stars with raspberry fantasy and banding, then thinly edged white.  Great, well-behaved girl foliage.  Standard.  AVSA #9132	COMPACT_STANDART	\N	\N
8	Alchemy Antique Bells	10	Single light yellow ruffled bell. Medium green, plain, heart-shaped. Miniature.\nПростые светло-желтые колокольчики с оборчатым краем. Ровная ярко-зеленая сердцевидная листва. Миниатюра. 	MINIATURE	2004-09-24 00:00:00	\N
10	Kentucky Gooseberries	9	DAVS 1602\nDouble white star/light pink blush. Medium green, serrated. Semiminiature. \nМахровые белые звездочки с нежно-розовым подсветом и иногда – зеленоватыми внешними лепестками. Красивая светло-зеленая стеганая листва с волнистым зубчатым краем. Аккуратная симметричная розетка. \nПолуминиатюра.\nЕго спорт Kentucky Berry Bush спортит обратно в него.	SEMIMINI	\N	9
9	Kentucky Berry Bush	9	DAVS 1599\nDouble medium pink star/green edge. Dark green, serrated/red back. Semiminiature.\nМахровые ярко-розовые цветы с зеленоватой каймой. Стеганая темно-зеленая зубчатая листва с красной изнанкой. Полуминиатюра.\n	SEMIMINI	\N	10
11	Свадебный букет	11	Сорт Свадебный букет – фиалка с очень крупными, от 5 до 6,5 сантиметров в диаметре, цветами белоснежной окраски. По форме цветы представляют собой белоснежные звёзды с гофрированным краем лепестков. С обратной стороны лепестки фиалки покрыты серебристо-пепельным цветом, отчего букет кажется слегка подёрнутым голубоватой дымкой.Описание сорта отличается в начале и середине цветения. В начале цветения по краю лепестков проявляется тонкая зелёная кайма. Зелень также может проявляться, если фиалка выращивается в прохладном помещении. По мере повышения температуры и роспуска цветка зелень на лепестках пропадает.Цветение фиалки букетное, волнообразное с  интервалом от 1 до 3 месяцев. Каждый цветок находится в роспуске 2-3 недели. В розетке  до 5-ти цветоносов, с четырьмя-пятью бутонами на каждом. В полном роспуске букет цветов приобретает форму гофрированного шара.Розетка сорта симметричная, небольшого размера. Листья ровные, гладкие, среднего размера. Поверхность листьев средне-зелёная, стёганая.	COMPACT_STANDART	\N	\N
12	Alan’s Fallen Angel	12	Semidouble white. Variegated. Miniature trailer. \nПолумахровые белые анютки; контрастная бело-зеленая листва. Миниатюрный трейлер.	MINIATURE	\N	\N
13	Biscayne trail	13	Полуминиатюрный трейлер. Крупные лавандово-голубые простые и полумахровые цветы с чуть удлиненными лепестками и слегка затемненной серединкой цветка. Восхитительная ярко-зеленая гел-листва с крупнозубчатым краем и золотистой кроновой пестролистностью\n\nПростые и полумахровые лавандово голубые цветы. Гел-листва с кроновой пестролистностью.\n\nЛавандово-синие простые и полумахровые цветы; средне-зеленая гел-листва с пестролистностью типа Чемпион. Полумини трейлер	SEMIMINI	\N	\N
14	Chanta Lana	14	Гроздья ярко-розовых полумахровых цветов, средне-зеленый чуть вытянутый заостренный лист. Промышленный сорт. Легко, рано и очень обильно цветёт. Полуминитрейлер. \n\nОчень долгое и обильное цветение. 	SEMIMINI	\N	\N
15	Flashy trail	8	Single lavender small bell/purple fantasy. Dark green. Miniature trailer. \nПростые лавандовые колокольчики с пурпурным фэнтези. Темно-зеленая листва. Миниатюрный трейлер. 	MINIATURE	\N	\N
16	Irish Flirt	15	A powerhouse of small, bright green, double flowers accented with varying amounts of white in the centers, have deeply fringed edges and blanket ruffled, semiminiature, medium green foliage. We are extremely proud of this prolific little gem!\n2nd Best New Cultivar, 1990 AVSA convention in Boston\nBest New Cultivar, 1990 NYS convention\nAlso in the 1992 & 1993 AVSA "Best Varieties List"\nAVSA Reg. #7577\n(LLG)\n\nМахровые светло-зелёные и белые гофрированные звёзды. Средне-зелёная волнистая листва. Полумини.\n	SEMIMINI	1991-11-07 00:00:00	\N
17	Sassy Sister	15	Mounds of deep pink, double flowers, have deeply fringed edges of tannish-green, and blanket semiminiature, dark green, ruffled, foliage. This adorable cultivar is a sport of our "Irish Flirt", having all the same wonderful characteristics. We know you will enjoy growing it as much as you do the variety it sported from.\nAVSA Reg. #8553\n(LLG)	SEMIMINI	\N	16
18	Kris	16	(8620) Semidouble-double pink star/purple fantasy edge. Dark green, plain/red back. Large	LARGE_STANDART	1997-06-16 00:00:00	\N
19	РМ-Амалия	17	РМ-Амалия – очень крупные простые волнистые белые звезды с яркими вишневыми напечатками. Цветение наиболее контрастное и эффектное при более высоких температурах выращивания. Ровная розетка, зеленые листья.Новинка 2015-2016гг	LARGE_STANDART	\N	\N
20	РМ-Визави	17	Очень крупные волнистые звезды плотной бархатной фактуры темного сливово-бардового цвета с белой каймой. Обильное цветение, продолжительное, темно-зеленые глянцевые листья. Розетка достаточно крупная. Сорт требователен к более интенсивному освещению.\nНовинка 2015-2016гг	LARGE_STANDART	\N	\N
21	Optimara Millennia	5	Series:Optimara\n\nPot Size:4-inch medium standard\n\nBloom Type:Single, Pansy\n\nBloom Color:Bi-color Red and White\n\nLeaf Type:Medium Ovate, heart shaped\n\nLeaf Color:Medium Green\n\nYear Introduced:1999\n\nYear Revised:2003\n\nVariety Number:761\n\nTrademark:Optimara\n\nHybridized By:Reinhold Holtkamp Sr.	COMPACT_STANDART	\N	\N
22	Optimara Arkansas	5	Series:U.S. States\n\nPot Size:4 Inch\n\nBloom Type:Single\n\nBloom Color:Red two-tone\n\nLeaf Type:Plain\n\nLeaf Color:Medium green, red reverse leaf\n\nYear Introduced:1987\n\nYear Revised:1996\n\nAVSA Registration Number:6545\n\nPatent Number:5725\n\nVariety Number:68\n\nTrademark:Optimara\n\nHybridized By:Reinhold Holtkamp Sr.	COMPACT_STANDART	\N	\N
23	Optimara Little Crystal	5	Bloom Type:Single\n\nBloom Color:White\n\nLeaf Type:Plain\n\nLeaf Color:Medium Green\n\nYear Introduced:1990\n\nAVSA Registration Number:7350\n\nPatent Number:7133\n\nVariety Number:483\n\nTrademark:Optimara\n\nHybridized By:Reinhold Holtkamp Sr.	SEMIMINI	\N	\N
24	АВ-Крымская Черешня	18	Селекционер: Фиалковод\nГод выпуска: 2014\nЦветок: Очень крупные махровые темно-бордовые звезды с волнистыми краями.\nРозетка: Оливково-зеленая листва с красной изнанкой.\nРазмер: Стандарт\n\nhttps://www.fialkovod.ru/fialki/85279/\n	LARGE_STANDART	\N	\N
25	ЛЕ-Береника	1	Белые с легкой розовинкой полумахровые цветы со слегка удлиненными лепестками. обильное шапочное цветение над аккуратной ровной выставочной розеточкой. светлая листва.\n\n	MINIATURE	\N	\N
26	Mac's Carnival Clown	4	#9470\nSingle-semidouble coral pink pansy/purple fantasy, white edge. Medium green, plain, quilted, heart-shaped, serrated. Semiminiature. \nПростые и полумахровые кораллово-розовые анютки с пурпурным фэнтези и белой каймой. Простая средне-зеленая простая стеганая зубчатая сердцевидная листва. Полуминиатюра.\n\n	SEMIMINI	2005-09-29 00:00:00	\N
27	Mac's Misty Meadow	4	(10153) Single white sticktite pansy/variable purple tinge; green edge. Medium green, plain. Semiminiature\nПростые белые неопадающие анютки с вариабельными фиолетовыми тенями и зелёной каймой. Светло-зелёная листва. Полумини.	SEMIMINI	2009-11-06 00:00:00	\N
28	Mac’s Momentary Meltdown	4	#9879\nSingle white and variable blue sticktite pansy/variable green tips. Medium green, plain, ovate, pointed, hairy. Miniature. \nПростые белые чашевидные цветы с сиреневато-голубыми мазками и нерегулярной салатовой каймой; средне-зеленая овальная опушенная листва. Сорт быстро растет, рано зацветает, легок в уходе, и розетка действительно небольшая. Миниатюра. 	MINIATURE	2008-01-31 00:00:00	\N
29	Mac's Scorching Sun	4	#10510\nSemidouble coral-red pansy/white edge. Crown variegated medium green and yellow, pointed, serrated. Semiminiature. \nПолумахровые красно-коралловые анютки с белым краем. Желтая кроновая пестролистность на фоне ярко-зеленой зубчатой и заостренной листвы. Полуминиатюра.	SEMIMINI	2012-02-02 00:00:00	\N
30	Mac's Sentimental Scarlet	4	#10512\nSemidouble coral-red pansy. Medium green, pointed, serrated. Semiminiature. \nПолумахровые яркие красно-коралловые анютины глазки. Ровная средне-зеленая листва с заостренным кончиком. Полуминиатюра.	SEMIMINI	2012-02-02 00:00:00	\N
31	Mac's Voodoo Yoodoo	4	#10155\nSingle-semidouble dark coral-red pansy. Medium green, ovate, quilted, hairy. Semiminiature\nПростые-полумахровые крупные кораллово-красные цветы. Средне-зеленая овальная стеганая листва. Полуминиатюра.\n\n	SEMIMINI	2009-11-06 00:00:00	\N
32	Mac's Something Special	4	Простые или полумахровые крупные темно-красные цветы. Яркая средне-зеленая листва с белой каймой; полуминиатюрная розетка.	SEMIMINI	\N	\N
33	Mac's Southern Springtime	4	#9482\nSingle-semidouble red and white pansy. Medium green, ovate/red back. Semiminiature. \nКрупный полумахровый волнистый белый цветок с хаотичными красными мазками на каждом лепестке; средне-зеленая листва. Полуминиатюра.\n\n	SEMIMINI	2005-09-29 00:00:00	\N
34	Н-Аватар	2	Простые темно-голубые колокольчики на высоких крепких цветоносах (колокольчики не раскрываются).\nУдлиненные средне-зеленые листья с золотистой кроновой пестролистностью.\nМини.	MINIATURE	\N	\N
35	Н-Яшма	2	(2015)\n\nБледно-розовые с зеленой пропиткой и широкой светло-бордовой каймой, крапинками фэнтази и гофрированным краем лепестков цветы с дополнительными лепестками из центра. \nАккуратная розетка среднезеленых листьев с окаймляющей пестролистностью. \nМини.	MINIATURE	\N	\N
36	Н-Снежный Георгин	3	Букет махровых белых цветов с зеленой, переходящей на внешний край лепестков, изнанкой. Расположенные отдельно лепестки придают цветку сходство с георгином. Обильное длительное цветение.\nСредне-зеленая зубчатая листва. \nМини.	MINIATURE	\N	\N
37	Н-Ожидание	2		MINIATURE	\N	\N
38	Rob's Cool Fruit	7	#8608\nDouble white pansy/rose-pink edge. Crown variegated medium green, white and yellow, pointed, serrated. Semiminiature. \nМахровые белые цветочки с размытой розовой каймой и таким же глазком. Оборот внешних лепестков зеленоватый. Красивая маленькая розетка с лимонно-золотой кроновой пестролистностью; маленькая заостренная листва. Маленькая розетка, но сорт зарегистрирован как полумини.	SEMIMINI	1997-05-31 00:00:00	\N
39	Rob's Sarsaparilla	7	(8462) \nSemidouble copper-pink sticktite pansy/red-brown frilled edge, some green. Dark green, glossy, wavy, serrated. Semiminiature.\nБахромчатые полумахровые медно-розовые анютки с темной красно-коричневой, местами зеленоватой каймой. Оливково-зеленая глянцевая волнистая листва со слегка зубчатыми краями. Полуминиатюра.	SEMIMINI	1996-05-23 00:00:00	\N
40	Petite Blarney	8	#10561\nDouble pink/green edge. Dark green, girl foliage. Miniature. \nМахровые розовые цветы с зелёной каймой. Тёмно-зелёная гёл-листва. Миниатюра. 	MINIATURE	2012-08-06 00:00:00	\N
41	Ness’ Crinkle Blue	19	#8136\nDouble dark blue star/thin white edge. Dark green, quilted, serrated/red back. Semiminiature. \nГустомахровые темно-синие звезды с тонкой белой каймой; темно-зеленый стеганый зубчатый лист с заостренным кончиком. Полуминиатюра. \nСкрещивались сорта: Sugar Bear Blues и Little Jeromey	SEMIMINI	1995-01-19 00:00:00	\N
42	Ness’ Orange Pekoe	19	Большие полумахровые и махровые анютки кораллового цвета. Тёмно-зелёная с кремовым и розовым листва с красной изнанкой. Крупный стандарт.	LARGE_STANDART	\N	\N
43	Painted Silk	20	Dark blue single/semidouble. Lightly variegated girl foliage. Semiminiature \nПростые или полумахровые темно-синие немного чашевидные цветы. Золотистая кроновая пестролистность на маленькой округлой гёл-листве. Полуминиатюра. 	SEMIMINI	\N	\N
\.


--
-- Name: varieties_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.varieties_id_seq', 43, true);


--
-- Data for Name: variety_details; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.variety_details (id, photo, description, variety_id, detail_order) FROM stdin;
4	varieties/ЛЕ-Голубой Поток/ЛЕ-Голубой Поток5f3ed29b-9f74-4d54-b29a-a2589d925a48.jpg	Фото селекционера	4	1
5	varieties/ЛЕ-Кудрявый хмель/ЛЕ-Кудрявый хмельc1868504-d9ea-421a-aa3d-829e3e76d66a.jpg	Фото селекционера	5	1
6	varieties/ЛЕ-Голубой Лютик/ЛЕ-Голубой Лютик0f929ff1-6bb4-4648-899e-1c421a40ebc4.jpg	Фото селекционера	2	1
2	varieties/ЛЕ-Голубой Лютик/ЛЕ-Голубой Лютикa179d0f6-34ff-458f-ad09-f37e321cdb60.jpg		2	2
1	varieties/ЛЕ-Иллюзия/ЛЕ-Иллюзия73675842-bd34-4a97-955d-09b005a69d93.jpg	Фото селекционера	1	1
49	varieties/Kris/Krisced95bf4-eac6-4839-bf0d-c166a4193ff6.jpg	\N	18	1
48	varieties/Sassy Sister/Sassy Sister2a275340-8cd8-4817-902c-bf221d426ac9.jpg	\N	17	2
41	varieties/Sassy Sister/Sassy Sistercaff9a03-d03e-4219-b55a-28748e23f4a2.jpg	Фото селекционера	17	4
40	varieties/Sassy Sister/Sassy Sister82327e01-661f-4223-8458-2b52b6485fbc.jpg		17	3
42	varieties/Sassy Sister/Sassy Sister004a8a72-2d8b-47b8-ad80-d7c37f1d0b5e.jpg		17	5
43	varieties/Sassy Sister/Sassy Sister3a702a9e-7b20-4246-bfef-115afd22cbe9.jpg		17	6
44	varieties/Sassy Sister/Sassy Sister10cc7ed4-b6c3-4023-b146-1ba020b21ae9.jpg		17	7
7	varieties/Н-Радость/Н-Радость4facbf98-f5bb-4bea-b30f-cf7433b8cb58.jpg	Фото селекционера	3	2
8	varieties/Н-Радость/Н-Радость560aae2d-edc0-4496-be1b-6d59286b33ee.JPG	Фото селекционера	3	1
3	varieties/Н-Радость/Н-Радость295ddf9d-db79-4cdb-8a5b-1cccb5ad5a43.jpg	\N	3	3
9	varieties/Lituanika/Lituanika3d7e1ec6-b37e-475c-acc0-15b28a269e69.jpg	\N	6	1
10	varieties/Lituanika/Lituanika42c16bdd-6365-43f8-aa6b-003e9be0a12c.jpg		6	2
11	varieties/Lituanika/Lituanika5ae951b9-a97d-4599-8774-2f783e7eb227.jpg		6	3
12	varieties/Lituanika/Lituanika7690bf4d-708d-4723-ba52-eb2aa9831d00.jpg		6	4
13	varieties/Ma's Melody Girl/Ma's Melody Girlb8ac8279-0ee6-4675-ac12-964c2a850d54.jpg	Фото селекционера	7	1
14	varieties/Alchemy Antique Bells/Alchemy Antique Bells489cc38b-bec1-45c5-a4c7-ac19a735b2b1.jpg	\N	8	1
15	varieties/Kentucky Berry Bush/Kentucky Berry Bush5724bbe0-4332-4f4b-8581-f97489c187d8.jpg	\N	9	1
16	varieties/Kentucky Berry Bush/Kentucky Berry Bushbd3b79f6-6539-496d-aca4-3d398b8294e3.jpg		9	2
17	varieties/Kentucky Berry Bush/Kentucky Berry Busha647a7f3-de58-40b7-b49e-b97527daab15.jpg		9	3
18	varieties/Kentucky Berry Bush/Kentucky Berry Bush5083780f-7c22-41a7-bc3d-ac703297528c.jpg		9	4
19	varieties/Kentucky Gooseberries/Kentucky Gooseberries378446f4-7a55-41ef-8d9e-2ab2a1b18aee.jpeg	\N	10	1
20	varieties/Kentucky Gooseberries/Kentucky Gooseberries7ed10c5e-7280-4bea-a644-04e20083bee6.jpg		10	2
21	varieties/Kentucky Gooseberries/Kentucky Gooseberriesf44824f9-3f61-407a-b83f-4d80e1657345.jpg		10	3
22	varieties/Kentucky Gooseberries/Kentucky Gooseberriesa0dbbce4-0808-4b98-bdad-5af1869ae36f.jpg		10	4
23	varieties/Свадебный букет/Свадебный букет7a62734a-f8c8-4d8d-a647-703a18f7d699.jpg	\N	11	1
24	varieties/Свадебный букет/Свадебный букетc1b43eac-d796-4638-ac1e-9f9c2adab890.jpg		11	2
25	varieties/Alan’s Fallen Angel/Alan’s Fallen Angelb158f7c0-0256-474a-a007-cba37901834a.jpg	\N	12	1
26	varieties/Alan’s Fallen Angel/Alan’s Fallen Angel2a830e08-c0f0-4a5f-97d3-ad842b2d6c3f.jpg		12	2
27	varieties/Alan’s Fallen Angel/Alan’s Fallen Angel2df69892-ca3e-416b-95cd-06cbbdeea27a.jpg		12	3
28	varieties/Biscayne trail/Biscayne traile66544b0-5df9-4cc5-b12e-cdc48c5575f2.jpg	\N	13	1
29	varieties/Biscayne trail/Biscayne traila9a3a36a-a172-47d4-b743-e0eb29a4d348.jpg		13	2
30	varieties/Biscayne trail/Biscayne trail2c3148ca-e243-41a6-99df-306eea441ba5.jpg		13	3
31	varieties/Biscayne trail/Biscayne trailab026119-5963-433d-aadc-fab3b39f5047.jpg		13	4
32	varieties/Chanta Lana/Chanta Lana02e1f88a-a34b-4b01-af0b-97be97317284.jpg	\N	14	1
33	varieties/Chanta Lana/Chanta Lana59d575c6-7c1d-43f2-ba62-e3e3617c71c6.jpg		14	2
34	varieties/Flashy trail/Flashy trail4d66f6c7-e9ee-417d-8df9-10ba864f26bc.jpg	\N	15	1
35	varieties/Flashy trail/Flashy trail92ec35b9-4f40-417b-ae4f-4b07aeb5aaf2.jpeg		15	2
36	varieties/Irish Flirt/Irish Flirt0b9cfaad-fe13-4c12-9cff-d3814e05e80e.jpg		16	1
37	varieties/Irish Flirt/Irish Flirt0ee5d019-5561-4db9-ba94-f90fa4aa6f36.jpg	Фото селекционера	16	2
38	varieties/Irish Flirt/Irish Flirtb16850b9-1a2c-402c-8931-7fdb5f7fbcc3.jpg		16	4
45	varieties/Sassy Sister/Sassy Sister6d5aca25-62e9-4d21-b7c0-c30db1822d32.jpg		17	8
46	varieties/Sassy Sister/Sassy Sistere06d3adb-366b-4fb8-a1eb-3a198aef145e.jpg		17	9
47	varieties/Sassy Sister/Sassy Sister5a57c8cc-479f-4285-a87f-5252ed18598e.jpg		17	10
50	varieties/Kris/Kris5281e131-c31e-49b1-8a53-34cefa7558b5.jpg		18	2
51	varieties/Kris/Krisd589ecae-e4e1-44d2-8945-2eb407e32d60.jpg		18	3
52	varieties/РМ-Амалия/РМ-Амалия31ab306e-72ca-4b1e-8ab8-e1d9b8425be8.jpg	Фото селекционера	19	1
53	varieties/РМ-Амалия/РМ-Амалия539be348-7f28-4a91-9259-3edc6bb4afed.jpg		19	2
54	varieties/РМ-Амалия/РМ-Амалия3e3ac49c-e611-40f8-8381-7d5173bb4141.jpg		19	3
55	varieties/РМ-Амалия/РМ-Амалия804c02d7-f9c9-449a-9e48-727494b1dee0.jpg		19	4
56	varieties/РМ-Визави/РМ-Визави559050ba-a9da-4e77-8644-4db44103d4a4.jpg	Фото селекционера	20	1
58	varieties/РМ-Визави/РМ-Визави44394627-31ac-4031-b4eb-ae58e45aed04.jpg		20	3
59	varieties/РМ-Визави/РМ-Визави7417b832-314d-4188-a3f2-2a286c89467a.jpg		20	4
60	varieties/РМ-Визави/РМ-Визави1deddce5-487a-455c-a8d9-6a7f6a9ea923.jpg		20	5
61	varieties/Optimara Millennia/Optimara Millennia8b2dd3cd-1849-4a17-9885-6f384d078a2a.jpg	Фото питомника	21	1
62	varieties/Optimara Millennia/Optimara Millenniaad8136ad-181d-4fa9-8f74-ff7c2e483e2b.jpg	\N	21	2
63	varieties/Optimara Millennia/Optimara Millennia6c64aa7a-a6bf-466e-8abf-ab0081de6c4b.jpg		21	3
64	varieties/Optimara Arkansas/Optimara Arkansas1d724149-fa92-4a1e-be28-aeb8974a2b59.jpg	Фото питомника	22	1
65	varieties/Optimara Arkansas/Optimara Arkansascf848af2-d8a9-44ab-ae90-a209082e19a8.jpg		22	2
66	varieties/Optimara Little Crystal/Optimara Little Crystal61af69cd-7ff6-4c28-8cb3-029c94147214.jpg	Фото питомника	23	1
67	varieties/Optimara Little Crystal/Optimara Little Crystaldde5791a-ba3c-4d3b-8c09-d074d2e933d1.jpg		23	2
68	varieties/Optimara Little Crystal/Optimara Little Crystal28158709-ad5c-4d77-a1ff-596460e49136.jpeg		23	3
69	varieties/АВ-Крымская Черешня/АВ-Крымская Черешня91c39b55-a712-455b-9e21-f8ee066c7ecd.jpg	Фото селекционера	24	1
70	varieties/ЛЕ-Береника/ЛЕ-Береникаb6ddb92c-886e-421a-b926-96dba5a46733.jpg	\N	25	1
71	varieties/Mac's Carnival Clown/Mac's Carnival Clown1cf4ba0f-c873-46ee-8a45-d8a18d57a7e7.jpg	\N	26	1
72	varieties/Mac's Carnival Clown/Mac's Carnival Clown37cc6f7e-3121-4329-9576-2d375611b457.jpg		26	2
73	varieties/Mac's Carnival Clown/Mac's Carnival Clown320775c9-1a4b-445c-b2c0-591268234923.jpg		26	3
74	varieties/Mac's Carnival Clown/Mac's Carnival Clowna56afb3e-5327-44be-9b3d-6c8a9acd23e2.jpg	\N	26	4
75	varieties/Mac's Carnival Clown/Mac's Carnival Clown1e103891-6ba1-4f8f-ba52-468caf57d12a.jpg		26	5
76	varieties/Mac's Misty Meadow/Mac's Misty Meadowd7b30034-262d-490f-83e7-ff4a065bbac8.jpg	\N	27	1
77	varieties/Mac's Misty Meadow/Mac's Misty Meadowb0052c07-5a35-47de-8799-ca3fe157653c.jpeg		27	2
78	varieties/Mac's Misty Meadow/Mac's Misty Meadowbc3112bf-87a1-4422-bd60-a4ec427e10c8.jpg		27	3
79	varieties/Mac’s Momentary Meltdown/Mac’s Momentary Meltdown54794009-24da-41c5-a39e-c1fb46164f2d.jpg	\N	28	1
80	varieties/Mac’s Momentary Meltdown/Mac’s Momentary Meltdownf9670454-5236-4e50-b304-b2ee51ae94fb.jpg		28	2
81	varieties/Mac’s Momentary Meltdown/Mac’s Momentary Meltdown5fb68ea0-4f59-43a7-b957-7aa2e2ae847d.jpg		28	3
82	varieties/Mac's Scorching Sun/Mac's Scorching Sund39dbe18-a43e-4210-a38f-2b7f139e98b8.jpg	\N	29	1
83	varieties/Mac's Scorching Sun/Mac's Scorching Sun1d24877c-72e9-40eb-b589-b1f119f22920.jpg		29	2
84	varieties/Mac's Scorching Sun/Mac's Scorching Sun40641350-4380-42fd-9fca-faf13ac2ed45.jpg		29	3
85	varieties/Mac's Scorching Sun/Mac's Scorching Sun051e1226-fe9b-40be-a5c8-69c5ebe46499.jpg		29	4
86	varieties/Mac's Scorching Sun/Mac's Scorching Sun87c8d090-4294-4fca-92d9-e60e6912de11.jpg		29	5
87	varieties/Mac's Sentimental Scarlet/Mac's Sentimental Scarlet54a6f2af-43bc-4f76-8acf-77688d98178c.jpg		30	1
88	varieties/Mac's Sentimental Scarlet/Mac's Sentimental Scarlet7921c9a1-7aeb-47b1-8057-00508d80c451.jpg	\N	30	2
89	varieties/Mac's Sentimental Scarlet/Mac's Sentimental Scarlet33be8c20-3bea-46ae-9801-41d723059121.jpg		30	4
90	varieties/Mac's Sentimental Scarlet/Mac's Sentimental Scarlet25df6a29-1266-4505-a899-1ba82adfb95a.jpg		30	5
91	varieties/Mac's Sentimental Scarlet/Mac's Sentimental Scarlet33ed110f-effd-4bb2-ae1b-b847503b07e5.jpg		30	6
92	varieties/Mac's Voodoo Yoodoo/Mac's Voodoo Yoodoo3f44c55b-31bf-440e-9c79-0d1eb0dfa1d0.jpg	\N	31	1
93	varieties/Mac's Voodoo Yoodoo/Mac's Voodoo Yoodoo0ee6ad74-bacc-430b-9373-9a8ee90d92ac.jpg		31	2
94	varieties/Mac's Voodoo Yoodoo/Mac's Voodoo Yoodoo2bc80442-7aed-4664-90ae-525598f5861c.jpg		31	3
95	varieties/Mac's Voodoo Yoodoo/Mac's Voodoo Yoodoof1f6599b-7c86-4453-8c9d-ab00bcf65dd0.jpg		31	4
96	varieties/Mac's Something Special/Mac's Something Special2b912eb7-34ae-40e7-8708-05d9db7b8a9c.jpg		32	1
97	varieties/Mac's Something Special/Mac's Something Special3b3f54d2-664f-4e1a-bbfd-7f5e09bbc42d.jpg	\N	32	2
98	varieties/Mac's Something Special/Mac's Something Special2bea3253-5927-45be-8d29-f099ecd94b12.jpg		32	3
99	varieties/Mac's Something Special/Mac's Something Special9857ff23-2731-48f0-a5c7-0f055afa2836.jpg		32	4
100	varieties/Mac's Something Special/Mac's Something Special473fc8b7-9734-42b2-8b99-0eea6309b9f7.jpg		32	5
101	varieties/Mac's Something Special/Mac's Something Specialb0ab36d8-1fb7-45e6-b073-1cb08d5e1c82.jpg		32	7
102	varieties/Mac's Southern Springtime/Mac's Southern Springtime27ed1fc9-c4c6-46b8-a5a0-91c0981ab57f.jpeg	\N	33	1
103	varieties/Mac's Southern Springtime/Mac's Southern Springtime7e9478a0-0df2-4002-a672-78cb6c0e80c1.jpg		33	2
104	varieties/Mac's Southern Springtime/Mac's Southern Springtime9872e1bf-c7fd-48c4-99c1-50a632c1ad65.jpeg		33	3
105	varieties/Mac's Southern Springtime/Mac's Southern Springtime9db4f494-9c22-40bf-a2fb-38b91d81d7ba.jpg		33	4
106	varieties/Mac's Southern Springtime/Mac's Southern Springtimecd0a4a51-0169-4ce7-81d5-42464fea4c49.jpg		33	5
107	varieties/Н-Аватар/Н-Аватарd351eaeb-3ae8-4aed-b8f2-c53f0804cad0.JPG	Фото селекционера	34	1
108	varieties/Н-Яшма/Н-Яшма533f3d85-4ad4-4af8-8834-7aed482d0b68.JPG	Фото селекционера	35	1
109	varieties/Н-Яшма/Н-Яшмаf1488d33-e847-483a-aba3-631866d8efe7.JPG	Фото селекционера	35	2
110	varieties/Н-Снежный Георгин/Н-Снежный Георгин1b9b2b80-9ba9-4aaf-a11f-f960115e1aaf.JPG	Фото селекционера	36	1
111	varieties/Н-Снежный Георгин/Н-Снежный Георгин22d65644-d80c-4b82-bb6d-f5d2d555ae7c.JPG	Фото селекционера	36	2
112	varieties/Н-Ожидание/Н-Ожидание90043345-b077-4dd6-92ad-1baa3e91bbe2.JPG	Фото селекционера	37	1
113	varieties/Rob's Cool Fruit/Rob's Cool Fruit456ce765-77f9-4602-9988-e418d399c826.jpg		38	1
114	varieties/Rob's Cool Fruit/Rob's Cool Fruit23260f36-008b-4f4d-9733-f306648c75bf.jpg	\N	38	2
115	varieties/Rob's Cool Fruit/Rob's Cool Fruit87cf4cc2-eb4b-4044-bca2-661708a10de0.jpg		38	3
116	varieties/Rob's Sarsaparilla/Rob's Sarsparillae9c6c134-23b8-4809-a414-806a7caaa6c0.jpg	\N	39	1
117	varieties/Rob's Sarsaparilla/Rob's Sarsparilla513047ea-242a-489d-9eff-21b42ced407c.jpg		39	2
118	varieties/Rob's Sarsaparilla/Rob's Sarsparilla594249a2-da34-41e3-b617-44f600f093d5.jpg		39	3
119	varieties/Petite Blarney/Petite Blarneyfa716c81-0093-41ef-aa6c-1bedbfe686d4.jpg	\N	40	1
120	varieties/Petite Blarney/Petite Blarneyaed75f05-7f64-4171-8b13-b24edb1ed69d.jpg		40	2
121	varieties/Petite Blarney/Petite Blarney2b359b39-18f5-4584-ac64-b4e7d7dd45fa.jpg		40	3
122	varieties/Petite Blarney/Petite Blarney13294bb3-c5c1-4c36-b742-87259cb53d0d.jpg		40	4
123	varieties/Petite Blarney/Petite Blarney848d1a7e-9537-46be-a061-956a83d4878d.jpg		40	5
124	varieties/Ness’ Crinkle Blue/Ness’ Crinkle Blue5f605368-ca96-4525-a718-4dbcea9a0142.jpg		41	1
125	varieties/Ness’ Crinkle Blue/Ness’ Crinkle Bluea096e791-3332-4c23-afed-aefe02297124.jpg	\N	41	2
126	varieties/Ness’ Crinkle Blue/Ness’ Crinkle Blued59b3b0f-a251-479f-a4e5-8e55b4cb2a56.jpg		41	3
127	varieties/Ness’ Crinkle Blue/Ness’ Crinkle Blue85b4021b-e9f0-4aea-94fb-168314ae4825.JPG		41	4
128	varieties/Ness’ Crinkle Blue/Ness’ Crinkle Blue5ed013b2-0ca3-4607-b5e4-52c9f29f8b0d.jpg		41	6
129	varieties/Ness’ Crinkle Blue/Ness’ Crinkle Blue92dba016-b932-4260-81c0-c08c448713cd.jpg		41	7
130	varieties/Ness’ Orange Pekoe/Ness’ Orange Pekoe3098c377-11ba-4b4b-92be-3a526bc4a03d.jpg		42	1
131	varieties/Ness’ Orange Pekoe/Ness’ Orange Pekoe5ed33b87-01e3-466f-9fe4-449e9dab4851.jpg	\N	42	2
132	varieties/Ness’ Orange Pekoe/Ness’ Orange Pekoe242d6eef-cce7-4518-81be-df62c702adee.jpg		42	4
133	varieties/Ness’ Orange Pekoe/Ness’ Orange Pekoe792817f9-2c9c-4414-a28f-19a8cc54fd02.jpg		42	5
134	varieties/Painted Silk/Painted Silk6f0535a7-cfb6-454e-8660-215a38b3638f.jpg	\N	43	1
135	varieties/Painted Silk/Painted Silk5ff261d7-272a-495d-aa30-56b9135a8028.jpg		43	2
136	varieties/Painted Silk/Painted Silk4010ed7a-996d-4950-92e8-a273e0e38d0e.jpg		43	3
137	varieties/Painted Silk/Painted Silk27f4ba4c-23f8-4895-8d0a-2e1ef68ce6c0.jpg		43	4
\.


--
-- Name: variety_details_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.variety_details_id_seq', 137, true);


--
-- Name: exemplar_history exemplar_history_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.exemplar_history
    ADD CONSTRAINT exemplar_history_pkey PRIMARY KEY (id);


--
-- Name: exemplars exemplars_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.exemplars
    ADD CONSTRAINT exemplars_pkey PRIMARY KEY (id);


--
-- Name: hybridisators hybridisators_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.hybridisators
    ADD CONSTRAINT hybridisators_pkey PRIMARY KEY (id);


--
-- Name: leaf_history leaf_history_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.leaf_history
    ADD CONSTRAINT leaf_history_pkey PRIMARY KEY (id);


--
-- Name: leaves leaves_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.leaves
    ADD CONSTRAINT leaves_pkey PRIMARY KEY (id);


--
-- Name: varieties varieties_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.varieties
    ADD CONSTRAINT varieties_pkey PRIMARY KEY (id);


--
-- Name: variety_details variety_details_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.variety_details
    ADD CONSTRAINT variety_details_pkey PRIMARY KEY (id);


--
-- Name: exemplar_history_id_uindex; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX exemplar_history_id_uindex ON public.exemplar_history USING btree (id);


--
-- Name: exemplars_id_uindex; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX exemplars_id_uindex ON public.exemplars USING btree (id);


--
-- Name: hybridisators_id_uindex; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX hybridisators_id_uindex ON public.hybridisators USING btree (id);


--
-- Name: leaf_history_id_uindex; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX leaf_history_id_uindex ON public.leaf_history USING btree (id);


--
-- Name: leaves_id_uindex; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX leaves_id_uindex ON public.leaves USING btree (id);


--
-- Name: varieties_id_uindex; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX varieties_id_uindex ON public.varieties USING btree (id);


--
-- Name: variety_details_id_uindex; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX variety_details_id_uindex ON public.variety_details USING btree (id);


--
-- Name: exemplar_history exemplar_history_exemplars_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.exemplar_history
    ADD CONSTRAINT exemplar_history_exemplars_id_fk FOREIGN KEY (exemplar_id) REFERENCES public.exemplars(id);


--
-- Name: exemplars exemplars_exemplars_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.exemplars
    ADD CONSTRAINT exemplars_exemplars_id_fk FOREIGN KEY (parent) REFERENCES public.exemplars(id);


--
-- Name: exemplars exemplars_leaves_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.exemplars
    ADD CONSTRAINT exemplars_leaves_id_fk FOREIGN KEY (parent_leaf) REFERENCES public.leaves(id);


--
-- Name: exemplars exemplars_varieties_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.exemplars
    ADD CONSTRAINT exemplars_varieties_id_fk FOREIGN KEY (variety_id) REFERENCES public.varieties(id);


--
-- Name: leaf_history leaf_history_leaves_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.leaf_history
    ADD CONSTRAINT leaf_history_leaves_id_fk FOREIGN KEY (leaf_id) REFERENCES public.leaves(id);


--
-- Name: leaves leaves_exemplars_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.leaves
    ADD CONSTRAINT leaves_exemplars_id_fk FOREIGN KEY (parent) REFERENCES public.exemplars(id);


--
-- Name: leaves leaves_varieties_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.leaves
    ADD CONSTRAINT leaves_varieties_id_fk FOREIGN KEY (variety_id) REFERENCES public.varieties(id);


--
-- Name: varieties varieties_hybridisators_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.varieties
    ADD CONSTRAINT varieties_hybridisators_id_fk FOREIGN KEY (author) REFERENCES public.hybridisators(id);


--
-- Name: varieties varieties_varieties_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.varieties
    ADD CONSTRAINT varieties_varieties_id_fk FOREIGN KEY (sport_of) REFERENCES public.varieties(id);


--
-- Name: variety_details variety_details_varieties_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.variety_details
    ADD CONSTRAINT variety_details_varieties_id_fk FOREIGN KEY (variety_id) REFERENCES public.varieties(id);


--
-- PostgreSQL database dump complete
--


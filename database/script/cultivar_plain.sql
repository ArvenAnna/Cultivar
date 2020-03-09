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
12	Leaf separation exemplar description	2	APPEARANCE	\N	\N	\N
13		2	BLOSSOM_START	2020-02-15 00:00:00	exemplars/Н-Радость/Н-Радость1d938fb9-e526-4471-a549-2d46c3a93410.JPG	\N
\.


--
-- Name: exemplar_history_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.exemplar_history_id_seq', 13, true);


--
-- Data for Name: exemplars; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.exemplars (id, variety_id, parent, is_sport, name, parent_leaf) FROM stdin;
1	3	\N	f	Leaf separation exemplar	1
2	3	\N	f	Leaf separation exemplar	1
\.


--
-- Name: exemplars_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.exemplars_id_seq', 2, true);


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
\.


--
-- Name: hybridisators_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.hybridisators_id_seq', 11, true);


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
\.


--
-- Name: leaf_history_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.leaf_history_id_seq', 6, true);


--
-- Data for Name: leaves; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.leaves (id, parent, variety_id) FROM stdin;
1	\N	3
\.


--
-- Name: leaves_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.leaves_id_seq', 1, true);


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
\.


--
-- Name: varieties_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.varieties_id_seq', 11, true);


--
-- Data for Name: variety_details; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.variety_details (id, photo, description, variety_id, detail_order) FROM stdin;
4	varieties/ЛЕ-Голубой Поток/ЛЕ-Голубой Поток5f3ed29b-9f74-4d54-b29a-a2589d925a48.jpg	Фото селекционера	4	1
5	varieties/ЛЕ-Кудрявый хмель/ЛЕ-Кудрявый хмельc1868504-d9ea-421a-aa3d-829e3e76d66a.jpg	Фото селекционера	5	1
6	varieties/ЛЕ-Голубой Лютик/ЛЕ-Голубой Лютик0f929ff1-6bb4-4648-899e-1c421a40ebc4.jpg	Фото селекционера	2	1
2	varieties/ЛЕ-Голубой Лютик/ЛЕ-Голубой Лютикa179d0f6-34ff-458f-ad09-f37e321cdb60.jpg		2	2
1	varieties/ЛЕ-Иллюзия/ЛЕ-Иллюзия73675842-bd34-4a97-955d-09b005a69d93.jpg	Фото селекционера	1	1
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
\.


--
-- Name: variety_details_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.variety_details_id_seq', 24, true);


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


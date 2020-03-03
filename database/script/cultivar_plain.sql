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
1	Елена Лебецкая	\N
2	Надежда Бердникова	\N
\.


--
-- Name: hybridisators_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.hybridisators_id_seq', 2, true);


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
\.


--
-- Name: varieties_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.varieties_id_seq', 5, true);


--
-- Data for Name: variety_details; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.variety_details (id, photo, description, variety_id, detail_order) FROM stdin;
3	varieties/Н-Радость/Н-Радость295ddf9d-db79-4cdb-8a5b-1cccb5ad5a43.jpg	\N	3	1
4	varieties/ЛЕ-Голубой Поток/ЛЕ-Голубой Поток5f3ed29b-9f74-4d54-b29a-a2589d925a48.jpg	Фото селекционера	4	1
5	varieties/ЛЕ-Кудрявый хмель/ЛЕ-Кудрявый хмельc1868504-d9ea-421a-aa3d-829e3e76d66a.jpg	Фото селекционера	5	1
6	varieties/ЛЕ-Голубой Лютик/ЛЕ-Голубой Лютик0f929ff1-6bb4-4648-899e-1c421a40ebc4.jpg	Фото селекционера	2	1
2	varieties/ЛЕ-Голубой Лютик/ЛЕ-Голубой Лютикa179d0f6-34ff-458f-ad09-f37e321cdb60.jpg		2	2
1	varieties/ЛЕ-Иллюзия/ЛЕ-Иллюзия73675842-bd34-4a97-955d-09b005a69d93.jpg	Фото селекционера	1	1
\.


--
-- Name: variety_details_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.variety_details_id_seq', 6, true);


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


--
-- PostgreSQL database dump
--

-- Dumped from database version 9.6.15
-- Dumped by pg_dump version 9.6.15

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
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
    photo character varying(1000)
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
    is_sport boolean
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
    name character varying(400)
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

COPY public.exemplar_history (id, description, exemplar_id, event_type, event_date, photo) FROM stdin;
\.


--
-- Name: exemplar_history_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.exemplar_history_id_seq', 1, false);


--
-- Data for Name: exemplars; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.exemplars (id, variety_id, parent, is_sport) FROM stdin;
\.


--
-- Name: exemplars_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.exemplars_id_seq', 1, false);


--
-- Data for Name: hybridisators; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.hybridisators (id, name) FROM stdin;
\.


--
-- Name: hybridisators_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.hybridisators_id_seq', 1, false);


--
-- Data for Name: varieties; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.varieties (id, name, author, description, variety_type, hybridisation_date, sport_of) FROM stdin;
\.


--
-- Name: varieties_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.varieties_id_seq', 1, false);


--
-- Data for Name: variety_details; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.variety_details (id, photo, description, variety_id, detail_order) FROM stdin;
\.


--
-- Name: variety_details_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.variety_details_id_seq', 1, false);


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
-- Name: exemplars exemplars_varieties_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.exemplars
    ADD CONSTRAINT exemplars_varieties_id_fk FOREIGN KEY (variety_id) REFERENCES public.varieties(id);


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


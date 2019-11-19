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
-- Name: varieties; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.varieties (
    id integer NOT NULL,
    name character varying(400) NOT NULL,
    author character varying(400),
    description text
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
-- Name: varieties id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.varieties ALTER COLUMN id SET DEFAULT nextval('public.varieties_id_seq'::regclass);


--
-- Data for Name: varieties; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.varieties (id, name, author, description) FROM stdin;
\.


--
-- Name: varieties_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.varieties_id_seq', 1, false);


--
-- Name: varieties varieties_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.varieties
    ADD CONSTRAINT varieties_pkey PRIMARY KEY (id);


--
-- Name: varieties_id_uindex; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX varieties_id_uindex ON public.varieties USING btree (id);


--
-- PostgreSQL database dump complete
--


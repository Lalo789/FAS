--
-- PostgreSQL database dump
--


-- Dumped from database version 18.3
-- Dumped by pg_dump version 18.3

-- Started on 2026-04-21 19:06:51

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 236 (class 1259 OID 24758)
-- Name: detalle_pedido; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.detalle_pedido (
    id_detalle integer NOT NULL,
    id_pedido integer,
    id_platillo integer,
    cantidad integer NOT NULL,
    subtotal numeric(10,2) NOT NULL
);


ALTER TABLE public.detalle_pedido OWNER TO postgres;

--
-- TOC entry 235 (class 1259 OID 24757)
-- Name: detalle_pedido_id_detalle_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.detalle_pedido_id_detalle_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.detalle_pedido_id_detalle_seq OWNER TO postgres;

--
-- TOC entry 5115 (class 0 OID 0)
-- Dependencies: 235
-- Name: detalle_pedido_id_detalle_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.detalle_pedido_id_detalle_seq OWNED BY public.detalle_pedido.id_detalle;


--
-- TOC entry 240 (class 1259 OID 24800)
-- Name: historial_operaciones; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.historial_operaciones (
    id_operacion integer NOT NULL,
    id_usuario integer,
    accion character varying(100) NOT NULL,
    descripcion text,
    fecha_movimiento timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.historial_operaciones OWNER TO postgres;

--
-- TOC entry 239 (class 1259 OID 24799)
-- Name: historial_operaciones_id_operacion_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.historial_operaciones_id_operacion_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.historial_operaciones_id_operacion_seq OWNER TO postgres;

--
-- TOC entry 5116 (class 0 OID 0)
-- Dependencies: 239
-- Name: historial_operaciones_id_operacion_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.historial_operaciones_id_operacion_seq OWNED BY public.historial_operaciones.id_operacion;


--
-- TOC entry 238 (class 1259 OID 24778)
-- Name: historial_visitas; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.historial_visitas (
    id_visita integer NOT NULL,
    id_usuario integer,
    id_reservacion integer,
    fecha_visita date DEFAULT CURRENT_DATE,
    monto_total numeric(10,2) NOT NULL,
    metodo_pago character varying(50),
    comentarios_cliente text
);


ALTER TABLE public.historial_visitas OWNER TO postgres;

--
-- TOC entry 237 (class 1259 OID 24777)
-- Name: historial_visitas_id_visita_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.historial_visitas_id_visita_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.historial_visitas_id_visita_seq OWNER TO postgres;

--
-- TOC entry 5117 (class 0 OID 0)
-- Dependencies: 237
-- Name: historial_visitas_id_visita_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.historial_visitas_id_visita_seq OWNED BY public.historial_visitas.id_visita;


--
-- TOC entry 232 (class 1259 OID 24728)
-- Name: inventario; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.inventario (
    id_insumo integer NOT NULL,
    nombre character varying(100) NOT NULL,
    cantidad integer NOT NULL,
    unidad character varying(20),
    id_proveedor integer
);


ALTER TABLE public.inventario OWNER TO postgres;

--
-- TOC entry 231 (class 1259 OID 24727)
-- Name: inventario_id_insumo_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.inventario_id_insumo_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.inventario_id_insumo_seq OWNER TO postgres;

--
-- TOC entry 5118 (class 0 OID 0)
-- Dependencies: 231
-- Name: inventario_id_insumo_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.inventario_id_insumo_seq OWNED BY public.inventario.id_insumo;


--
-- TOC entry 224 (class 1259 OID 24671)
-- Name: mesas; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.mesas (
    id_mesa integer NOT NULL,
    numero_mesa integer NOT NULL,
    capacidad integer NOT NULL,
    estado character varying(20) DEFAULT 'libre'::character varying
);


ALTER TABLE public.mesas OWNER TO postgres;

--
-- TOC entry 223 (class 1259 OID 24670)
-- Name: mesas_id_mesa_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.mesas_id_mesa_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.mesas_id_mesa_seq OWNER TO postgres;

--
-- TOC entry 5119 (class 0 OID 0)
-- Dependencies: 223
-- Name: mesas_id_mesa_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.mesas_id_mesa_seq OWNED BY public.mesas.id_mesa;


--
-- TOC entry 234 (class 1259 OID 24743)
-- Name: pedidos; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.pedidos (
    id_pedido integer NOT NULL,
    fecha_hora timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    estado character varying(50) DEFAULT 'en preparación'::character varying,
    id_reservacion integer
);


ALTER TABLE public.pedidos OWNER TO postgres;

--
-- TOC entry 233 (class 1259 OID 24742)
-- Name: pedidos_id_pedido_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.pedidos_id_pedido_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.pedidos_id_pedido_seq OWNER TO postgres;

--
-- TOC entry 5120 (class 0 OID 0)
-- Dependencies: 233
-- Name: pedidos_id_pedido_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.pedidos_id_pedido_seq OWNED BY public.pedidos.id_pedido;


--
-- TOC entry 228 (class 1259 OID 24707)
-- Name: platillos; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.platillos (
    id_platillo integer NOT NULL,
    nombre character varying(100) NOT NULL,
    precio numeric(10,2) NOT NULL,
    descripcion text
);


ALTER TABLE public.platillos OWNER TO postgres;

--
-- TOC entry 227 (class 1259 OID 24706)
-- Name: platillos_id_platillo_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.platillos_id_platillo_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.platillos_id_platillo_seq OWNER TO postgres;

--
-- TOC entry 5121 (class 0 OID 0)
-- Dependencies: 227
-- Name: platillos_id_platillo_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.platillos_id_platillo_seq OWNED BY public.platillos.id_platillo;


--
-- TOC entry 230 (class 1259 OID 24719)
-- Name: proveedores; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.proveedores (
    id_proveedor integer NOT NULL,
    nombre character varying(100) NOT NULL,
    telefono character varying(20),
    correo character varying(100)
);


ALTER TABLE public.proveedores OWNER TO postgres;

--
-- TOC entry 229 (class 1259 OID 24718)
-- Name: proveedores_id_proveedor_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.proveedores_id_proveedor_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.proveedores_id_proveedor_seq OWNER TO postgres;

--
-- TOC entry 5122 (class 0 OID 0)
-- Dependencies: 229
-- Name: proveedores_id_proveedor_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.proveedores_id_proveedor_seq OWNED BY public.proveedores.id_proveedor;


--
-- TOC entry 226 (class 1259 OID 24684)
-- Name: reservaciones; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.reservaciones (
    id_reservacion integer NOT NULL,
    usuario_id integer,
    mesa_id integer,
    fecha date NOT NULL,
    hora time without time zone NOT NULL,
    num_personas integer NOT NULL,
    estado_reserva character varying(20) DEFAULT 'confirmada'::character varying,
    fecha_creacion timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.reservaciones OWNER TO postgres;

--
-- TOC entry 225 (class 1259 OID 24683)
-- Name: reservaciones_id_reservacion_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.reservaciones_id_reservacion_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.reservaciones_id_reservacion_seq OWNER TO postgres;

--
-- TOC entry 5123 (class 0 OID 0)
-- Dependencies: 225
-- Name: reservaciones_id_reservacion_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.reservaciones_id_reservacion_seq OWNED BY public.reservaciones.id_reservacion;


--
-- TOC entry 220 (class 1259 OID 24639)
-- Name: roles; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.roles (
    id_rol integer NOT NULL,
    nombre_rol character varying(20) NOT NULL
);


ALTER TABLE public.roles OWNER TO postgres;

--
-- TOC entry 219 (class 1259 OID 24638)
-- Name: roles_id_rol_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.roles_id_rol_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.roles_id_rol_seq OWNER TO postgres;

--
-- TOC entry 5124 (class 0 OID 0)
-- Dependencies: 219
-- Name: roles_id_rol_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.roles_id_rol_seq OWNED BY public.roles.id_rol;


--
-- TOC entry 222 (class 1259 OID 24650)
-- Name: usuarios; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.usuarios (
    id_usuario integer NOT NULL,
    nombre_completo character varying(150) NOT NULL,
    correo character varying(100) NOT NULL,
    telefono character varying(15),
    contrasena text NOT NULL,
    rol_id integer,
    fecha_registro timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.usuarios OWNER TO postgres;

--
-- TOC entry 221 (class 1259 OID 24649)
-- Name: usuarios_id_usuario_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.usuarios_id_usuario_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.usuarios_id_usuario_seq OWNER TO postgres;

--
-- TOC entry 5125 (class 0 OID 0)
-- Dependencies: 221
-- Name: usuarios_id_usuario_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.usuarios_id_usuario_seq OWNED BY public.usuarios.id_usuario;


--
-- TOC entry 4920 (class 2604 OID 24761)
-- Name: detalle_pedido id_detalle; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.detalle_pedido ALTER COLUMN id_detalle SET DEFAULT nextval('public.detalle_pedido_id_detalle_seq'::regclass);


--
-- TOC entry 4923 (class 2604 OID 24803)
-- Name: historial_operaciones id_operacion; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.historial_operaciones ALTER COLUMN id_operacion SET DEFAULT nextval('public.historial_operaciones_id_operacion_seq'::regclass);


--
-- TOC entry 4921 (class 2604 OID 24781)
-- Name: historial_visitas id_visita; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.historial_visitas ALTER COLUMN id_visita SET DEFAULT nextval('public.historial_visitas_id_visita_seq'::regclass);


--
-- TOC entry 4916 (class 2604 OID 24731)
-- Name: inventario id_insumo; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.inventario ALTER COLUMN id_insumo SET DEFAULT nextval('public.inventario_id_insumo_seq'::regclass);


--
-- TOC entry 4909 (class 2604 OID 24674)
-- Name: mesas id_mesa; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.mesas ALTER COLUMN id_mesa SET DEFAULT nextval('public.mesas_id_mesa_seq'::regclass);


--
-- TOC entry 4917 (class 2604 OID 24746)
-- Name: pedidos id_pedido; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.pedidos ALTER COLUMN id_pedido SET DEFAULT nextval('public.pedidos_id_pedido_seq'::regclass);


--
-- TOC entry 4914 (class 2604 OID 24710)
-- Name: platillos id_platillo; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.platillos ALTER COLUMN id_platillo SET DEFAULT nextval('public.platillos_id_platillo_seq'::regclass);


--
-- TOC entry 4915 (class 2604 OID 24722)
-- Name: proveedores id_proveedor; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.proveedores ALTER COLUMN id_proveedor SET DEFAULT nextval('public.proveedores_id_proveedor_seq'::regclass);


--
-- TOC entry 4911 (class 2604 OID 24687)
-- Name: reservaciones id_reservacion; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.reservaciones ALTER COLUMN id_reservacion SET DEFAULT nextval('public.reservaciones_id_reservacion_seq'::regclass);


--
-- TOC entry 4906 (class 2604 OID 24642)
-- Name: roles id_rol; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.roles ALTER COLUMN id_rol SET DEFAULT nextval('public.roles_id_rol_seq'::regclass);


--
-- TOC entry 4907 (class 2604 OID 24653)
-- Name: usuarios id_usuario; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuarios ALTER COLUMN id_usuario SET DEFAULT nextval('public.usuarios_id_usuario_seq'::regclass);


--
-- TOC entry 4948 (class 2606 OID 24766)
-- Name: detalle_pedido detalle_pedido_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.detalle_pedido
    ADD CONSTRAINT detalle_pedido_pkey PRIMARY KEY (id_detalle);


--
-- TOC entry 4952 (class 2606 OID 24810)
-- Name: historial_operaciones historial_operaciones_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.historial_operaciones
    ADD CONSTRAINT historial_operaciones_pkey PRIMARY KEY (id_operacion);


--
-- TOC entry 4950 (class 2606 OID 24788)
-- Name: historial_visitas historial_visitas_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.historial_visitas
    ADD CONSTRAINT historial_visitas_pkey PRIMARY KEY (id_visita);


--
-- TOC entry 4944 (class 2606 OID 24736)
-- Name: inventario inventario_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.inventario
    ADD CONSTRAINT inventario_pkey PRIMARY KEY (id_insumo);


--
-- TOC entry 4934 (class 2606 OID 24682)
-- Name: mesas mesas_numero_mesa_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.mesas
    ADD CONSTRAINT mesas_numero_mesa_key UNIQUE (numero_mesa);


--
-- TOC entry 4936 (class 2606 OID 24680)
-- Name: mesas mesas_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.mesas
    ADD CONSTRAINT mesas_pkey PRIMARY KEY (id_mesa);


--
-- TOC entry 4946 (class 2606 OID 24751)
-- Name: pedidos pedidos_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.pedidos
    ADD CONSTRAINT pedidos_pkey PRIMARY KEY (id_pedido);


--
-- TOC entry 4940 (class 2606 OID 24717)
-- Name: platillos platillos_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.platillos
    ADD CONSTRAINT platillos_pkey PRIMARY KEY (id_platillo);


--
-- TOC entry 4942 (class 2606 OID 24726)
-- Name: proveedores proveedores_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.proveedores
    ADD CONSTRAINT proveedores_pkey PRIMARY KEY (id_proveedor);


--
-- TOC entry 4938 (class 2606 OID 24695)
-- Name: reservaciones reservaciones_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.reservaciones
    ADD CONSTRAINT reservaciones_pkey PRIMARY KEY (id_reservacion);


--
-- TOC entry 4926 (class 2606 OID 24648)
-- Name: roles roles_nombre_rol_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.roles
    ADD CONSTRAINT roles_nombre_rol_key UNIQUE (nombre_rol);


--
-- TOC entry 4928 (class 2606 OID 24646)
-- Name: roles roles_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.roles
    ADD CONSTRAINT roles_pkey PRIMARY KEY (id_rol);


--
-- TOC entry 4930 (class 2606 OID 24664)
-- Name: usuarios usuarios_correo_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuarios
    ADD CONSTRAINT usuarios_correo_key UNIQUE (correo);


--
-- TOC entry 4932 (class 2606 OID 24662)
-- Name: usuarios usuarios_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuarios
    ADD CONSTRAINT usuarios_pkey PRIMARY KEY (id_usuario);


--
-- TOC entry 4958 (class 2606 OID 24767)
-- Name: detalle_pedido detalle_pedido_id_pedido_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.detalle_pedido
    ADD CONSTRAINT detalle_pedido_id_pedido_fkey FOREIGN KEY (id_pedido) REFERENCES public.pedidos(id_pedido);


--
-- TOC entry 4959 (class 2606 OID 24772)
-- Name: detalle_pedido detalle_pedido_id_platillo_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.detalle_pedido
    ADD CONSTRAINT detalle_pedido_id_platillo_fkey FOREIGN KEY (id_platillo) REFERENCES public.platillos(id_platillo);


--
-- TOC entry 4962 (class 2606 OID 24811)
-- Name: historial_operaciones historial_operaciones_id_usuario_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.historial_operaciones
    ADD CONSTRAINT historial_operaciones_id_usuario_fkey FOREIGN KEY (id_usuario) REFERENCES public.usuarios(id_usuario);


--
-- TOC entry 4960 (class 2606 OID 24794)
-- Name: historial_visitas historial_visitas_id_reservacion_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.historial_visitas
    ADD CONSTRAINT historial_visitas_id_reservacion_fkey FOREIGN KEY (id_reservacion) REFERENCES public.reservaciones(id_reservacion);


--
-- TOC entry 4961 (class 2606 OID 24789)
-- Name: historial_visitas historial_visitas_id_usuario_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.historial_visitas
    ADD CONSTRAINT historial_visitas_id_usuario_fkey FOREIGN KEY (id_usuario) REFERENCES public.usuarios(id_usuario);


--
-- TOC entry 4956 (class 2606 OID 24737)
-- Name: inventario inventario_id_proveedor_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.inventario
    ADD CONSTRAINT inventario_id_proveedor_fkey FOREIGN KEY (id_proveedor) REFERENCES public.proveedores(id_proveedor);


--
-- TOC entry 4957 (class 2606 OID 24752)
-- Name: pedidos pedidos_id_reservacion_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.pedidos
    ADD CONSTRAINT pedidos_id_reservacion_fkey FOREIGN KEY (id_reservacion) REFERENCES public.reservaciones(id_reservacion);


--
-- TOC entry 4954 (class 2606 OID 24701)
-- Name: reservaciones reservaciones_mesa_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.reservaciones
    ADD CONSTRAINT reservaciones_mesa_id_fkey FOREIGN KEY (mesa_id) REFERENCES public.mesas(id_mesa);


--
-- TOC entry 4955 (class 2606 OID 24696)
-- Name: reservaciones reservaciones_usuario_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.reservaciones
    ADD CONSTRAINT reservaciones_usuario_id_fkey FOREIGN KEY (usuario_id) REFERENCES public.usuarios(id_usuario);


--
-- TOC entry 4953 (class 2606 OID 24665)
-- Name: usuarios usuarios_rol_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuarios
    ADD CONSTRAINT usuarios_rol_id_fkey FOREIGN KEY (rol_id) REFERENCES public.roles(id_rol);


-- Completed on 2026-04-21 19:06:52

--
-- PostgreSQL database dump complete
--

\unrestrict 4EdDLExr9nkyslsGyqmjDZkB004aHxjvvbikFhx3gUcC2fJJOpNyj7zkiGO1hMc

